using SmartAC.Api.DataAccess.Entities;

namespace SmartAC.Api.DataAccess.Persistence
{
    using Microsoft.EntityFrameworkCore;

    public class SmartAcContext : DbContext
    {
        public SmartAcContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<Device> Devices { get; set; }

        public DbSet<DeviceDetail> DeviceDetails { get; set; }

        public DbSet<Employee> Employees { get; set; }

        public DbSet<SecurityQuestion> SecurityQuestions { get; set; }

        public DbSet<Status> Status { get; set; }

        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            optionsBuilder.UseLazyLoadingProxies(false);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasIndex(e => e.Email)
                    .HasDatabaseName("IX_Employee_EmployeeEmailUnique")
                    .IsUnique();

                entity.HasIndex(e => e.Login)
                    .HasDatabaseName("IX_Employee_EmployeeLoginUnique")
                    .IsUnique();

                entity.HasIndex(e => e.UserID)
                    .HasDatabaseName("IX_UserID");

                entity.Property(e => e.ID).HasColumnName("ID");

                entity.Property(e => e.Email).HasMaxLength(100);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Login)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.UserID).HasColumnName("UserID");
            });

            modelBuilder.Entity<Device>(entity =>
            {
                entity.Property(e => e.ID).HasColumnName("ID");
            });

            modelBuilder.Entity<DeviceDetail>(entity =>
            {
                entity.Property(e => e.ID).HasColumnName("ID");

                entity.Property(e => e.Temperature).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.AirHumidityPercent).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.DeviceID).HasColumnName("DeviceID");
            });
        }

    }
}
