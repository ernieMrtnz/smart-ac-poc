using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using SmartAC.Api.Business.Models;
using SmartAC.Api.Business.Services;

namespace SmartAC.Api.Controllers
{
    [Route("api/[controller]")]
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

        [HttpPost]
        [Route("deviceDetails/add")]
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
    }
}
