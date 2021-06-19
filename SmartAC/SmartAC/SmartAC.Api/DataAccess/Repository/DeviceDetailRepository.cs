using SmartAC.Api.DataAccess.Entities;
using SmartAC.Api.DataAccess.Persistence;
using SmartAC.Api.DataAccess.Repository.Interfaces;

namespace SmartAC.Api.DataAccess.Repository
{
    public class DeviceDetailRepository : RepositoryBase<DeviceDetail, SmartAcContext>, IDeviceDetailRepository
    {
        public DeviceDetailRepository(SmartAcContext context)
            : base(context)
        {
        }
    }
}
