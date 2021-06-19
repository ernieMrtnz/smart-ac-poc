using AutoMapper;
using SmartAC.Api.Business.Models;
using SmartAC.Api.DataAccess.Entities;

namespace SmartAC.Api.Business.DI
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Device, DeviceModel>();
            CreateMap<DeviceDetail, DeviceDetailResponseModel>();
        }
    }
}
