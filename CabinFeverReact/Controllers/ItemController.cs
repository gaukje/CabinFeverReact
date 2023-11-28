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

    // POST: api/Item/Create
    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromForm] Item item)
    {
        if (!ModelState.IsValid)
        {
            _logger.LogError("Validation errors: {@ValidationErrors}", ModelState.Values.SelectMany(v => v.Errors));
            return BadRequest(ModelState);
        }

        bool created = await _itemRepository.Create(item);
        if (!created)
        {
            _logger.LogError("Creation of item failed.");
            return StatusCode(500, "A problem happened while handling your request.");
        }

        return CreatedAtAction(nameof(GetItemById), new { id = item.ItemId }, item);
    }


    [HttpPut("Update/{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Item updatedItem)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var existingItem = await _itemRepository.GetItemById(id);
        if (existingItem == null)
        {
            return NotFound($"Item with id {id} not found.");
        }

        // Oppdater feltene i existingItem med verdier fra updatedItem
        existingItem.Name = updatedItem.Name;
        existingItem.PricePerNight = updatedItem.PricePerNight;
        existingItem.Capacity = updatedItem.Capacity;
        existingItem.Description = updatedItem.Description;
        existingItem.Location = updatedItem.Location;
        // Legg til flere felt oppdateringer etter behov

        bool updated = await _itemRepository.Update(existingItem);
        if (!updated)
        {
            return StatusCode(500, "A problem happened while updating the item.");
        }

        return Ok(existingItem);
    }


    //DELETE: api/Item/Delete/"id"
    // Id til item skal stå istedenfor "id"
    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _itemRepository.GetItemById(id);
        if (item == null)
        {
            return NotFound();
        }

        await _itemRepository.Delete(id);
        return NoContent();
    }

    // POST: api/Item/Upload
    [HttpPost("Upload")]
    public async Task<IActionResult> Upload(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("No file uploaded.");
        }

        var folderName = "images"; // Folder name without 'wwwroot'
        var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp/public", folderName);

        if (!Directory.Exists(pathToSave))
        {
            Directory.CreateDirectory(pathToSave);
        }

        var fileName = Path.GetFileNameWithoutExtension(file.FileName);
        var extension = Path.GetExtension(file.FileName);
        var uniqueFileName = $"{fileName}_{DateTime.Now.Ticks}{extension}";
        var filePath = Path.Combine(pathToSave, uniqueFileName);
        var dbPath = Path.Combine(folderName, uniqueFileName); // This is the relative path

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        // Return the relative URL path to the uploaded file
        return Ok(new { imageUrl = "/" + dbPath.Replace("\\", "/") });
    }
}