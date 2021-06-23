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
    [Authorize]
    [Route("api/deviceDetails")]
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
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<DeviceDetailResponseModel>> GetById(long id)
        {
            try
            {
                var result = await _deviceDetailService.GetById(id);
                if (result == null)
                {
                    return NotFound();
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Could not find device details");
            }
        }

        /// <summary>
        /// Adds a new device details info
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [ServiceFilter(typeof(ModelValidationAttribute), Order = 1)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<DeviceDetailResponseModel>> AddDetails(DeviceDetailRequest request)
        {
            try
            {
                if (request == null)
                {
                    return BadRequest("Request cannot be empty");
                }

                var result = await _deviceDetailService.Add(request);
                if (result == null)
                {
                    return NotFound();
                }

                return Created("~api/deviceDetails", result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Could not add device details");
            }
        }

        /// <summary>
        /// Adds device details in bulk for a device
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("bulk")]
        [ServiceFilter(typeof(ModelValidationAttribute), Order = 1)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<bool>> AddBulkDetails(BulkDeviceDetailRequest request)
        {
            try
            {
                if (request == null)
                {
                    return BadRequest("Could not add the list of device details");
                }

                var result = await _deviceDetailService.AddBulk(request);
                if (!result)
                {
                    return BadRequest("Not able to bulk insert the device details");
                }

                return Created("~api/deviceDetails/bulk", "Successfully saved the bulk device details");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Could not add the list of device details");
            }
        }

        /// <summary>
        /// Retrieves device details for chart display
        /// </summary>
        /// <param name="deviceId"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpGet("{deviceId}/forChart")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<DeviceDetailsForChartResponse>> FindDetailsDataForChart(
            long deviceId,
            [FromQuery] DeviceDetailsForChartRequest request)
        {
            try
            {
                var result = await _deviceDetailService.FindForChart(deviceId, request);
                if (result == null)
                {
                    return NotFound();
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Could not find device details for chart");
            }
        }

        /// <summary>
        /// Updates the resolution for a device detail that was alerted
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPut("{id}/resolve")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<DeviceDetailResponseModel>> ResolveStatus(long id)
        {
            try
            {
                var result = await _deviceDetailService.ResolveStatus(id);
                if (result == null)
                {
                    return BadRequest("Not able to update device details");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Not able to resolve device details issue");
            }
        }
    }
}
