using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Course.Backend.Migrations
{
    /// <inheritdoc />
    public partial class ModifyCropRecommendationTbl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Recommendation",
                table: "CropRecommendations",
                newName: "RandomForestRecommendation");

            migrationBuilder.AddColumn<string>(
                name: "GradientBoostingRecommendation",
                table: "CropRecommendations",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GradientBoostingRecommendation",
                table: "CropRecommendations");

            migrationBuilder.RenameColumn(
                name: "RandomForestRecommendation",
                table: "CropRecommendations",
                newName: "Recommendation");
        }
    }
}
