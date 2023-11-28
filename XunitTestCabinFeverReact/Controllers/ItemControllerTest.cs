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

        // Tests that 'GetAll' returns a list of items when items exist in the repository
        [Fact]
        public async Task GetAll_ItemsExist_ReturnsCorrectItems()
        {
            // Mock repository to return a list of items and then call GetAll
            //Verify the results is 'OkObjectResult' and contains the correct number of the items

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

        //Tests that 'GetAll' returns a 'NotFound' result when no itemns are in the repo
        [Fact]
        public async Task GetAll_NoItems_ReturnsNotFound()
        {
            // Set up repo to return null and then call GetAll
            //Verify the result is 'NotFoundObjectResult'
            _mockRepo.Setup(repo => repo.GetAll()).ReturnsAsync(() => null);

            // Act
            var result = await _controller.GetAll();

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

        // Tests that 'Create' returns a 'CreatedAtAction' result when a valid item is created
        // Verify the result is 'CreatedAtActionResult' and the returned item matches the input

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

        //Test that 'Create' returns a 'BadRequest' result when model validation 
        [Fact]
        public async Task Create_InvalidItem_ReturnsBadRequest()
        {
            // Introduce a model state error and then call Create with an invalid item
            //Verify the result is 'BadRequestObjectrESULT'

            var newItem = new Item { Name = "New Test Item", PricePerNight = 100 };
            _controller.ModelState.AddModelError("Name", "The Name field is required.");

            // Act
            var result = await _controller.Create(newItem);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        //test that 'Update' modifies an exsiting item and returns the updated item
        [Fact]
        public async Task Update_ItemExists_ReturnsUpdatedItem()
        {
            // Mock repo with an existing item and simulate successful update
            //Call update and verify the result is 'OkObjectResult' with the updated item

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

        // Tests that 'Update' returns 'NotFound' when attempting to update a non-existing item.
        [Fact]
        public async Task Update_ItemDoesNotExist_ReturnsNotFound()
        {
            // Setup mock repository to return null for a non-existing item.
            // Call Update and verify the result is 'NotFoundResult'.

            var updatedItem = new Item { ItemId = 1, Name = "Updated Item", PricePerNight = 150 };
            _mockRepo.Setup(repo => repo.GetItemById(updatedItem.ItemId)).ReturnsAsync((Item)null);

            // Act
            var result = await _controller.Update(updatedItem.ItemId, updatedItem);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        // Tests that 'Delete' successfully removes an existing item and returns no content.
        [Fact]
        public async Task Delete_ItemExists_ReturnsNoContent()
        {
            // Setup mock repository with an existing item and simulate successful deletion.
            // Call Delete and verify the result is 'NoContentResult'.

            var existingItemId = 1;
            _mockRepo.Setup(repo => repo.GetItemById(existingItemId)).ReturnsAsync(new Item { ItemId = existingItemId });
            _mockRepo.Setup(repo => repo.Delete(existingItemId)).ReturnsAsync(true);

            // Act
            var result = await _controller.Delete(existingItemId);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        // Tests that 'Delete' returns 'NotFound' when attempting to delete a non-existing item.
        [Fact]
        public async Task Delete_ItemDoesNotExist_ReturnsNotFound()
        {
            // Setup mock repository to return null for a non-existing item.
            // Call Delete and verify the result is 'NotFoundResult'.

            var nonExistingItemId = 1;
            _mockRepo.Setup(repo => repo.GetItemById(nonExistingItemId)).ReturnsAsync((Item)null);

            // Act
            var result = await _controller.Delete(nonExistingItemId);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
    }
}