using Microsoft.EntityFrameworkCore.Migrations;

namespace SAiCSInnovationsAPI_3._0.Migrations
{
    public partial class FAQFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FAQ_FAQType",
                table: "FAQ");

            migrationBuilder.RenameColumn(
                name: "FAQTypeID",
                table: "FAQ",
                newName: "FaqcategoryID");

            migrationBuilder.RenameIndex(
                name: "IX_FAQ_FAQTypeID",
                table: "FAQ",
                newName: "IX_FAQ_FaqcategoryID");

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "OrderItem",
                type: "money",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "CartItem",
                type: "money",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_FAQ_FAQType",
                table: "FAQ",
                column: "FaqcategoryID",
                principalTable: "FAQCategory",
                principalColumn: "FAQCategoryID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FAQ_FAQType",
                table: "FAQ");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "OrderItem");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "CartItem");

            migrationBuilder.RenameColumn(
                name: "FaqcategoryID",
                table: "FAQ",
                newName: "FAQTypeID");

            migrationBuilder.RenameIndex(
                name: "IX_FAQ_FaqcategoryID",
                table: "FAQ",
                newName: "IX_FAQ_FAQTypeID");

            migrationBuilder.AddForeignKey(
                name: "FK_FAQ_FAQType",
                table: "FAQ",
                column: "FAQTypeID",
                principalTable: "FAQType",
                principalColumn: "FAQTypeID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
