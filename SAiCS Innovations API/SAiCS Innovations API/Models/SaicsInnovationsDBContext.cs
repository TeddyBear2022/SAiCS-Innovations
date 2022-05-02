using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.DependencyInjection;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class SaicsInnovationsDBContext : DbContext
    {
        public SaicsInnovationsDBContext()
        {
        }

        public SaicsInnovationsDBContext(DbContextOptions<SaicsInnovationsDBContext> options)
            : base(options)
        {
        }
        //public void ConfigureServices(IServiceCollection services)
        //{
        //    services.AddDbContext<SaicsInnovationsDBContext>(options =>
        //    {
        //        options.UseSqlServer("Server=LAPTOP-4KPHVJPB\\SQLEXPRESS02;Database=SaicsInnovationsDB;Trusted_Connection=True;");
        //        options.EnableSensitiveDataLogging();
        //    });
        //}

        public virtual DbSet<AccessLevel> AccessLevel { get; set; }
        public virtual DbSet<AccountType> AccountTypes { get; set; }
        public virtual DbSet<Address> Address { get; set; }
        public virtual DbSet<Admin> Admins { get; set; }
        public virtual DbSet<Ambassador> Ambassadors { get; set; }
        public virtual DbSet<AmbassadorOrder> AmbassadorOrders { get; set; }
        public virtual DbSet<AmbassadorType> AmbassadorTypes { get; set; }
        public virtual DbSet<ApplicationStatus> ApplicationStatus { get; set; }
        public virtual DbSet<AuditLog> AuditLogs { get; set; }
        public virtual DbSet<BankAccount> BankAccounts { get; set; }
        public virtual DbSet<Cart> Carts { get; set; }
        public virtual DbSet<CartItem> CartItems { get; set; }
        public virtual DbSet<Certificate> Certificates { get; set; }
        public virtual DbSet<Client> Clients { get; set; }
        public virtual DbSet<ClientOrder> ClientOrders { get; set; }
        public virtual DbSet<Content> Contents { get; set; }
        public virtual DbSet<ContentType> ContentTypes { get; set; }
        public virtual DbSet<Country> Country { get; set; }
        public virtual DbSet<Course> Courses { get; set; }
        public virtual DbSet<CourseStatus> CourseStatuses { get; set; }
        public virtual DbSet<Currency> Currencies { get; set; }
        public virtual DbSet<Delivery> Deliveries { get; set; }
        public virtual DbSet<DeliveryType> DeliveryTypes { get; set; }
        public virtual DbSet<Faq> Faqs { get; set; }
        public virtual DbSet<Faqcategory> Faqcategories { get; set; }
        public virtual DbSet<Faqtype> Faqtypes { get; set; }
        public virtual DbSet<Feedback> Feedbacks { get; set; }
        public virtual DbSet<FeedbackType> FeedbackTypes { get; set; }
        public virtual DbSet<OrderStatus> OrderStatuses { get; set; }
        public virtual DbSet<Package> Packages { get; set; }
        public virtual DbSet<PackagePrice> PackagePrices { get; set; }
        public virtual DbSet<PackageType> PackageTypes { get; set; }
        public virtual DbSet<Password> Passwords { get; set; }
        public virtual DbSet<Price> Prices { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ProductPrice> ProductPrices { get; set; }
        public virtual DbSet<ProductType> ProductTypes { get; set; }
        public virtual DbSet<QuestionBank> QuestionBanks { get; set; }
        public virtual DbSet<Quiz> Quizzes { get; set; }
        public virtual DbSet<Special> Specials { get; set; }
        public virtual DbSet<SpecialType> SpecialTypes { get; set; }
        public virtual DbSet<Title> Title { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserApplicationStatus> UserApplicationStatuses { get; set; }
        public virtual DbSet<UserRole> UserRole { get; set; }
        public virtual DbSet<Vat> Vat { get; set; }

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
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<AccountType>(entity =>
            {
                entity.ToTable("AccountType");

                entity.Property(e => e.AccountTypeId).HasColumnName("AccountTypeID");

                entity.Property(e => e.AccountTypeName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Address>(entity =>
            {
                entity.ToTable("Address");

                entity.Property(e => e.AddressId).HasColumnName("AddressID");

                entity.Property(e => e.Address1)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Address");

                entity.Property(e => e.City)
                    .IsRequired()
                    .HasMaxLength(25)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Admin>(entity =>
            {
                entity.ToTable("Admin");

                entity.Property(e => e.AdminId).HasColumnName("AdminID");

                entity.Property(e => e.Idnumber).HasColumnName("IDNumber");

                entity.Property(e => e.Idphoto)
                    .IsRequired()
                    .HasColumnName("IDPhoto");

                entity.Property(e => e.ProofOfAddressPhoto).IsRequired();

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

                entity.Property(e => e.AmbassadorTypeId).HasColumnName("AmbassadorTypeID");

                entity.Property(e => e.BankAccountId).HasColumnName("BankAccountID");

                entity.Property(e => e.CourseId).HasColumnName("CourseID");

                entity.Property(e => e.Idnumber).HasColumnName("IDNumber");

                entity.Property(e => e.Idphoto)
                    .IsRequired()
                    .HasColumnName("IDPhoto");

                entity.Property(e => e.ProofOfAddressPhoto).IsRequired();

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.AmbassadorType)
                    .WithMany(p => p.Ambassadors)
                    .HasForeignKey(d => d.AmbassadorTypeId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_Ambassador_AmbassadorType");

                entity.HasOne(d => d.BankAccount)
                    .WithMany(p => p.Ambassadors)
                    .HasForeignKey(d => d.BankAccountId)
                    .HasConstraintName("FK_Ambassador_BankAccount");

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.Ambassadors)
                    .HasForeignKey(d => d.CourseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Ambassador_Course");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Ambassadors)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Ambassador_User");
            });

            modelBuilder.Entity<AmbassadorOrder>(entity =>
            {
                entity.ToTable("AmbassadorOrder");

                entity.Property(e => e.AmbassadorOrderId).HasColumnName("AmbassadorOrderID");

                entity.Property(e => e.AmabassadorId).HasColumnName("AmabassadorID");

                entity.Property(e => e.Amount).HasColumnType("money");

                entity.Property(e => e.CartId).HasColumnName("CartID");

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.DeliveryId).HasColumnName("DeliveryID");

                entity.Property(e => e.OrderStatusId).HasColumnName("OrderStatusID");

                entity.Property(e => e.ProofOfPayment).IsRequired();

                entity.Property(e => e.TrackingNumber)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Amabassador)
                    .WithMany(p => p.AmbassadorOrders)
                    .HasForeignKey(d => d.AmabassadorId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_AmbassadorOrder_Ambassador");

                entity.HasOne(d => d.Cart)
                    .WithMany(p => p.AmbassadorOrders)
                    .HasForeignKey(d => d.CartId)
                    .HasConstraintName("FK_AmbassadorOrder_Cart");

                entity.HasOne(d => d.Delivery)
                    .WithMany(p => p.AmbassadorOrders)
                    .HasForeignKey(d => d.DeliveryId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_AmbassadorOrder_Delivery");

                entity.HasOne(d => d.OrderStatus)
                    .WithMany(p => p.AmbassadorOrders)
                    .HasForeignKey(d => d.OrderStatusId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_AmbassadorOrder_OrderStatus");
            });

            modelBuilder.Entity<AmbassadorType>(entity =>
            {
                entity.ToTable("AmbassadorType");

                entity.Property(e => e.AmbassadorTypeId).HasColumnName("AmbassadorTypeID");

                entity.Property(e => e.AmbassadorTypeName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ApplicationStatus>(entity =>
            {
                entity.ToTable("ApplicationStatus");

                entity.Property(e => e.ApplicationStatusId).HasColumnName("ApplicationStatusID");

                entity.Property(e => e.StatusName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<AuditLog>(entity =>
            {
                entity.HasKey(e => e.AuditTrailId);

                entity.ToTable("AuditLog");

                entity.Property(e => e.AuditTrailId).HasColumnName("AuditTrailID");

                entity.Property(e => e.AdminId).HasColumnName("AdminID");

                entity.Property(e => e.AmbassadorId).HasColumnName("AmbassadorID");

                entity.Property(e => e.AuditLogDatestamp)
                    .HasColumnType("date")
                    .HasColumnName("Audit_Log_Datestamp");

                entity.Property(e => e.AuditLogDescription)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("Audit_Log_Description");

                entity.Property(e => e.AuditLogTimestamp)
                    .IsRequired()
                    .IsRowVersion()
                    .IsConcurrencyToken()
                    .HasColumnName("Audit_Log_Timestamp");

                entity.HasOne(d => d.Admin)
                    .WithMany(p => p.AuditLogs)
                    .HasForeignKey(d => d.AdminId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AuditLog_Admin");

                entity.HasOne(d => d.Ambassador)
                    .WithMany(p => p.AuditLogs)
                    .HasForeignKey(d => d.AmbassadorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AuditLog_Ambassador");
            });

            modelBuilder.Entity<BankAccount>(entity =>
            {
                entity.ToTable("BankAccount");

                entity.Property(e => e.BankAccountId).HasColumnName("BankAccountID");

                entity.Property(e => e.AccountTypeId).HasColumnName("AccountTypeID");

                entity.Property(e => e.BankName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.HasOne(d => d.AccountType)
                    .WithMany(p => p.BankAccounts)
                    .HasForeignKey(d => d.AccountTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BankAccount_AccountType");
            });

            modelBuilder.Entity<Cart>(entity =>
            {
                entity.ToTable("Cart");

                entity.Property(e => e.CartId).HasColumnName("CartID");
            });

            modelBuilder.Entity<CartItem>(entity =>
            {
                entity.HasKey(e => new { e.PackageId, e.ProductId });

                entity.ToTable("CartItem");

                entity.Property(e => e.PackageId).HasColumnName("PackageID");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.CartId).HasColumnName("CartID");

                entity.HasOne(d => d.Cart)
                    .WithMany(p => p.CartItems)
                    .HasForeignKey(d => d.CartId)
                    .HasConstraintName("FK_CartItem_Cart");

                entity.HasOne(d => d.Package)
                    .WithMany(p => p.CartItems)
                    .HasForeignKey(d => d.PackageId)
                    .HasConstraintName("FK_CartItem_Package");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.CartItems)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_CartItem_Product");
            });

            modelBuilder.Entity<Certificate>(entity =>
            {
                entity.ToTable("Certificate");

                entity.Property(e => e.CertificateId).HasColumnName("CertificateID");

                entity.Property(e => e.CertificateDescription)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.CertificateName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.CourseStatusId).HasColumnName("CourseStatusID");

                entity.HasOne(d => d.CourseStatus)
                    .WithMany(p => p.Certificates)
                    .HasForeignKey(d => d.CourseStatusId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_Certificate_CourseStatus");
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
                    .HasConstraintName("FK_Client_Ambassador");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Clients)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Client_User");
            });

            modelBuilder.Entity<ClientOrder>(entity =>
            {
                entity.ToTable("ClientOrder");

                entity.Property(e => e.ClientOrderId).HasColumnName("ClientOrderID");

                entity.Property(e => e.Amount).HasColumnType("money");

                entity.Property(e => e.CartId).HasColumnName("CartID");

                entity.Property(e => e.ClientId).HasColumnName("ClientID");

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.DeliveryId).HasColumnName("DeliveryID");

                entity.Property(e => e.OrderStatusId).HasColumnName("OrderStatusID");

                entity.Property(e => e.ProofOfPayment).IsRequired();

                entity.Property(e => e.TrackingNumber)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Cart)
                    .WithMany(p => p.ClientOrders)
                    .HasForeignKey(d => d.CartId)
                    .HasConstraintName("FK_ClientOrder_Cart");

                entity.HasOne(d => d.Client)
                    .WithMany(p => p.ClientOrders)
                    .HasForeignKey(d => d.ClientId)
                    .HasConstraintName("FK_ClientOrder_Client");

                entity.HasOne(d => d.Delivery)
                    .WithMany(p => p.ClientOrders)
                    .HasForeignKey(d => d.DeliveryId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_ClientOrder_Delivery");

                entity.HasOne(d => d.OrderStatus)
                    .WithMany(p => p.ClientOrders)
                    .HasForeignKey(d => d.OrderStatusId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_ClientOrder_OrderStatus");
            });

            modelBuilder.Entity<Content>(entity =>
            {
                entity.ToTable("Content");

                entity.Property(e => e.ContentId).HasColumnName("ContentID");

                entity.Property(e => e.ContentTypeId).HasColumnName("ContentTypeID");

                entity.Property(e => e.ContentUpload).IsRequired();

                entity.HasOne(d => d.ContentType)
                    .WithMany(p => p.Contents)
                    .HasForeignKey(d => d.ContentTypeId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_Content_ContentType");
            });

            modelBuilder.Entity<ContentType>(entity =>
            {
                entity.ToTable("ContentType");

                entity.Property(e => e.ContentTypeId).HasColumnName("ContentTypeID");

                entity.Property(e => e.ContentTypeName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Country>(entity =>
            {
                entity.ToTable("Country");

                entity.Property(e => e.CountryId).HasColumnName("CountryID");

                entity.Property(e => e.CountryCode)
                    .IsRequired()
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.CountryName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Course>(entity =>
            {
                entity.ToTable("Course");

                entity.Property(e => e.CourseId).HasColumnName("CourseID");

                entity.Property(e => e.AdminId).HasColumnName("AdminID");

                entity.Property(e => e.ContentId).HasColumnName("ContentID");

                entity.Property(e => e.CourseName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.CourseStatusId).HasColumnName("CourseStatusID");

                entity.Property(e => e.QuizId).HasColumnName("QuizID");

                entity.HasOne(d => d.Admin)
                    .WithMany(p => p.Courses)
                    .HasForeignKey(d => d.AdminId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_Course_Admin");

                entity.HasOne(d => d.Content)
                    .WithMany(p => p.Courses)
                    .HasForeignKey(d => d.ContentId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_Course_Content");

                entity.HasOne(d => d.CourseStatus)
                    .WithMany(p => p.Courses)
                    .HasForeignKey(d => d.CourseStatusId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_Course_CourseStatus");

                entity.HasOne(d => d.Quiz)
                    .WithMany(p => p.Courses)
                    .HasForeignKey(d => d.QuizId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_Course_Quiz");
            });

            modelBuilder.Entity<CourseStatus>(entity =>
            {
                entity.ToTable("CourseStatus");

                entity.Property(e => e.CourseStatusId).HasColumnName("CourseStatusID");

                entity.Property(e => e.CourseStatusName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Currency>(entity =>
            {
                entity.ToTable("Currency");

                entity.Property(e => e.CurrencyId).HasColumnName("CurrencyID");

                entity.Property(e => e.CurrencyConversionsNames)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.CurrencyName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.CurrencySymbol)
                    .IsRequired()
                    .HasMaxLength(6)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Delivery>(entity =>
            {
                entity.ToTable("Delivery");

                entity.Property(e => e.DeliveryId).HasColumnName("DeliveryID");

                entity.Property(e => e.DeliveryOption)
                    .IsRequired()
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.DeliveryTypeId).HasColumnName("DeliveryTypeID");

                entity.HasOne(d => d.DeliveryType)
                    .WithMany(p => p.Deliveries)
                    .HasForeignKey(d => d.DeliveryTypeId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_Delivery_DeliveryType");
            });

            modelBuilder.Entity<DeliveryType>(entity =>
            {
                entity.ToTable("DeliveryType");

                entity.Property(e => e.DeliveryTypeId).HasColumnName("DeliveryTypeID");

                entity.Property(e => e.DeliveryTypeName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Faq>(entity =>
            {
                entity.ToTable("FAQ");

                entity.Property(e => e.Faqid).HasColumnName("FAQID");

                entity.Property(e => e.Faqanswers)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("FAQAnswers");

                entity.Property(e => e.FaqcategoryId).HasColumnName("FAQCategoryID");

                entity.Property(e => e.Faqquestion)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("FAQQuestion");

                entity.Property(e => e.FaqtypeId).HasColumnName("FAQTypeID");

                entity.HasOne(d => d.Faqcategory)
                    .WithMany(p => p.Faqs)
                    .HasForeignKey(d => d.FaqcategoryId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_FAQ_FAQCategory");

                entity.HasOne(d => d.Faqtype)
                    .WithMany(p => p.Faqs)
                    .HasForeignKey(d => d.FaqtypeId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_FAQ_FAQType");
            });

            modelBuilder.Entity<Faqcategory>(entity =>
            {
                entity.ToTable("FAQCategory");

                entity.Property(e => e.FaqcategoryId).HasColumnName("FAQCategoryID");

                entity.Property(e => e.CategoryName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Faqtype>(entity =>
            {
                entity.ToTable("FAQType");

                entity.Property(e => e.FaqtypeId).HasColumnName("FAQTypeID");

                entity.Property(e => e.FaqtypeName)
                    .IsRequired()
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

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.FeedbackTypeId).HasColumnName("FeedbackTypeID");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.HasOne(d => d.Ambassador)
                    .WithMany(p => p.Feedbacks)
                    .HasForeignKey(d => d.AmbassadorId)
                    .HasConstraintName("FK_Feedback_Ambassador");

                entity.HasOne(d => d.Client)
                    .WithMany(p => p.Feedbacks)
                    .HasForeignKey(d => d.ClientId)
                    .HasConstraintName("FK_Feedback_Client");

                entity.HasOne(d => d.FeedbackType)
                    .WithMany(p => p.Feedbacks)
                    .HasForeignKey(d => d.FeedbackTypeId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_Feedback_FeedbackType");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Feedbacks)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_Feedback_Product");
            });

            modelBuilder.Entity<FeedbackType>(entity =>
            {
                entity.ToTable("FeedbackType");

                entity.Property(e => e.FeedbackTypeId).HasColumnName("FeedbackTypeID");

                entity.Property(e => e.FeedbackTypeName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<OrderStatus>(entity =>
            {
                entity.ToTable("OrderStatus");

                entity.Property(e => e.OrderStatusId).HasColumnName("OrderStatusID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrderStatusName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Package>(entity =>
            {
                entity.ToTable("Package");

                entity.Property(e => e.PackageId).HasColumnName("PackageID");

                entity.Property(e => e.PackageName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.PackageTypeId).HasColumnName("PackageTypeID");

                entity.Property(e => e.ReturnableYN)
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .HasColumnName("Returnable(y/n)");

                entity.HasOne(d => d.PackageType)
                    .WithMany(p => p.Packages)
                    .HasForeignKey(d => d.PackageTypeId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_Package_PackageType");
            });

            modelBuilder.Entity<PackagePrice>(entity =>
            {
                entity.HasKey(e => new { e.PackageId, e.PriceId });

                entity.ToTable("PackagePrice");

                entity.Property(e => e.PackageId).HasColumnName("PackageID");

                entity.Property(e => e.PriceId).HasColumnName("PriceID");

                entity.HasOne(d => d.Package)
                    .WithMany(p => p.PackagePrices)
                    .HasForeignKey(d => d.PackageId)
                    .HasConstraintName("FK_PackagePrice_Package");

                entity.HasOne(d => d.Price)
                    .WithMany(p => p.PackagePrices)
                    .HasForeignKey(d => d.PriceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PackagePrice_Price");
            });

            modelBuilder.Entity<PackageType>(entity =>
            {
                entity.ToTable("PackageType");

                entity.Property(e => e.PackageTypeId).HasColumnName("PackageTypeID");

                entity.Property(e => e.PackageTypeName)
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Password>(entity =>
            {
                entity.ToTable("Password");

                entity.Property(e => e.PasswordId).HasColumnName("PasswordID");

                entity.Property(e => e.DateSet).HasColumnType("date");

                entity.Property(e => e.HashedOtp)
                    .IsRequired()
                    .HasMaxLength(64)
                    .IsUnicode(false)
                    .HasColumnName("HashedOTP");

                entity.Property(e => e.OtpexpireTime)
                    .HasColumnType("date")
                    .HasColumnName("OTPExpireTime");

                entity.Property(e => e.Password1)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("Password");

                entity.Property(e => e.ResetPasswordLink)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Passwords)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_Password_User");
            });

            modelBuilder.Entity<Price>(entity =>
            {
                entity.ToTable("Price");

                entity.Property(e => e.PriceId).HasColumnName("PriceID");

                entity.Property(e => e.CurrencyId).HasColumnName("CurrencyID");

                entity.Property(e => e.Price1)
                    .HasColumnType("money")
                    .HasColumnName("Price");

                entity.HasOne(d => d.Currency)
                    .WithMany(p => p.Prices)
                    .HasForeignKey(d => d.CurrencyId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_Price_Currency");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("Product");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.ProductImage).IsRequired();

                entity.Property(e => e.ProductName)
                    .IsRequired()
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.ProductTypeId).HasColumnName("ProductTypeID");

                entity.Property(e => e.ReturnableYN)
                    .IsRequired()
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .HasColumnName("Returnable(y/n)");

                entity.Property(e => e.SpecialId).HasColumnName("SpecialID");

                entity.HasOne(d => d.ProductType)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.ProductTypeId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_Product_ProductType");

                entity.HasOne(d => d.Special)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.SpecialId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_Product_Special");
            });

            modelBuilder.Entity<ProductPrice>(entity =>
            {
                entity.HasKey(e => new { e.ProductId, e.PriceId });

                entity.ToTable("ProductPrice");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.PriceId).HasColumnName("PriceID");

                entity.HasOne(d => d.Price)
                    .WithMany(p => p.ProductPrices)
                    .HasForeignKey(d => d.PriceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ProductPrice_Price");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductPrices)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_ProductPrice_Product");
            });

            modelBuilder.Entity<ProductType>(entity =>
            {
                entity.ToTable("ProductType");

                entity.Property(e => e.ProductTypeId).HasColumnName("ProductTypeID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ProductTypeName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<QuestionBank>(entity =>
            {
                entity.ToTable("QuestionBank");

                entity.Property(e => e.QuestionBankId).HasColumnName("QuestionBankID");

                entity.Property(e => e.Answers)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Questions)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Quiz>(entity =>
            {
                entity.ToTable("Quiz");

                entity.Property(e => e.QuizId).HasColumnName("QuizID");

                entity.Property(e => e.QuestionBankId).HasColumnName("QuestionBankID");

                entity.Property(e => e.QuizDescription)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.QuizName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.HasOne(d => d.QuestionBank)
                    .WithMany(p => p.Quizzes)
                    .HasForeignKey(d => d.QuestionBankId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_Quiz_QuestionBank");
            });

            modelBuilder.Entity<Special>(entity =>
            {
                entity.ToTable("Special");

                entity.Property(e => e.SpecialId).HasColumnName("SpecialID");

                entity.Property(e => e.SpecialTypeId).HasColumnName("SpecialTypeID");

                entity.HasOne(d => d.SpecialType)
                    .WithMany(p => p.Specials)
                    .HasForeignKey(d => d.SpecialTypeId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_Special_SpecialType");
            });

            modelBuilder.Entity<SpecialType>(entity =>
            {
                entity.ToTable("SpecialType");

                entity.Property(e => e.SpecialTypeId).HasColumnName("SpecialTypeID");
            });

            modelBuilder.Entity<Title>(entity =>
            {
                entity.ToTable("Title");

                entity.Property(e => e.TitleId).HasColumnName("TitleID");

                entity.Property(e => e.TitleName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.AddressId).HasColumnName("AddressID");

                entity.Property(e => e.ApplicationStatusId).HasColumnName("ApplicationStatusID");

                entity.Property(e => e.CountryId).HasColumnName("CountryID");

                entity.Property(e => e.EmailAddress)
                    .IsRequired()
                    .HasMaxLength(30);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Surname)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.TitleId).HasColumnName("TitleID");

                entity.Property(e => e.UserRoleId).HasColumnName("UserRoleID");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.HasOne(d => d.Address)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.AddressId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_User_Address");

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.CountryId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_User_Country");

                entity.HasOne(d => d.Title)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.TitleId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_User_Title");

                entity.HasOne(d => d.UserRole)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.UserRoleId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_User_UserRole");
            });

            modelBuilder.Entity<UserApplicationStatus>(entity =>
            {
                entity.ToTable("UserApplicationStatus");

                entity.Property(e => e.UserApplicationStatusId).HasColumnName("UserApplicationStatusID");

                entity.Property(e => e.ApplicationStatusId).HasColumnName("ApplicationStatusID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.ApplicationStatus)
                    .WithMany(p => p.UserApplicationStatuses)
                    .HasForeignKey(d => d.ApplicationStatusId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_UserApplicationStatus_ApplicationStatus");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserApplicationStatuses)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_UserApplicationStatus_UserApplicationStatus");
            });

            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.ToTable("UserRole");

                entity.Property(e => e.UserRoleId).HasColumnName("UserRoleID");

                entity.Property(e => e.AccessLevelId).HasColumnName("AccessLevelID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.HasOne(d => d.AccessLevel)
                    .WithMany(p => p.UserRoles)
                    .HasForeignKey(d => d.AccessLevelId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_UserRole_AccessLevel");
            });

            modelBuilder.Entity<Vat>(entity =>
            {
                entity.ToTable("VAT");

                entity.Property(e => e.Vatid).HasColumnName("VATID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.VatPercentage).HasColumnType("decimal(18, 3)");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
