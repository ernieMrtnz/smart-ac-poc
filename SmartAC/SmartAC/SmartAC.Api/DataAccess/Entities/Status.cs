namespace SmartAC.Api.DataAccess.Entities
{
    using System.ComponentModel.DataAnnotations.Schema;

    public class Status
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }

        public string Name { get; set; }
    }
}
