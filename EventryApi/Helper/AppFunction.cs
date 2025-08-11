using System.Net;
using System.Net.Sockets;

namespace Facebook.Helper;

public static class AppFunction
{
    public static DateTime BDDateTime()
    {
        DateTime utcTime = DateTime.UtcNow;
        TimeZoneInfo BdZone = TimeZoneInfo.FindSystemTimeZoneById("Bangladesh Standard Time");
        DateTime localDateTime = TimeZoneInfo.ConvertTimeFromUtc(utcTime, BdZone);
        return localDateTime;
    }
    private static string GetLocalIpAddress()
    {
        var host = Dns.GetHostEntry(Dns.GetHostName());
        foreach (var ip in host.AddressList)
        {
            if (ip.AddressFamily == AddressFamily.InterNetwork)           
                return ip.ToString();           
        }
        throw new Exception("No network adapters with an IPv4 address in the system!");
    }
    public static string GetRemoteIpAddress(HttpRequest request)
    {
        string ip = "::1";
        if (request is not null)
            ip = request.HttpContext.Connection.RemoteIpAddress.ToString();
        
        if (ip == "::1")      
            ip = GetLocalIpAddress();
        
        return ip;
    }
}
