
using Microsoft.AspNetCore.Mvc;
using ReactBusinessDashboard.Api.Models;

namespace ReactBusinessDashboard.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private static readonly List<Order> Orders = new()
    {
        new Order
        {
            OrderId = "ORD-1001",
            CustomerName = "Olivia Martin",
            OrderDate = new DateOnly(2026, 10, 12),
            Amount = 245.00m,
            Status = "Completed"
        },
        new Order
        {
            OrderId = "ORD-1002",
            CustomerName = "James Wilson",
            OrderDate = new DateOnly(2026, 10, 11),
            Amount = 180.50m,
            Status = "Pending"
        },
        new Order
        {
            OrderId = "ORD-1003",
            CustomerName = "Sophia Brown",
            OrderDate = new DateOnly(2026, 10, 11),
            Amount = 320.00m,
            Status = "Completed"
        },
        new Order
        {
            OrderId = "ORD-1004",
            CustomerName = "Liam Taylor",
            OrderDate = new DateOnly(2026, 10, 10),
            Amount = 95.00m,
            Status = "Cancelled"
        },
        new Order
        {
            OrderId = "ORD-1005",
            CustomerName = "Isabella Lee",
            OrderDate = new DateOnly(2026, 10, 10),
            Amount = 410.25m,
            Status = "Completed"
        }
    };

    [HttpGet]
    public ActionResult<IEnumerable<Order>> GetOrders()
    {
        return Ok(Orders);
    }
}
