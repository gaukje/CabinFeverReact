using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using CabinFeverReact.Models;
using CabinFeverReact.Services;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[Route("api/[controller]")]
[ApiController]
// controller for user related actions like registration and login
public class UserController : ControllerBase
{
    // user service and user manager for handling user-related operations
    private readonly IUserService _userService;
    private readonly UserManager<IdentityUser> _userManager;

    // constructor to initialize the user service and user manager
    public UserController(IUserService userService, UserManager<IdentityUser> userManager)
    {
        _userService = userService;
        _userManager = userManager;
    }

    // post method for registering a new user
    [HttpPost("Register")]
    public async Task<IActionResult> Register(LoginUser user)
    {
        // calling the register method from user service
        if (await _userService.RegisterUser(user))
        {
            // returning success message if registration is successful
            return Ok("Registered successfully");
        }
        // returning bad request if registration fails
        return BadRequest();
    }

    // post method for user login
    [HttpPost("Login")]
    public async Task<IActionResult> Login(LoginUser user)
    {
        // checking if model state is valid
        if (!ModelState.IsValid)
        {
            return BadRequest();
        }

        // calling the login method from user service
        if (await _userService.Login(user))
        {
            // generating token string
            var tokenString = await _userService.GenerateTokenString(user);
            // finding the user by email to get additional details
            var identityUser = await _userManager.FindByEmailAsync(user.UserName);
            // returning token and user details if login is successful
            return Ok(new { token = tokenString, userId = identityUser.Id, email = identityUser.Email });
        }
        // returning bad request if login fails
        return BadRequest();
    }
    /*
    [HttpPost("Login")]
    public async Task<IActionResult> Login(LoginUser user)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest();
        }
        if (await _userService.Login(user))
        {
            var tokenString = _userService.GenerateTokenString(user);
            return Ok(new { token = tokenString });
        }
        return BadRequest();
    }
    */
}