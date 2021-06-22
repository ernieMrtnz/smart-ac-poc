using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SmartAC.Api.Business.Models;
using SmartAC.Api.Common.Models;
using SmartAC.Api.DataAccess.Entities;
using SmartAC.Api.DataAccess.Enums;
using SmartAC.Api.DataAccess.Repository.Interfaces;
using SmartAC.Api.Helpers;

namespace SmartAC.Api.Business.Services
{
    public class EmployeeService : BaseService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IUserRepository _userRepository;

        public EmployeeService(
            IMapper mapper,
            IOptions<AppSettings> appSettings,
            IEmployeeRepository employeeRepository, 
            IUserRepository userRepository)
            : base(mapper, appSettings)
        {
            _employeeRepository = employeeRepository;
            _userRepository = userRepository;
        }

        public async Task<PageResult<EmployeeResponseModel>> GetEmployeesPaged(EmployeeSearchRequest request)
        {
            Expression<Func<Employee, bool>> filter = x => true;

            Expression<Func<Employee, object>> sortBySelector = request.SortBy?.ToLower() switch
            {
                "lastname" => c => c.LastName,
                _ => c => c.ID,
            };

            Func<IQueryable<Employee>, IQueryable<Employee>> includes
                = source => source.Include(x => x.User);

            var result = await _employeeRepository.FindPageResultAsync(
                filter,
                sortBySelector,
                request.OrderBy,
                request.Page,
                request.PageSize,
                includes);

            return _mapper.Map<PageResult<EmployeeResponseModel>>(result);
        }

        public async Task<EmployeeResponseModel> GetById(long employeeId)
        {
            var result = await _employeeRepository.FindAsync(employeeId);
            return _mapper.Map<EmployeeResponseModel>(result);
        }

        public async Task<bool> IsUserEnabled(long employeeId)
        {
            var employee = await _employeeRepository.FirstOrDefaultAsync(x => x.ID == employeeId);
            if (employee == null)
            {
                throw new Exception("Could not find user.");
            }

            if (employee.User == null)
            {
                throw new Exception("Could not find user");
            }

            return employee.User.StatusID == (long) UserStatusEnum.Active;
        }

        public async Task<EmployeeResponseModel> EnableUser(long employeeId)
        {
            return await UpdateEmployee(employeeId, (long) UserStatusEnum.Active);
        }

        public async Task<EmployeeResponseModel> DisableUser(long employeeId)
        {
            return await UpdateEmployee(employeeId, (long)UserStatusEnum.Locked);
        }

        private async Task<EmployeeResponseModel> UpdateEmployee(long id, long statusId)
        {
            var emp = await _employeeRepository.FindAsync(id);
            if (emp == null)
            {
                return null;
            }

            var user = await _userRepository.FindAsync(emp.UserID);
            if (user == null)
            {
                return null;
            }

            user.StatusID = statusId;

            await _userRepository.Update(user);


            return _mapper.Map<EmployeeResponseModel>(emp);
        }
    }
}
