using Microsoft.AspNetCore.Identity;
using CabinFeverReact.Models;
using Microsoft.AspNetCore.Mvc;
using CabinFeverReact.DAL;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
// this controller handles item-related functionalities
public class ItemController : ControllerBase
{
    // repositories and logger for managing items and logging
    private readonly IItemRepository _itemRepository;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly ILogger<ItemController> _logger;
    private readonly ItemDbContext _itemDbContext;

    // constructor to initialize the repositories and logger
    public ItemController(IItemRepository itemRepository, UserManager<IdentityUser> userManager, ILogger<ItemController> logger, ItemDbContext itemDbContext)
    {
        _itemRepository = itemRepository;
        _userManager = userManager;
        _logger = logger;
        _itemDbContext = itemDbContext;
    }

    // get method to retrieve items for a specific user
    [HttpGet("GetUserItems")]
    public async Task<IActionResult> GetUserItems(string email)
    {
        _logger.LogInformation("Attempting to find user with UserName: {Email}", email);

        // Finner brukeren basert på UserName (som inneholder e-postadressen)
        var user = await _itemDbContext.Users
                        .FirstOrDefaultAsync(u => u.UserName == email);

        // checking if user is found
        if (user == null)
        {
            _logger.LogWarning("User not found with UserName: {Email}", email);
            return NotFound($"User not found with username: {email}");
        }

        _logger.LogInformation("User found with UserName: {Email}, UserId: {UserId}", email, user.Id);

        // Henter items knyttet til brukerens ID direkte ved hjelp av ItemDbContext
        var items = await _itemDbContext.Items
                        .Where(i => i.UserId == user.Id)
                        .ToListAsync();

        // checking if items are found for the user
        if (!items.Any())
        {
            _logger.LogWarning("No items found for user with UserName: {Email}", email);
            return NotFound("No items found for this user");
        }

        // returning the items found
        _logger.LogInformation("{ItemCount} items found for user with UserName: {Email}", items.Count(), email);
        return Ok(items);
    }


    // get method to retrieve all items
    [HttpGet("GetAll")]
    public async Task<IActionResult> GetAll()
    {
        // getting all items
        var items = await _itemRepository.GetAll();
        if (items == null)
        {
            _logger.LogError("[ItemController] Item list not found while executing _itemRepository.GetAll()");
            return NotFound("Item list not found");
        }
        //return Json(items);
        return Ok(items);
    }

    // get method to retrieve a specific item by id
    [HttpGet("{id}")]
    public async Task<IActionResult> GetItemById(int id)
    {
        // finding the item by id
        var item = await _itemRepository.GetItemById(id);
        if (item == null)
        {
            return NotFound();
        }
        // returning the found item
        return Ok(item);
    }

    // post method for creating a new item
    // POST: api/Item/Create
    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromForm] Item item)
    {
        // validating the item
        if (!ModelState.IsValid)
        {
            _logger.LogError("Validation errors: {@ValidationErrors}", ModelState.Values.SelectMany(v => v.Errors));
            return BadRequest(ModelState);
        }

        // creating the item
        bool created = await _itemRepository.Create(item);
        if (!created)
        {
            _logger.LogError("Creation of item failed.");
            return StatusCode(500, "A problem happened while handling your request.");
        }

        // returning the created item
        return CreatedAtAction(nameof(GetItemById), new { id = item.ItemId }, item);
    }

    // put method for updating an existing item

    [HttpPut("Update/{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Item updatedItem)
    {
        // validating the updated item
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // checking if the id matches
        if (id != updatedItem.ItemId)
        {
            return BadRequest("Mismatched item ID.");
        }

        // updating the item
        try
        {
            var updateSuccessful = await _itemRepository.Update(updatedItem);
            if (!updateSuccessful)
            {
                return NotFound($"Item with id {id} not found.");
            }
            return Ok(updatedItem);
        }
        catch (Exception e)
        {
            // Log the error.
            _logger.LogError(e, "An unexpected error occurred.");
            return StatusCode(500, "An unexpected error occurred.");
        }
    }




    //DELETE: api/Item/Delete/"id"
    // Id til item skal stå istedenfor "id"
    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        // finding the item to delete
        var item = await _itemRepository.GetItemById(id);
        if (item == null)
        {
            return NotFound();
        }

        // deleting the item
        await _itemRepository.Delete(id);
        return NoContent();
    }

    [HttpPost("Upload")]
    public async Task<IActionResult> Upload(IFormFile file)
    {
        // checking if file is not null or empty
        if (file == null || file.Length == 0)
        {
            return BadRequest("No file uploaded.");
        }

        // setting up folders for storing the file
        var folderName = "images";
        var wwwRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
        var pathToSave = Path.Combine(wwwRootPath, folderName);
        var clientAppPath = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp/public", folderName);

        // creating directories if they don't exist
        if (!Directory.Exists(pathToSave))
        {
            Directory.CreateDirectory(pathToSave);
        }

        if (!Directory.Exists(clientAppPath))
        {
            Directory.CreateDirectory(clientAppPath);
        }

        // generating a unique file name
        var fileName = Path.GetFileNameWithoutExtension(file.FileName);
        var extension = Path.GetExtension(file.FileName);
        var uniqueFileName = $"{fileName}_{DateTime.Now.Ticks}{extension}";
        var filePath = Path.Combine(pathToSave, uniqueFileName);
        var newFilePath = Path.Combine(clientAppPath, uniqueFileName);
        var dbPath = Path.Combine(folderName, uniqueFileName); // This is the relative path

        // saving the file
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        // Move the file from wwwroot/images to ClientApp/public/images
        System.IO.File.Move(filePath, newFilePath);

        // Return the relative URL path to the uploaded file in wwwroot/images
        return Ok(new { imageUrl = "/" + dbPath.Replace("\\", "/") });
    }

    [HttpGet("Get/{id}")]
    public async Task<IActionResult> GetItemWithUserById(int id)
    {
        var itemWithUserName = await _itemRepository.GetItemWithUserName(id);
        if (itemWithUserName?.Item == null)
        {
            return NotFound($"Item with id {id} not found.");
        }

        return Ok(itemWithUserName);
    }

}