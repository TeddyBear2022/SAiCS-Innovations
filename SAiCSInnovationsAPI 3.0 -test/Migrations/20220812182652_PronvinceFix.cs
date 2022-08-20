using Microsoft.EntityFrameworkCore.Migrations;

namespace SAiCSInnovationsAPI_3._0.Migrations
{
    public partial class PronvinceFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Province",
                table: "Address");

            migrationBuilder.AddColumn<int>(
                name: "ProvinceID",
                table: "Address",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Province",
                columns: table => new
                {
                    ProvinceID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProvinceName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Province", x => x.ProvinceID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Address_ProvinceID",
                table: "Address",
                column: "ProvinceID");

            migrationBuilder.AddForeignKey(
                name: "FK_Address_Province",
                table: "Address",
                column: "ProvinceID",
                principalTable: "Province",
                principalColumn: "ProvinceID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Address_Province",
                table: "Address");

            migrationBuilder.DropTable(
                name: "Province");

            migrationBuilder.DropIndex(
                name: "IX_Address_ProvinceID",
                table: "Address");

            migrationBuilder.DropColumn(
                name: "ProvinceID",
                table: "Address");

            migrationBuilder.AddColumn<string>(
                name: "Province",
                table: "Address",
                type: "varchar(30)",
                unicode: false,
                maxLength: 30,
                nullable: true);
        }
    }
}
