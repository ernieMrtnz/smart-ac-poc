using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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

        [HttpPost]
        [Route("api/auth/login")]
        public async Task<AuthLoginResponseModel> Login(AuthCredentialModel credentials)
        {
            try
            {
                var result = await _authService.LoginUserAsync(credentials);
                return new AuthLoginResponseModel();
            }
            catch (Exception ex)
            {
                var failedResponse = new AuthLoginResponseModel
                {

                };

                return failedResponse;
            }
        }

        [HttpGet]
        [Route("api/auth/device/{serialNumber}/token")]
        public async Task<AuthDeviceResponseModel> GetDeviceToken(string serialNumber)
        {
            return new AuthDeviceResponseModel();
        }
    }
}
