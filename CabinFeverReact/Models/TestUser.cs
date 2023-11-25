using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CabinFeverReact.Models
{
    public class TestUser
    {
        [Key]
        public string TestUserId { get; set; }

        public string Name { get; set; }

        public string Password { get; set; }

        // Navigasjonsegenskap for Items
        public virtual ICollection<Item> Items { get; set; } = new List<Item>();

        // Navigasjonsegenskap for Orders
        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

        // Parameterløs konstruktør
        public TestUser() { }
    }
}
