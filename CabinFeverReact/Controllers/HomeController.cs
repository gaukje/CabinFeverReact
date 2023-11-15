using CabinFeverReact.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.Threading.Tasks;
using CabinFeverReact.DAL;
using System.Linq;
using System.Security.Claims;

namespace CabinFever.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IItemRepository _itemRepository;

        public HomeController(ILogger<HomeController> logger, IItemRepository itemRepository)
        {
            _logger = logger;
            _itemRepository = itemRepository;
        }

        [HttpGet("items")]
        public async Task<IActionResult> GetItems()
        {
            try
            {
                var items = await _itemRepository.GetAll();
                return Ok(items);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error fetching items: ", ex);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("rentals")]
        public async Task<IActionResult> GetRentals()
        {
            try
            {
                var items = await _itemRepository.GetAll();
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var orders = await _itemRepository.GetOrdersForUser(userId);
                return Ok(new { Items = items, Orders = orders });
            }
            catch (Exception ex)
            {
                _logger.LogError("Error fetching rentals: ", ex);
                return StatusCode(500, "Internal server error");
            }
        }

        // About and Contact endpoints can be removed if these pages are static and handled by React.

        [HttpGet("minside")]
        public async Task<IActionResult> GetMinSide()
        {
            try
            {
                var items = await _itemRepository.GetAll();
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var orders = await _itemRepository.GetOrdersForUser(userId);
                return Ok(new { Items = items, Orders = orders });
            }
            catch (Exception ex)
            {
                _logger.LogError("Error fetching MinSide: ", ex);
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
