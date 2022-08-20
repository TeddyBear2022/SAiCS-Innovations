using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SAiCSInnovationsAPI_3._0.Models;
using SAiCSInnovationsAPI_3._0.Repository;
using SAiCSInnovationsAPI_3._0.ViewModels;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace SAiCSInnovationsAPI_3._0.Repository
{
    public class SAiCSInnovationsRep : ISAiCSInnovationsRep
    {
        private readonly SaicsInnovationsDBContext db;
        private readonly UserManager<User> _manager;
        private readonly IUserClaimsPrincipalFactory<User> _claims;
        private readonly IConfiguration _configuration;
        // public int otp = 0;

        public SAiCSInnovationsRep(SaicsInnovationsDBContext _db,
            UserManager<User> manager,
            IUserClaimsPrincipalFactory<User> claims,
            IConfiguration configuration
            )
        {
            db = _db;
            _manager = manager;
            _claims = claims;
            _configuration = configuration;
        }


        //Teddys Repository code
        //Adding a table to the database
        public void Add<T>(T entity) where T : class
        {
            db.Add(entity);
        }

        //Deleteing a table from teh database
        public void Delete<T>(T entity) where T : class
        {
            db.Remove(entity);
        }

        //Saving changes on database
        public bool SaveChanges()
        {
            return db.SaveChanges() > 0;
        }

        //Find ByID
        public T FindById<T>(int id) where T : class
        {
            return db.Set<T>().Find(id);
        }

        //Search DB
        public IEnumerable<T> Search<T>(Expression<Func<T, bool>> predicate) where T : class
        {
            return db.Set<T>().Where(predicate);
        }

        //GetALl from DB
        public List<T> GetAll<T>() where T : class
        {
            return db.Set<T>().ToList();
        }

        //Finding a FAQ record
        public object FindFAQ(int entityid)
        {
            return db.Faqs.Where(faq => faq.Faqid == entityid).FirstOrDefault();
        }

        //Getting all FAQs
        public object getAllFAQs()
        {
            //var faqs = db.Faqs.Include(category => category.Faqcategory).ThenInclude(type => type.Faqtype).ToList();
            

            //alt
            var faqs = db.Faqtypes.Include(category => category.Faqcategories).ThenInclude(faq => faq.Faqs).ToList();
            return faqs;
        }

        public void Emails(string email, string username, string password, int usertype)
        {
            if (usertype == 1)

            {
                using (MailMessage emailSend = new MailMessage("u20551313@tuks.co.za", email))
                {
                    emailSend.Subject = "Welcome to SAiCs!!!";
                    emailSend.Body = "Welcome to the SAiCS Innvoation app, we are happy that you chose to do business with us! The following are the details you can use to login :-). Username:" + username + " Password:" + password;
                    emailSend.IsBodyHtml = false;
                    using (SmtpClient Smtp = new SmtpClient())
                    {
                        Smtp.Host = "smtp.gmail.com";
                        Smtp.EnableSsl = true;
                        NetworkCredential credentials = new NetworkCredential("u20551313@tuks.co.za", "FentseT@21");
                        Smtp.UseDefaultCredentials = false;
                        Smtp.Credentials = credentials;
                        Smtp.Port = 587;
                        Smtp.Send(emailSend);
                    }
                }
            }
            if (usertype == 2)
            {
                using (MailMessage emailSend = new MailMessage("u20551313@tuks.co.za", email))
                {
                    emailSend.Subject = "Welcome future SAiCs Ambassador!!!";
                    emailSend.Body = "Congratulations on getting thus far, we are happy that you chose to do business with us! The following are the details you can use to login :-). Username:" + username + " Password:" + password + " Please be aware you will only have access to functionality once admin has verified your account";
                    emailSend.IsBodyHtml = false;

                    using (SmtpClient Smtp = new SmtpClient())
                    {
                        Smtp.Host = "smtp.gmail.com";
                        Smtp.EnableSsl = true;
                        NetworkCredential credentials = new NetworkCredential("u20551313@tuks.co.za", "FentseT@21");
                        Smtp.UseDefaultCredentials = false;
                        Smtp.Credentials = credentials;
                        Smtp.Port = 587;
                        Smtp.Send(emailSend);
                    }
                }
            }
            if (usertype == 3)
            {
                using (MailMessage emailSend = new MailMessage("u20551313@tuks.co.za", email))
                {
                    emailSend.Subject = "Welcome future SAiCs Administrator!!!";
                    emailSend.Body = "Congratulations on getting thus far, we are happy that you chose to do business with us! The following are the details you can use to login :-). Username:" + username + " Password:" + password + " Please be aware you will only have access to functionality once admin has verified your account";
                    emailSend.IsBodyHtml = false;

                    using (SmtpClient Smtp = new SmtpClient())
                    {
                        Smtp.Host = "smtp.gmail.com";
                        Smtp.EnableSsl = true;
                        NetworkCredential credentials = new NetworkCredential("u20551313@tuks.co.za", "FentseT@21");
                        Smtp.UseDefaultCredentials = false;
                        Smtp.Credentials = credentials;
                        Smtp.Port = 587;
                        Smtp.Send(emailSend);
                    }
                }
            }
        }
        //Register a user
        public bool RegisterUser(RegisterVM registration)
        {
            try
            {
                //if admin user
                if (registration.RegisterInfo.UsertypeID == 3)
                {
                    if (RegisterAdmin(registration) == true)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }

                //if ambassasdor user
                if (registration.RegisterInfo.UsertypeID == 2)
                {
                    if (RegisterAmbassador(registration) == true)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }

                //if client user
                if (registration.RegisterInfo.UsertypeID == 1)
                {
                    if (RegisterClient(registration) == true)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }

                }

                else
                {
                    //Not registered
                    return false;
                }

            }
            catch (Exception error)
            {
                //Error
                return false;
            }

        }

        //Register Admin user method
        private bool RegisterAdmin(RegisterVM registration)
        {
            try
            {
                //Creating an admin
                Admin admin = new Admin();
                admin.Idnumber = registration.RegisterInfo.Idnumber;
                admin.Iddocument = null; // amanda solution
                admin.ProofOfAddress = null; // amanda soloution

                //Creating user
                User user = new User();
                user.UserRole = new UserRole { UserRoleId = 3 };
                user.UserRoleId = user.UserRole.UserRoleId;
                user.Title = new Title { TitleId = registration.RegisterInfo.TitleID };
                user.TitleId = user.Title.TitleId;
                user.Name = registration.RegisterInfo.Name;
                user.Surname = registration.RegisterInfo.Surname;
                user.Email = registration.RegisterInfo.EmailAddress;
                user.UserName = registration.RegisterInfo.EmailAddress;
                user.NormalizedEmail = registration.RegisterInfo.EmailAddress.ToUpper();
                user.NormalizedUserName = registration.RegisterInfo.EmailAddress.ToUpper();
                user.PhoneNumber = registration.RegisterInfo.PhoneNumber;
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(registration.AccessInfo.Password);
                Password password = new Password { Password1 = BCrypt.Net.BCrypt.HashPassword(registration.AccessInfo.Password), UserId = user.UserId.ToString() };
                Application application = new Application { ApplicationStatusId = 1, UserId = user.Id };
                
                //Linking Tables
                //Admin->User
                user.Admins.Add(admin);
                admin.User = user;

                //Title->User
                user.Title.Users.Add(user);
                user.Title = user.Title;

                //UserRole->User
                user.UserRole.Users.Add(user);
                user.UserRole = user.UserRole;

                Address address = new Address { Address1 = registration.RegisterInfo.Address, City = registration.RegisterInfo.City, PostalCode = registration.RegisterInfo.PostalCode, CountryId = registration.RegisterInfo.CountryID, UserId = user.Id, Country = new Country { CountryId = registration.RegisterInfo.CountryID } };
                //password->User
                user.Passwords.Add(password);
                password.User = user;

                //userapplicationstatus
                user.Applications.Add(application);

                //Assignings
                //userrole
                db.Entry(user.UserRole).State = EntityState.Unchanged;
                //title
                db.Entry(user.Title).State = EntityState.Unchanged;
                //Country
                db.Entry(address.Country).State = EntityState.Unchanged;

                //Add to database
                db.Applications.Add(application);
                db.Admins.Add(admin);
                db.Addresses.Add(address);


                if (db.SaveChanges() > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception error)
            {
                return false;
            }
        }

        //Register Ambassador User
        private bool RegisterAmbassador(RegisterVM registration)
        {
            try
            {
                //Create Ambassador
                Ambassador ambassador = new Ambassador();
                ambassador.AmbassadorType = new AmbassadorType { AmbassadorTypeId = Convert.ToInt32(registration.RegisterInfo.ambassadorType) };
                ambassador.AmbassadorTypeId = ambassador.AmbassadorType.AmbassadorTypeId;
                ambassador.Idnumber = registration.RegisterInfo.Idnumber;
                ambassador.Idphoto = null;
                ambassador.ProofOfAddress = null; //Amanda soloution
               
                //Create User
                User user = new User();
                user.UserRole = new UserRole { UserRoleId = 2 };
                user.UserRoleId = user.UserRole.UserRoleId;
                user.Title = new Title { TitleId = registration.RegisterInfo.TitleID };
                user.TitleId = user.Title.TitleId;

                user.Name = registration.RegisterInfo.Name;
                user.Surname = registration.RegisterInfo.Surname;
                user.Email = registration.RegisterInfo.EmailAddress;
                user.UserName = registration.RegisterInfo.EmailAddress;
                user.NormalizedEmail = registration.RegisterInfo.EmailAddress.ToUpper();
                user.NormalizedUserName = registration.RegisterInfo.EmailAddress.ToUpper();
                user.PhoneNumber = registration.RegisterInfo.PhoneNumber;
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(registration.AccessInfo.Password);
                Password password = new Password { Password1 = BCrypt.Net.BCrypt.HashPassword(registration.AccessInfo.Password), UserId = user.UserId.ToString() };
                // UserApplicationStatus uAPP = new UserApplicationStatus { ApplicationStatusId = 1, UserId = user.UserId.ToString() };

                Application application = new Application { ApplicationStatusId = 1, UserId = user.Id };
                Address address = new Address { Address1 = registration.RegisterInfo.Address, City = registration.RegisterInfo.City, PostalCode = registration.RegisterInfo.PostalCode, CountryId = registration.RegisterInfo.CountryID, ProvinceId = registration.RegisterInfo.ProvinceID, UserId = user.Id, Country = new Country { CountryId = registration.RegisterInfo.CountryID } };
                db.Addresses.Add(address);
                user.Applications.Add(application);
                //user.Country = new Country { CountryId = registration.RegisterInfo.CountryID };
                //user.CountryId = user.Country.CountryId;
                //user.Address = new Address { Address1 = registration.RegisterInfo.Address, City = registration.RegisterInfo.City, PostalCode = registration.RegisterInfo.PostalCode };
                //user.AddressId = user.Address.AddressId;
                //User
                user.Ambassadors.Add(ambassador);
                ambassador.User = user;

                //Cart
                Cart cart = new Cart();
                cart.UserId = user.Id;
                Add(cart);

                //Ambassadortype
                ambassador.AmbassadorType.Ambassadors.Add(ambassador);
                ambassador.AmbassadorType = ambassador.AmbassadorType;

                //userrole
                user.UserRole.Users.Add(user);
                user.UserRole = user.UserRole;

                //title
                user.Title.Users.Add(user);
                user.Title = user.Title;

                //country
                //user.Country.Users.Add(user);
                //user.Country = user.Country;

                //userapplicationstatus
                //user.UserApplicationStatuses.Add(uAPP);
                //uAPP.User = user;

                //address
                //user.Address.Users.Add(user);
                //user.Address = user.Address;

                //password
                user.Passwords.Add(password);
                password.User = user;

                //Application status
                //user.UserApplicationStatuses.Add(uAPP);
                //uAPP.User = user;

                //Assignings
                //userrole
                db.Entry(user.UserRole).State = EntityState.Unchanged;
                //title
                db.Entry(user.Title).State = EntityState.Unchanged;
                //Country
                db.Entry(address.Country).State = EntityState.Unchanged;
                //Ambassador Type
                db.Entry(ambassador.AmbassadorType).State = EntityState.Unchanged;

                //add to database
                //db.UserApplicationStatuses.Add(uAPP);
                db.Applications.Add(application);
                db.Ambassadors.Add(ambassador);
                db.SaveChanges();

                //giving ambassador their refferal code
                ReferralCode code = new ReferralCode();
                code.AmbassadorId = ambassador.AmbassadorId;
                code.IsActive = "true";
                var newRefferalCode = GenerateRefferralCode(registration.RegisterInfo.Name, registration.RegisterInfo.Surname, registration.RegisterInfo.referralcode).ToString();
                var existingRefferalCode = db.ReferralCodes.Where(code => code.ReferralCode1 == newRefferalCode).FirstOrDefault();

                //if generated refferral code doesnt already exist
                if (existingRefferalCode == null)
                {
                    code.ReferralCode1 = newRefferalCode;
                    Add(code);
                    db.SaveChanges();
                }

                //if generated refferral code already exists
                if (existingRefferalCode != null)
                {
                    code.ReferralCode1 = GenerateRefferralCode(registration.RegisterInfo.Name, registration.RegisterInfo.Surname, registration.RegisterInfo.referralcode).ToString();
                    Add(code);
                    db.SaveChanges();
                }

                //Create a linkage between the users through refferral code
                if (LinkUsers(registration.RegisterInfo.referralcode, registration.RegisterInfo.EmailAddress, "Ambassador") == true)
                {
                    //Send welcome  email
                    //Emails(user.EmailAddress, user.Username, registration.AccessInfo.Password, registration.RegisterInfo.UsertypeID);
                    db.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }


            }
            catch (Exception error)
            {
                return false;
            }
        }


        // testing 
        public bool ValidateRefferralCode(string refferalCode)
        {
                //see if there is a valid refferal code is used
                var registrationRefferralCode = db.ReferralCodes.Where(code => code.ReferralCode1 == refferalCode).FirstOrDefault();
                if (registrationRefferralCode == null)
                {
                    return false;
                }

                //Refferal code exists
                else
                {
                    return true;
                }
        }

        //Register Client user
        private bool RegisterClient(RegisterVM registration)
        {
            try
            {
                //Create Client
                Client client = new Client();
                client.Ambassador = new Ambassador { AmbassadorId = Convert.ToInt32(FindRefferalLink(registration.RegisterInfo.referralcode)) };
                client.AmbassadorId = Convert.ToInt32(FindRefferalLink(registration.RegisterInfo.referralcode));

                //Create user
                User user = new User();
                client.UserId = user.UserId.ToString();
                user.UserRole = new UserRole { UserRoleId = 1 };
                user.UserRoleId = user.UserRole.UserRoleId;
                user.Title = new Title { TitleId = registration.RegisterInfo.TitleID };
                user.TitleId = user.Title.TitleId;
                //user.Country = new Country { CountryId = registration.RegisterInfo.CountryID };
                //user.CountryId = user.Country.CountryId;
                //user.Address = new Address { Address1 = registration.RegisterInfo.Address, City = registration.RegisterInfo.City, PostalCode = registration.RegisterInfo.PostalCode };
                //user.AddressId = user.Address.AddressId;
                user.Name = registration.RegisterInfo.Name;
                user.Surname = registration.RegisterInfo.Surname;
                // user.EmailAddress = registration.RegisterInfo.EmailAddress;
                user.Email = registration.RegisterInfo.EmailAddress;
                user.NormalizedEmail = registration.RegisterInfo.EmailAddress.ToUpper();
                user.NormalizedUserName = registration.RegisterInfo.EmailAddress.ToUpper();
                user.UserName = registration.RegisterInfo.EmailAddress;
                user.PhoneNumber = registration.RegisterInfo.PhoneNumber;
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(registration.AccessInfo.Password);
                Password password = new Password { Password1 = BCrypt.Net.BCrypt.HashPassword(registration.AccessInfo.Password), UserId = user.Id };
                //UserApplicationStatus uAPP = new UserApplicationStatus { ApplicationStatusId = 2, UserId = user.Id, Date = DateTime.Today };
                Application application = new Application { ApplicationStatusId = 2, UserId = user.Id };
                Address address = new Address { Address1 = registration.RegisterInfo.Address, City = registration.RegisterInfo.City, PostalCode = registration.RegisterInfo.PostalCode, CountryId = registration.RegisterInfo.CountryID, ProvinceId = registration.RegisterInfo.ProvinceID, UserId = user.Id, Country = new Country { CountryId = registration.RegisterInfo.CountryID } };
                db.Addresses.Add(address);
                user.Applications.Add(application);

                //Create their cart
                Cart cart = new Cart();
                cart.UserId = user.Id;
                Add(cart);

                //Link tables
                //Client
                user.Clients.Add(client);
                client.User = user;

                //userrole
                user.UserRole.Users.Add(user);
                user.UserRole = user.UserRole;

                //title
                user.Title.Users.Add(user);
                user.Title = user.Title;

                //country
                //user.Country.Users.Add(user);
                //user.Country = user.Country;

                //address
                //user.Address.Users.Add(user);
                //user.Address = user.Address;

                //password
                user.Passwords.Add(password);
                password.User = user;

                //Application status
                //user.UserApplicationStatuses.Add(uAPP);
                //uAPP.User = user;

                //Assign 
                //userrole
                db.Entry(user.UserRole).State = EntityState.Unchanged;
                //title
                db.Entry(user.Title).State = EntityState.Unchanged;
                //Country
                db.Entry(address.Country).State = EntityState.Unchanged;
                //ambassador
                db.Entry(client.Ambassador).State = EntityState.Unchanged;

                //add to database
                db.Applications.Add(application);
                db.Clients.Add(client);
                db.SaveChanges();


                //link user to ambassador
                if (LinkUsers(registration.RegisterInfo.referralcode, registration.RegisterInfo.EmailAddress, "Client") == true)
                {
                    //Send welcome  email
                    //Emails(user.EmailAddress, user.Username, registration.AccessInfo.Password, registration.RegisterInfo.UsertypeID);
                    db.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }


            }
            catch (Exception error)
            {
                return false;
            }

        }

        //Getting all admin users
        public object GetAllAdmins()
        {
            try
            {
                var adminlist = db.Admins.Include(user => user.User)
                                             //.ThenInclude(country => country.Country)
                                             .Include(user => user.User)
                                             //.ThenInclude(address => address.Address)
                                             .Include(user => user.User)
                                            .ThenInclude(password => password.Passwords)
                                            .Include(user => user.User)
                                            .ThenInclude(title => title.Title)
                                            .Include(user => user.User)
                                            .ThenInclude(userrole => userrole.UserRole);
                return adminlist;
            }
            catch (Exception error)
            {
                return error.InnerException.Message;
            }
        }

        //Get all ambassador users
        public object GetAllAmbassadors()
        {
            try
            {
                var ambassadorList = db.Ambassadors.Include(user => user.User)
                                             //.ThenInclude(country => country.Country)
                                             .Include(user => user.User)
                                             // .ThenInclude(address => address.Address)
                                             .Include(user => user.User)
                                            .ThenInclude(password => password.Passwords)
                                            .Include(user => user.User)
                                            .ThenInclude(title => title.Title)
                                            .Include(user => user.User)
                                            .ThenInclude(userrole => userrole.UserRole)
                                            .ThenInclude(access => access.AccessLevel);

                return ambassadorList;
            }
            catch (Exception error)
            {
                return error.InnerException.Message;
            }
        }

        //Get all client users
        public object GetAllClients()
        {
            try
            {
                var clientList = db.Clients.Include(user => user.User)
                                             //.ThenInclude(country => country.Country)
                                             .Include(user => user.User)
                                             //.ThenInclude(address => address.Address)
                                             .Include(user => user.User)
                                            .ThenInclude(password => password.Passwords)
                                            .Include(user => user.User)
                                            .ThenInclude(title => title.Title)
                                            .Include(user => user.User)
                                            .ThenInclude(userrole => userrole.UserRole)
                                            .ThenInclude(access => access.AccessLevel)
                                            .Include(user => user.User)
                                            .ThenInclude(clients => clients.Clients);
                return clientList;
            }
            catch (Exception error)
            {
                return error.InnerException.Message;
            }
        }

        //Get session information
        public object getUserSessionInfo(LoginVM logindetails)
        {
            try
            {
                var user = db.Users.Where(user => user.UserName == logindetails.EmailorUsername || user.Email == logindetails.EmailorUsername)
                                                                        .Include(address => address.Addresses)
                                                                        .ThenInclude(country => country.Country)
                                                                        .Include(title => title.Title)                                                                       
                                                                        .Include(userrole => userrole.UserRole)
                                                                        .FirstOrDefault();
                if (user == null)
                {
                    return "User doesnt exist";
                }
                else
                {
                    return user;
                }
            }
            catch (Exception error)
            {
                return error.InnerException.Message;
            }
        }

        public object ApplicationStatus(string id)
        {
            //find users application and return that object
            var applicationStatus = db.Applications.Where(user => user.UserId == id).Include(status => status.ApplicationStatus).ToList();
            return applicationStatus;
        }

        //Get all the titles on the system
        public object GetTitles()
        {
            try
            {
                var titles = db.Titles.ToList();
                return titles;
            }
            catch (Exception error)
            {
                return error.Message;
            }
        }

        //Get all teh countries available on the system
        public object GetCountry()
        {
            try
            {
                var countries = db.Countries.ToList();
                return countries;
            }
            catch (Exception error)
            {
                return error.Message;
            }
        }

        //Get all user roles
        public object GetUserRoles()
        {
            try
            {
                var userroles = db.UserRoles.ToList();
                return userroles;
            }
            catch (Exception error)
            {
                return error.Message;
            }
        }

        //Get all the ambassador types
        public object GetAmbassadorTypes()
        {
            try
            {
                var ambassadorTypeList = db.AmbassadorTypes;
                return ambassadorTypeList.ToList();
            }
            catch (Exception error)
            {
                return error.Message;
            }
        }

        //Get specific feedback
        public object FindFeedback(int id)
        {
            try
            {
                Feedback feedback = db.Feedbacks.Where(x => x.FeedbackId == id).Single<Feedback>();
                return feedback;
            }
            catch (Exception error)
            {
                return error.InnerException.Message;
            }
        }

        //Get all product feedbacks
        //public object GetProductFeedbacks()
        //{
        //    try
        //    {
        //        var productfeedbacks = db.Feedbacks.Include(prod => prod.Product).Include(prodtype => prodtype.Product.ProductType).ToList();
        //        var FeedbackList = (from f in db.Feedbacks
        //                            join p in db.Products on f.ProductId equals p.ProductId
        //                            join pt in db.ProductTypes on p.ProductTypeId equals pt.ProductTypeId
        //                            select new
        //                            {
        //                                f.FeedbackId,
        //                                f.FeedbackTypeId,
        //                                f.Description,
        //                                f.Date,
        //                                f.ClientId,
        //                                p.ProductName,
        //                                pt.ProductTypeName
        //                            });
        //        return FeedbackList;
        //    }
        //    catch (Exception error)
        //    {
        //        return error.InnerException.Message;
        //    }
        //}

        //Get all ambassador feedbacks
        //public object GetAmbassadorFeedbacks()
        //{
        //    try
        //    {
        //        var ambassadorFeedback = db.Feedbacks.Include(amb => amb.Ambassador).Include(user=>user.Client);
        //        var FeedbackList = (from f in db.Feedbacks
        //                            join a in db.Ambassadors on f.AmbassadorId equals a.AmbassadorId
        //                            join u in db.Users on a.UserId equals u.UserId
        //                            select new
        //                            {
        //                                f.FeedbackId,
        //                                f.FeedbackTypeId,
        //                                f.Description,
        //                                f.Date,
        //                                f.ClientId,
        //                                u.Name,
        //                                u.Surname

        //                            }).ToList();
        //        return FeedbackList;
        //    }
        //    catch (Exception error)
        //    {
        //        return error.InnerException.Message;
        //    }
        //}

        //Get all FAQs of the account category
        //public object GetAccountFAQs()
        //{
        //    try
        //    {
        //        var FAQList = db.Faqs.Where(x => x.Faqcategory.CategoryName == "Account").ToList();
        //        return FAQList;
        //    }
        //    catch (Exception error)
        //    {
        //        return error.InnerException.Message;
        //    }
        //}

        //Get all FAQs of the product category
        //public object GetProductFAQs()
        //{
        //    try
        //    {
        //        var FAQList = db.Faqs.Where(x => x.Faqcategory.CategoryName == "Product").ToList();
        //        return FAQList;
        //    }
        //    catch (Exception error)
        //    {
        //        return error.InnerException.Message;
        //    }
        //}

        //Get all FAQs of the delivery category
        //public object GetDeliveryFAQs()
        //{
        //    try
        //    {
        //        var FAQList = db.Faqs.Where(x => x.Faqcategory.CategoryName == "Delivery").ToList();
        //        return FAQList;
        //    }
        //    catch (Exception error)
        //    {
        //        return error.InnerException.Message;
        //    }
        //}

        //Get ambassador assigned to users information
        public object MyAmbassador(int id)
        {
            try
            {
                var ambassador = db.Ambassadors
                                .Include(user => user.User)
                                .Include(client => client.Clients)
                                .Include(user => user.User)
                                //.ThenInclude(address => address.Address)
                                .Include(user => user.User)
                                //.ThenInclude(country => country.Country)
                                .Include(fb => fb.Feedbacks).Where(x => x.AmbassadorId == id);
                return ambassador;
            }
            catch (Exception error)
            {
                return error.InnerException.Message;
            }
        }

        //Get Catalog by category
        //public object GetCatalogByCategory(int id)
        //{
        //    try
        //    {
        //        var categoryproducts = db.Products.Where(prod => prod.ProductTypeId == id).ToList();
        //        var CategoryCatalog = (from a in db.Products
        //                               join b in db.ProductPrices on a.ProductId equals b.ProductId
        //                               join c in db.Prices on b.PriceId equals c.PriceId
        //                               select new
        //                               {
        //                                   a.ProductId,
        //                                   //a.SpecialId,
        //                                   a.ProductTypeId,
        //                                   a.Description,
        //                                   //a.Quantity,
        //                                   a.ProductName,
        //                                   //ProductImage = Convert.ToBase64String(a.ProductImage),
        //                                   c.Price1
        //                               }).Where(x => x.ProductTypeId == id).ToList();
        //        return categoryproducts;

        //    }
        //    catch (Exception error)
        //    {
        //        return error.InnerException.Message;
        //    }

        //}

        public void DontModify<T>(T entity) where T : class
        {
            db.Entry(entity).State = EntityState.Unchanged;
        }

        public object GetFAQCategories()
        {
            var categories = db.Faqcategories.ToList();
            return categories;
        }

        public bool updateFAQ(Faq faq)
        {
            try
            {
                Faq existingFaq = db.Faqs.Where(faqid => faqid.Faqid == faq.Faqid).FirstOrDefault();
                existingFaq.Faqquestion = faq.Faqquestion;
                //existingFaq.FaqtypeId = faq.FaqtypeId;
                existingFaq.FaqcategoryId = faq.FaqcategoryId;
                existingFaq.Faqanswers = faq.Faqanswers;
                return true;
            }
            catch
            {
                return false;
            }
        }

        //Amandas Repository Code

        //Product Subsystem

        //Get all products
        //public object GetProducts()
        //{
        //    try
        //    {

        //        var productList = from p in db.Products.ToList()
        //                          join pt in db.ProductTypes.ToList() on p.ProductTypeId equals pt.ProductTypeId into ptTable
        //                          from pt in ptTable.ToList()
        //                          join pp in db.ProductPrices.ToList() on p.ProductId equals pp.ProductId into ppTable
        //                          from pp in ppTable.ToList()
        //                          join pr in db.Prices.ToList() on pp.PriceId equals pr.PriceId into prTable
        //                          from pr in prTable.ToList()
        //                          select new ProductVM
        //                          {
        //                              product = p,
        //                              productType = pt,
        //                              productPrice = pp,
        //                              price = pr

        //                          };
        //        return productList;
        //    }
        //    catch (Exception error)
        //    {
        //        return error.Message;
        //    }
        //}

        // Get product types 
        //public object GetProductTypes()
        //{
        //    try
        //    {
        //        var productTypeList = db.ProductTypes;
        //        return productTypeList.ToList();
        //    }
        //    catch (Exception error)
        //    {
        //        return error.Message;
        //    }
        //}

        // Get product by name
        //public object GetProductByName(string name)
        //{
        //    try
        //    {

        //        var product = (from p in db.Products
        //                       join pt in db.ProductTypes on p.ProductTypeId equals pt.ProductTypeId
        //                       join pp in db.ProductPrices on p.ProductId equals pp.ProductId
        //                       join pr in db.Prices on pp.PriceId equals pr.PriceId
        //                       where p.ProductName == name
        //                       select new ProductVM
        //                       {
        //                           product = p,
        //                           productType = pt,
        //                           productPrice = pp,
        //                           price = pr

        //                       }).FirstOrDefault();
        //        //db.Products.Where(p => p.ProductName == name).Single<Product>();

        //        return product;
        //    }
        //    catch (Exception error)
        //    {
        //        return error.Message;
        //    }
        //}

        //Create prouduct
        //public object CreateProduct(ProductVM product)
        //{
        //    try
        //    {
        //        Product newProduct = db.Products.FirstOrDefault(p => p.ProductName == product.product.ProductName);

        //        if (newProduct == null)
        //        {
        //            //add product
        //            newProduct = new Product
        //            {
        //                ProductName = product.product.ProductName,
        //                ProductTypeId = product.product.ProductTypeId,
        //                //Quantity = product.product.Quantity,
        //                Description = product.product.Description,
        //                ProductImage = product.product.ProductImage
        //            };
        //            Add(newProduct);
        //            SaveChanges();

        //            //find an existing price
        //            Price searchPrice = db.Prices.FirstOrDefault(p => p.Price1 == product.price.Price1);

        //            //add new price if it doesnt exist
        //            if (searchPrice == null)
        //            {
        //                Price price = new Price
        //                {
        //                    Price1 = product.price.Price1
        //                };
        //                Add(price);
        //                SaveChanges();
        //                searchPrice = price;
        //            }

        //            // add attributes to product price
        //            ProductPrice productPrice = new ProductPrice
        //            {
        //                ProductId = newProduct.ProductId,
        //                PriceId = searchPrice.PriceId
        //            };
        //            Add(productPrice);
        //            SaveChanges();
        //        }
        //        else
        //        { return false; }

        //        return true;
        //    }
        //    catch (Exception error)
        //    {
        //        return error.Message;
        //    }
        //}

        //Update product
        //public object UpdateProduct(string name, ProductVM product)
        //{
        //    try
        //    {
        //        // Find the record 
        //        Product existingProduct = db.Products.FirstOrDefault(p => p.ProductName == name);

        //        //Update attributes
        //        existingProduct.ProductName = product.product.ProductName;
        //        existingProduct.ProductTypeId = product.product.ProductTypeId;
        //        existingProduct.Description = product.product.Description;
        //        //existingProduct.Quantity = product.product.Quantity;
        //        existingProduct.ProductImage = product.product.ProductImage;
        //        SaveChanges();

        //        //find an existing price
        //        Price searchPrice = db.Prices.FirstOrDefault(p => p.Price1 == product.price.Price1);

        //        //add new price if it doesnt exist
        //        if (searchPrice == null)
        //        {
        //            Price price = new Price
        //            {
        //                Price1 = product.price.Price1
        //            };
        //            Add(price);
        //            SaveChanges();
        //            searchPrice = price;
        //        }

        //        // find price and change
        //        ProductPrice exstingProductPrice = db.ProductPrices.FirstOrDefault(p => p.ProductId == existingProduct.ProductId);
        //        exstingProductPrice.PriceId = searchPrice.PriceId;
        //        SaveChanges();

        //        return "Updated successfully";
        //    }
        //    catch (Exception error)
        //    {
        //        return error.Message;
        //    }
        //}

        //Delete product
        //public object DeleteProduct(int id)
        //{
        //    try
        //    {
        //        var deleteProduct = db.Products.Find(id);
        //        Delete(deleteProduct);
        //        SaveChanges();
        //        return "Product deleted";
        //    }
        //    catch (Exception error)
        //    {
        //        return error.Message;
        //    }
        //}

        //Get all packages
        //public object GetPackages()
        //{
        //    try
        //    {
        //        var packageList = from p in db.Packages.ToList()
        //                          join pt in db.PackageTypes.ToList() on p.PackageTypeId equals pt.PackageTypeId into ptTable
        //                          from pt in ptTable.ToList()
        //                          join pp in db.PackagePrices.ToList() on p.PackageId equals pp.PackageId into ppTable
        //                          from pp in ppTable.ToList()
        //                          join pr in db.Prices.ToList() on pp.PriceId equals pr.PriceId into prTable
        //                          from pr in prTable.ToList()
        //                          select new PackageVM
        //                          {
        //                              package = p,
        //                              packageType = pt,
        //                              packagePrice = pp,
        //                              price = pr

        //                          };

        //        return packageList.ToList();
        //    }
        //    catch (Exception error)
        //    {
        //        return error.Message;
        //    }
        //}

        // Get package types 
        //public object GetPackageTypes()
        //{
        //    try
        //    {
        //        var packageTypeList = db.PackageTypes;
        //        return packageTypeList.ToList();
        //    }
        //    catch (Exception error)
        //    {
        //        return error.Message;
        //    }
        //}

        // Get package by name
        //public object GetPackageByName(string name)
        //{
        //    try
        //    {
        //        var package = (from p in db.Packages
        //                       join pt in db.PackageTypes on p.PackageTypeId equals pt.PackageTypeId
        //                       join pp in db.PackagePrices on p.PackageId equals pp.PackageId
        //                       join pr in db.Prices on pp.PriceId equals pr.PriceId
        //                       where p.PackageName == name
        //                       select new PackageVM
        //                       {
        //                           package = p,
        //                           packageType = pt,
        //                           packagePrice = pp,
        //                           price = pr

        //                       }).FirstOrDefault();

        //        return package;
        //    }
        //    catch (Exception error)
        //    {
        //        return error.Message;
        //    }
        //}

        //Create package
        //public object CreatePackage(PackageVM package)
        //{
        //    try
        //    {
        //        Package newPackage = db.Packages.FirstOrDefault(p => p.PackageName == package.package.PackageName);

        //        if (newPackage == null)
        //        {
        //            //add product
        //            newPackage = new Package
        //            {
        //                PackageName = package.package.PackageName,
        //                PackageTypeId = package.package.PackageTypeId,
        //                //Quantity = package.package.Quantity,
        //                Description = package.package.Description,
        //                PackageImage = package.package.PackageImage
        //            };
        //            Add(newPackage);
        //            SaveChanges();

        //            //find an existing price
        //            Price searchPrice = db.Prices.FirstOrDefault(p => p.Price1 == package.price.Price1);

        //            //add new price if it doesnt exist
        //            if (searchPrice == null)
        //            {
        //                Price price = new Price
        //                {
        //                    Price1 = package.price.Price1
        //                };
        //                Add(price);
        //                SaveChanges();
        //                searchPrice = price;
        //            }

        //            // add attributes to product price
        //            PackagePrice packagePrice = new PackagePrice
        //            {
        //                PackageId = newPackage.PackageId,
        //                PriceId = searchPrice.PriceId
        //            };
        //            Add(packagePrice);
        //            SaveChanges();
        //        }
        //        else
        //        { return false; }

        //        return true;
        //    }
        //    catch (Exception error)
        //    {
        //        return error.Message;
        //    }
        //}

        //Update package
        //public object UpdatePackage(string name, PackageVM package)
        //{
        //    try
        //    {
        //        // Find the record 
        //        Package existingPackage = db.Packages.FirstOrDefault(p => p.PackageName == name);

        //        //Update attributes
        //        existingPackage.PackageName = package.package.PackageName;
        //        existingPackage.PackageTypeId = package.package.PackageTypeId;
        //        existingPackage.Description = package.package.Description;
        //        // existingPackage.Quantity = package.package.Quantity;
        //        existingPackage.PackageImage = package.package.PackageImage;
        //        SaveChanges();

        //        //find an existing price
        //        Price searchPrice = db.Prices.FirstOrDefault(p => p.Price1 == package.price.Price1);

        //        //add new price if it doesnt exist
        //        if (searchPrice == null)
        //        {
        //            Price price = new Price
        //            {
        //                Price1 = package.price.Price1
        //            };
        //            Add(price);
        //            SaveChanges();
        //            searchPrice = price;
        //        }

        //        // find price and change
        //        PackagePrice exstingPackagePrice = db.PackagePrices.FirstOrDefault(p => p.PackageId == existingPackage.PackageId);
        //        exstingPackagePrice.PriceId = searchPrice.PriceId;
        //        SaveChanges();

        //        return "Updated successfully";
        //    }
        //    catch (Exception error)
        //    {
        //        return error.Message;
        //    }
        //}

        //Delete package
        //public object DeletePackage(int id)
        //{
        //    try
        //    {
        //        var deletePackage = db.Packages.Find(id);
        //        Delete(deletePackage);
        //        SaveChanges();
        //        return "Product deleted";
        //    }
        //    catch (Exception error)
        //    {
        //        return error.Message;
        //    }
        //}

        public object AddProductToCart(int id)
        {
            throw new NotImplementedException();
        }

        public object AddPackageToCart(int id)
        {
            throw new NotImplementedException();
        }

        public object AddSpecialToCart(int id)
        {
            throw new NotImplementedException();
        }
        public object FindRefferalLink(string refferalCode)
        {
            var refferalrecord = db.ReferralCodes.Where(refferalcode => refferalcode.ReferralCode1 == refferalCode).FirstOrDefault();

            if (refferalrecord != null)
            {
                var linkedUserDetails = db.Ambassadors.Where(linkedambassador => linkedambassador.AmbassadorId == refferalrecord.AmbassadorId).Select(id => id.AmbassadorId).ToList();
                return linkedUserDetails[0];
                //Accidently did code for find ambassador refferals/clients and ambassador etc
                //var userlinked = db.Referrals.Where(refferalID => refferalID.ReferralCodeId == refferalrecord.ReferralCodeId).FirstOrDefault();
                //var userrefferalcode = db.ReferralCodes.Where(code => code.ReferralCodeId == userlinked.ReferralCodeId).FirstOrDefault();
                //var ambdetails = db.Ambassadors.Where(ambrefferaldetails => ambrefferaldetails.AmbassadorId == userrefferalcode.AmbassadorId).FirstOrDefault();
                ////var ambdetails = db.Ambassadors.Where(amb => amb.UserId == userlinked.UserId).FirstOrDefault();
                //return ambdetails;
            }
            else
            {
                return "Couldnt find user";
            }

        }

        private bool LinkUsers(string refferalCode, string emailaddress, string usertype)
        {
            var refferalrecord = db.ReferralCodes.Where(refferalcode => refferalcode.ReferralCode1 == refferalCode).FirstOrDefault();
            try
            {
                if (usertype == "Client")
                {

                    Referral linking = new Referral();
                    linking.ReferralCodeId = refferalrecord.ReferralCodeId;
                    linking.ReferralLinkTypeId = 1;
                    linking.Date = DateTime.Now;
                    var userId = db.Users.Where(email => email.Email == emailaddress).Select(userid => userid.Id).ToList();
                    linking.UserId = userId[0];
                    Add(linking);
                    SaveChanges();
                    return true;
                }
                if (usertype == "Ambassador")
                {
                    Referral linking = new Referral();
                    linking.ReferralCodeId = refferalrecord.ReferralCodeId;
                    linking.ReferralLinkTypeId = 2;
                    linking.Date = DateTime.Now;
                    var userId = db.Users.Where(email => email.Email == emailaddress).Select(userid => userid.Id).ToList();
                    linking.UserId = userId[0];
                    Add(linking);
                    SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception error)
            {
                return false;
            }


        }

        public object Find<T>(T entity) where T : class
        {
            return "";

        }

        public object GenerateRefferralCode(string name, string surname, string usedRefferralCode)
        {
            string distributor = usedRefferralCode.Substring(0, 5);
            Random rndNum = new Random();
            int[] code = new int[4];
            for (int j = 0; j < 4; j++)
            {
                code[j] = (rndNum.Next(0, 10));
            }
            var refferralcode = distributor+ name.Substring(0, 2).ToUpper() + surname.Substring(0, 2).ToUpper() + string.Join("", code);
            return refferralcode;

        }
        public object GenerateToken(User user)
        {
            //User userLogin = user;
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
                new Claim(ClaimTypes.Role, user.UserRole.UserRoleName)

            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Tokens:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                _configuration["Tokens:Issuer"],
                _configuration["Tokens:Audience"],
                claims,
                signingCredentials: credentials,
                expires: DateTime.UtcNow.AddHours(5)
           );

            return new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo

            };
        }


        public bool CheckPassword(string id, string password)
        {
            var passwordRecord = db.Passwords.Where(userid => userid.UserId == id).ToList();
            if (BCrypt.Net.BCrypt.Verify(password, passwordRecord[0].Password1) == true)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public object ViewCurrentAgents(string userID)
        {
            var ambassadorRecord = db.Ambassadors.Where(user => user.UserId == userID).ToList();
            var refferalId = db.ReferralCodes.Where(ambassadorID => ambassadorID.AmbassadorId == ambassadorRecord[0].AmbassadorId).ToList();
            var agentsLinked = db.Referrals.Where(ambID => ambID.ReferralCodeId == refferalId[0].ReferralCodeId && ambID.ReferralLinkTypeId == 2)
                                                                        .Include(user => user.User)
                                                                        .ThenInclude(type => type.Ambassadors)
                                                                        .ThenInclude(type => type.AmbassadorType)
                                                                        .ToList();

            return agentsLinked;
            // throw new NotImplementedException();
        }

        public object SearchCurrentAgents(string userID, string searchInput)
        {
            var ambassadorRecord = db.Ambassadors.Where(user => user.UserId == userID).ToList();
            var refferalId = db.ReferralCodes.Where(ambassadorID => ambassadorID.AmbassadorId == ambassadorRecord[0].AmbassadorId).ToList();
            var searchedagentsLinked = db.Referrals.Where(ambID => ambID.ReferralCodeId == refferalId[0].ReferralCodeId && ambID.ReferralLinkTypeId == 2)
                                                                        .Include(user => user.User)
                                                                        .ThenInclude(type => type.Ambassadors)
                                                                        .ThenInclude(type => type.AmbassadorType)
                                                                        .Include(user => user.User).Where(searchInfo => searchInfo.User.Name.Contains(searchInput) || searchInfo.User.Surname.Contains(searchInput))
                                                                        .ToList();
            if (searchedagentsLinked.Count() == 0)
            {
                return "Not Found";
            }
            return searchedagentsLinked;
            
        }

        public bool RequestRankingPromotion(string userID)
        {
            try
            {
                var ambassadorRecord = db.Ambassadors.Where(id => id.UserId == userID).ToList();
                PositionRequest newPositionRequest = new PositionRequest { AmbassadorId = ambassadorRecord[0].AmbassadorId, RequestTypeId = 1, Date = DateTime.Now };
                Add(newPositionRequest);
                SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool RequestRankingDemotion(string userID)
        {
            try
            {
                var ambassadorRecord = db.Ambassadors.Where(id => id.UserId == userID).ToList();
                PositionRequest newPositionRequest = new PositionRequest { AmbassadorId = ambassadorRecord[0].AmbassadorId, RequestTypeId = 2, Date = DateTime.Now };
                Add(newPositionRequest);
                SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public object ViewClient(string userID)
        {
            var ambassadorRecord = db.Ambassadors.Where(user => user.UserId == userID).ToList();
            var refferalId = db.ReferralCodes.Where(ambassadorID => ambassadorID.AmbassadorId == ambassadorRecord[0].AmbassadorId).ToList();
            var agentsLinked = db.Referrals.Where(ambID => ambID.ReferralCodeId == refferalId[0].ReferralCodeId && ambID.ReferralLinkTypeId == 1).Include(user => user.User).ThenInclude(amb => amb.Ambassadors).ToList();
            return agentsLinked;

        }

        public object ViewAmbassadorFeedback(string userID)
        {
            var ambassadorRecord = db.Ambassadors.Where(user => user.UserId == userID).ToList();
            //note feedbacktype 1 is products and feedbacktype 2 is ambassador
            var feedbacks = db.Feedbacks.Where(ambid => ambid.AmbassadorId == ambassadorRecord[0].AmbassadorId && ambid.FeedbackTypeId == 2).ToList();
            return feedbacks;
        }

        public object SearchAmbassador(string name, string surname)
        {
            var searchedAmbassador = db.Users.Where(search => search.Name == name || search.Surname == surname).ToList();
            var searchResult = db.Ambassadors.Where(user => user.UserId == searchedAmbassador[0].Id).Include(userinfo => userinfo.User).ToList();

            if (searchResult.Count() > 1)
            {
                return searchResult[0];
            }
            else
            {
                return null;
            }

        }

        //Amanda iteration 06
        //public object ViewCatalog()
        //{

        //    var catalog = db.Products
        //    .Select(x => new
        //    {
        //        ItemID = x.ProductId,
        //        ItemName = x.ProductName,
        //        ItemType = 1,
        //        ItemCategory = x.ProductTypeId,
        //        ItemPrice = x.ProductPrices.Select(p => p.Price.Price1).FirstOrDefault(),
        //        ItemImage = x.ProductImage,
        //        ItemQuantity = 0
        //    })
        //    .AsEnumerable()
        //    .Concat(db.Packages.Select(x => new
        //    {
        //        ItemID = x.PackageId,
        //        ItemName = x.PackageName,
        //        ItemType = 2,
        //        ItemCategory = x.PackageTypeId,
        //        ItemPrice = x.PackagePrices.Select(p => p.Price.Price1).FirstOrDefault(),
        //        ItemImage = x.PackageImage,
        //        ItemQuantity = 0
        //    }));

        //    return catalog;
        //}

        //public object AddToCart(CartVM item)
        //{
        //    //Find the cart for the specific user
        //    Cart userCartID = db.Carts.FirstOrDefault(c => c.UserId == item.userID.ToString());
        //    item.cartItem.CartId = userCartID.CartId;

        //    //Search for the cartITem
        //    CartItem cartItem = Search<CartItem>(c => c.CartItemId == item.cartItem.CartItemId && c.CartId == item.cartItem.CartId).FirstOrDefault();

        //    //Increase quantity if item exists
        //    if (cartItem != null)
        //    {
        //        cartItem.Quantity += item.cartItem.Quantity;
        //        SaveChanges();
        //    }
        //    else //Create cartItem if null
        //    {
        //        cartItem = new CartItem
        //        {
        //            PackageId = item.cartItem.PackageId ?? null,
        //            ProductId = item.cartItem.ProductId ?? null,
        //            SpecialId = item.cartItem.SpecialId ?? null,
        //            CartId = item.cartItem.CartId,
        //            Quantity = item.cartItem.Quantity,
        //            Price = item.cartItem.Price

        //        };
        //        Add(cartItem);
        //        SaveChanges();

        //    }
        //   ;
        //    return cartItem.CartItemId;

        //}

        public object RemoveFromCart(int itemID)
        {
            var item = FindById<CartItem>(itemID);
            Delete(item);
            SaveChanges();
            return "Item removed";

        }


        public object ClearCart(int cartID)
        {
            db.CartItems.RemoveRange(db.CartItems.Where(c => c.CartId == cartID));
            SaveChanges();
            return "Cart cleared";
        }

        //public object ViewAmbassadorCart()
        //{
        //    //insert string userID 
        //    //CANNOT GET USER FROM LOCAL STORAGE, ITS SENDING NULL VALUES
        //    //Find the cart for the specific user
        //    //Cart userCartID = db.Carts.FirstOrDefault(c => c.UserId == userID);
        //    var one = 1;

        //    //Find cart id
        //    var cart = db.Carts.Where(id => id.UserId == one.ToString()).FirstOrDefault();

        //    //Fetch ambassador discount
        //    var discount = db.Ambassadors.Where(id => id.AmbassadorId == one)
        //                                .Select(x => new { Discount = x.AmbassadorType.DiscountPercentage }).FirstOrDefault();

        //    // Fetch VAT, by latest date??
        //    var vatAmount = db.Vats.Select(x => x.VatPercentage).FirstOrDefault();

        //    //Find cart items based on id
        //    var cartItem = db.CartItems.Where(items => items.CartId == cart.CartId)
        //                               .Select(x => new
        //                               {
        //                                   CartID = x.CartId,
        //                                   CartItemID = x.CartItemId,
        //                                   Price = x.Price,
        //                                   Quantity = x.Quantity,
        //                                   ItemName = x.Product.ProductName ?? x.Package.PackageName,
        //                                   ItemImage = x.Product.ProductImage ?? x.Package.PackageImage,
        //                                   ItemDiscount = discount,
        //                                   VaT = vatAmount
        //                               });


        //    return cartItem;

        //}

        //public object ViewClientCart()
        //{
        //    //insertstring userID 
        //    //Find the cart for the specific user
        //    //Cart userCartID = db.Carts.FirstOrDefault(c => c.UserId == userID);
        //    var one = 1;

        //    //Find cart id
        //    var cart = db.Carts.Where(id => id.UserId == one.ToString()).FirstOrDefault();

        //    // Fetch VAT, by latest date??
        //    var vatAmount = db.Vats.Select(x => x.VatPercentage).FirstOrDefault();

        //    //Find cart items based on id
        //    var cartItem = db.CartItems.Where(items => items.CartId == cart.CartId)
        //                               .Select(x => new
        //                               {
        //                                   CartID = x.CartId,
        //                                   CartItemID = x.CartItemId,
        //                                   Price = x.Price,
        //                                   Quantity = x.Quantity,
        //                                   ItemName = x.Product.ProductName ?? x.Package.PackageName,
        //                                   ItemImage = x.Product.ProductImage ?? x.Package.PackageImage,
        //                                   VaT = vatAmount
        //                               });


        //    return cartItem;

        //}

        //public object createVAT(decimal vat)
        //{
        //    Vat newVat = new Vat { Date = DateTime.Today, VatPercentage = vat };
        //    Add(newVat);
        //    SaveChanges();
        //    return "saved";
        //}

        //public object Checkout(CheckoutVM checkout)
        //{

        //    //Find the cart items
        //    var cartItem = db.CartItems.Where(items => items.CartId == checkout.order.CartId).ToList();

        //    //Create order object
        //    Order newOrder = db.Orders.FirstOrDefault(p => p.OrderId == checkout.order.OrderId);

        //    if (newOrder == null)
        //    {
        //        newOrder = new Order
        //        {
        //            OrderStatusId = checkout.order.OrderStatusId,
        //            AddressId = checkout.order.AddressId,
        //            CartId = checkout.order.CartId,
        //            DeliveryId = checkout.order.DeliveryId,
        //            ProofOfPayment = checkout.order.ProofOfPayment,
        //            Date = DateTime.Today
        //        };

        //        for (int orderitems = 0; orderitems <= cartItem.Count(); orderitems++)
        //        {
        //            OrderItem items = new OrderItem();
        //            items.PackageId = cartItem[orderitems].PackageId;
        //            items.ProductId = cartItem[orderitems].ProductId;
        //            items.SpecialId = cartItem[orderitems].SpecialId;
        //            items.OrderId = newOrder.OrderId;
        //            items.Quantity = cartItem[orderitems].Quantity;
        //            items.Price = cartItem[orderitems].Price;
        //            Add(items);

        //        }
        //        Add(newOrder);
        //        SaveChanges();
        //    }
        //    else
        //    {
        //        return false;
        //    }


        //    return true;
        //}

        public object ViewOrderHistory(string userID)
        {
            var orders = db.Orders.Where(id => id.UserId == userID).Include(os => os.OrderStatus)
                                                                   .ToList();
            return orders;
        }

        //public object ViewOrderDetails(int orderID)
        //{
        //    var orderItem = db.OrderItems.Where(items => items.OrderId == orderID).Include(prod => prod.Product)
        //                                                                              .Include(pack => pack.Package)
        //                                                                              .Include(spec => spec.Special)
        //                                                                              .Include(o => o.Order)
        //                                                                              .ThenInclude(os => os.OrderStatus)
        //                                                                              .ToList();
        //    return orderItem;
        //}
        public object AssignCourse(int userID)
        {
            var Ambassador = db.Users.Where(u => u.UserId == userID).Include(a => a.Addresses)
                                                                    .Include(Amb => Amb.Ambassadors)
                                                                    .ThenInclude(AmbType => AmbType.AmbassadorType)
                                                                    .ToList();

            return Ambassador;
        }

        public bool UpdateUser(ProfileVM user)
        {
            //find user
           var existingUser = db.Users.Where(id => id.Id == user.Id).FirstOrDefault();
           
            //update user
            //existingUser.TitleId = user.TitleId;
            existingUser.Name = user.Name;
            existingUser.Surname = user.Surname;
            //existingUser.Email = user.Email;
            existingUser.PhoneNumber = user.PhoneNumber;

            //update address
            var existingAddress = db.Addresses.Where(id => id.UserId == user.Id).FirstOrDefault();
            existingAddress.CountryId = user.CountryId;
            existingAddress.Address1 = user.Address;
            existingAddress.PostalCode = user.PostalCode;
            existingAddress.City = user.City;

            if (SaveChanges())
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public object PositionRequests()
        {
            List<PositionRequestsVM> allPositionRequests = new List<PositionRequestsVM>();
           

            //get all postionRequests 
            var requests = db.PositionRequests.Include(position =>position.RequestType).Include(amb => amb.Ambassador).ThenInclude(rank => rank.AmbassadorType).ToList();

            for (var i =0; i<requests.Count(); i++)
            {
                //variable for storing everything in Position request view model
                Ambassador ambassadorsPositionRequests = new Ambassador();
                List<Order> ambassadorsOrders = new List<Order>();

                //finding the ambassador who wants a position request
                var foundAmb = db.Ambassadors.Where(ambid => ambid.AmbassadorId == requests[i].AmbassadorId).FirstOrDefault();
                var foundUser = db.Users.Where(id => id.Id == foundAmb.UserId).FirstOrDefault();

                //add user(Ambassador to list)
                Ambassador positionUser = new Ambassador();
                positionUser = foundAmb;
                //positionUser.Name = foundUser.Name;
                //positionUser.Surname = foundUser.Surname;
                //positionUser.Email = foundUser.Email;
                //positionUser.PhoneNumber = foundUser.PhoneNumber;
                ambassadorsPositionRequests = positionUser;

                //find all the orders linked to ambassador
                //var orders = db.Orders.Where(ambid => ambid.AmbassadorId == requests[i].AmbassadorId).ToList();

                //for (var x = 0; x<= orders.Count(); x++)
                //{
                //    Order positionUserOrders = new Order();
                //    positionUserOrders = orders[x];
                //    //positionUserOrders.Address = orders[x].Address;
                //    ambassadorsOrders.Add(positionUserOrders);

                //}
                PositionRequestsVM appendPositionRequest = new PositionRequestsVM();
                appendPositionRequest.Ambassador = ambassadorsPositionRequests;
                //appendPositionRequest.Orders = ambassadorsOrders;
                allPositionRequests.Add(appendPositionRequest);
                //add order of teh user(ambassador) to list
                //Order positionUsersOrders =
                //ambassadorsOrders.Add((Order)db.Orders.Where(ambid => ambid.AmbassadorId == requests[i].AmbassadorId));
            }

            //PositionRequestsVM positionrequests = new PositionRequestsVM();
            //positionrequests.Ambassadors = ambassadorsPositionRequests;
            //positionrequests.Orders = ambassadorsOrders;
            return allPositionRequests;

            //for (var i = 0; i<= requests.Count();i++)
            //{
            //    var ambRefferral = db.ReferralCodes.Where(amb => amb.AmbassadorId == requests[i].AmbassadorId).FirstOrDefault();
            //     this.FindRefferalLink(ambRefferral.ReferralCode1);
            //   // db.Referrals.Where(ambid => ambid.re)
            //}



        }

        public void deleteFAQ(int faqId)
        {
            var deleteFAQ = db.Faqs.Where(faq => faq.Faqid == faqId).FirstOrDefault();
            Delete(deleteFAQ);
        }

        public void deleteFAQCategory(int faqCategoryId)
        {
            var deleteFAQCategory = db.Faqcategories.Where(category => category.FaqcategoryId == faqCategoryId).FirstOrDefault();
            Delete(deleteFAQCategory);

        }

        public string GenerateOTP()
        {
            
                Random rndNum = new Random();
                int[] otpNum = new int[4];
                for (int j = 0; j < 4; j++)
                {
                    otpNum[j] = (rndNum.Next(0, 10));
                }
                return string.Join("", otpNum);
            
        }

        public bool VerifyOTP(string userID, string otp)
        {
            var verifyOTP = db.Passwords.Where(id => id.UserId == userID).FirstOrDefault();
            if(BCrypt.Net.BCrypt.Verify(otp, verifyOTP.HashedOtp) == true)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }


}

