namespace EventryApi.Model.Entity;
#nullable disable
public class LoginLog
{
    public long Id { get; set; }
    public DateTime LoginTime { get; set; }
    public string Email { get; set; }
    public string Msg { get; set; }
    public string IpAddress { get; set; }
}
