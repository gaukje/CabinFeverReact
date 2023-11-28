using Xunit;
using Moq;
using CabinFeverReact.DAL;
using CabinFeverReact.Models;
using CabinFeverReact.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace XunitTestCabinFeverReact.Controllers
{
    public class ItemControllerTest
    {
        private readonly Mock<IItemRepository> _mockRepo;
        private readonly Mock<ILogger<ItemController>> _mockLogger;
        private readonly ItemController _controller;

        public ItemControllerTest()
        {
            _mockRepo = new Mock<IItemRepository>();
            _mockLogger = new Mock<ILogger<ItemController>>();
            _controller = new ItemController(_mockRepo.Object, _mockLogger.Object);
        }

        [Fact]
        public async Task GetAll_ItemsExist_ReturnsCorrectItems()
        {
            // Arrange
            var mockItems = new List<Item>
            {
                new Item { ItemId = 1, Name = "Test Item 1", PricePerNight = 100 },
                new Item { ItemId = 2, Name = "Test Item 2", PricePerNight = 200 }
            };
            _mockRepo.Setup(repo => repo.GetAll()).ReturnsAsync(mockItems);

            // Act
            var result = await _controller.GetAll();

            // Assert
            var actionResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<List<Item>>(actionResult.Value);
            Assert.Equal(mockItems.Count, returnValue.Count);
        }

        [Fact]
        public async Task GetAll_NoItems_ReturnsNotFound()
        {
            // Arrange
            _mockRepo.Setup(repo => repo.GetAll()).ReturnsAsync(() => null);

            // Act
            var result = await _controller.GetAll();

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public async Task Create_ValidItem_ReturnsCreatedAtAction()
        {
            // Arrange
            var newItem = new Item { Name = "New Test Item", PricePerNight = 100 };
            _mockRepo.Setup(repo => repo.Create(newItem)).ReturnsAsync(true);

            // Act
            var result = await _controller.Create(newItem);

            // Assert
            var actionResult = Assert.IsType<CreatedAtActionResult>(result);
            var returnValue = Assert.IsType<Item>(actionResult.Value);
            Assert.Equal(newItem.Name, returnValue.Name);
        }

        [Fact]
        public async Task Create_InvalidItem_ReturnsBadRequest()
        {
            // Arrange
            var newItem = new Item { Name = "New Test Item", PricePerNight = 100 };
            _controller.ModelState.AddModelError("Name", "The Name field is required.");

            // Act
            var result = await _controller.Create(newItem);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async Task Update_ItemExists_ReturnsUpdatedItem()
        {
            // Arrange
            var existingItem = new Item { ItemId = 1, Name = "Original Item", PricePerNight = 100 };
            var updatedItem = new Item { ItemId = 1, Name = "Updated Item", PricePerNight = 150 };
            _mockRepo.Setup(repo => repo.GetItemById(existingItem.ItemId)).ReturnsAsync(existingItem);
            _mockRepo.Setup(repo => repo.Update(updatedItem)).ReturnsAsync(true);

            // Act
            var result = await _controller.Update(existingItem.ItemId, updatedItem);

            // Assert
            var actionResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<Item>(actionResult.Value);
            Assert.Equal(updatedItem.Name, returnValue.Name);
            Assert.Equal(updatedItem.PricePerNight, returnValue.PricePerNight);
        }

        [Fact]
        public async Task Update_ItemDoesNotExist_ReturnsNotFound()
        {
            // Arrange
            var updatedItem = new Item { ItemId = 1, Name = "Updated Item", PricePerNight = 150 };
            _mockRepo.Setup(repo => repo.GetItemById(updatedItem.ItemId)).ReturnsAsync((Item)null);

            // Act
            var result = await _controller.Update(updatedItem.ItemId, updatedItem);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Delete_ItemExists_ReturnsNoContent()
        {
            // Arrange
            var existingItemId = 1;
            _mockRepo.Setup(repo => repo.GetItemById(existingItemId)).ReturnsAsync(new Item { ItemId = existingItemId });
            _mockRepo.Setup(repo => repo.Delete(existingItemId)).ReturnsAsync(true);

            // Act
            var result = await _controller.Delete(existingItemId);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task Delete_ItemDoesNotExist_ReturnsNotFound()
        {
            // Arrange
            var nonExistingItemId = 1;
            _mockRepo.Setup(repo => repo.GetItemById(nonExistingItemId)).ReturnsAsync((Item)null);

            // Act
            var result = await _controller.Delete(nonExistingItemId);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
    }
}
