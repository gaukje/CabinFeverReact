using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace CabinFeverReact.Models
{
    // represents the orders made by users
    public class Order
    {
        // unique identifier for each order
        [JsonPropertyName("OrderId")]
        public int OrderId { get; set; }

        // the date when the order was made
        [JsonPropertyName("OrderDate")]
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        // id of the user who made the order
        [JsonPropertyName("UserId")]
        public string? UserId { get; set; }

        // reference to the user who made the order
        [JsonPropertyName("User")]
        public virtual User? User { get; set; }

        // total price of the order
        [JsonPropertyName("TotalPrice")]
        public decimal TotalPrice { get; set; }

        // id of the item being ordered
        [JsonPropertyName("ItemId")]
        public int ItemId { get; set; }

        // reference to the item being ordered
        [JsonPropertyName("Item")]
        public virtual Item? Item { get; set; }

        // start date for the order
        [JsonPropertyName("FromDate")]
        [Required(ErrorMessage = "Please select a From Date")]
        public DateTime FromDate { get; set; }

        // end date for the order
        [JsonPropertyName("ToDate")]
        [Required(ErrorMessage = "Please select a To Date")]
        public DateTime ToDate { get; set; }

        // number of guests included in the order
        [JsonPropertyName("Guests")]
        [Required(ErrorMessage = "Please specify the number of guests")]
        [Range(1, int.MaxValue, ErrorMessage = "Number of guests must be at least 1")]
        public int Guests { get; set; }
    }
}
