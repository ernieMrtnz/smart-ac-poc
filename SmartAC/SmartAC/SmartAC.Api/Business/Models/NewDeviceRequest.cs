using System;

namespace SmartAC.Api.Business.Models
{
    public class NewDeviceRequest
    {
        public string SerialNumber { get; set; }

        public DateTime RegistrationDate { get; set; }

        public string FirmwareVersion { get; set; }
    }
}
