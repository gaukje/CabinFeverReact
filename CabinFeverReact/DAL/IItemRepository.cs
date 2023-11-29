using CabinFeverReact.Models;

namespace CabinFeverReact.DAL;
public interface IItemRepository
{
    Task<IEnumerable<Item>?> GetAll();  // Method to get all items as an asynchronous operation
    Task<Item?> GetItemById(int id);   // Method to get an item by ID as an asynchronous operation
    Task<bool> Create(Item item);     // Method to create an item as an asynchronous operation
    Task<bool> Update(Item item);    // Method to update an item as an asynchronous operation
    Task<bool> Delete(int id);      // Method to delete an item by ID as an asynchronous operation
    Task<IEnumerable<Order>> GetOrdersForUser(string userId); // Method to get orders for a user based on their user ID as an asynchronous operation
    Task<IEnumerable<Item>> GetItemsByUserId(string userId); // Retrieves all items associated with a given user ID as an asynchronous operation
    Task<ItemWithUserName> GetItemWithUserName(int itemId); // Fetches an item along with the associated user's name by item ID as an asynchronous operation
}
