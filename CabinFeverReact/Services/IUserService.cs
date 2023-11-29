using CabinFeverReact.Models;

namespace CabinFeverReact.Services
{
    // This interface defines the methods for user services
    public interface IUserService
    {
        // Method to generate a token string for user authenticatio
        Task<string> GenerateTokenString(LoginUser user);

        // Method for usr login returns true if login is successful
        Task<bool> Login(LoginUser user);

        // Method to register a new user returns true if registration is successful
        Task<bool> RegisterUser(LoginUser user);
    }
}
