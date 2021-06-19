using SmartAC.Api.DataAccess.Entities;
using SmartAC.Api.DataAccess.Persistence;
using SmartAC.Api.DataAccess.Repository.Interfaces;

namespace SmartAC.Api.DataAccess.Repository
{
    public class DeviceRepository : RepositoryBase<Device, SmartAcContext>, IDeviceRepository
    {
        public DeviceRepository(SmartAcContext context)
            : base(context)
        {
        }
    }
}
