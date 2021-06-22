using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using EFCore.BulkExtensions;
using Microsoft.EntityFrameworkCore;
using SmartAC.Api.Common.Enums;
using SmartAC.Api.Common.Models;
using SmartAC.Api.DataAccess.Repository.Interfaces;

namespace SmartAC.Api.DataAccess.Repository
{
    public abstract class RepositoryBase<TEntity, TContext> : IRepositoryBase<TEntity>
        where TEntity : class
        where TContext : DbContext
    {
        protected readonly TContext _context;

        public RepositoryBase(TContext context)
        {
            _context = context;
        }

        protected DbSet<TEntity> _dbSet
        {
            get { return _context.Set<TEntity>(); }
        }

        public async Task<TEntity> Add(TEntity entity)
        {
            _dbSet.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task BulkInsert(List<TEntity> items)
        {
            await _context.BulkInsertAsync(items);
        }

        public async Task<TEntity> Delete(long id)
        {
            var entity = await _dbSet.FindAsync(id);
            if (entity == null)
            {
                return entity;
            }

            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<TEntity> Update(TEntity entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<TEntity> FindAsync(long id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<IEnumerable<TEntity>> QueryAsync()
        {
            return await _dbSet.AsQueryable().ToListAsync();
        }

        public async Task<IEnumerable<TEntity>> QueryAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await _dbSet.Where(predicate).ToListAsync();
        }

        public async Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await _dbSet.AsQueryable().Where(predicate).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<TEntity>> GetAll()
        {
            return await _dbSet.AsQueryable().ToListAsync();
        }

        public async Task<PageResult<TEntity>> FindPageResultAsync(
            Expression<Func<TEntity, bool>> filter,
            Expression<Func<TEntity, object>> orderBySelector,
            OrderByEnum orderByEnum,
            int? page,
            int? pageSize,
            Func<IQueryable<TEntity>, IQueryable<TEntity>> includes = null)
        {
            var list = await FindPageAsync(
                filter,
                orderBySelector,
                orderByEnum,
                page,
                pageSize,
                includes);

            int totalCount = filter != null
                ? await _dbSet.Where(filter).CountAsync()
                : await _dbSet.CountAsync();

            var result = new PageResult<TEntity>(list, totalCount);
            return result;
        }

        private Task<List<TEntity>> FindPageAsync(
            Expression<Func<TEntity, bool>> filter,
            Expression<Func<TEntity, object>> orderBySelector,
            OrderByEnum orderByEnum,
            int? page,
            int? pageSize,
            Func<IQueryable<TEntity>, IQueryable<TEntity>> includes = null)
        {
            var orderByAsc = orderByEnum == OrderByEnum.Asc;

            Func<IQueryable<TEntity>, IQueryable<TEntity>> applyToQueryFunc = (query) => orderByAsc
                ? query.OrderBy(orderBySelector)
                : query.OrderByDescending(orderBySelector);

            return FindPageAsync(
                filter,
                applyToQueryFunc,
                page,
                pageSize,
                includes);
        }

        private async Task<List<TEntity>> FindPageAsync(
            Expression<Func<TEntity, bool>> filter,
            Func<IQueryable<TEntity>, IQueryable<TEntity>> applyToQueryFunc,
            int? page,
            int? pageSize,
            Func<IQueryable<TEntity>, IQueryable<TEntity>> includes = null)
        {
            var query = Prepare(filter, false, includes);

            query = applyToQueryFunc(query);

            var actualPage = page ?? 1;
            var actualPageSize = pageSize.HasValue && (pageSize > 0 && pageSize <= 50)
                ? pageSize.Value
                : 50;

            var skipAmount = (actualPage - 1) * actualPageSize;

            var list = await query
                .AsNoTracking()
                .Skip(skipAmount)
                .Take(actualPageSize)
                .ToListAsync();

            return list;
        }

        private IQueryable<TEntity> Prepare(
            Expression<Func<TEntity, bool>> filter,
            bool asNoFilter,
            Func<IQueryable<TEntity>, IQueryable<TEntity>> includes = null)
        {
            var query = _dbSet.AsQueryable();

            if (includes != null)
            {
                query = includes(query) ?? query;
            }

            if (asNoFilter)
            {
                query = query.IgnoreQueryFilters();
            }

            if (filter != null)
            {
                query = query.Where(filter);
            }

            return query;
        }
    }
}
