using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SAiCSInnovationsAPI_3._0.Migrations
{
    public partial class FinalDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AccessLevel",
                columns: table => new
                {
                    AccessLevelID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccessLevelName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccessLevel", x => x.AccessLevelID);
                });

            migrationBuilder.CreateTable(
                name: "AccountType",
                columns: table => new
                {
                    AccountTypeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountTypeName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountType", x => x.AccountTypeID);
                });

            migrationBuilder.CreateTable(
                name: "AmbassadorType",
                columns: table => new
                {
                    AmbassadorTypeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AmbassadorTypeName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true),
                    DiscountPercentage = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AmbassadorType", x => x.AmbassadorTypeID);
                });

            migrationBuilder.CreateTable(
                name: "ApplicationStatus",
                columns: table => new
                {
                    ApplicationStatusID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StatusName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationStatus", x => x.ApplicationStatusID);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Bank",
                columns: table => new
                {
                    BankID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BankName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bank", x => x.BankID);
                });

            migrationBuilder.CreateTable(
                name: "ContentType",
                columns: table => new
                {
                    ContentTypeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ContentTypeName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContentType", x => x.ContentTypeID);
                });

            migrationBuilder.CreateTable(
                name: "Country",
                columns: table => new
                {
                    CountryID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CountryName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Country", x => x.CountryID);
                });

            migrationBuilder.CreateTable(
                name: "CourseStatus",
                columns: table => new
                {
                    CourseStatusID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CourseStatusName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseStatus", x => x.CourseStatusID);
                });

            migrationBuilder.CreateTable(
                name: "DeliveryAmount",
                columns: table => new
                {
                    DeliveryAmountID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeliveryAmount = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliveryAmount", x => x.DeliveryAmountID);
                });

            migrationBuilder.CreateTable(
                name: "FAQType",
                columns: table => new
                {
                    FAQTypeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FAQTypeName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FAQType", x => x.FAQTypeID);
                });

            migrationBuilder.CreateTable(
                name: "FeedbackType",
                columns: table => new
                {
                    FeedbackTypeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FeedbackTypeName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeedbackType", x => x.FeedbackTypeID);
                });

            migrationBuilder.CreateTable(
                name: "MerchType",
                columns: table => new
                {
                    MerchTypeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MerchTypeName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MerchType", x => x.MerchTypeID);
                });

            migrationBuilder.CreateTable(
                name: "OrderStatus",
                columns: table => new
                {
                    OrderStatusID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderStatusName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderStatus", x => x.OrderStatusID);
                });

            migrationBuilder.CreateTable(
                name: "QuestionBank",
                columns: table => new
                {
                    QuestionBankID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Questions = table.Column<string>(type: "text", nullable: true),
                    Answers = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionBank", x => x.QuestionBankID);
                });

            migrationBuilder.CreateTable(
                name: "ReferralLinkType",
                columns: table => new
                {
                    ReferralLinkTypeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReferralType = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReferralLinkType", x => x.ReferralLinkTypeID);
                });

            migrationBuilder.CreateTable(
                name: "RequestType",
                columns: table => new
                {
                    RequestTypeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RequestTypeName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RequestType", x => x.RequestTypeID);
                });

            migrationBuilder.CreateTable(
                name: "SpecialType",
                columns: table => new
                {
                    SpecialTypeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SpecialTypeName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SpecialType", x => x.SpecialTypeID);
                });

            migrationBuilder.CreateTable(
                name: "Title",
                columns: table => new
                {
                    TitleID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TitleName = table.Column<string>(type: "varchar(6)", unicode: false, maxLength: 6, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Title", x => x.TitleID);
                });

            migrationBuilder.CreateTable(
                name: "VAT",
                columns: table => new
                {
                    VATID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "date", nullable: true),
                    VatPercentage = table.Column<decimal>(type: "decimal(18,3)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VAT", x => x.VATID);
                });

            migrationBuilder.CreateTable(
                name: "UserRole",
                columns: table => new
                {
                    UserRoleID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccessLevelID = table.Column<int>(type: "int", nullable: true),
                    UserRoleName = table.Column<string>(type: "varchar(150)", unicode: false, maxLength: 150, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRole", x => x.UserRoleID);
                    table.ForeignKey(
                        name: "FK_UserRoleID_AccessLevel",
                        column: x => x.AccessLevelID,
                        principalTable: "AccessLevel",
                        principalColumn: "AccessLevelID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BankAccount",
                columns: table => new
                {
                    BankAccountID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountNumber = table.Column<int>(type: "int", nullable: false),
                    BankID = table.Column<int>(type: "int", nullable: true),
                    AccountTypeID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BankAccount", x => x.BankAccountID);
                    table.ForeignKey(
                        name: "FK_BankAccount_AccountType",
                        column: x => x.AccountTypeID,
                        principalTable: "AccountType",
                        principalColumn: "AccountTypeID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BankAccount_Bank",
                        column: x => x.BankID,
                        principalTable: "Bank",
                        principalColumn: "BankID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Delivery",
                columns: table => new
                {
                    DeliveryID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TrackingNumber = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    DeliveryAmountID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Delivery", x => x.DeliveryID);
                    table.ForeignKey(
                        name: "FK_Delivery_DeliveryAmount",
                        column: x => x.DeliveryAmountID,
                        principalTable: "DeliveryAmount",
                        principalColumn: "DeliveryAmountID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FAQ",
                columns: table => new
                {
                    FAQID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FAQTypeID = table.Column<int>(type: "int", nullable: true),
                    FAQQuestion = table.Column<string>(type: "text", nullable: true),
                    FAQAnswers = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FAQ", x => x.FAQID);
                    table.ForeignKey(
                        name: "FK_FAQ_FAQType",
                        column: x => x.FAQTypeID,
                        principalTable: "FAQType",
                        principalColumn: "FAQTypeID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FAQCategory",
                columns: table => new
                {
                    FAQCategoryID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FAQTypeID = table.Column<int>(type: "int", nullable: true),
                    CategoryName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FAQCategory", x => x.FAQCategoryID);
                    table.ForeignKey(
                        name: "FK_FAQCategory_FAQType",
                        column: x => x.FAQTypeID,
                        principalTable: "FAQType",
                        principalColumn: "FAQTypeID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Merchandise",
                columns: table => new
                {
                    MerchandiseID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MerchName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    MerchImage = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true),
                    Status = table.Column<string>(type: "varchar(5)", unicode: false, maxLength: 5, nullable: true),
                    MerchTypeID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Merchandise", x => x.MerchandiseID);
                    table.ForeignKey(
                        name: "FK_Merchandise_MerchType",
                        column: x => x.MerchTypeID,
                        principalTable: "MerchType",
                        principalColumn: "MerchTypeID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Option",
                columns: table => new
                {
                    OptionID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AnswerOption = table.Column<string>(type: "varchar(150)", unicode: false, maxLength: 150, nullable: true),
                    QuestionBankID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Option", x => x.OptionID);
                    table.ForeignKey(
                        name: "FK_Option_QuestionBank",
                        column: x => x.QuestionBankID,
                        principalTable: "QuestionBank",
                        principalColumn: "QuestionBankID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Special",
                columns: table => new
                {
                    SpecialID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SpecialTypeID = table.Column<int>(type: "int", nullable: true),
                    StartDate = table.Column<DateTime>(type: "date", nullable: true),
                    EndDate = table.Column<DateTime>(type: "date", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    SpecialName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    Price = table.Column<decimal>(type: "money", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Special", x => x.SpecialID);
                    table.ForeignKey(
                        name: "FK_Special_SpecialType",
                        column: x => x.SpecialTypeID,
                        principalTable: "SpecialType",
                        principalColumn: "SpecialTypeID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    UserRoleID = table.Column<int>(type: "int", nullable: true),
                    TitleID = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    Surname = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                    table.ForeignKey(
                        name: "FK_User_AspNetUsers_Id",
                        column: x => x.Id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_User_Title",
                        column: x => x.TitleID,
                        principalTable: "Title",
                        principalColumn: "TitleID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_User_UserRoleID",
                        column: x => x.UserRoleID,
                        principalTable: "UserRole",
                        principalColumn: "UserRoleID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Price",
                columns: table => new
                {
                    PriceID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<decimal>(type: "money", nullable: true),
                    Date = table.Column<DateTime>(type: "date", nullable: true),
                    MerchandiseID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Price", x => x.PriceID);
                    table.ForeignKey(
                        name: "FK_Price_Merchandise",
                        column: x => x.MerchandiseID,
                        principalTable: "Merchandise",
                        principalColumn: "MerchandiseID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MerchSpecial",
                columns: table => new
                {
                    MerchSpecialID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MerchandiseID = table.Column<int>(type: "int", nullable: true),
                    SpecialID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MerchSpecial", x => x.MerchSpecialID);
                    table.ForeignKey(
                        name: "FK_MerchSpecial_Merchandise",
                        column: x => x.MerchandiseID,
                        principalTable: "Merchandise",
                        principalColumn: "MerchandiseID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MerchSpecial_Special",
                        column: x => x.SpecialID,
                        principalTable: "Special",
                        principalColumn: "SpecialID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Address",
                columns: table => new
                {
                    AddressID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CountryID = table.Column<int>(type: "int", nullable: true),
                    UserID = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Address = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    PostalCode = table.Column<int>(type: "int", nullable: true),
                    City = table.Column<string>(type: "varchar(25)", unicode: false, maxLength: 25, nullable: true),
                    RecipientNumber = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Address", x => x.AddressID);
                    table.ForeignKey(
                        name: "FK_Address_Country",
                        column: x => x.CountryID,
                        principalTable: "Country",
                        principalColumn: "CountryID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Address_User",
                        column: x => x.UserID,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Admin",
                columns: table => new
                {
                    AdminID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    IDNumber = table.Column<int>(type: "int", nullable: true),
                    IDDocument = table.Column<string>(type: "varchar(500)", unicode: false, maxLength: 500, nullable: true),
                    ProofOfAddress = table.Column<string>(type: "varchar(500)", unicode: false, maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admin", x => x.AdminID);
                    table.ForeignKey(
                        name: "FK_Admin_User",
                        column: x => x.UserID,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Ambassador",
                columns: table => new
                {
                    AmbassadorID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BankAccountID = table.Column<int>(type: "int", nullable: true),
                    UserID = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    AmbassadorTypeID = table.Column<int>(type: "int", nullable: true),
                    IDNumber = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true),
                    IDPhoto = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true),
                    ProofOfAddress = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    AliasName = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ambassador", x => x.AmbassadorID);
                    table.ForeignKey(
                        name: "FK_Ambassador_AmbassadorType",
                        column: x => x.AmbassadorTypeID,
                        principalTable: "AmbassadorType",
                        principalColumn: "AmbassadorTypeID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Ambassador_BankAccount",
                        column: x => x.BankAccountID,
                        principalTable: "BankAccount",
                        principalColumn: "BankAccountID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Ambassador_User",
                        column: x => x.UserID,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Application",
                columns: table => new
                {
                    ApplicationID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ApplicationStatusID = table.Column<int>(type: "int", nullable: true),
                    UserID = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Date = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Application", x => x.ApplicationID);
                    table.ForeignKey(
                        name: "FK_Application_ApplicationStatus",
                        column: x => x.ApplicationStatusID,
                        principalTable: "ApplicationStatus",
                        principalColumn: "ApplicationStatusID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Application_User",
                        column: x => x.UserID,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Cart",
                columns: table => new
                {
                    CartID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cart", x => x.CartID);
                    table.ForeignKey(
                        name: "FK_Cart_User",
                        column: x => x.UserID,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Password",
                columns: table => new
                {
                    PasswordID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Password = table.Column<string>(type: "varchar(150)", unicode: false, maxLength: 150, nullable: true),
                    DateSet = table.Column<DateTime>(type: "date", nullable: true),
                    ResetPasswordLink = table.Column<string>(type: "varchar(150)", unicode: false, maxLength: 150, nullable: true),
                    HashedOTP = table.Column<string>(type: "varchar(64)", unicode: false, maxLength: 64, nullable: true),
                    OTPExpireTime = table.Column<DateTime>(type: "date", nullable: true),
                    UserID = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Password", x => x.PasswordID);
                    table.ForeignKey(
                        name: "FK_Password_User",
                        column: x => x.UserID,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Course",
                columns: table => new
                {
                    CourseID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AdminID = table.Column<int>(type: "int", nullable: true),
                    CourseStatusID = table.Column<int>(type: "int", nullable: true),
                    CourseName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Course", x => x.CourseID);
                    table.ForeignKey(
                        name: "FK_Course_Admin",
                        column: x => x.AdminID,
                        principalTable: "Admin",
                        principalColumn: "AdminID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Course_CourseStatus",
                        column: x => x.CourseStatusID,
                        principalTable: "CourseStatus",
                        principalColumn: "CourseStatusID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AuditTrail",
                columns: table => new
                {
                    AuditTrailID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AdminID = table.Column<int>(type: "int", nullable: true),
                    AmbassadorID = table.Column<int>(type: "int", nullable: true),
                    Audit_Log_Description = table.Column<string>(type: "text", nullable: true),
                    Audit_Log_Datestamp = table.Column<DateTime>(type: "date", nullable: true),
                    Audit_Log_Timestamp = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditTrail", x => x.AuditTrailID);
                    table.ForeignKey(
                        name: "FK_AuditTrail_Admin",
                        column: x => x.AdminID,
                        principalTable: "Admin",
                        principalColumn: "AdminID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AuditTrail_Ambassador",
                        column: x => x.AmbassadorID,
                        principalTable: "Ambassador",
                        principalColumn: "AmbassadorID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Certificate",
                columns: table => new
                {
                    CertificateID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CertificateDescription = table.Column<string>(type: "text", nullable: true),
                    CertificateName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    AmbassadorID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Certificate", x => x.CertificateID);
                    table.ForeignKey(
                        name: "FK_Certificate_Ambassador",
                        column: x => x.AmbassadorID,
                        principalTable: "Ambassador",
                        principalColumn: "AmbassadorID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Client",
                columns: table => new
                {
                    ClientID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    AmbassadorID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Client", x => x.ClientID);
                    table.ForeignKey(
                        name: "FK_Client_Ambassador",
                        column: x => x.AmbassadorID,
                        principalTable: "Ambassador",
                        principalColumn: "AmbassadorID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Client_User",
                        column: x => x.UserID,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PositionRequest",
                columns: table => new
                {
                    PositionRequestID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AmbassadorID = table.Column<int>(type: "int", nullable: true),
                    RequestTypeID = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PositionRequest", x => x.PositionRequestID);
                    table.ForeignKey(
                        name: "FK_PositionRequest_Ambassador",
                        column: x => x.AmbassadorID,
                        principalTable: "Ambassador",
                        principalColumn: "AmbassadorID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PositionRequest_RequestType",
                        column: x => x.RequestTypeID,
                        principalTable: "RequestType",
                        principalColumn: "RequestTypeID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ReferralCode",
                columns: table => new
                {
                    ReferralCodeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReferralCode = table.Column<string>(type: "varchar(500)", unicode: false, maxLength: 500, nullable: true),
                    IsActive = table.Column<string>(type: "varchar(5)", unicode: false, maxLength: 5, nullable: true),
                    AmbassadorID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReferralCode", x => x.ReferralCodeID);
                    table.ForeignKey(
                        name: "FK_ReferralCode_Ambassador",
                        column: x => x.AmbassadorID,
                        principalTable: "Ambassador",
                        principalColumn: "AmbassadorID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Target",
                columns: table => new
                {
                    TargetID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Target = table.Column<decimal>(type: "money", nullable: true),
                    StartDate = table.Column<DateTime>(type: "date", nullable: true),
                    EndDate = table.Column<DateTime>(type: "date", nullable: true),
                    AmbassadorID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Target", x => x.TargetID);
                    table.ForeignKey(
                        name: "FK_Target_Ambassador",
                        column: x => x.AmbassadorID,
                        principalTable: "Ambassador",
                        principalColumn: "AmbassadorID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CartItem",
                columns: table => new
                {
                    CartItemID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MerchandiseID = table.Column<int>(type: "int", nullable: true),
                    SpecialID = table.Column<int>(type: "int", nullable: true),
                    CartID = table.Column<int>(type: "int", nullable: true),
                    Quantity = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CartItem", x => x.CartItemID);
                    table.ForeignKey(
                        name: "FK_CartItem_Cart",
                        column: x => x.CartID,
                        principalTable: "Cart",
                        principalColumn: "CartID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CartItem_Merchandise",
                        column: x => x.MerchandiseID,
                        principalTable: "Merchandise",
                        principalColumn: "MerchandiseID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CartItem_Special",
                        column: x => x.SpecialID,
                        principalTable: "Special",
                        principalColumn: "SpecialID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Order",
                columns: table => new
                {
                    OrderID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    OrderStatusID = table.Column<int>(type: "int", nullable: true),
                    AddressID = table.Column<int>(type: "int", nullable: true),
                    CartID = table.Column<int>(type: "int", nullable: true),
                    ProofOfPayment = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    DeliveryID = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order", x => x.OrderID);
                    table.ForeignKey(
                        name: "FK_Order_Address",
                        column: x => x.AddressID,
                        principalTable: "Address",
                        principalColumn: "AddressID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Order_Cart",
                        column: x => x.CartID,
                        principalTable: "Cart",
                        principalColumn: "CartID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Order_Delivery",
                        column: x => x.DeliveryID,
                        principalTable: "Delivery",
                        principalColumn: "DeliveryID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Order_OrderStatus",
                        column: x => x.OrderStatusID,
                        principalTable: "OrderStatus",
                        principalColumn: "OrderStatusID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Order_User",
                        column: x => x.UserID,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AmbassadorEnrollment",
                columns: table => new
                {
                    AmbassadorEnrollmentID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CourseID = table.Column<int>(type: "int", nullable: true),
                    AmbassadorID = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AmbassadorEnrollment", x => x.AmbassadorEnrollmentID);
                    table.ForeignKey(
                        name: "FK_AmbassadorEnrollment_Ambassador",
                        column: x => x.AmbassadorID,
                        principalTable: "Ambassador",
                        principalColumn: "AmbassadorID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AmbassadorEnrollment_Course",
                        column: x => x.CourseID,
                        principalTable: "Course",
                        principalColumn: "CourseID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Section",
                columns: table => new
                {
                    SectionID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SectionName = table.Column<string>(type: "varchar(500)", unicode: false, maxLength: 500, nullable: true),
                    CourseID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Section", x => x.SectionID);
                    table.ForeignKey(
                        name: "FK_Section_Course",
                        column: x => x.CourseID,
                        principalTable: "Course",
                        principalColumn: "CourseID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Feedback",
                columns: table => new
                {
                    FeedbackID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AmbassadorID = table.Column<int>(type: "int", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    MerchandiseID = table.Column<int>(type: "int", nullable: true),
                    FeedbackTypeID = table.Column<int>(type: "int", nullable: true),
                    ClientID = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedback", x => x.FeedbackID);
                    table.ForeignKey(
                        name: "FK_Feedback_Ambassador",
                        column: x => x.AmbassadorID,
                        principalTable: "Ambassador",
                        principalColumn: "AmbassadorID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Feedback_Client",
                        column: x => x.ClientID,
                        principalTable: "Client",
                        principalColumn: "ClientID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Feedback_FeedbackType",
                        column: x => x.FeedbackTypeID,
                        principalTable: "FeedbackType",
                        principalColumn: "FeedbackTypeID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Feedback_Merchandise",
                        column: x => x.MerchandiseID,
                        principalTable: "Merchandise",
                        principalColumn: "MerchandiseID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Referral",
                columns: table => new
                {
                    ReferralID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReferralCodeID = table.Column<int>(type: "int", nullable: true),
                    UserID = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ReferralLinkTypeID = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Referral", x => x.ReferralID);
                    table.ForeignKey(
                        name: "FK_Referral_Referral",
                        column: x => x.ReferralLinkTypeID,
                        principalTable: "ReferralLinkType",
                        principalColumn: "ReferralLinkTypeID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Referral_ReferralCode",
                        column: x => x.ReferralCodeID,
                        principalTable: "ReferralCode",
                        principalColumn: "ReferralCodeID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Referral_User",
                        column: x => x.UserID,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OrderItem",
                columns: table => new
                {
                    OrderItemID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MerchandiseID = table.Column<int>(type: "int", nullable: true),
                    SpecialID = table.Column<int>(type: "int", nullable: true),
                    OrderID = table.Column<int>(type: "int", nullable: true),
                    Quantity = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItem", x => x.OrderItemID);
                    table.ForeignKey(
                        name: "FK_OrderItem_Merchandise",
                        column: x => x.MerchandiseID,
                        principalTable: "Merchandise",
                        principalColumn: "MerchandiseID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OrderItem_Order",
                        column: x => x.OrderID,
                        principalTable: "Order",
                        principalColumn: "OrderID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OrderItem_Special",
                        column: x => x.SpecialID,
                        principalTable: "Special",
                        principalColumn: "SpecialID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Content",
                columns: table => new
                {
                    ContentID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ContentTypeID = table.Column<int>(type: "int", nullable: true),
                    ContentUpload = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    SectionID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Content", x => x.ContentID);
                    table.ForeignKey(
                        name: "FK_Content_ContentType",
                        column: x => x.ContentTypeID,
                        principalTable: "ContentType",
                        principalColumn: "ContentTypeID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Content_Section",
                        column: x => x.SectionID,
                        principalTable: "Section",
                        principalColumn: "SectionID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Quiz",
                columns: table => new
                {
                    QuizID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuestionBankID = table.Column<int>(type: "int", nullable: true),
                    QuizName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true),
                    QuizDescription = table.Column<string>(type: "text", nullable: true),
                    SectionID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quiz", x => x.QuizID);
                    table.ForeignKey(
                        name: "FK_Quiz_QuestionBank",
                        column: x => x.QuestionBankID,
                        principalTable: "QuestionBank",
                        principalColumn: "QuestionBankID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Quiz_Section",
                        column: x => x.SectionID,
                        principalTable: "Section",
                        principalColumn: "SectionID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Address_CountryID",
                table: "Address",
                column: "CountryID");

            migrationBuilder.CreateIndex(
                name: "IX_Address_UserID",
                table: "Address",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Admin_UserID",
                table: "Admin",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Ambassador_AmbassadorTypeID",
                table: "Ambassador",
                column: "AmbassadorTypeID");

            migrationBuilder.CreateIndex(
                name: "IX_Ambassador_BankAccountID",
                table: "Ambassador",
                column: "BankAccountID");

            migrationBuilder.CreateIndex(
                name: "IX_Ambassador_UserID",
                table: "Ambassador",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_AmbassadorEnrollment_AmbassadorID",
                table: "AmbassadorEnrollment",
                column: "AmbassadorID");

            migrationBuilder.CreateIndex(
                name: "IX_AmbassadorEnrollment_CourseID",
                table: "AmbassadorEnrollment",
                column: "CourseID");

            migrationBuilder.CreateIndex(
                name: "IX_Application_ApplicationStatusID",
                table: "Application",
                column: "ApplicationStatusID");

            migrationBuilder.CreateIndex(
                name: "IX_Application_UserID",
                table: "Application",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AuditTrail_AdminID",
                table: "AuditTrail",
                column: "AdminID");

            migrationBuilder.CreateIndex(
                name: "IX_AuditTrail_AmbassadorID",
                table: "AuditTrail",
                column: "AmbassadorID");

            migrationBuilder.CreateIndex(
                name: "IX_BankAccount_AccountTypeID",
                table: "BankAccount",
                column: "AccountTypeID");

            migrationBuilder.CreateIndex(
                name: "IX_BankAccount_BankID",
                table: "BankAccount",
                column: "BankID");

            migrationBuilder.CreateIndex(
                name: "IX_Cart_UserID",
                table: "Cart",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_CartItem_CartID",
                table: "CartItem",
                column: "CartID");

            migrationBuilder.CreateIndex(
                name: "IX_CartItem_MerchandiseID",
                table: "CartItem",
                column: "MerchandiseID");

            migrationBuilder.CreateIndex(
                name: "IX_CartItem_SpecialID",
                table: "CartItem",
                column: "SpecialID");

            migrationBuilder.CreateIndex(
                name: "IX_Certificate_AmbassadorID",
                table: "Certificate",
                column: "AmbassadorID");

            migrationBuilder.CreateIndex(
                name: "IX_Client_AmbassadorID",
                table: "Client",
                column: "AmbassadorID");

            migrationBuilder.CreateIndex(
                name: "IX_Client_UserID",
                table: "Client",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Content_ContentTypeID",
                table: "Content",
                column: "ContentTypeID");

            migrationBuilder.CreateIndex(
                name: "IX_Content_SectionID",
                table: "Content",
                column: "SectionID");

            migrationBuilder.CreateIndex(
                name: "IX_Course_AdminID",
                table: "Course",
                column: "AdminID");

            migrationBuilder.CreateIndex(
                name: "IX_Course_CourseStatusID",
                table: "Course",
                column: "CourseStatusID");

            migrationBuilder.CreateIndex(
                name: "IX_Delivery_DeliveryAmountID",
                table: "Delivery",
                column: "DeliveryAmountID");

            migrationBuilder.CreateIndex(
                name: "IX_FAQ_FAQTypeID",
                table: "FAQ",
                column: "FAQTypeID");

            migrationBuilder.CreateIndex(
                name: "IX_FAQCategory_FAQTypeID",
                table: "FAQCategory",
                column: "FAQTypeID");

            migrationBuilder.CreateIndex(
                name: "IX_Feedback_AmbassadorID",
                table: "Feedback",
                column: "AmbassadorID");

            migrationBuilder.CreateIndex(
                name: "IX_Feedback_ClientID",
                table: "Feedback",
                column: "ClientID");

            migrationBuilder.CreateIndex(
                name: "IX_Feedback_FeedbackTypeID",
                table: "Feedback",
                column: "FeedbackTypeID");

            migrationBuilder.CreateIndex(
                name: "IX_Feedback_MerchandiseID",
                table: "Feedback",
                column: "MerchandiseID");

            migrationBuilder.CreateIndex(
                name: "IX_Merchandise_MerchTypeID",
                table: "Merchandise",
                column: "MerchTypeID");

            migrationBuilder.CreateIndex(
                name: "IX_MerchSpecial_MerchandiseID",
                table: "MerchSpecial",
                column: "MerchandiseID");

            migrationBuilder.CreateIndex(
                name: "IX_MerchSpecial_SpecialID",
                table: "MerchSpecial",
                column: "SpecialID");

            migrationBuilder.CreateIndex(
                name: "IX_Option_QuestionBankID",
                table: "Option",
                column: "QuestionBankID");

            migrationBuilder.CreateIndex(
                name: "IX_Order_AddressID",
                table: "Order",
                column: "AddressID");

            migrationBuilder.CreateIndex(
                name: "IX_Order_CartID",
                table: "Order",
                column: "CartID");

            migrationBuilder.CreateIndex(
                name: "IX_Order_DeliveryID",
                table: "Order",
                column: "DeliveryID");

            migrationBuilder.CreateIndex(
                name: "IX_Order_OrderStatusID",
                table: "Order",
                column: "OrderStatusID");

            migrationBuilder.CreateIndex(
                name: "IX_Order_UserID",
                table: "Order",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItem_MerchandiseID",
                table: "OrderItem",
                column: "MerchandiseID");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItem_OrderID",
                table: "OrderItem",
                column: "OrderID");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItem_SpecialID",
                table: "OrderItem",
                column: "SpecialID");

            migrationBuilder.CreateIndex(
                name: "IX_Password_UserID",
                table: "Password",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_PositionRequest_AmbassadorID",
                table: "PositionRequest",
                column: "AmbassadorID");

            migrationBuilder.CreateIndex(
                name: "IX_PositionRequest_RequestTypeID",
                table: "PositionRequest",
                column: "RequestTypeID");

            migrationBuilder.CreateIndex(
                name: "IX_Price_MerchandiseID",
                table: "Price",
                column: "MerchandiseID");

            migrationBuilder.CreateIndex(
                name: "IX_Quiz_QuestionBankID",
                table: "Quiz",
                column: "QuestionBankID");

            migrationBuilder.CreateIndex(
                name: "IX_Quiz_SectionID",
                table: "Quiz",
                column: "SectionID");

            migrationBuilder.CreateIndex(
                name: "IX_Referral_ReferralCodeID",
                table: "Referral",
                column: "ReferralCodeID");

            migrationBuilder.CreateIndex(
                name: "IX_Referral_ReferralLinkTypeID",
                table: "Referral",
                column: "ReferralLinkTypeID");

            migrationBuilder.CreateIndex(
                name: "IX_Referral_UserID",
                table: "Referral",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_ReferralCode_AmbassadorID",
                table: "ReferralCode",
                column: "AmbassadorID");

            migrationBuilder.CreateIndex(
                name: "IX_Section_CourseID",
                table: "Section",
                column: "CourseID");

            migrationBuilder.CreateIndex(
                name: "IX_Special_SpecialTypeID",
                table: "Special",
                column: "SpecialTypeID");

            migrationBuilder.CreateIndex(
                name: "IX_Target_AmbassadorID",
                table: "Target",
                column: "AmbassadorID");

            migrationBuilder.CreateIndex(
                name: "IX_User_TitleID",
                table: "User",
                column: "TitleID");

            migrationBuilder.CreateIndex(
                name: "IX_User_UserRoleID",
                table: "User",
                column: "UserRoleID");

            migrationBuilder.CreateIndex(
                name: "IX_UserRole_AccessLevelID",
                table: "UserRole",
                column: "AccessLevelID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AmbassadorEnrollment");

            migrationBuilder.DropTable(
                name: "Application");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "AuditTrail");

            migrationBuilder.DropTable(
                name: "CartItem");

            migrationBuilder.DropTable(
                name: "Certificate");

            migrationBuilder.DropTable(
                name: "Content");

            migrationBuilder.DropTable(
                name: "FAQ");

            migrationBuilder.DropTable(
                name: "FAQCategory");

            migrationBuilder.DropTable(
                name: "Feedback");

            migrationBuilder.DropTable(
                name: "MerchSpecial");

            migrationBuilder.DropTable(
                name: "Option");

            migrationBuilder.DropTable(
                name: "OrderItem");

            migrationBuilder.DropTable(
                name: "Password");

            migrationBuilder.DropTable(
                name: "PositionRequest");

            migrationBuilder.DropTable(
                name: "Price");

            migrationBuilder.DropTable(
                name: "Quiz");

            migrationBuilder.DropTable(
                name: "Referral");

            migrationBuilder.DropTable(
                name: "Target");

            migrationBuilder.DropTable(
                name: "VAT");

            migrationBuilder.DropTable(
                name: "ApplicationStatus");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "ContentType");

            migrationBuilder.DropTable(
                name: "FAQType");

            migrationBuilder.DropTable(
                name: "Client");

            migrationBuilder.DropTable(
                name: "FeedbackType");

            migrationBuilder.DropTable(
                name: "Order");

            migrationBuilder.DropTable(
                name: "Special");

            migrationBuilder.DropTable(
                name: "RequestType");

            migrationBuilder.DropTable(
                name: "Merchandise");

            migrationBuilder.DropTable(
                name: "QuestionBank");

            migrationBuilder.DropTable(
                name: "Section");

            migrationBuilder.DropTable(
                name: "ReferralLinkType");

            migrationBuilder.DropTable(
                name: "ReferralCode");

            migrationBuilder.DropTable(
                name: "Address");

            migrationBuilder.DropTable(
                name: "Cart");

            migrationBuilder.DropTable(
                name: "Delivery");

            migrationBuilder.DropTable(
                name: "OrderStatus");

            migrationBuilder.DropTable(
                name: "SpecialType");

            migrationBuilder.DropTable(
                name: "MerchType");

            migrationBuilder.DropTable(
                name: "Course");

            migrationBuilder.DropTable(
                name: "Ambassador");

            migrationBuilder.DropTable(
                name: "Country");

            migrationBuilder.DropTable(
                name: "DeliveryAmount");

            migrationBuilder.DropTable(
                name: "Admin");

            migrationBuilder.DropTable(
                name: "CourseStatus");

            migrationBuilder.DropTable(
                name: "AmbassadorType");

            migrationBuilder.DropTable(
                name: "BankAccount");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "AccountType");

            migrationBuilder.DropTable(
                name: "Bank");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Title");

            migrationBuilder.DropTable(
                name: "UserRole");

            migrationBuilder.DropTable(
                name: "AccessLevel");
        }
    }
}
