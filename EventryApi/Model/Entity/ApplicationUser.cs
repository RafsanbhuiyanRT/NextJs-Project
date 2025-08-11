using Microsoft.AspNetCore.Identity;
#nullable disable
namespace EventryApi.Model.Entity;

public class ApplicationUser : IdentityUser
{
    public DateTime RegistrationDate { get; set; }
    public string Name { get; set; }
    public string UserAvatar { get; set; }
    
}
