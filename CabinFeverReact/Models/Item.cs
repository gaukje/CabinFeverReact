using System.Text.Json.Serialization;

namespace CabinFeverReact.Models;

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace CabinFeverReact.Models
{
    public class Item
    {
        [JsonPropertyName("ItemId")]
        public int ItemId { get; set; }

        [JsonPropertyName("Name")]
        [RegularExpression(@"[0-9a-zA-ZæøåÆØÅ. \-]{2,20}", ErrorMessage = "The Name must be numbers or letters and between 2 to 20 characters.")]
        [Display(Name = "Cabin name")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("Price")]
        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "The Price must be greater than 0.")]
        public decimal PricePerNight { get; set; }

        [JsonPropertyName("FromDate")]
        [Display(Name = "From Date")]
        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Please select a From Date.")]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime FromDate { get; set; }

        [JsonPropertyName("ToDate")]
        [Display(Name = "To Date")]
        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Please select a To Date.")]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime ToDate { get; set; }

        [JsonPropertyName("Capacity")]
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "The Capacity must be greater than 0.")]
        public int Capacity { get; set; }

        [JsonPropertyName("Description")]
        [Required]
        [StringLength(5000)]
        public string? Description { get; set; }

        [JsonPropertyName("Fylke")]
        public string? Fylke { get; set; }

        [JsonPropertyName("Location")]
        [Required]
        public string? Location { get; set; }

        [JsonPropertyName("ImageUrl")]
        [Required]
        public string? ImageUrl { get; set; }

        [JsonPropertyName("IsAvailable")]
        public bool? IsAvailable { get; set; }

        [JsonPropertyName("UserId")]
        public string? UserId { get; set; }

        [JsonPropertyName("User")]
        public virtual IdentityUser? User { get; set; }

        [JsonPropertyName("Orders")]
        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

        [JsonPropertyName("ItemAvailabilities")]
        public virtual ICollection<ItemAvailability> ItemAvailabilities { get; set; } = new List<ItemAvailability>();
    }
}

