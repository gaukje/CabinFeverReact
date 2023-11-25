using CabinFeverReact.Models;
using Microsoft.EntityFrameworkCore;

namespace CabinFeverReact.DAL;

public class DBInit
{
    // This method is responsible for seeding initial data into the database.
    public static void Seed(IApplicationBuilder app, ILogger<DBInit> logger)
    {
        using var serviceScope = app.ApplicationServices.CreateScope();
        ItemDbContext context = serviceScope.ServiceProvider.GetRequiredService<ItemDbContext>();

        // Ensure the database is created.
        context.Database.EnsureCreated();

        // Add TestUsers if they don't exist.
        if (!context.TestUsers.Any())
        {
            var testUsers = new List<TestUser>
            {
                new TestUser { TestUserId = "1", Name = "TestUser1", Password = "passORD1!" },
                new TestUser { TestUserId = "2", Name = "TestUser2", Password = "passORD2!" }
            };

            context.TestUsers.AddRange(testUsers);
            context.SaveChanges();
        }

        // Add items if they don't exist.
        if (!context.Items.Any())
        {
            // Henter TestUser-objektene fra databasen
            var testUser1 = context.TestUsers.FirstOrDefault(u => u.TestUserId == "1");
            var testUser2 = context.TestUsers.FirstOrDefault(u => u.TestUserId == "2");

            var items = new List<Item>
    {
        new Item
        {
            Name = "Oslomarka",
            PricePerNight = 2000,
            Description = "The most outstanding cabin in the heart of Norway.",
            ImageUrl = "/images/hytte_stock_1.jpg",
            TestUserId = testUser1?.TestUserId, // Her refererer du til TestUser
            Capacity = 4,
            Location = "Oslo"
        },

                new Item
                {
                    Name = "Haugesund",
                    PricePerNight = 3000,
                    Description = "Nothing else like the coziest cabin in Haugesund perfect for a romantic get away.",
                    ImageUrl = "/images/hytte_stock_2.jpg",
                    TestUserId = testUser1?.TestUserId,
                    Capacity = 2,
                    Location = "Vestland"
                },

                new Item
                {
                    Name = "Geilo",
                    PricePerNight = 4000,
                    Description = "Have an unforgettable night with the family in this memorable viking cabin.",
                    ImageUrl = "/images/hytte_stock_3.jpg",
                    TestUserId = testUser1?.TestUserId,
                    Capacity = 7,
                    Location = "Viken"
                },

                new Item
                {
                    Name = "Jotunheimen",
                    PricePerNight = 2400,
                    Description = "Nelson Mandelas favorite cabin in Norway, RIP.",
                    ImageUrl = "/images/hytte_stock_4.jpg",
                    TestUserId = testUser2?.TestUserId,
                    Capacity = 5,
                    Location = "Innlandet"
                },
                new Item
                {
                    Name = "Kristiansand",
                    PricePerNight = 3900,
                    Description = "Idyllic cabin in Kristiansand right by the animal park, for the kids. Greate for a family trip you'll never forget. ",
                    ImageUrl = "/images/hytte_stock_13.jpg",
                    TestUserId = testUser2?.TestUserId,
                    Capacity = 5,
                    Location = "Agder"
                },new Item
                {
                    Name = "Husøy",
                    PricePerNight = 6700,
                    Description = "At the top of the Husøy mountains you will find this beauty of a cabin, bring your friends and make this a trip you will never forget.",
                    ImageUrl = "/images/hytte_stock_14.jpg",
                    TestUserId = testUser2?.TestUserId,
                    Capacity = 5,
                    Location = "Troms"
                },
            };
            logger.LogInformation("Logging some information here");
            logger.LogInformation("DBINIT Items som legges i databasen:");
            foreach (var item in items)
            {
                logger.LogInformation($"Name: {item.Name}, PricePerNight: {item.PricePerNight}, Description: {item.Description}, ImageUrl: {item.ImageUrl}, UserId: {item.TestUserId}, Capacity: {item.Capacity}, Location: {item.Location}");
            }
            context.AddRange(items);
            context.SaveChanges();
        }

        //if (!context.ItemAvailability.Any())
        //{
        //    // Add item availabilities if they don't exist.
        //    var startDate = DateTime.Now;
        //    var endDate = startDate.AddDays(60); // 60 days from now

        //    var itemAvailabilities = new List<ItemAvailability>();

        //    foreach (var item in context.Items)
        //    {
        //        for (var date = startDate; date < endDate; date = date.AddDays(1))
        //        {
        //            var isAvailable = true;

        //            // Example: Make items unavailable on random days.
        //            if (date.DayOfWeek == DayOfWeek.Friday && new Random().Next(2) == 0) // 50% sjanse for at en fredag er utilgjengelig
        //            {
        //                // 50% chance for an item to be unavailable on a Friday.
        //                isAvailable = false;
        //            }

        //            itemAvailabilities.Add(new ItemAvailability
        //            {
        //                Date = date,
        //                IsAvailable = isAvailable,
        //                ItemId = item.ItemId
        //            });
        //        }
        //    }

        //    context.AddRange(itemAvailabilities);
        //    context.SaveChanges();
        //}

        //// Add orders if they don't exist.
        //if (!context.Orders.Any())
        //{
        //    var user1Id = userManager.FindByEmailAsync("user1@example.com").Result.Id;
        //    var user2Id = userManager.FindByEmailAsync("user2@example.com").Result.Id;
        //    var orders = new List<Order>
        //    {
        //        new Order
        //        {
        //            OrderDate = DateTime.UtcNow,  // Use UTC timestamp
        //            TotalPrice = 4000,
        //            ItemId = 1,
        //            FromDate = DateTime.UtcNow,  // Use UTC timestamp
        //            ToDate = DateTime.UtcNow.AddDays(5),  // Use UTC timestamp
        //            UserId = user1Id,
        //            Guests = 2
        //        },
        //        new Order
        //        {
        //            OrderDate = DateTime.UtcNow,  // Use UTC timestamp
        //            TotalPrice = 3000,
        //            ItemId = 2,
        //            FromDate = DateTime.UtcNow,  // Use UTC timestamp
        //            ToDate = DateTime.UtcNow.AddDays(3),  // Use UTC timestamp
        //            UserId = user2Id,
        //            Guests = 4
        //        },
        //        new Order
        //        {
        //            OrderDate = DateTime.UtcNow,  // Use UTC timestamp
        //            TotalPrice = 5000,
        //            ItemId = 2,
        //            // Set FromDate to a date in the past (e.g., 5 days ago)
        //            FromDate = DateTime.UtcNow.AddDays(-5),  // Use UTC timestamp
        //            // Set ToDate to a date in the past (e.g., 2 days ago)
        //            ToDate = DateTime.UtcNow.AddDays(-2),  // Use UTC timestamp
        //            UserId = user2Id,
        //            Guests = 3
        //        },
        //        new Order
        //        {
        //            OrderDate = DateTime.UtcNow,  // Use UTC timestamp
        //            TotalPrice = 9500,
        //            ItemId = 2,
        //            // Set FromDate to a future date (e.g., 5 days from now)
        //            FromDate = DateTime.UtcNow.AddDays(5),  // Use UTC timestamp
        //            // Set ToDate to a future date (e.g., 8 days from now)
        //            ToDate = DateTime.UtcNow.AddDays(8),  // Use UTC timestamp
        //            UserId = user1Id,
        //            Guests = 5
        //        },
        //    };
        //    context.AddRange(orders);
        //    context.SaveChanges();

        //}

    }
}