using System;
using System.Collections.Generic;

namespace SmartAC.Api.Business.Models
{
    public class DeviceModel
    {
        public long ID { get; set; }

        public string SerialNumber { get; set; }

        public DateTime RegistrationDate { get; set; }

        public string FirmwareVersion { get; set; }

        public long StatusID { get; set; }

        public string Temperature { get; set; }

        public decimal AirHumidity { get; set; }

        public int CarbonMonoxideLevel { get; set; }

        public string HealthStatus { get; set; }

        public IEnumerable<DeviceDetailResponseModel> DeviceDetails { get; set; }
    }
}
