using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CabinFeverReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public String Get()
        {
            return "You hit me";
        }
    }
}
