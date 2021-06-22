using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartAC.Api.DataAccess.Entities
{
    public class DeviceDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }

        public decimal Temperature { get; set; }

        public decimal AirHumidityPercent { get; set; }

        public int CarbonMonoxideLevel { get; set; }

        [MaxLength(150)]
        public string HealthStatus { get; set; }

        public long DeviceID { get; set; }

        public DateTime CreatedDateTime { get; set; }

        public DateTime? ResolvedDate { get; set; }

        public virtual Device Device { get; set; }
    }
}
