using Microsoft.EntityFrameworkCore.Migrations;

namespace SAiCSInnovationsAPI_3._0.Migrations
{
    public partial class ReportUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Merchandise");

            migrationBuilder.AddColumn<int>(
                name: "MerchStatusID",
                table: "Merchandise",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Province",
                table: "Address",
                type: "varchar(30)",
                unicode: false,
                maxLength: 30,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "MerchStatus",
                columns: table => new
                {
                    MerchStatusID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MerchStatusName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MerchStatus", x => x.MerchStatusID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Merchandise_MerchStatusID",
                table: "Merchandise",
                column: "MerchStatusID");

            migrationBuilder.AddForeignKey(
                name: "FK_Merchandise_MerchStatus",
                table: "Merchandise",
                column: "MerchStatusID",
                principalTable: "MerchStatus",
                principalColumn: "MerchStatusID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Merchandise_MerchStatus",
                table: "Merchandise");

            migrationBuilder.DropTable(
                name: "MerchStatus");

            migrationBuilder.DropIndex(
                name: "IX_Merchandise_MerchStatusID",
                table: "Merchandise");

            migrationBuilder.DropColumn(
                name: "MerchStatusID",
                table: "Merchandise");

            migrationBuilder.DropColumn(
                name: "Province",
                table: "Address");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Merchandise",
                type: "varchar(5)",
                unicode: false,
                maxLength: 5,
                nullable: true);
        }
    }
}
