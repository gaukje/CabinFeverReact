using CabinFeverReact.DAL;
using CabinFeverReact.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]

// handles order-related functionalities
public class OrderController : Controller
{
    // database context and logger for managing orders and logging
    private readonly ItemDbContext _itemDbContext;
    private readonly ILogger<OrderController> _logger;

    // constructor to initialize the database context and logger
    public OrderController(ItemDbContext itemDbContext, ILogger<OrderController> logger)
    {
        _itemDbContext = itemDbContext;
        _logger = logger;
    }

    // test endpoint to check if the controller is working
    [HttpGet("Test")]
    public IActionResult TestEndpoint()
    {
        return Ok("Test endpoint reached");
    }

    // get method to retrieve all orders
    // GET: api/Order/GetAll
    [HttpGet("GetAll")]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            _logger.LogInformation("Order before saving: {@Order}");
            // getting all orders from database
            var orders = await _itemDbContext.Orders
                .Select(order => new
                {
                    order.OrderId,
                    order.OrderDate,
                    order.UserId,
                    // User = order.User, // Du kan velge å sende spesifikke brukerdata hvis nødvendig
                    order.TotalPrice,
                    order.ItemId,
                    // Item = order.Item, // Du kan velge å sende spesifikke item-data hvis nødvendig
                    order.FromDate,
                    order.ToDate,
                    order.Guests
                })
                .ToListAsync();

            // checking if orders are found
            if (!orders.Any())
            {
                _logger.LogWarning("No orders found.");
                return NotFound("No orders found.");
            }

            // returning the list of orders
            return Ok(orders);
        }
        catch (System.Exception ex)
        {
            // logging the error
            _logger.LogError(ex, "An error occurred while getting orders.");
            return StatusCode(500, "Internal server error");
        }
    }

    // post method for creating a new order
    // POST: api/Order/Create
    [HttpPost("Create")]
    public async Task<IActionResult> CreateOrder([FromBody] Order newOrder)
    {
        try
        {
            // adding the new order to the database
            _itemDbContext.Orders.Add(newOrder);
            await _itemDbContext.SaveChangesAsync();
            return Ok(newOrder); 
        }
        catch (System.Exception ex)
        {
            // logging the error
            _logger.LogError(ex, "An error occurred while creating the order.");
            return StatusCode(500, "Internal server error");
        }
    }


    // Action method to retriece date ranges for a specific item.
    [HttpGet("GetDateRange")]
    public IActionResult GetDateRange(int itemId)
    {
        // Retrieving date ranges from the database based on the item ID
        var dateRanges = _itemDbContext.Orders.Where(order => order.ItemId == itemId && order.ToDate >= DateTime.Today)
            .Select(order => new { order.FromDate, order.ToDate })
            .ToList();

        // Creating a list of date strings from the retrieved date ranges
        var dateList = new List<String>();

        foreach (var dateRange in dateRanges)
        {
            for (var date = dateRange.FromDate; date <= dateRange.ToDate; date = date.AddDays(1))
            {
                var stringDate = date.ToString("yyyy-MM-dd");
                dateList.Add(stringDate);
            }
        }

        // Returning the dateList as JSON
        return Ok(dateList);
    }

    // get method to retrieve orders for a specific user by userId
    // GET: api/Order/GetUserOrders/{userId}
    [HttpGet("GetUserOrders/{userId}")]
    public async Task<IActionResult> GetUserOrders(string userId)
    {
        try
        {
            // getting orders for the specified user
            var orders = await _itemDbContext.Orders
                .Where(o => o.UserId == userId)
                .Select(order => new
                {
                    order.OrderId,
                    order.OrderDate,
                    order.UserId,
                    order.TotalPrice,
                    order.ItemId,
                    order.FromDate,
                    order.ToDate,
                    order.Guests
                })
                .ToListAsync();

            // checking if orders are found
            if (!orders.Any())
            {
                _logger.LogWarning("No orders found for user: {UserId}", userId);
                return NotFound($"No orders found for user: {userId}");
            }

            // returning the user's orders
            return Ok(orders);
        }
        catch (System.Exception ex)
        {
            _logger.LogError(ex, "An error occurred while getting orders for user: {UserId}", userId);
            return StatusCode(500, "Internal server error");
        }
    }

    // get method to retrieve orders for a specific user by email
    // GET: api/Order/GetUserOrdersByEmail
    [HttpGet("GetUserOrdersByEmail")]
    public async Task<IActionResult> GetUserOrdersByEmail(string email)
    {
        try
        {
            // finding the user by email
            var user = await _itemDbContext.Users
                            .FirstOrDefaultAsync(u => u.UserName == email); // Endret fra Email til UserName

            // checking if user is found
            if (user == null)
            {
                // logging a warning if user is not found
                _logger.LogWarning("User not found with username: {Email}", email);
                return NotFound($"User not found with username: {email}");
            }

            // retrieving orders from the database for the found user
            var orders = await _itemDbContext.Orders
                .Where(o => o.UserId == user.Id)
                .Include(o => o.Item)
                .Select(order => new
                {
                    order.OrderId,
                    order.OrderDate,
                    order.UserId,
                    order.TotalPrice,
                    order.ItemId,
                    order.FromDate,
                    order.ToDate,
                    order.Guests,
                    ItemName = order.Item.Name
                })
                .ToListAsync();

            // checking if any orders are found for the user
            if (!orders.Any())
            {
                // logging a warning if no orders are found
                _logger.LogWarning("No orders found for user: {Email}", email);
                return NotFound($"No orders found for user with username: {email}");
            }

            // returning the orders found for the user
            return Ok(orders);
        }
        catch (System.Exception ex)
        {
            // logging the error if there's an exception
            _logger.LogError(ex, "An error occurred while getting orders for user: {Email}", email);
            return StatusCode(500, "Internal server error");
        }
    }
}
