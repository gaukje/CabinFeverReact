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
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    
    public UserController(IUserService userService)
    {
        _userService = userService;
    }
    
    [HttpPost("Register")]
    public async Task<IActionResult> Register(LoginUser user)
    {
        if (await _userService.RegisterUser(user))
        {
            return Ok("Registered successfully");
        }
        return BadRequest();
    }

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
}