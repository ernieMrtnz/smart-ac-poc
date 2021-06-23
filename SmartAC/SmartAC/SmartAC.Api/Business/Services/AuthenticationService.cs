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

            var token = GenerateToken("userId", employee.User.ID.ToString());

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

        public async Task<AuthDeviceResponseModel> RegisterNewDevice(NewDeviceRequest request)
        {
            var random = new Random();
            var deviceHash = request.SerialNumber + request.Secret + random.Next(1000);
            var device = new Device
            {
                SerialNumber = request.SerialNumber,
                FirmwareVersion = request.FirmwareVersion,
                StatusID = 1,
                RegistrationDate = DateTime.Now,
                DeviceHash = deviceHash, // TODO: Save to another table would be better
            };

            var result = await _deviceRepository.Add(device);

            return await AuthenticateDevice(result.ID.ToString());
        }

        public async Task<AuthDeviceResponseModel> AuthenticateDeviceBySerialNumber(string serialNumber)
        {
            var device = await _deviceRepository.FirstOrDefaultAsync(x => x.SerialNumber == serialNumber);
            return await AuthenticateDevice(device.ID.ToString());
        }

        private async Task<AuthDeviceResponseModel> AuthenticateDevice(string deviceId)
        {
            var token = GenerateToken("deviceId", deviceId);

            return new AuthDeviceResponseModel
            {
                Token = token,
                IsSuccess = true,
            };
        }

        private string GenerateToken(string type, string id)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new [] { new Claim(type, id), }),
                Expires = DateTime.Now.AddDays(20),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
