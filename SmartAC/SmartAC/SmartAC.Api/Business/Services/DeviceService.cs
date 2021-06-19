using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using SmartAC.Api.Business.Models;
using SmartAC.Api.DataAccess.Entities;
using SmartAC.Api.DataAccess.Repository.Interfaces;

namespace SmartAC.Api.Business.Services
{
    public class DeviceService
    {
        private readonly IDeviceRepository _deviceRepository;
        private readonly IMapper _mapper;

        public DeviceService(
            IMapper mapper,
            IDeviceRepository deviceRepository)
        {
            _mapper = mapper;
            _deviceRepository = deviceRepository;
        }

        public async Task<List<DeviceModel>> GetAll()
        {
            var result = await _deviceRepository.GetAll();
            return _mapper.Map<List<DeviceModel>>(result);
        }

        public async Task<DeviceModel> FindBySerialNumber(string serialNumber)
        {
            var result = await _deviceRepository.FirstOrDefaultAsync(x => x.SerialNumber == serialNumber);
            return _mapper.Map<DeviceModel>(result);
        }

        public async Task<DeviceModel> Add(NewDeviceRequest request)
        {
            var device = new Device()
            {
                SerialNumber = request.SerialNumber,
                FirmwareVersion = request.FirmwareVersion,
                StatusID = 1,
                RegistrationDate = DateTime.Now,
            };

            var result = await _deviceRepository.Add(device);

            return _mapper.Map<DeviceModel>(result);
        }
    }
}
