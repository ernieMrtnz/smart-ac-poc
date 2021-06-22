using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using SmartAC.Api.Business.Models;
using SmartAC.Api.Business.Services;
using SmartAC.Api.Helpers;

namespace SmartAC.Api.Controllers
{
    [Authorize]
    [ApiController]
    public class DeviceDetailController : ControllerBase
    {
        private readonly ILogger<DeviceDetailController> _logger;
        private readonly DeviceDetailService _deviceDetailService;

        public DeviceDetailController(
            ILogger<DeviceDetailController> logger,
            DeviceDetailService deviceDetailService)
        {
            _logger = logger;
            _deviceDetailService = deviceDetailService;
        }

        /// <summary>
        /// Retrieves a device detail, (coming from alerts)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("api/deviceDetail/{id}")]
        public async Task<DeviceDetailResponseModel> GetById(long id)
        {
            try
            {
                return await _deviceDetailService.GetById(id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        /// <summary>
        /// Adds a new device details info
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("api/deviceDetails")]
        public async Task<DeviceDetailResponseModel> AddDetails(DeviceDetailRequest request)
        {
            try
            {
                return await _deviceDetailService.Add(request);
            }
            catch (Exception ex)
            {
                throw new Exception("Could not add details for device");
            }
        }

        /// <summary>
        /// Adds device details in bulk for a device
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("api/deviceDetails/bulk")]
        public async Task<bool> AddBulkDetails(BulkDeviceDetailRequest request)
        {
            try
            {
                return await _deviceDetailService.AddBulk(request);
            }
            catch (Exception ex)
            {
                throw new Exception("Could not add bulk device details.");
            }
        }

        /// <summary>
        /// Retrieves device details for chart display
        /// </summary>
        /// <param name="deviceId"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpGet("api/deviceDetail/{deviceId}/forChart")]
        public async Task<DeviceDetailsForChartResponse> FindDetailsDataForChart(
            long deviceId,
            [FromQuery] DeviceDetailsForChartRequest request)
        {
            try
            {
                return await _deviceDetailService.FindForChart(deviceId, request);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        /// <summary>
        /// Updates the resolution for a device detail that was alerted
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPut("api/deviceDetail/{id}/resolve")]
        public async Task<bool> ResolveStatus(long id)
        {
            try
            {
                return await _deviceDetailService.ResolveStatus(id);
            }
            catch (Exception e)
            {
                throw new Exception("Could not resolve device issue");
            }
        }
    }
}
