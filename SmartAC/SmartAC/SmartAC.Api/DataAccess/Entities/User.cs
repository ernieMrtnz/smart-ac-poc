namespace SmartAC.Api.DataAccess.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }

        public string PasswordHash { get; set; }

        public string Salt { get; set; }

        public string ResetPasswordToken { get; set; }

        public long StatusID { get; set; }

        public bool IsAdmin { get; set; }

        public virtual Status Status { get; set; }
    }
}
