
using Microsoft.EntityFrameworkCore;
using ReactBusinessDashboard.Api.Models;

namespace ReactBusinessDashboard.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Order> Orders => Set<Order>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(order => order.OrderId);

            entity.Property(order => order.Amount)
                .HasPrecision(18, 2);
        });
    }
}
