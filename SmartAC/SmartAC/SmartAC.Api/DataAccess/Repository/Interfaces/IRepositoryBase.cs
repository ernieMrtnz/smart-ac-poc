using SmartAC.Api.Common.Enums;
using SmartAC.Api.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SmartAC.Api.DataAccess.Repository.Interfaces
{
    public interface IRepositoryBase<T> where T : class
    {
        Task<IEnumerable<T>> QueryAsync();
        Task<IEnumerable<T>> QueryAsync(Expression<Func<T, bool>> predicate);

        Task<IEnumerable<T>> GetAll();

        Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate);

        Task<T> FindAsync(long id);

        Task<T> Add(T entity);

        Task<T> Update(T entity);

        Task<T> Delete(long id);

        Task BulkInsert(List<T> items);

        Task<PageResult<T>> FindPageResultAsync(
            Expression<Func<T, bool>> filter,
            Expression<Func<T, object>> orderBySelector,
            OrderByEnum orderByEnum,
            int? page,
            int? pageSize,
            Func<IQueryable<T>, IQueryable<T>> includes = null);
    }
}
