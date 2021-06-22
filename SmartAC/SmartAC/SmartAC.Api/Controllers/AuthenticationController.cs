using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using SmartAC.Api.Business.Models;
using SmartAC.Api.Business.Services;

namespace SmartAC.Api.Controllers
{
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly ILogger<AuthenticationController> _logger;
        private readonly AuthenticationService _authService;

        public AuthenticationController(
            ILogger<AuthenticationController> logger,
            AuthenticationService authService)
        {
            _logger = logger;
            _authService = authService;
        }

        /// <summary>
        /// Logs in a user to authenticate
        /// </summary>
        /// <param name="credentials"></param>
        /// <returns></returns>
        [HttpPost("api/auth/login")]
        public async Task<AuthLoginResponseModel> Login(AuthCredentialModel credentials)
        {
            try
            {
                var result = await _authService.LoginUserAsync(credentials);
                return result;
            }
            catch (Exception ex)
            {
                var failedResponse = new AuthLoginResponseModel
                {
                    IsSuccess = false,
                    ErrorMessage = "Could not log into the system."
                };

                return failedResponse;
            }
        }

        /// <summary>
        /// Checks if user is still valid (token)
        /// </summary>
        /// <returns></returns>
        [HttpGet("api/auth/identity")]
        public async Task<UserIdentityModel> GetUserIdentity()
        {
            // TODO: In prod would verify token is actually from user
            return new UserIdentityModel()
            {
                ID = 1,
                Name = "Ernesto",
                UserTypeID = 1,
                ExpirationTime = DateTime.Now.AddDays(1),
            };
        }

        /// <summary>
        /// Authenticates a device
        /// </summary>
        /// <param name="serialNumber"></param>
        /// <returns></returns>
        [HttpGet("api/auth/device/{serialNumber}/token")]
        public async Task<AuthDeviceResponseModel> GetDeviceToken(string serialNumber)
        {
            return new AuthDeviceResponseModel();
        }

        #region Temp endpoint
        /// <summary>
        /// Adds a user to the system
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("api/auth/employee")]
        public async Task<bool> CreateEmployee(NewUserRequest request)
        {
            return await _authService.CreateNewUser(request);
        }

        #endregion
    }
}
