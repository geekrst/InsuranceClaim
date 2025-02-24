using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InsuranceClaim.Server.Migrations
{
    /// <inheritdoc />
    public partial class addedisInApprovedcolumntomodels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isInApproved",
                table: "ReserveModel",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "isInApproved",
                table: "PaymentModel",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isInApproved",
                table: "ReserveModel");

            migrationBuilder.DropColumn(
                name: "isInApproved",
                table: "PaymentModel");
        }
    }
}
