using System;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using SmartAC.Api.Business.Models;
using SmartAC.Api.Business.Services;
using SmartAC.Api.Common.Models;
using SmartAC.Api.Helpers;

namespace SmartAC.Api.Controllers
{
    [Authorize]
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
        /// Adds a new device
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("api/device")]
        public async Task<DeviceResponseModel> AddNewDevice(NewDeviceRequest request)
        {
            try
            {
                return await _deviceService.Add(request);
            }
            catch (Exception ex)
            {
                throw new Exception("Could not add device");
            }
        }

        /// <summary>
        /// Finds devices by params
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpGet("api/devices")]
        public async Task<PageResult<DeviceResponseModel>> FindByParams(
            [FromQuery] DeviceSearchRequest request)
        {
            try
            {
                return await _deviceService.FindByParams(request);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
