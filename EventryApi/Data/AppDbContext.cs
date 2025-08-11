using EventryApi.Model.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EventryApi.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options)
    : IdentityDbContext<ApplicationUser, IdentityRole, string>(options)
{
    public DbSet<LoginLog> LoginLog { get; set; }
    public DbSet<RefreshToken> RefreshToken { get; set; }
    public DbSet<Interested> Interested { get; set; }
    public DbSet<Participants> Participants { get; set; }
    public DbSet<SwagList> SwagList { get; set; }
    public DbSet<Events> Events { get; set; }

}
