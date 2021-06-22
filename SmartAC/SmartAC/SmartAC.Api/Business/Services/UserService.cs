using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Options;
using SmartAC.Api.Business.Models;
using SmartAC.Api.DataAccess.Repository.Interfaces;
using SmartAC.Api.Helpers;

namespace SmartAC.Api.Business.Services
{
    public class UserService : BaseService
    {
        private readonly IUserRepository _userRepository;

        public UserService(
            IMapper mapper, 
            IOptions<AppSettings> appSettings,
            IUserRepository userRepository)
            : base(mapper, appSettings)
        {
            _userRepository = userRepository;
        }

        public async Task<UserIdentityModel> GetById(long id)
        {
            var user = await _userRepository.FindAsync(id);
            return _mapper.Map<UserIdentityModel>(user);
        }
    }
}
