using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class SaicsInnovationsDBContext : IdentityDbContext<User>
    {
        public SaicsInnovationsDBContext()
        {
        }

        public SaicsInnovationsDBContext(DbContextOptions<SaicsInnovationsDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AccessLevel> AccessLevels { get; set; }
        public virtual DbSet<AccountType> AccountTypes { get; set; }
        public virtual DbSet<Address> Addresses { get; set; }
        public virtual DbSet<Admin> Admins { get; set; }
        public virtual DbSet<Ambassador> Ambassadors { get; set; }
        public virtual DbSet<AmbassadorEnrollment> AmbassadorEnrollments { get; set; }
        public virtual DbSet<AmbassadorType> AmbassadorTypes { get; set; }
        public virtual DbSet<Application> Applications { get; set; }
        public virtual DbSet<ApplicationStatus> ApplicationStatuses { get; set; }
        public virtual DbSet<AuditTrail> AuditTrails { get; set; }
        public virtual DbSet<Bank> Banks { get; set; }
        public virtual DbSet<BankAccount> BankAccounts { get; set; }
        public virtual DbSet<Cart> Carts { get; set; }
        public virtual DbSet<CartItem> CartItems { get; set; }
        public virtual DbSet<Certificate> Certificates { get; set; }
        public virtual DbSet<Client> Clients { get; set; }
        public virtual DbSet<Content> Contents { get; set; }
        //public virtual DbSet<ContentType> ContentTypes { get; set; }
        public virtual DbSet<Country> Countries { get; set; }
        public virtual DbSet<Course> Courses { get; set; }
        public virtual DbSet<CourseStatus> CourseStatuses { get; set; }
        public virtual DbSet<Delivery> Deliveries { get; set; }
        public virtual DbSet<DeliveryAmount> DeliveryAmounts { get; set; }
        public virtual DbSet<Faq> Faqs { get; set; }
        public virtual DbSet<Faqcategory> Faqcategories { get; set; }
        public virtual DbSet<Faqtype> Faqtypes { get; set; }
        public virtual DbSet<Feedback> Feedbacks { get; set; }
        public virtual DbSet<FeedbackType> FeedbackTypes { get; set; }
        public virtual DbSet<MerchCategory> MerchCategories { get; set; }
        public virtual DbSet<MerchSpecial> MerchSpecials { get; set; }
        public virtual DbSet<MerchStatus> MerchStatuses { get; set; }
        public virtual DbSet<MerchType> MerchTypes { get; set; }
        public virtual DbSet<Merchandise> Merchandises { get; set; }
        public virtual DbSet<Option> Options { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderItem> OrderItems { get; set; }
        public virtual DbSet<OrderStatus> OrderStatuses { get; set; }
        public virtual DbSet<Password> Passwords { get; set; }
        public virtual DbSet<Province> Provinces { get; set; }
        public virtual DbSet<PositionRequest> PositionRequests { get; set; }
        public virtual DbSet<Price> Prices { get; set; }
        public virtual DbSet<QuestionBank> QuestionBanks { get; set; }
        public virtual DbSet<Quiz> Quizzes { get; set; }
        public virtual DbSet<Referral> Referrals { get; set; }
        public virtual DbSet<ReferralCode> ReferralCodes { get; set; }
        public virtual DbSet<ReferralLinkType> ReferralLinkTypes { get; set; }
        public virtual DbSet<RequestType> RequestTypes { get; set; }
        public virtual DbSet<SectionContent> SectionContents { get; set; }
        public virtual DbSet<Special> Specials { get; set; }
        public virtual DbSet<SpecialType> SpecialTypes { get; set; }
        public virtual DbSet<Target> Targets { get; set; }
        public virtual DbSet<Title> Titles { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserRole> UserRoles { get; set; }
        public virtual DbSet<Vat> Vats { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=LAPTOP-4KPHVJPB\\SQLEXPRESS02;Database=SaicsInnovationsDB;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Latin1_General_CI_AS");

            modelBuilder.Entity<AccessLevel>(entity =>
            {
                entity.ToTable("AccessLevel");

                entity.Property(e => e.AccessLevelId).HasColumnName("AccessLevelID");

                entity.Property(e => e.AccessLevelName)
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<AccountType>(entity =>
            {
                entity.ToTable("AccountType");

                entity.Property(e => e.AccountTypeId).HasColumnName("AccountTypeID");

                entity.Property(e => e.AccountTypeName)
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Address>(entity =>
            {
                entity.ToTable("Address");

                entity.Property(e => e.AddressId)
                                .IsRequired()
                                .ValueGeneratedOnAdd()
                                .UseIdentityColumn()
                                .HasColumnName("AddressID");

                entity.Property(e => e.Address1)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Address");

                entity.Property(e => e.City)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.ProvinceId).HasColumnName("ProvinceID");

                entity.Property(e => e.CountryId).HasColumnName("CountryID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.Addresses)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("FK_Address_Country");

                entity.HasOne(d => d.Province)
                    .WithMany(p => p.Addresses)
                    .HasForeignKey(d => d.ProvinceId)
                    .HasConstraintName("FK_Address_Province");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Addresses)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Address_User");
            });

            modelBuilder.Entity<Admin>(entity =>
            {
                entity.ToTable("Admin");

                entity.Property(e => e.AdminId).HasColumnName("AdminID");

                entity.Property(e => e.Iddocument)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("IDDocument");

                entity.Property(e => e.Idnumber).HasColumnName("IDNumber");

                entity.Property(e => e.ProofOfAddress)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Admins)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Admin_User");
            });

            modelBuilder.Entity<Ambassador>(entity =>
            {
                entity.ToTable("Ambassador");

                entity.Property(e => e.AmbassadorId).HasColumnName("AmbassadorID");

                entity.Property(e => e.AliasName)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.AmbassadorTypeId).HasColumnName("AmbassadorTypeID");

                entity.Property(e => e.BankAccountId).HasColumnName("BankAccountID");

                entity.Property(e => e.Idnumber)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("IDNumber");

                entity.Property(e => e.Idphoto)
                    .IsUnicode(false)
                    .HasColumnName("IDPhoto");

                entity.Property(e => e.UserId).HasColumnName("UserID");
                entity.Property(e => e.Motivation).HasColumnName("Motivation");

                entity.HasOne(d => d.AmbassadorType)
                    .WithMany(p => p.Ambassadors)
                    .HasForeignKey(d => d.AmbassadorTypeId)
                    .HasConstraintName("FK_Ambassador_AmbassadorType");

                entity.HasOne(d => d.BankAccount)
                    .WithMany(p => p.Ambassadors)
                    .HasForeignKey(d => d.BankAccountId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Ambassador_BankAccount");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Ambassadors)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Ambassador_User");
            });

            modelBuilder.Entity<AmbassadorEnrollment>(entity =>
            {
                entity.ToTable("AmbassadorEnrollment");

                entity.Property(e => e.AmbassadorEnrollmentId)
                    .HasColumnName("AmbassadorEnrollmentID");

                entity.Property(e => e.AmbassadorId).HasColumnName("AmbassadorID");

                entity.Property(e => e.CourseId).HasColumnName("CourseID");

                entity.Property(e => e.Date).HasColumnType("date");

                entity.HasOne(d => d.Ambassador)
                    .WithMany(p => p.AmbassadorEnrollments)
                    .HasForeignKey(d => d.AmbassadorId)
                    .HasConstraintName("FK_AmbassadorEnrollment_Ambassador");

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.AmbassadorEnrollments)
                    .HasForeignKey(d => d.CourseId)
                    .HasConstraintName("FK_AmbassadorEnrollment_Course");
            });

            modelBuilder.Entity<AmbassadorType>(entity =>
            {
                entity.ToTable("AmbassadorType");

                entity.Property(e => e.AmbassadorTypeId).HasColumnName("AmbassadorTypeID");

                entity.Property(e => e.AmbassadorTypeName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.DiscountPercentage).HasColumnType("decimal(18, 2)");
            });

            modelBuilder.Entity<Application>(entity =>
            {
                entity.ToTable("Application");

                entity.Property(e => e.ApplicationId).HasColumnName("ApplicationID");

                entity.Property(e => e.ApplicationStatusId).HasColumnName("ApplicationStatusID");

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.ApplicationStatus)
                    .WithMany(p => p.Applications)
                    .HasForeignKey(d => d.ApplicationStatusId)
                    .HasConstraintName("FK_Application_ApplicationStatus");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Applications)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Application_User");
            });

            modelBuilder.Entity<ApplicationStatus>(entity =>
            {
                entity.ToTable("ApplicationStatus");

                entity.Property(e => e.ApplicationStatusId).HasColumnName("ApplicationStatusID");

                entity.Property(e => e.StatusName)
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<AuditTrail>(entity =>
            {
                entity.ToTable("AuditTrail");

                entity.Property(e => e.AuditTrailId).HasColumnName("AuditTrailID");

                entity.Property(e => e.AdminId).HasColumnName("AdminID");

                entity.Property(e => e.AmbassadorId).HasColumnName("AmbassadorID");

                entity.Property(e => e.AuditLogDatestamp)
                    .HasColumnType("date")
                    .HasColumnName("Audit_Log_Datestamp");

                entity.Property(e => e.AuditLogDescription)
                    .HasColumnType("text")
                    .HasColumnName("Audit_Log_Description");

                entity.Property(e => e.AuditLogTimestamp)
                    .IsRowVersion()
                    .IsConcurrencyToken()
                    .HasColumnName("Audit_Log_Timestamp");

                entity.HasOne(d => d.Admin)
                    .WithMany(p => p.AuditTrails)
                    .HasForeignKey(d => d.AdminId)
                    .HasConstraintName("FK_AuditTrail_Admin");

                entity.HasOne(d => d.Ambassador)
                    .WithMany(p => p.AuditTrails)
                    .HasForeignKey(d => d.AmbassadorId)
                    .HasConstraintName("FK_AuditTrail_Ambassador");
            });

            modelBuilder.Entity<Bank>(entity =>
            {
                entity.ToTable("Bank");

                entity.Property(e => e.BankId).HasColumnName("BankID");

                entity.Property(e => e.BankName)
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<BankAccount>(entity =>
            {
                entity.ToTable("BankAccount");

                entity.Property(e => e.BankAccountId).HasColumnName("BankAccountID");

                entity.Property(e => e.AccountTypeId).HasColumnName("AccountTypeID");

                entity.Property(e => e.BankId).HasColumnName("BankID");

                entity.HasOne(d => d.AccountType)
                    .WithMany(p => p.BankAccounts)
                    .HasForeignKey(d => d.AccountTypeId)
                    .HasConstraintName("FK_BankAccount_AccountType");

                entity.HasOne(d => d.Bank)
                    .WithMany(p => p.BankAccounts)
                    .HasForeignKey(d => d.BankId)
                    .HasConstraintName("FK_BankAccount_Bank");
            });

            modelBuilder.Entity<Cart>(entity =>
            {
                entity.ToTable("Cart");

                entity.Property(e => e.CartId).HasColumnName("CartID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Carts)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Cart_User");
            });

            modelBuilder.Entity<CartItem>(entity =>
            {
                entity.ToTable("CartItem");

                entity.Property(e => e.CartItemId).HasColumnName("CartItemID");

                entity.Property(e => e.CartId).HasColumnName("CartID");

                entity.Property(e => e.MerchandiseId).HasColumnName("MerchandiseID");

                entity.Property(e => e.SpecialId).HasColumnName("SpecialID");

                entity.Property(e => e.Quantity).HasColumnName("Quantity");

                entity.Property(e => e.Price)
                                .HasColumnType("money")
                                .HasColumnName("Price");

                entity.HasOne(d => d.Cart)
                    .WithMany(p => p.CartItems)
                    .HasForeignKey(d => d.CartId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_CartItem_Cart");

                entity.HasOne(d => d.Merchandise)
                    .WithMany(p => p.CartItems)
                    .HasForeignKey(d => d.MerchandiseId)
                    .HasConstraintName("FK_CartItem_Merchandise");

                entity.HasOne(d => d.Special)
                    .WithMany(p => p.CartItems)
                    .HasForeignKey(d => d.SpecialId)
                    .HasConstraintName("FK_CartItem_Special");
            });

            modelBuilder.Entity<Certificate>(entity =>
            {
                entity.ToTable("Certificate");

                entity.Property(e => e.CertificateId).HasColumnName("CertificateID");

                entity.Property(e => e.AmbassadorId).HasColumnName("AmbassadorID");

                entity.Property(e => e.CertificateDescription).HasColumnType("text");

                entity.Property(e => e.CertificateName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Ambassador)
                    .WithMany(p => p.Certificates)
                    .HasForeignKey(d => d.AmbassadorId)
                    .HasConstraintName("FK_Certificate_Ambassador");
            });

            modelBuilder.Entity<Client>(entity =>
            {
                entity.ToTable("Client");

                entity.Property(e => e.ClientId).HasColumnName("ClientID");

                entity.Property(e => e.AmbassadorId).HasColumnName("AmbassadorID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Ambassador)
                    .WithMany(p => p.Clients)
                    .HasForeignKey(d => d.AmbassadorId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Client_Ambassador");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Clients)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Client_User");
            });

            //modelBuilder.Entity<Content>(entity =>
            //{
            //    entity.ToTable("Content");

            //    //entity.Property(e => e.ContentId).HasColumnName("ContentID");
            //    entity.Property(e => e.YoutubeLink).HasColumnName("YoutubeLink");
            //    entity.Property(e => e.YoutubeHeading).HasColumnName("YoutubeHeading");
            //    entity.Property(e => e.ContentLink).HasColumnName("ContentLink");
            //    entity.Property(e => e.ContentHeading).HasColumnName("ContentHeading");

            //    entity.Property(e => e.SectionId).HasColumnName("SectionID");

            //    //entity.HasOne(d => d.ContentType)
            //    //    .WithMany(p => p.Contents)
            //    //    .HasForeignKey(d => d.ContentTypeId)
            //    //    .HasConstraintName("FK_Content_ContentType");

            //    entity.HasOne(d => d.Section)
            //        .WithMany(p => p.Contents)
            //        .HasForeignKey(d => d.SectionId)
            //        .HasConstraintName("FK_Content_Section");
            //});

            //modelBuilder.Entity<ContentType>(entity =>
            //{
            //    entity.ToTable("ContentType");

            //    entity.Property(e => e.ContentTypeId).HasColumnName("ContentTypeID");

            //    entity.Property(e => e.ContentTypeName)
            //        .HasMaxLength(30)
            //        .IsUnicode(false);
            //});

            {


                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Country>(entity =>
            {
                entity.ToTable("Country");

                entity.Property(e => e.CountryId).HasColumnName("CountryID");

                entity.Property(e => e.CountryName)
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Course>(entity =>
            {
                entity.ToTable("Course");

                entity.Property(e => e.CourseId).HasColumnName("CourseID");

                entity.Property(e => e.AdminId).HasColumnName("AdminID");

                entity.Property(e => e.CourseName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.CourseStatusId).HasColumnName("CourseStatusID");

                entity.Property(e => e.Description).HasColumnType("text");

                entity.HasOne(d => d.Admin)
                    .WithMany(p => p.Courses)
                    .HasForeignKey(d => d.AdminId)
                    .HasConstraintName("FK_Course_Admin");

                entity.HasOne(d => d.CourseStatus)
                    .WithMany(p => p.Courses)
                    .HasForeignKey(d => d.CourseStatusId)
                    .HasConstraintName("FK_Course_CourseStatus");
            });

            modelBuilder.Entity<CourseStatus>(entity =>
            {
                entity.ToTable("CourseStatus");

                entity.Property(e => e.CourseStatusId).HasColumnName("CourseStatusID");

                entity.Property(e => e.CourseStatusName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Description).HasColumnType("text");
            });

            modelBuilder.Entity<Delivery>(entity =>
            {
                entity.ToTable("Delivery");

                entity.Property(e => e.DeliveryId).HasColumnName("DeliveryID");

                entity.Property(e => e.DeliveryAmountId).HasColumnName("DeliveryAmountID");

                entity.Property(e => e.TrackingNumber)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.DeliveryAmount)
                    .WithMany(p => p.Deliveries)
                    .HasForeignKey(d => d.DeliveryAmountId)
                    .HasConstraintName("FK_Delivery_DeliveryAmount");
            });

            modelBuilder.Entity<DeliveryAmount>(entity =>
            {
                entity.ToTable("DeliveryAmount");

                entity.Property(e => e.DeliveryAmountId)
                    .HasColumnName("DeliveryAmountID");

                entity.Property(e => e.DeliveryAmount1)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("DeliveryAmount");
            });

            modelBuilder.Entity<Faq>(entity =>
            {
                entity.ToTable("FAQ");

                entity.Property(e => e.Faqid).HasColumnName("FAQID");

                entity.Property(e => e.Faqanswers)
                    .HasColumnType("text")
                    .HasColumnName("FAQAnswers");

                entity.Property(e => e.Faqquestion)
                    .HasColumnType("text")
                    .HasColumnName("FAQQuestion");

                entity.Property(e => e.FaqcategoryId).HasColumnName("FaqCategoryID");

                entity.HasOne(d => d.Faqcategory)
                    .WithMany(p => p.Faqs)
                    .HasForeignKey(d => d.FaqcategoryId)
                    .HasConstraintName("FK_FAQ_FaqCategory");
            });

            modelBuilder.Entity<Faqcategory>(entity =>
            {
                entity.ToTable("FAQCategory");

                entity.Property(e => e.FaqcategoryId).HasColumnName("FAQCategoryID");

                entity.Property(e => e.CategoryName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.FaqtypeId).HasColumnName("FAQTypeID");

                entity.HasOne(d => d.Faqtype)
                    .WithMany(p => p.Faqcategories)
                    .HasForeignKey(d => d.FaqtypeId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_FAQCategory_FAQType");
            });

            modelBuilder.Entity<Faqtype>(entity =>
            {
                entity.ToTable("FAQType");

                entity.Property(e => e.FaqtypeId).HasColumnName("FAQTypeID");

                entity.Property(e => e.FaqtypeName)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("FAQTypeName");
            });

            modelBuilder.Entity<Feedback>(entity =>
            {
                entity.ToTable("Feedback");

                entity.Property(e => e.FeedbackId).HasColumnName("FeedbackID");

                entity.Property(e => e.AmbassadorId).HasColumnName("AmbassadorID");

                entity.Property(e => e.ClientId).HasColumnName("ClientID");

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.Description).HasColumnType("text");

                entity.Property(e => e.FeedbackTypeId).HasColumnName("FeedbackTypeID");

                entity.Property(e => e.MerchandiseId).HasColumnName("MerchandiseID");

                entity.HasOne(d => d.Ambassador)
                    .WithMany(p => p.Feedbacks)
                    .HasForeignKey(d => d.AmbassadorId)
                    .HasConstraintName("FK_Feedback_Ambassador");

                entity.HasOne(d => d.Client)
                    .WithMany(p => p.Feedbacks)
                    .HasForeignKey(d => d.ClientId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Feedback_Client");

                entity.HasOne(d => d.FeedbackType)
                    .WithMany(p => p.Feedbacks)
                    .HasForeignKey(d => d.FeedbackTypeId)
                    .HasConstraintName("FK_Feedback_FeedbackType");

                entity.HasOne(d => d.Merchandise)
                    .WithMany(p => p.Feedbacks)
                    .HasForeignKey(d => d.MerchandiseId)
                    .HasConstraintName("FK_Feedback_Merchandise");
            });

            modelBuilder.Entity<FeedbackType>(entity =>
            {
                entity.ToTable("FeedbackType");

                entity.Property(e => e.FeedbackTypeId).HasColumnName("FeedbackTypeID");

                entity.Property(e => e.FeedbackTypeName)
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<MerchCategory>(entity =>
            {
                entity.ToTable("MerchCategory");

                entity.Property(e => e.MerchCategoryId)
                      .IsRequired()
                      .ValueGeneratedOnAdd()
                      .UseIdentityColumn()
                      .HasColumnName("MerchCategoryID");

                entity.Property(e => e.MerchCategoryName)
                    .HasMaxLength(30)
                    .IsUnicode(false);


            });

            modelBuilder.Entity<MerchSpecial>(entity =>
            {
                entity.ToTable("MerchSpecial");

                entity.Property(e => e.MerchSpecialId).HasColumnName("MerchSpecialID");

                entity.Property(e => e.MerchandiseId).HasColumnName("MerchandiseID");

                entity.Property(e => e.SpecialId).HasColumnName("SpecialID");

                entity.HasOne(d => d.Merchandise)
                    .WithMany(p => p.MerchSpecials)
                    .HasForeignKey(d => d.MerchandiseId)
                    .HasConstraintName("FK_MerchSpecial_Merchandise");

                entity.HasOne(d => d.Special)
                    .WithMany(p => p.MerchSpecials)
                    .HasForeignKey(d => d.SpecialId)
                    .HasConstraintName("FK_MerchSpecial_Special");
            });

            modelBuilder.Entity<MerchStatus>(entity =>
            {
                entity.ToTable("MerchStatus");

                entity.Property(e => e.MerchStatusId)
                .IsRequired()
                      .ValueGeneratedOnAdd()
                      .UseIdentityColumn()
                .HasColumnName("MerchStatusID");

                entity.Property(e => e.MerchStatusName)
                                .HasMaxLength(30)
                                .IsUnicode(false);

            });

            modelBuilder.Entity<MerchType>(entity =>
            {
                entity.ToTable("MerchType");

                entity.Property(e => e.MerchTypeId).HasColumnName("MerchTypeID");

                entity.Property(e => e.MerchTypeName)
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Merchandise>(entity =>
            {
                entity.ToTable("Merchandise");

                entity.Property(e => e.MerchandiseId).HasColumnName("MerchandiseID");

                entity.Property(e => e.Description).HasColumnType("text");

                entity.Property(e => e.MerchImage).IsUnicode(false);

                entity.Property(e => e.MerchName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.MerchTypeId).HasColumnName("MerchTypeID");
                entity.Property(e => e.MerchCategoryId).HasColumnName("MerchCategoryID");

                entity.Property(e => e.MerchStatusId).HasColumnName("MerchStatusID");

                entity.HasOne(d => d.MerchType)
                    .WithMany(p => p.Merchandises)
                    .HasForeignKey(d => d.MerchTypeId)
                    .HasConstraintName("FK_Merchandise_MerchType");
                
                entity.HasOne(d => d.MerchCategory)
                  .WithMany(p => p.Merchandises)
                  .HasForeignKey(d => d.MerchCategoryId)
                  .HasConstraintName("FK_Merchandise_MerchCategory");

                entity.HasOne(d => d.MerchStatuses)
                  .WithMany(p => p.Merchandises)
                  .HasForeignKey(d => d.MerchStatusId)
                  .HasConstraintName("FK_Merchandise_MerchStatus");

            });

            modelBuilder.Entity<Option>(entity =>
            {
                entity.ToTable("Option");

                entity.Property(e => e.OptionId)
                    .HasColumnName("OptionID");

                entity.Property(e => e.AnswerOption)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.QuestionBankId).HasColumnName("QuestionBankID");

                entity.HasOne(d => d.QuestionBank)
                    .WithMany(p => p.Options)
                    .HasForeignKey(d => d.QuestionBankId)
                    .HasConstraintName("FK_Option_QuestionBank");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("Order");

                entity.Property(e => e.OrderId).HasColumnName("OrderID");

                entity.Property(e => e.AddressId).HasColumnName("AddressID");

                entity.Property(e => e.CartId).HasColumnName("CartID");

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.DeliveryId).HasColumnName("DeliveryID");

                entity.Property(e => e.OrderStatusId).HasColumnName("OrderStatusID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.AmbassadorId).HasColumnName("AmbassadorID");

                entity.HasOne(d => d.Address)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.AddressId)
                    .HasConstraintName("FK_Order_Address");

                entity.HasOne(d => d.Cart)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.CartId)
                    .HasConstraintName("FK_Order_Cart");

                entity.HasOne(d => d.Delivery)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.DeliveryId)
                    .HasConstraintName("FK_Order_Delivery");

                entity.HasOne(d => d.OrderStatus)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.OrderStatusId)
                    .HasConstraintName("FK_Order_OrderStatus");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Order_User");

                entity.HasOne(d => d.Ambassador)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.AmbassadorId)
                    .HasConstraintName("FK_Order_Ambassador");
            });

            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.ToTable("OrderItem");

                entity.Property(e => e.OrderItemId).HasColumnName("OrderItemID");

                entity.Property(e => e.MerchandiseId).HasColumnName("MerchandiseID");

                entity.Property(e => e.OrderId).HasColumnName("OrderID");

                entity.Property(e => e.SpecialId).HasColumnName("SpecialID");

                entity.Property(e => e.Quantity).HasColumnName("Quantity");

                entity.Property(e => e.Price)
                                .HasColumnType("money")
                                .HasColumnName("Price");

                entity.HasOne(d => d.Merchandise)
                    .WithMany(p => p.OrderItems)
                    .HasForeignKey(d => d.MerchandiseId)
                    .HasConstraintName("FK_OrderItem_Merchandise");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderItems)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("FK_OrderItem_Order");

                entity.HasOne(d => d.Special)
                    .WithMany(p => p.OrderItems)
                    .HasForeignKey(d => d.SpecialId)
                    .HasConstraintName("FK_OrderItem_Special");
            });

            modelBuilder.Entity<OrderStatus>(entity =>
            {
                entity.ToTable("OrderStatus");

                entity.Property(e => e.OrderStatusId).HasColumnName("OrderStatusID");

                entity.Property(e => e.OrderStatusName)
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Password>(entity =>
            {
                entity.ToTable("Password");

                entity.Property(e => e.PasswordId).HasColumnName("PasswordID");

                entity.Property(e => e.DateSet).HasColumnType("date");

                entity.Property(e => e.HashedOtp)
                    .HasMaxLength(64)
                    .IsUnicode(false)
                    .HasColumnName("HashedOTP");

                entity.Property(e => e.OtpexpireTime)
                    .HasColumnType("date")
                    .HasColumnName("OTPExpireTime");

                entity.Property(e => e.Password1)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("Password");

                entity.Property(e => e.ResetPasswordLink)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Passwords)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Password_User");
            });

            modelBuilder.Entity<PositionRequest>(entity =>
            {
                entity.ToTable("PositionRequest");

                entity.Property(e => e.PositionRequestId).HasColumnName("PositionRequestID");

                entity.Property(e => e.AmbassadorId).HasColumnName("AmbassadorID");

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.RequestTypeId).HasColumnName("RequestTypeID");

                entity.HasOne(d => d.Ambassador)
                    .WithMany(p => p.PositionRequests)
                    .HasForeignKey(d => d.AmbassadorId)
                    .HasConstraintName("FK_PositionRequest_Ambassador");

                entity.HasOne(d => d.RequestType)
                    .WithMany(p => p.PositionRequests)
                    .HasForeignKey(d => d.RequestTypeId)
                    .HasConstraintName("FK_PositionRequest_RequestType");
            });

            modelBuilder.Entity<Price>(entity =>
            {
                entity.ToTable("Price");

                entity.Property(e => e.PriceId).HasColumnName("PriceID");

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.MerchandiseId).HasColumnName("MerchandiseID");

                entity.Property(e => e.Price1)
                    .HasColumnType("money")
                    .HasColumnName("Price");

                entity.HasOne(d => d.Merchandise)
                    .WithMany(p => p.Prices)
                    .HasForeignKey(d => d.MerchandiseId)
                    .HasConstraintName("FK_Price_Merchandise");
            });

            modelBuilder.Entity<Province>(entity =>
            {
                entity.ToTable("Province");

                entity.Property(e => e.ProvinceId)
                                .IsRequired()
                                .ValueGeneratedOnAdd()
                                .UseIdentityColumn()
                                .HasColumnName("ProvinceID");

                entity.Property(e => e.ProvinceName)
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<QuestionBank>(entity =>
            {
                entity.ToTable("QuestionBank");

                entity.Property(e => e.QuestionBankId).HasColumnName("QuestionBankID");
                entity.Property(e => e.QuizId).HasColumnName("QuizID");

                entity.Property(e => e.Answers).HasColumnType("text");

                entity.Property(e => e.Questions).HasColumnType("text");
                entity.Property(e => e.Option1).HasColumnType("text");
                entity.Property(e => e.Option2).HasColumnType("text");
                entity.Property(e => e.Option3).HasColumnType("text");

                entity.HasOne(d => d.Quiz)
                    .WithMany(p => p.QuestionBanks)
                    .HasForeignKey(d => d.QuizId)
                    .HasConstraintName("FK_QuestionBank_Quiz");
            });

            modelBuilder.Entity<Quiz>(entity =>
            {
                entity.ToTable("Quiz");

                entity.Property(e => e.QuizId).HasColumnName("QuizID");

                //entity.Property(e => e.QuestionBankId).HasColumnName("QuestionBankID");

                entity.Property(e => e.QuizDescription).HasColumnType("text");

                entity.Property(e => e.QuizName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.CourseId).HasColumnName("CourseId");


                entity.HasOne(d => d.QuestionBank)
                    .WithMany(p => p.Quizzes)
                    .HasForeignKey(d => d.QuestionBankId)
                    .HasConstraintName("FK_Quiz_QuestionBank");

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.Quizzes)
                    .HasForeignKey(d => d.CourseId)
                    .HasConstraintName("FK_Quiz_Course");
            });

            modelBuilder.Entity<Referral>(entity =>
            {
                entity.ToTable("Referral");

                entity.Property(e => e.ReferralId)
                    .HasColumnName("ReferralID");

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.ReferralCodeId).HasColumnName("ReferralCodeID");

                entity.Property(e => e.ReferralLinkTypeId).HasColumnName("ReferralLinkTypeID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.ReferralCode)
                    .WithMany(p => p.Referrals)
                    .HasForeignKey(d => d.ReferralCodeId)
                    .HasConstraintName("FK_Referral_ReferralCode");

                entity.HasOne(d => d.ReferralLinkType)
                    .WithMany(p => p.Referrals)
                    .HasForeignKey(d => d.ReferralLinkTypeId)
                    .HasConstraintName("FK_Referral_Referral");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Referrals)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Referral_User");
            });

            modelBuilder.Entity<ReferralCode>(entity =>
            {
                entity.ToTable("ReferralCode");

                entity.Property(e => e.ReferralCodeId)
                    .HasColumnName("ReferralCodeID");

                entity.Property(e => e.AmbassadorId).HasColumnName("AmbassadorID");

                entity.Property(e => e.IsActive)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.ReferralCode1)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("ReferralCode");

                entity.HasOne(d => d.Ambassador)
                    .WithMany(p => p.ReferralCodes)
                    .HasForeignKey(d => d.AmbassadorId)
                    .HasConstraintName("FK_ReferralCode_Ambassador");
            });

            modelBuilder.Entity<ReferralLinkType>(entity =>
            {
                entity.ToTable("ReferralLinkType");

                entity.Property(e => e.ReferralLinkTypeId)
                    .HasColumnName("ReferralLinkTypeID");

                entity.Property(e => e.ReferralType)
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<RequestType>(entity =>
            {
                entity.ToTable("RequestType");

                entity.Property(e => e.RequestTypeId).HasColumnName("RequestTypeID");

                entity.Property(e => e.RequestTypeName)
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<SectionContent>(entity =>
            {
                entity.ToTable("SectionContent");

                entity.Property(e => e.SectionContentId)
                    .HasColumnName("SectionContentId");


                //Addded
                entity.Property(e => e.CourseId).HasColumnName("CourseID");
                entity.Property(e => e.YoutubeLink).HasColumnName("YoutubeLink");
                entity.Property(e => e.YoutubeHeading).HasColumnName("YoutubeHeading");
                entity.Property(e => e.ContentLink).HasColumnName("ContentLink");
                entity.Property(e => e.ContentHeading).HasColumnName("ContentHeading");

                entity.Property(e => e.SectionName)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.SectionContents)
                    .HasForeignKey(d => d.CourseId)
                    .HasConstraintName("FK_SectionContent_Course");
            });

            modelBuilder.Entity<Special>(entity =>
            {
                entity.ToTable("Special");

                entity.Property(e => e.SpecialId).HasColumnName("SpecialID");

                entity.Property(e => e.Description).HasColumnType("text");

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.Price).HasColumnType("money");

                entity.Property(e => e.SpecialName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SpecialTypeId).HasColumnName("SpecialTypeID");

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.HasOne(d => d.SpecialType)
                    .WithMany(p => p.Specials)
                    .HasForeignKey(d => d.SpecialTypeId)
                    .HasConstraintName("FK_Special_SpecialType");
            });

            modelBuilder.Entity<SpecialType>(entity =>
            {
                entity.ToTable("SpecialType");

                entity.Property(e => e.SpecialTypeId).HasColumnName("SpecialTypeID");

                entity.Property(e => e.SpecialTypeName)
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Target>(entity =>
            {
                entity.ToTable("Target");

                entity.Property(e => e.TargetId).HasColumnName("TargetID");

                entity.Property(e => e.AmbassadorId).HasColumnName("AmbassadorID");

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.Property(e => e.Target1)
                    .HasColumnType("money")
                    .HasColumnName("Target");

                entity.HasOne(d => d.Ambassador)
                    .WithMany(p => p.Targets)
                    .HasForeignKey(d => d.AmbassadorId)
                    .HasConstraintName("FK_Target_Ambassador");
            });

            modelBuilder.Entity<Title>(entity =>
            {
                entity.ToTable("Title");

                entity.Property(e => e.TitleId).HasColumnName("TitleID");

                entity.Property(e => e.TitleName)
                    .HasMaxLength(6)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.Name)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Surname)
                    .HasMaxLength(20)
                    .IsUnicode(false);

              

                entity.Property(e => e.UserRoleId).HasColumnName("UserRoleID");

                entity.HasOne(d => d.Title)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.TitleId)
                    .HasConstraintName("FK_User_Title");

                entity.HasOne(d => d.UserRole)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.UserRoleId)
                    .HasConstraintName("FK_User_UserRoleID");
            });

            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.ToTable("UserRole");

                entity.Property(e => e.UserRoleId).HasColumnName("UserRoleID");

                entity.Property(e => e.AccessLevelId).HasColumnName("AccessLevelID");

                entity.Property(e => e.UserRoleName)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.HasOne(d => d.AccessLevel)
                    .WithMany(p => p.UserRoles)
                    .HasForeignKey(d => d.AccessLevelId)
                    .HasConstraintName("FK_UserRoleID_AccessLevel");
            });

            modelBuilder.Entity<Vat>(entity =>
            {
                entity.ToTable("VAT");

                entity.Property(e => e.Vatid).HasColumnName("VATID");

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.VatPercentage).HasColumnType("decimal(18, 3)");
            });

            OnModelCreatingPartial(modelBuilder);
            base.OnModelCreating(modelBuilder);

        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
