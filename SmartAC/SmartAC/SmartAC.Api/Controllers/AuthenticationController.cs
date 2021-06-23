using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using SmartAC.Api.Business.Models;
using SmartAC.Api.Business.Services;
using SmartAC.Api.Helpers;

namespace SmartAC.Api.Controllers
{
    [Route("api/auth")]
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
        [HttpPost("login")]
        [ServiceFilter(typeof(ModelValidationAttribute), Order = 1)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<AuthLoginResponseModel>> Login(AuthCredentialModel credentials)
        {
            try
            {
                if (credentials == null)
                {
                    return BadRequest("Could not find that user.");
                }

                var result = await _authService.LoginUserAsync(credentials);
                if (result == null)
                {
                    var failedResponse = new AuthLoginResponseModel
                    {
                        IsSuccess = false,
                        ErrorMessage = "Could not log into the system.",
                    };

                    return BadRequest(failedResponse);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error logging into the system");
            }
        }

        /// <summary>
        /// Checks if user is still valid (token)
        /// </summary>
        /// <returns></returns>
        [HttpGet("identity")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<UserIdentityModel>> GetUserIdentity()
        {
            try
            {
                // TODO: In prod would verify token is actually from user
                var result = new UserIdentityModel()
                {
                    ID = 1,
                    Name = "Ernesto",
                    UserTypeID = 1,
                    ExpirationTime = DateTime.Now.AddDays(1),
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Unable to get user identity");
            }
        }

        /// <summary>
        /// Registers a new device
        /// </summary>
        /// <param name="request"></param>
        /// <returns>Response with token to be used in subsequent call</returns>
        /// <response code="201">Returns object with token</response>
        /// <response code="400">If item is null</response>
        [HttpPost("device")]
        [ServiceFilter(typeof(ModelValidationAttribute), Order = 1)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<AuthDeviceResponseModel>> RegisterNewDevice(NewDeviceRequest request)
        {
            try
            {
                if (request == null)
                {
                    return BadRequest("Could not register device");
                }

                var result = await _authService.RegisterNewDevice(request);

                if (result == null)
                {
                    return BadRequest("Could not register device");
                }

                return Created("~api/auth/device", result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Unable to register new device");
            }
        }

        /// <summary>
        /// Authenticates a device
        /// </summary>
        /// <param name="serialNumber"></param>
        /// <returns></returns>
        [HttpPost("device/token")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<AuthDeviceResponseModel>> GetDeviceToken(string serialNumber)
        {
            try
            {
                var result = await _authService.AuthenticateDeviceBySerialNumber(serialNumber);
                if (result == null)
                {
                    return BadRequest("Could not authenticate device");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Unable to authenticate device");
            }
        }

        #region Temp endpoint

        /// <summary>
        /// Adds a user to the system
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("employee")]
        [ServiceFilter(typeof(ModelValidationAttribute), Order = 1)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<bool>> CreateEmployee(NewUserRequest request)
        {
            try
            {
                if (request == null)
                {
                    return BadRequest("Could not register device");
                }

                var result = await _authService.CreateNewUser(request);
                if (!result)
                {
                    return BadRequest("Was not able to create user.");
                }

                return Created("~api/auth/employee", result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Unable to register new employee");
            }
        }
        #endregion
    }
}
