using EventryApi.Data;
using EventryApi.Model.Entity;
using Facebook.Helper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
    options.User.RequireUniqueEmail = false;

    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.AllowedForNewUsers = true;

    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 6;
    options.Password.RequiredUniqueChars = 0;

    options.SignIn.RequireConfirmedEmail = false;
    options.SignIn.RequireConfirmedPhoneNumber = false;
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        RequireExpirationTime = false,
        ClockSkew = TimeSpan.Zero,
        ValidateLifetime = true,
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:ValidAudience"],
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]!))
    };
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJsClient", policy =>
    {
        policy.WithOrigins("http://localhost:3000", " http://192.168.68.104:3000");

    });
});

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen(c =>
{

    if (builder.Configuration["AuthenticationType"] == "ByJwt")
    {
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Description = @"JWT Authorization header using the Bearer scheme. <br> 
                    Enter 'Bearer' [space] and then your token in the text input below.
                    <br> Example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer"
        });
        c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    },
                    Name = "Bearer",
                    In = ParameterLocation.Header
                },
                new List<string>{ "https://chat.com/api" }
            }
        });
    }
    var path = "https://chat.com";
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "chat v1",
        Description = "API to manage",
        //TermsOfService = new Uri($"{path}/api-terms"),
        Contact = new OpenApiContact
        {
            Name = "chat app",
            Url = new Uri(path.ToString())
        },
        License = new OpenApiLicense
        {
            Name = "Example License",
            Url = new Uri($"{path}/api-license")
        }
    });

});

var app = builder.Build();

app.Use(async (context, next) =>
{
    var origin = context.Request.Headers["Origin"].ToString();
    var allowOrigin = !string.IsNullOrEmpty(origin) ? origin : "'*'";
    context.Response.Headers.Add("Access-Control-Allow-Origin", allowOrigin);
    await next();
    
});

//app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("AllowNextJsClient");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI(x =>
    {
        x.DefaultModelExpandDepth(-1);
    });
}

app.UseAuthentication();
app.UseAuthorization();

using(var scope = app.Services.CreateScope())
{
    var service = scope.ServiceProvider;
    await CreateDefaultUser(service);
}

app.MapControllers();
app.Run();

async Task CreateDefaultUser(IServiceProvider serviceProvider)
{
    var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
    string[] rolesNames = { "SuperAdmin", "User" };
    IdentityResult roleResult;

    foreach (var roleName in rolesNames)
    {
        var roleExist = await roleManager.RoleExistsAsync(roleName);
        if (!roleExist)
        {
            roleResult = await roleManager.CreateAsync(new IdentityRole(roleName));
        }
    }
    ApplicationUser superAdimn = await userManager.FindByNameAsync("sa");

    if (superAdimn is null)
    {
        superAdimn = new ApplicationUser()
        {
            UserName = "sa",
            Email = "rafsan@gmail.com",
            SecurityStamp = Guid.NewGuid().ToString("D") + 1,
            EmailConfirmed = true,
            PhoneNumber = "01641178472",
            PhoneNumberConfirmed = true,
            Name = "Rafan",
            RegistrationDate = AppFunction.BDDateTime()
        };
        var result = await userManager.CreateAsync(superAdimn, "123456");
    }
    await userManager.AddToRoleAsync(superAdimn, "SuperAdmin");
}