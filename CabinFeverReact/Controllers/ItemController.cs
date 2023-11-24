using CabinFeverReact.DAL;
using CabinFeverReact.Models;
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
    public async Task<IActionResult> GetAll()
    {
        var items = await _itemRepository.GetAll();
        if (items == null)
        {
            _logger.LogError("[ItemController] Item list not found while executing _itemRepository.GetAll()");
            return NotFound("Item list not found");
        }
        //return Json(items);
        return Ok(items);
    }
   
    [HttpGet("{id}")]
    public async Task<IActionResult> GetItemById(int id)
    {
        var item = await _itemRepository.GetItemById(id);
        if (item == null)
            {
                return NotFound();
            }   
        return Ok(item);
    }

    /*
    // POST: api/Item/Create
    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromBody] Item item)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        await _itemRepository.CreateItem(item);
        return CreatedAtAction(nameof(GetItemById), new { id = item.Id }, item);
    }
    */

    /*
    // PUT: api/Item/Update/"id"
    // Id til item skal stå istedenfor "id"
    [HttpPut("Update/{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Item item)
    {
        if (id != item.Id)
        {
            return BadRequest();
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var existingItem = await _itemRepository.GetItemById(id);
        if (existingItem == null)
        {
            return NotFound();
        }

        await _itemRepository.UpdateItem(item);
        return NoContent();
    }
    */

    /*
    // DELETE: api/Item/Delete/"id"
    // Id til item skal stå istedenfor "id"
    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _itemRepository.GetItemById(id);
        if (item == null)
        {
            return NotFound();
        }

        await _itemRepository.DeleteItem(id);
        return NoContent();
    }
    */
}