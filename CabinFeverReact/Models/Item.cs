using System.Text.Json.Serialization;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace CabinFeverReact.Models;

// this class represents the items in the system
public class Item
{
    // unique identifier for each item
    [JsonPropertyName("ItemId")]
    public int ItemId { get; set; }

    // name of the cabin with validation for character type and length
    [JsonPropertyName("Name")]
    [RegularExpression(@"[0-9a-zA-ZæøåÆØÅ. \-]{2,20}", ErrorMessage = "The Name must be numbers or letters and between 2 to 20 characters.")]
    [Display(Name = "Cabin name")]
    public string Name { get; set; } = string.Empty;

    // price per night for the cabin with a minimum value
    [JsonPropertyName("Price")]
    [Required]
    [Range(0.01, double.MaxValue, ErrorMessage = "The Price must be greater than 0.")]
    public decimal PricePerNight { get; set; }

    // capacity of the cabin with a minimum value
    [JsonPropertyName("Capacity")]
    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "The Capacity must be greater than 0.")]
    public int Capacity { get; set; }

    // description of the cabin
    [JsonPropertyName("Description")]
    [Required]
    [StringLength(5000)]
    public string? Description { get; set; }

    // county where the cabin is located
    [JsonPropertyName("Fylke")]
    public string? Fylke { get; set; }

    // exact location of the cabin
    [JsonPropertyName("Location")]
    [Required]
    public string? Location { get; set; }

    // image url for the cabin
    [JsonPropertyName("ImageUrl")]
    [Required]
    public string? ImageUrl { get; set; }

    // availability status of the cabin
    [JsonPropertyName("IsAvailable")]
    public bool? IsAvailable { get; set; }

    // id of the user who owns the cabin
    [JsonPropertyName("UserId")]
    public string? UserId { get; set; }

    // reference to the user who owns the cabin
    [JsonPropertyName("User")]
    public virtual User? User { get; set; }

    // collection of orders for the cabin
    [JsonPropertyName("Orders")]
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    // collection of available dates for the cabin
    [JsonPropertyName("ItemAvailabilities")]
    public virtual ICollection<ItemAvailability> ItemAvailabilities { get; set; } = new List<ItemAvailability>();
}

