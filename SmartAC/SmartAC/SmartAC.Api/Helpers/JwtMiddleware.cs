using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using SmartAC.Api.Business.Services;
using SmartAC.Api.Business.Models;

namespace SmartAC.Api.Helpers
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly AppSettings _appSettings;

        public JwtMiddleware(RequestDelegate next, IOptions<AppSettings> appSettings)
        {
            _next = next;
            _appSettings = appSettings.Value;
        }

        public async Task Invoke(HttpContext context, UserService userService, DeviceService deviceService)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
            {
                await AttachUserToContext(context, userService, token, deviceService);
            }

            await _next(context);
        }

        private async Task AttachUserToContext(HttpContext context, UserService userService, string token, DeviceService deviceService)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var deviceIdClaim = jwtToken.Claims.FirstOrDefault(x => x.Type == "deviceId");
                if (deviceIdClaim != null)
                {
                    var deviceId = int.Parse(deviceIdClaim.Value);
                    var result = await deviceService.GetById(deviceId);
                    var device = new DeviceIdentityModel
                    {
                        ID = result.ID,
                    };

                    context.Items["Device"] = device;
                }

                var userIdClaim = jwtToken.Claims.FirstOrDefault(x => x.Type == "userId");
                if (userIdClaim != null)
                {
                    var userId = int.Parse(userIdClaim.Value);
                    var result = await userService.GetById(userId);
                    var user = new UserIdentityModel
                    {
                        ID = result.ID,
                    };

                    context.Items["User"] = user;
                }
            }
            catch
            {
                // do nothing if jwt validation fails
                // user is not attached to context so request won't have access to secure routes
            }
        }
    }
}
