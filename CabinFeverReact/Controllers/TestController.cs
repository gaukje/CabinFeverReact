using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CabinFeverReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // this means the user must be authorized to access methods in this controller

    // controller for testing purposes
    public class TestController : ControllerBase
    {
        [HttpGet] // http get method
        public String Get()
        {
            // returns a simple string response when the endpoint is hit
            return "You hit me";
        }
    }
}
