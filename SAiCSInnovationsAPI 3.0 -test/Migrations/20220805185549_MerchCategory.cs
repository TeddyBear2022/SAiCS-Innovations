using Microsoft.EntityFrameworkCore.Migrations;

namespace SAiCSInnovationsAPI_3._0.Migrations
{
    public partial class MerchCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MerchCategoryId",
                table: "Merchandise",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "IDNumber",
                table: "Admin",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "MerchCategory",
                columns: table => new
                {
                    MerchCategoryID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MerchCategoryName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MerchCategory", x => x.MerchCategoryID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Merchandise_MerchCategoryId",
                table: "Merchandise",
                column: "MerchCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Merchandise_MerchCategory",
                table: "Merchandise",
                column: "MerchCategoryId",
                principalTable: "MerchCategory",
                principalColumn: "MerchCategoryID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Merchandise_MerchCategory",
                table: "Merchandise");

            migrationBuilder.DropTable(
                name: "MerchCategory");

            migrationBuilder.DropIndex(
                name: "IX_Merchandise_MerchCategoryId",
                table: "Merchandise");

            migrationBuilder.DropColumn(
                name: "MerchCategoryId",
                table: "Merchandise");

            migrationBuilder.AlterColumn<int>(
                name: "IDNumber",
                table: "Admin",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
