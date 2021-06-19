using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Logging;
using SmartAC.Api.Business.Models;
using SmartAC.Api.Business.Services;

namespace SmartAC.Api.Controllers
{
    [Route("api/")]
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

        [HttpPost]
        [Route("device")]
        public async Task<DeviceModel> AddNewDevice(NewDeviceRequest request)
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

        [HttpGet]
        [Route("device/all")]
        public async Task<List<DeviceModel>> GetAll()
        {
            try
            {
                var result = await _deviceService.GetAll();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        [Route("device/{serialNumber}")]
        public async Task<DeviceModel> FindBySerialNumber(string serialNumber)
        {
            try
            {
                return await _deviceService.FindBySerialNumber(serialNumber);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
