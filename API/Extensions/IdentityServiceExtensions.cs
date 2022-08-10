using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Domain;
using Persistence;
using Microsoft.AspNetCore.Identity;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authorization;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services,
            IConfiguration config) {
                services.AddIdentityCore<AppUser>(opt =>
                {
                    opt.Password.RequireNonAlphanumeric = false;
                })
                .AddEntityFrameworkStores<DataContext>()
                .AddSignInManager<SignInManager<AppUser>>();

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

                services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(opt =>
                    {
                        opt.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuerSigningKey = true,
                            IssuerSigningKey = key,
                            ValidateIssuer = false,
                            ValidateAudience = false,
                        };
                    });
                services.AddAuthorization(opt =>
                {
                    opt.AddPolicy("IsActivityHost", policy =>
                    {
                        policy.Requirements.Add(new IsHostRequirement());
                    });
                });
                services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();
                services.AddScoped<TokenService>();

                return services;
            }
    }
}