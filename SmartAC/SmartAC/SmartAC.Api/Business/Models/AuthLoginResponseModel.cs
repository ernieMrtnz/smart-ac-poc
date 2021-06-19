namespace SmartAC.Api.Business.Models
{
    public class AuthLoginResponseModel
    {
        public bool IsSuccess { get; set; }

        public long UserID { get; set; }

        public bool IsAdmin { get; set; }

        public string Name { get; set; }

        public string Token { get; set; }

        public int Attemptsleft { get; set; }

        public bool IsLocked { get; set; }

        public string ErrorMessage { get; set; }
    }
}
