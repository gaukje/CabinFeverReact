using Microsoft.AspNetCore.Identity;

namespace CabinFeverReact.Models
{
    public class User : IdentityUser // Extending IdentityUser
    {
        // Add your custom properties here
        // Example: public string FullName { get; set; }
        public string FullName { get; set; } = string.Empty; // Initialized to an empty string


        // Navigation properties
        public virtual ICollection<Item> Items { get; set; }
        public virtual ICollection<Order> Orders { get; set; }

        // Constructor to initialize the collections
        public User() : base()
        {
            Items = new HashSet<Item>();
            Orders = new HashSet<Order>();
        }
    }
}
