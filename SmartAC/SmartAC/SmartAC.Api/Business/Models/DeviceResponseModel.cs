using System;

namespace SmartAC.Api.Business.Models
{
    public class DeviceResponseModel
    {
        public long ID { get; set; }

        public string SerialNumber { get; set; }

        public DateTime RegistrationDate { get; set; }

        public string FirmwareVersion { get; set; }

        public long StatusID { get; set; }
    }
}
