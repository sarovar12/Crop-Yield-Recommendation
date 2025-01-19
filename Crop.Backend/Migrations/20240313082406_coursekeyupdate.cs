using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Course.Backend.Migrations
{
    /// <inheritdoc />
    public partial class coursekeyupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isDeleted",
                table: "Courses",
                newName: "IsDeleted");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "Courses",
                newName: "isDeleted");
        }
    }
}
