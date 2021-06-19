using System.Collections.Generic;

namespace SmartAC.Api.DataAccess.Entities
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Device
    {
        public Device()
        {
            DeviceDetails = new HashSet<DeviceDetail>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }

        public string SerialNumber { get; set; }

        public DateTime RegistrationDate { get; set; }

        public string FirmwareVersion { get; set; }

        public long StatusID { get; set; }

        public virtual Status Status { get; set; }

        public virtual ICollection<DeviceDetail> DeviceDetails { get; set; }
    }
}
