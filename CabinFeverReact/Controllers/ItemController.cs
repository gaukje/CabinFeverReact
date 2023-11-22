using CabinFeverReact.DAL;
using CabinFeverReact.Models;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ItemController : Controller
{
    private readonly IItemRepository _itemRepository;
    private readonly ILogger<ItemController> _logger;
    public ItemController(IItemRepository itemRepository, ILogger<ItemController> logger)
    {
        _itemRepository = itemRepository;
        _logger = logger;
    }

    [HttpGet("GetAll")]
    public IActionResult GetAll()
    {
        var items = new List<object>
    {
        new
        {
            id = 1,
            name = "Item 1",
            location = "Oslo",
            pricePerNight = 100,
            description = "Description for Item 1",
            capacity = 2,
            imageUrl = "/images/hytte_stock_1.jpg"
        },
        new
        {
            id = 2,
            name = "Item 2",
            location = "Agder",
            pricePerNight = 150,
            description = "Description for Item 2",
            capacity = 4,
            imageUrl = "/images/hytte_stock_2.jpg"
        }
    };

        return Ok(items);
    }


    /*
        // DETTE MÅ FIKSES FOR Å FINNE ALLE TINGENE I LISTEN. DENNE FINNER INGEN LISTER
        var items = await _itemRepository.GetAll();
        if (items == null)
        {
            _logger.LogError("[ItemController] Item list not found while executing _itemRepository.GetAll()");
            return NotFound("Item list not found");
        }
        return Ok(items);
    */
}