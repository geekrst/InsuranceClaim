using System.Xml;
using InsuranceClaim.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;

namespace InsuranceClaim.Server.Data
{
    public class InsuranceClaimDBContext : DbContext
    {
        public InsuranceClaimDBContext(DbContextOptions options) : base(options) { }
        public DbSet<ReserveModel> ReserveModel { get; set; }
        public DbSet<PaymentModel> PaymentModel { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ReserveModel>().HasKey(res => res.Id);
            modelBuilder.Entity<ReserveModel>().Property(res => res.Id).ValueGeneratedOnAdd();

            modelBuilder.Entity<PaymentModel>().HasKey(pay => pay.Id);
            modelBuilder.Entity<PaymentModel>().Property(pay => pay.Id).ValueGeneratedOnAdd();
        }
    }

    //public partial class UpdateIdColumn : Migration
    //{
    //    protected override void Up(MigrationBuilder migrationBuilder)
    //    {
    //        // Drop the existing column
    //        migrationBuilder.DropColumn(
    //            name: "Id",
    //            table: "ReserveModel");

    //        // Recreate the column with the correct IDENTITY property
    //        migrationBuilder.AddColumn<int>(
    //            name: "Id",
    //            table: "ReserveModel",
    //            nullable: false,
    //            defaultValue: 0)
    //            .Annotation("SqlServer:Identity", "1, 1");
    //    }

    //    protected override void Down(MigrationBuilder migrationBuilder)
    //    {
    //        // Reverse the changes in the Down method
    //        migrationBuilder.DropColumn(
    //            name: "Id",
    //            table: "ReserveModel");

    //        // Recreate the original column if necessary
    //    }
    //}

}



