using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InsuranceClaim.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateddatatypeofId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PaymentModel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PaymentDamage = table.Column<double>(type: "float", nullable: false),
                    PaymentClaimantCost = table.Column<double>(type: "float", nullable: false),
                    PaymentDefenceCost = table.Column<double>(type: "float", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsInApproval = table.Column<bool>(type: "bit", nullable: false),
                    PaymentType = table.Column<string>(type: "nvarchar(max)", nullable: false),
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
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReserveDamage = table.Column<double>(type: "float", nullable: false),
                    ReserveClaimantCost = table.Column<double>(type: "float", nullable: false),
                    ReserveDefenceCost = table.Column<double>(type: "float", nullable: false),
                    PaidDamage = table.Column<double>(type: "float", nullable: false),
                    PaidClaimantCost = table.Column<double>(type: "float", nullable: false),
                    PaidDefenceCost = table.Column<double>(type: "float", nullable: false),
                    IncurredDamage = table.Column<double>(type: "float", nullable: false),
                    IncurredClaimantCost = table.Column<double>(type: "float", nullable: false),
                    IncurredDefenceCost = table.Column<double>(type: "float", nullable: false),
                    IsInApproval = table.Column<bool>(type: "bit", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StatusDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsOverRidden = table.Column<bool>(type: "bit", nullable: false)
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
