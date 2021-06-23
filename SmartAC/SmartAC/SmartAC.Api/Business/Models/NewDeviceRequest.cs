using System.ComponentModel.DataAnnotations;

namespace SmartAC.Api.Business.Models
{
    public class NewDeviceRequest
    {
        [Required]
        public string SerialNumber { get; set; }

        [Required]
        public string Secret { get; set; }

        public string FirmwareVersion { get; set; }
    }
}
