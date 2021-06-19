using System.ComponentModel.DataAnnotations;

namespace SmartAC.Api.Business.Models
{
    public class AuthCredentialModel
    {
        [Required]
        public string Login { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
