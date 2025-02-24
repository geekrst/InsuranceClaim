using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InsuranceClaim.Server.Migrations
{
    /// <inheritdoc />
    public partial class addedIsOverRiddentoReserveModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsOverRidden",
                table: "ReserveModel",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsOverRidden",
                table: "ReserveModel");
        }
    }
}
