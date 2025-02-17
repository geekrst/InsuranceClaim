using InsuranceClaim.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace InsuranceClaim.Server.Data
{
    public class InsuranceClaimDBContext: DbContext
    {
        public InsuranceClaimDBContext(DbContextOptions options) : base(options) { }
        public DbSet<ReserveModel> ReserveModel { get; set; }
        public DbSet<PaymentModel> PaymentModel { get; set; }

    }
}
