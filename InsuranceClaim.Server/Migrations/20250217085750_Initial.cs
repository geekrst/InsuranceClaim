using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InsuranceClaim.Server.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PaymentModel",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PaymentDamage = table.Column<long>(type: "bigint", nullable: false),
                    PaymentClaimantCost = table.Column<long>(type: "bigint", nullable: false),
                    PaymentDefenceCost = table.Column<long>(type: "bigint", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StatusDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentModel", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ReserveModel",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ReserveDamage = table.Column<long>(type: "bigint", nullable: false),
                    ReserveClaimantCost = table.Column<long>(type: "bigint", nullable: false),
                    ReserveDefenceCost = table.Column<long>(type: "bigint", nullable: false),
                    PaidDamage = table.Column<long>(type: "bigint", nullable: false),
                    PaidClaimantCost = table.Column<long>(type: "bigint", nullable: false),
                    PaidDefenceCost = table.Column<long>(type: "bigint", nullable: false),
                    IncurredDamage = table.Column<long>(type: "bigint", nullable: false),
                    IncurredClaimantCost = table.Column<long>(type: "bigint", nullable: false),
                    IncurredDefenceCost = table.Column<long>(type: "bigint", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StatusDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReserveModel", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PaymentModel");

            migrationBuilder.DropTable(
                name: "ReserveModel");
        }
    }
}
