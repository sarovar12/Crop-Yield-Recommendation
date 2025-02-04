using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Course.Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddCropRecommendationAndRainfallTbl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Courses");

            migrationBuilder.CreateTable(
                name: "CropRecommendations",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Latitude = table.Column<float>(type: "REAL", nullable: true),
                    Longitude = table.Column<float>(type: "REAL", nullable: true),
                    Rainfall = table.Column<float>(type: "REAL", nullable: false),
                    Humidity = table.Column<float>(type: "REAL", nullable: false),
                    Temperature = table.Column<float>(type: "REAL", nullable: false),
                    Nitrogen = table.Column<float>(type: "REAL", nullable: false),
                    Phosphorus = table.Column<float>(type: "REAL", nullable: false),
                    Potassium = table.Column<float>(type: "REAL", nullable: false),
                    PhValue = table.Column<float>(type: "REAL", nullable: false),
                    Recommendation = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CropRecommendations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RainfallData",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DistrictName = table.Column<string>(type: "TEXT", nullable: false),
                    Latitude = table.Column<float>(type: "REAL", nullable: false),
                    Longitude = table.Column<float>(type: "REAL", nullable: false),
                    AverageRainfall = table.Column<float>(type: "REAL", nullable: false),
                    AverageHumidity = table.Column<float>(type: "REAL", nullable: false),
                    AverageTemperature = table.Column<float>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RainfallData", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CropRecommendations");

            migrationBuilder.DropTable(
                name: "RainfallData");

            migrationBuilder.CreateTable(
                name: "Courses",
                columns: table => new
                {
                    CourseId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CourseDescription = table.Column<string>(type: "TEXT", nullable: false),
                    CourseName = table.Column<string>(type: "TEXT", nullable: false),
                    IsDeleted = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Courses", x => x.CourseId);
                });
        }
    }
}
