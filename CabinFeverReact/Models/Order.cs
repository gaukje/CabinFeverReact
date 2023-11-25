using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace CabinFeverReact.Models
{
    public class Order
    {
        [JsonPropertyName("OrderId")]
        public int OrderId { get; set; }

        [JsonPropertyName("OrderDate")]
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        [JsonPropertyName("TestUserId")]
        public string? TestUserId { get; set; }

        [JsonPropertyName("TestUser")]
        public virtual TestUser? TestUser { get; set; }

        [JsonPropertyName("TotalPrice")]
        public decimal TotalPrice { get; set; }

        [JsonPropertyName("ItemId")]
        public int ItemId { get; set; }

        [JsonPropertyName("Item")]
        public virtual Item? Item { get; set; }

        [JsonPropertyName("FromDate")]
        [Required(ErrorMessage = "Please select a From Date")]
        public DateTime FromDate { get; set; }

        [JsonPropertyName("ToDate")]
        [Required(ErrorMessage = "Please select a To Date")]
        public DateTime ToDate { get; set; }

        [JsonPropertyName("Guests")]
        [Required(ErrorMessage = "Please specify the number of guests")]
        [Range(1, int.MaxValue, ErrorMessage = "Number of guests must be at least 1")]
        public int Guests { get; set; }
    }
}
