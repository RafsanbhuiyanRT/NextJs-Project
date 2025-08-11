namespace EventryApi.Model.Entity;
#nullable disable
public class RefreshToken
{
    public Guid Id { get; set; }
    public string UserId { get; set; }
    public DateTime ExpireTime { get; set; }
}
