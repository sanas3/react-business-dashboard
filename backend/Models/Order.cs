
using System.ComponentModel.DataAnnotations;

namespace ReactBusinessDashboard.Api.Models;

public class Order
{
    [Required]
    [StringLength(20)]
    public string OrderId { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string CustomerName { get; set; } = string.Empty;

    public DateOnly OrderDate { get; set; }

    [Range(0, 100000000)]
    public decimal Amount { get; set; }

    [Required]
    [RegularExpression("^(Completed|Pending|Cancelled)$")]
    public string Status { get; set; } = "Pending";
}
