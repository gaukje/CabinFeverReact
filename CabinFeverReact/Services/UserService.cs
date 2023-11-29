using CabinFeverReact.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CabinFeverReact.Services
{
    // This class handles user services like registration, login, and token generation.
    public class UserService : IUserService
    {
        // UserManager and IConfiguration objects are used for user management and configuration settings
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _config;

        // Constructor to initialize the UserManager and IConfiguration instances.
        public UserService(UserManager<IdentityUser> userManager, IConfiguration config)
        {
            _userManager = userManager;
            _config = config;
        }

        // Method to register a new user
        public async Task<bool> RegisterUser(LoginUser user)
        {
            // Creating a new IdentityUser
            var identityUser = new IdentityUser
            {
                UserName = user.UserName,
                Email = user.UserName,
            };

            // Creating user with the provided passwor
            var result = await _userManager.CreateAsync(identityUser, user.Password);
            return result.Succeeded;
        }

        // Method for user login
        public async Task<bool> Login(LoginUser user)
        {
            // Checking if user exists
            var identityUser = await _userManager.FindByEmailAsync(user.UserName);
            if (identityUser == null)
            {
                return false;
            }

            // Checking if password is correct
            return await _userManager.CheckPasswordAsync(identityUser, user.Password);
        }

        // Method to generate a token string for authentication
        public async Task<string> GenerateTokenString(LoginUser user)
        {
            // Finding user by email
            var identityUser = await _userManager.FindByEmailAsync(user.UserName);
            if (identityUser == null)
            {
                throw new Exception("User not found.");
            }

            // Creating a list of claims for the user
            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Email, identityUser.Email),
        new Claim(ClaimTypes.Role, "Admin"),
        // Legg til en claim for brukerens ID
        new Claim(ClaimTypes.NameIdentifier, identityUser.Id)
    };

            // Creating a security key for token
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection
                ("Jwt:Key").Value));

            // Setting up signing credentials
            var signingCred = new SigningCredentials(securityKey,
                SecurityAlgorithms.HmacSha512Signature);

            // Creating the security token
            var securityToken = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                issuer: _config.GetSection("Jwt:Issuer").Value,
                audience: _config.GetSection("Jwt:Audience").Value,
                signingCredentials: signingCred);

            // Generating the token string
            string tokenString = new JwtSecurityTokenHandler().WriteToken(securityToken);
            return tokenString;
        }
    }
}
