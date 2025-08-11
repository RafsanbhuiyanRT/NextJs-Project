namespace EventryApi.Model.ViewModel;
#nullable disable
public class LoginResponseVm
{
    public string UserName { get; set; }
    public string AccessToken { get; set; }
    public int ExpireIn { get; set; }
    public string RefreshToken { get; set; }
}
