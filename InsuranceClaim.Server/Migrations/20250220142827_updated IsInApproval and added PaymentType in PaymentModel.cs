using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InsuranceClaim.Server.Migrations
{
    /// <inheritdoc />
    public partial class updatedIsInApprovalandaddedPaymentTypeinPaymentModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isInApproved",
                table: "ReserveModel",
                newName: "IsInApproval");

            migrationBuilder.RenameColumn(
                name: "isInApproved",
                table: "PaymentModel",
                newName: "IsInApproval");

            migrationBuilder.AddColumn<string>(
                name: "PaymentType",
                table: "PaymentModel",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentType",
                table: "PaymentModel");

            migrationBuilder.RenameColumn(
                name: "IsInApproval",
                table: "ReserveModel",
                newName: "isInApproved");

            migrationBuilder.RenameColumn(
                name: "IsInApproval",
                table: "PaymentModel",
                newName: "isInApproved");
        }
    }
}
