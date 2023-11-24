namespace CabinFeverReact.DTO
{
    public class RegisterDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
        // Add other properties as needed
    }

}
/*
 *  (DTOs - Data Transfer Objects) for the API requests to avoid directly exposing your domain models and to validate incoming data.
 */