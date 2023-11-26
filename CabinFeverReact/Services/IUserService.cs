using CabinFeverReact.Models;

namespace CabinFeverReact.Services
{
    public interface IUserService
    {
        string GenerateTokenString(LoginUser user);
        Task<bool> Login(LoginUser user);
        Task<bool> RegisterUser(LoginUser user);
    }
}