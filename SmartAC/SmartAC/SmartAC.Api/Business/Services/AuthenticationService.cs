using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SmartAC.Api.Business.Models;
using SmartAC.Api.DataAccess.Entities;
using SmartAC.Api.DataAccess.Enums;
using SmartAC.Api.DataAccess.Repository.Interfaces;
using SmartAC.Api.Helpers;
using SmartAC.Api.Security;

namespace SmartAC.Api.Business.Services
{
    public class AuthenticationService : BaseService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IUserRepository _userRepository;
        private readonly IDeviceRepository _deviceRepository;

        public AuthenticationService(
            IMapper mapper,
            IEmployeeRepository employeeRepository,
            IUserRepository userRepository,
            IDeviceRepository deviceRepository,
            IOptions<AppSettings> appSettings)
            : base(mapper, appSettings)
        {
            _employeeRepository = employeeRepository;
            _userRepository = userRepository;
            _deviceRepository = deviceRepository;
        }

        public async Task<AuthLoginResponseModel> LoginUserAsync(AuthCredentialModel credentials)
        {
            var employee = await _employeeRepository.FirstOrDefaultAsync(x => x.Login == credentials.Login);
            if (employee == null)
            {
                throw new Exception("Employee not found");
            }

            var user = await _userRepository.FindAsync(employee.UserID);
            if (user == null)
            {
                throw new Exception("Employee not found");
            }

            var isValidPassword =
                SecurityHelper.Validate(credentials.Password, user.Salt, user.PasswordHash);

            if (!isValidPassword)
            {
                throw new Exception("Incorrect credentials");
            }

            var token = GenerateToken(employee.User);

            var result = new AuthLoginResponseModel()
            {
                Name = string.Format("{0} {1}", employee.FirstName, employee.LastName),
                IsAdmin = user.IsAdmin,
                Token = token,
                UserID = employee.UserID,
                IsSuccess = true,
                IsLocked = user.StatusID == (long)UserStatusEnum.Locked,
            };
            return result;
        }

        public async Task<bool> CreateNewUser(NewUserRequest request)
        {
            var salt = SecurityHelper.CreateSalt();
            var passwordHash = SecurityHelper.CreatePasswordHash(request.Password, salt);

            var user = new User()
            {
                PasswordHash = passwordHash,
                Salt = salt,
                StatusID = (long)UserStatusEnum.Active,
                IsAdmin = request.IsAdmin,
            };

            var savedUser = await _userRepository.Add(user);

            var employee = new Employee()
            {
                UserID = savedUser.ID,
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Login = request.Login,
            };

            var savedEmployee = await _employeeRepository.Add(employee);

            return savedUser != null && savedEmployee != null;
        }

        private string GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new [] { new Claim("id", user.ID.ToString()), }),
                Expires = DateTime.Now.AddDays(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
