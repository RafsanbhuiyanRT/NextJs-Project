using EventryApi.Data;
using EventryApi.Model.Entity;
using EventryApi.Model.ViewModel;
using Facebook.Helper;
using Facebook.Model.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

namespace EventryApi.Controllers;
[Route("api/[controller]")]
[ApiController]
public class AccountController(UserManager<ApplicationUser> userManager,
    RoleManager<IdentityRole> roleManager, AppDbContext db,
    SignInManager<ApplicationUser> signInManager,
    IWebHostEnvironment hostEnvironment, IConfiguration config) : ControllerBase
{
    private readonly AppDbContext _db = db;
    private readonly UserManager<ApplicationUser> _userManager = userManager;
    private readonly RoleManager<IdentityRole> _roleManager = roleManager;
    private readonly SignInManager<ApplicationUser> _signInManager = signInManager;
    private readonly IWebHostEnvironment _webHostEnvironment = hostEnvironment;
    private readonly IConfiguration _config = config;


    [AllowAnonymous]
    [HttpPost("Login")]
    public async Task<ActionResult> Login(LoginVm vm)
    {
        var response = new ErrorVm();
        await _signInManager.SignOutAsync();
        var user = await _userManager.FindByEmailAsync(vm.Email!);
        var log = new LoginLog
        {
            LoginTime = AppFunction.BDDateTime(),
            Email = vm.Email,
            IpAddress = AppFunction.GetRemoteIpAddress(Request),
            Msg = "Try to login"
        };
        _db.LoginLog.Add(log);
        await _db.SaveChangesAsync();

        if (user is null)
        {
            log.Msg = "User not fund";
            _db.LoginLog.Update(log);
            _db.SaveChanges();
            response.Status = "Error";
            response.Message = log.Msg;
            return Unauthorized(response);
        }
        var result = await _userManager.CheckPasswordAsync(user, vm.Password!);

        if (!result)
        {
            log.Msg = "password validation faild";
            _db.LoginLog.Update(log);
            _db.SaveChanges();
            response.Status = "Error";
            response.Message = "Username/Password is incorrect";
            return Unauthorized(response);
        }
        response.Status = "Success";
        response.Message = "Successfully Login.";
        log.Msg = "Login Successfully!";
        _db.LoginLog.Update(log);
        _db.SaveChanges();

        var userData = new UserVm()
        {
            Id = user.Id,
            Name = user.Name,
            Avatar = user.UserAvatar,
            Email = user.Email,
        };

        var tokenResponse = new TokenResponseVm()
        {
            Token = await GetJwtToken(user),
            RefrishToken = await GenerateRefreshToken(user),
        };

        return Ok(new {userData, response});
    }

    [AllowAnonymous]
    [HttpPost("Register")]
    public async Task<ActionResult> Register(RegisterVm vm)
    {
        var response = new ErrorVm();
        var userName = await _userManager.FindByNameAsync(vm.UserName);
        var userEmail = await _userManager.FindByEmailAsync(vm.Email);

        if (userName is not null)
        {
            response.Message = "User name already exist";
            return Unauthorized(response);
        }
        if (userEmail is not null)
        {
            response.Message = "Email already exist";
            return Unauthorized(response);
        }

        var user = new ApplicationUser()
        {
            UserName = vm.UserName,
            Email = vm.Email,
            EmailConfirmed = true,
            SecurityStamp = Guid.NewGuid().ToString("D") + 1,
            Name = vm.Name,
            RegistrationDate = AppFunction.BDDateTime()
        };
        IdentityResult userCreateResult = await _userManager.CreateAsync(user, vm.Password);
        if (userCreateResult.Succeeded)
        {
            await _userManager.AddToRoleAsync(user, "User");
            response.Status = userCreateResult.ToString();
            response.Message = "Registration Successful";
            return Ok(response);
        }

        response.Status = "Error";
        response.Message = userCreateResult.ToString();
        return Ok(response);
    }
    private async Task<string> GetJwtToken(ApplicationUser user)
    {
        var userRoles = await _userManager.GetRolesAsync(user);
        var authClaims = new List<Claim>
           {
               new Claim(JwtRegisteredClaimNames.Sub, user.UserName!),
               new Claim("Role", JsonSerializer.Serialize(userRoles.ToArray()).ToString()),
               new Claim(JwtRegisteredClaimNames.Jti , Guid.NewGuid().ToString()),
         };
        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Secret"]!));

        var token = new JwtSecurityToken(
            issuer: _config["JWT:ValidIssuer"],
            audience: _config["JWT:ValidAudience"],
            expires: DateTime.Now.AddMinutes(Convert.ToInt32(_config["JWT:TokenValidityInMinutes"])),
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private async Task<string> GenerateRefreshToken(ApplicationUser user)
    {
        var refreshedToken = new RefreshToken()
        {
            Id = Guid.CreateVersion7(),
            UserId = user.Id,
            ExpireTime = DateTime.Now.AddMinutes(Convert.ToInt32(_config["JWT:RefreshTokenValidityMins"]))
        };

        await _db.RefreshToken.AddAsync(refreshedToken);
        await _db.SaveChangesAsync();

        return refreshedToken.Id.ToString();
    }


}
