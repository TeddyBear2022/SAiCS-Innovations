using Microsoft.EntityFrameworkCore.Migrations;

namespace SAiCSInnovationsAPI_3._0.Migrations
{
    public partial class OrderMerchCat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MerchCategoryId",
                table: "Merchandise",
                newName: "MerchCategoryID");

            migrationBuilder.RenameIndex(
                name: "IX_Merchandise_MerchCategoryId",
                table: "Merchandise",
                newName: "IX_Merchandise_MerchCategoryID");

            migrationBuilder.AddColumn<int>(
                name: "AmbassadorID",
                table: "Order",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Order_AmbassadorID",
                table: "Order",
                column: "AmbassadorID");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Ambassador",
                table: "Order",
                column: "AmbassadorID",
                principalTable: "Ambassador",
                principalColumn: "AmbassadorID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Ambassador",
                table: "Order");

            migrationBuilder.DropIndex(
                name: "IX_Order_AmbassadorID",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "AmbassadorID",
                table: "Order");

            migrationBuilder.RenameColumn(
                name: "MerchCategoryID",
                table: "Merchandise",
                newName: "MerchCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Merchandise_MerchCategoryID",
                table: "Merchandise",
                newName: "IX_Merchandise_MerchCategoryId");
        }
    }
}
