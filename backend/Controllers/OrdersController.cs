
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactBusinessDashboard.Api.Data;
using ReactBusinessDashboard.Api.Models;

namespace ReactBusinessDashboard.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrdersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
    {
        var orders = await _context.Orders
            .AsNoTracking()
            .OrderBy(order => order.OrderId)
            .ToListAsync();

        return Ok(orders);
    }
}
