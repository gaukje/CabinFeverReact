﻿
using Microsoft.EntityFrameworkCore;
using CabinFeverReact.Models;

namespace CabinFeverReact.DAL;

// ItemRepository class that implements the IItemRepository interface
public class ItemRepository : IItemRepository
{
    private readonly ItemDbContext _db; // The database context for working with items

    private readonly ILogger<ItemRepository> _logger; // Logger for logging errors

    // Constructor for the ItemRepository, taking the ItemDbContext and logger as dependencies
    public ItemRepository(ItemDbContext db, ILogger<ItemRepository> logger)
    {
        _db = db;
        _logger = logger;
    }

    // Method to retrieve all items asynchronously
    public async Task<IEnumerable<Item>?> GetAll()
    {
        try
        {
            // Return all items by executing a ToListAsync operation on the Items DbSet
            return await _db.Items.ToListAsync();
        }
        catch (Exception e)
        {
            // Log any errors that occur during the operation and return null
            _logger.LogError("[ItemRepository] items ToListAsync() failed when GetAll(), error" +
                "message: {e}", e.Message);
            return null;
        }
    }

    // Method to retrieve an item by its ID asynchronously
    public async Task<Item?> GetItemById(int id)
    {
        try
        {
            // Find an item in the Items DbSet by its ID
            return await _db.Items.FindAsync(id);
        }
        catch (Exception e)
        {
            // Log any errors that occur during the operation and return null
            _logger.LogError("[ItemRepository] item FindAsync(id) failed when GetItemById for " +
                "Id {Id:0000}, error message; {e}", id, e.Message);
            return null;
        }

    }

    // Method to create a new item in the database asynchronously
    public async Task<bool> Create(Item item)
    {
        try
        {
            // Add the item to the Items DbSet
            _db.Items.Add(item);

            // Save the changes to the database
            await _db.SaveChangesAsync();

            // Return true to indicate the success of item creation
            return true;
        }
        catch (Exception e)
        {
            // Log any errors that occur during the operation and return false
            _logger.LogError("[ItemRepository] item creation failed for item {@item}" +
                "error message; {e}", item, e.Message);
            return false;
        }
    }

    // Method to update an item in the database asynchronously
    public async Task<bool> Update(Item item)
    {
        // Assuming that null-checking of 'item' is done outside of this method.

        var existingItem = await _db.Items.FindAsync(item.ItemId);
        if (existingItem == null)
        {
            // Log an appropriate message indicating the item was not found.
            _logger.LogError($"Item with id {item.ItemId} not found.");
            return false; // Item not found, no need to throw an exception.
        }

        // Copy the values from 'item' to 'existingItem' as needed.
        existingItem.Name = item.Name;
        existingItem.PricePerNight = item.PricePerNight;
        // ... copy other fields as necessary.

        try
        {
            await _db.SaveChangesAsync();
            return true; // Update successful.
        }
        catch (Exception e)
        {
            // Log the exception with as much detail as possible.
            _logger.LogError(e, $"An error occurred while updating the item with id {item.ItemId}.");
            throw; // Rethrow the exception to handle it in the controller.
        }
    }



    // Method to delete an item by its ID asynchronously
    public async Task<bool> Delete(int id)
    {
        try
        {
            var item = await _db.Items
                .Include(i => i.Orders) // Assuming `Orders` is a navigation property on `Item`
                .FirstOrDefaultAsync(i => i.ItemId == id);

            if (item == null)
            {
                _logger.LogError("[ItemRepository] Item not found for Id {Id}", id);
                return false;
            }

            // If there are related orders, you need to decide how to handle them.
            // For example, you could remove them or set their reference to null depending on your requirements.
            // Here's how you might remove them:
            foreach (var order in item.Orders.ToList())
            {
                _db.Orders.Remove(order);
            }

            _db.Items.Remove(item);
            await _db.SaveChangesAsync();

            return true;
        }
        catch (Exception e)
        {
            _logger.LogError("[ItemRepository] Error deleting item for Id {Id}: {Message}", id, e.Message);
            return false;
        }
    }


    // Method to retrieve orders for a specific user
    public async Task<IEnumerable<Order>> GetOrdersForUser(string userId)
    {
        // Query the Orders DbSet to retrieve orders for a specific user
        var orders = await _db.Orders
            .Where(o => o.UserId == userId)
            .ToListAsync();

        return orders;
    }
}