using AutoMapper;
using SmartAC.Api.Business.Models;
using SmartAC.Api.Common.Models;
using SmartAC.Api.DataAccess.Entities;

namespace SmartAC.Api.Business.DI
{
    public class AutoMapperProfile : Profile
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AutoMapperProfile"/> class.
        /// </summary>
        public AutoMapperProfile()
        {
            CreateMap<Device, DeviceResponseModel>();
            CreateMap<DeviceDetail, DeviceDetailResponseModel>();
            CreateMap<User, UserIdentityModel>();
            CreateMap<Device, DeviceIdentityModel>();
            CreateMap<Employee, EmployeeResponseModel>()
                .ForMember(
                    dst => dst.IsAdmin,
                    map => map.MapFrom(
                        src => src.User.IsAdmin))
                .ForMember(
                    dst => dst.StatusID,
                    map => map.MapFrom(
                       src => src.User.StatusID));

            CreateMap(typeof(PageResult<>), typeof(PageResult<>));
        }
    }
}
