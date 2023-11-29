namespace CabinFeverReact.Models
{
    // This class represents a data structure that combines an Item with its associated User's UserName
    public class ItemWithUserName
    {
        // Property to hold the Item object
        public Item Item { get; set; }

        // Property to hold the UserName of the User associated with the Item
        public string UserName { get; set; }
    }
}
