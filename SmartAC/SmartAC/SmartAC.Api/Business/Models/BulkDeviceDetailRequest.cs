using System.Collections.Generic;

namespace SmartAC.Api.Business.Models
{
    public class BulkDeviceDetailRequest
    {
        public List<DeviceDetailRequest> BulkDeviceDetails { get; set; }
    }
}
