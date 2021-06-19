namespace SmartAC.Api.DataAccess.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class SecurityQuestion
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }

        public string QuestionText { get; set; }

        public string QuestionAnswer { get; set; }

        public long EmployeeID { get; set; }

        public virtual Employee Employee { get; set; }
    }
}
