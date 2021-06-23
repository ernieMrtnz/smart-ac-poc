using System;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using SmartAC.Api.Business.Models;
using SmartAC.Api.Business.Services;
using SmartAC.Api.Common.Models;
using SmartAC.Api.Helpers;

namespace SmartAC.Api.Controllers
{
    [Authorize]
    [Route("api/device")]
    [ApiController]
    public class DeviceController : ControllerBase
    {
        private readonly ILogger<DeviceController> _logger;
        private readonly DeviceService _deviceService;

        public DeviceController(
            ILogger<DeviceController> logger,
            DeviceService deviceService)
        {
            _logger = logger;
            _deviceService = deviceService;
        }

        /// <summary>
        /// Finds devices by params
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpGet("findDevices")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<PageResult<DeviceResponseModel>>> FindByParams(
            [FromQuery] DeviceSearchRequest request)
        {
            try
            {
                if (request == null)
                {
                    return BadRequest("Could not find device");
                }

                var result = await _deviceService.FindByParams(request);

                if (result == null)
                {
                    return NotFound();
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Could not find device");
            }
        }
    }
}
