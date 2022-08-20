﻿using Microsoft.AspNetCore.Identity;
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
            var faqs = db.Faqs.ToList();
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
                admin.ProofOfAddress = null;

                //Creating user
                User user = new User();
                user.UserRole = new UserRole { UserRoleId = 3 };
                user.UserRoleId = user.UserRole.UserRoleId;
                user.Title = new Title { TitleId = registration.RegisterInfo.TitleID };
                user.TitleId = user.Title.TitleId;

                user.Name = registration.RegisterInfo.Name;
                user.Surname = registration.RegisterInfo.Surname;
                //user.EmailAddress = registration.RegisterInfo.EmailAddress;
                user.Email = registration.RegisterInfo.EmailAddress;
                user.UserName = registration.RegisterInfo.EmailAddress;
                user.NormalizedEmail = registration.RegisterInfo.EmailAddress.ToUpper();
                user.NormalizedUserName = registration.RegisterInfo.EmailAddress.ToUpper();
                //user.PhoneNumber = registration.RegisterInfo.PhoneNumber;
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(registration.AccessInfo.Password);
                Password password = new Password { Password1 = BCrypt.Net.BCrypt.HashPassword(registration.AccessInfo.Password), UserId = user.UserId.ToString() };
                //UserApplicationStatus uAPP = new UserApplicationStatus { ApplicationStatusId = 1, UserId = user.UserId.ToString() };
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
                //Country->User
                //user.Country.Users.Add(user);
                //user.Country = user.Country;
                //Address->User
                //user.Address.Users.Add(user);
                //user.Address = user.Address;

                Address address = new Address { Address1 = registration.RegisterInfo.Address, City = registration.RegisterInfo.City, PostalCode = registration.RegisterInfo.PostalCode, CountryId = registration.RegisterInfo.CountryID, UserId = user.Id, Country = new Country { CountryId = registration.RegisterInfo.CountryID } };


                //user.Country = new Country { CountryId = registration.RegisterInfo.CountryID };
                //user.CountryId = user.Country.CountryId;
                //user.Address = new Address { Address1 = registration.RegisterInfo.Address, City = registration.RegisterInfo.City, PostalCode = registration.RegisterInfo.PostalCode };
                //user.AddressId = user.Address.AddressId;

                //password->User
                user.Passwords.Add(password);
                password.User = user;

                //userapplicationstatus
                user.Applications.Add(application);
                //uAPP.User = user;


                //Assignings
                //userrole
                db.Entry(user.UserRole).State = EntityState.Unchanged;
                //title
                db.Entry(user.Title).State = EntityState.Unchanged;
                //Country
                db.Entry(address.Country).State = EntityState.Unchanged;

                //Add to database
                //db.UserApplicationStatuses.Add(uAPP);
                db.Applications.Add(application);
                db.Admins.Add(admin);
                db.Addresses.Add(address);

                db.SaveChanges();

                return true;
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
                //ambassador.Idphoto = null;
                //ambassador.ProofOfAddressPhoto = null; //fix it up
                //ambassador.ProfilePic = null;

                //Create User
                User user = new User();
                user.UserRole = new UserRole { UserRoleId = 2 };
                user.UserRoleId = user.UserRole.UserRoleId;
                user.Title = new Title { TitleId = registration.RegisterInfo.TitleID };
                user.TitleId = user.Title.TitleId;

                user.Name = registration.RegisterInfo.Name;
                user.Surname = registration.RegisterInfo.Surname;
                //user.EmailAddress = registration.RegisterInfo.EmailAddress;
                user.Email = registration.RegisterInfo.EmailAddress;
                user.UserName = registration.RegisterInfo.EmailAddress;
                user.NormalizedEmail = registration.RegisterInfo.EmailAddress.ToUpper();
                user.NormalizedUserName = registration.RegisterInfo.EmailAddress.ToUpper();
                //user.PhoneNumber = registration.RegisterInfo.PhoneNumber;
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(registration.AccessInfo.Password);
                Password password = new Password { Password1 = BCrypt.Net.BCrypt.HashPassword(registration.AccessInfo.Password), UserId = user.UserId.ToString() };
                // UserApplicationStatus uAPP = new UserApplicationStatus { ApplicationStatusId = 1, UserId = user.UserId.ToString() };

                Application application = new Application { ApplicationStatusId = 1, UserId = user.Id };
                Address address = new Address { Address1 = registration.RegisterInfo.Address, City = registration.RegisterInfo.City, PostalCode = registration.RegisterInfo.PostalCode, CountryId = registration.RegisterInfo.CountryID, UserId = user.Id, Country = new Country { CountryId = registration.RegisterInfo.CountryID } };
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
                var newRefferalCode = GenerateRefferralCode(registration.RegisterInfo.Name, registration.RegisterInfo.Surname).ToString();
                var existingRefferalCode = db.ReferralCodes.Where(code => code.ReferralCode1 == newRefferalCode).FirstOrDefault();

                if (existingRefferalCode == null)
                {
                    code.ReferralCode1 = newRefferalCode;
                    Add(code);
                    db.SaveChanges();
                }
                if (existingRefferalCode != null)
                {
                    code.ReferralCode1 = GenerateRefferralCode(registration.RegisterInfo.Name, registration.RegisterInfo.Surname).ToString();
                    Add(code);
                    db.SaveChanges();
                }
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
        private string RegisterAmbassadorFix(RegisterVM registration)
        {
            try
            {
                //see if there is a valid refferal code is used
                var registrationRefferralCode = db.ReferralCodes.Where(code => code.ReferralCode1 == registration.RegisterInfo.referralcode).FirstOrDefault();
                if (registrationRefferralCode == null)
                {
                    return "Refferal Code Invalid";
                }


                else
                {
                    //Create Ambassador
                    Ambassador ambassador = new Ambassador();
                    ambassador.AmbassadorType = new AmbassadorType { AmbassadorTypeId = Convert.ToInt32(registration.RegisterInfo.ambassadorType) };
                    ambassador.AmbassadorTypeId = ambassador.AmbassadorType.AmbassadorTypeId;
                    ambassador.Idnumber = registration.RegisterInfo.Idnumber;
                    //ambassador.Idphoto = null;
                    //ambassador.ProofOfAddressPhoto = null; //fix it up
                    //ambassador.ProfilePic = null;

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
                    // user.PhoneNumber = registration.RegisterInfo.PhoneNumber;
                    user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(registration.AccessInfo.Password);
                    Password password = new Password { Password1 = BCrypt.Net.BCrypt.HashPassword(registration.AccessInfo.Password), UserId = user.UserId.ToString() };


                    Application application = new Application { ApplicationStatusId = 1, UserId = user.Id };
                    Address address = new Address { Address1 = registration.RegisterInfo.Address, City = registration.RegisterInfo.City, PostalCode = registration.RegisterInfo.PostalCode, CountryId = registration.RegisterInfo.CountryID, UserId = user.Id, Country = new Country { CountryId = registration.RegisterInfo.CountryID } };
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

                    //password
                    user.Passwords.Add(password);
                    password.User = user;

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
                    db.Applications.Add(application);
                    db.Ambassadors.Add(ambassador);
                    db.SaveChanges();

                    //giving ambassador their refferal code
                    ReferralCode code = new ReferralCode();
                    code.AmbassadorId = ambassador.AmbassadorId;
                    code.IsActive = "true";
                    var newRefferalCode = GenerateRefferralCode(registration.RegisterInfo.Name, registration.RegisterInfo.Surname).ToString();
                    var existingRefferalCode = db.ReferralCodes.Where(code => code.ReferralCode1 == newRefferalCode).FirstOrDefault();

                    if (existingRefferalCode == null)
                    {
                        code.ReferralCode1 = newRefferalCode;
                        Add(code);
                        db.SaveChanges();
                    }
                    if (existingRefferalCode != null)
                    {
                        code.ReferralCode1 = GenerateRefferralCode(registration.RegisterInfo.Name, registration.RegisterInfo.Surname).ToString();
                        Add(code);
                        db.SaveChanges();
                    }
                    if (LinkUsers(registration.RegisterInfo.referralcode, registration.RegisterInfo.EmailAddress, "Ambassador") == true)
                    {
                        //Send welcome  email
                        //Emails(user.EmailAddress, user.Username, registration.AccessInfo.Password, registration.RegisterInfo.UsertypeID);
                        db.SaveChanges();
                        return "Linked the users";
                    }
                    else
                    {
                        return "Registration unsuccessful";
                    }

                }
            }
            catch (Exception error)
            {
                return "error";
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
                //user.PhoneNumber = registration.RegisterInfo.PhoneNumber;
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(registration.AccessInfo.Password);
                Password password = new Password { Password1 = BCrypt.Net.BCrypt.HashPassword(registration.AccessInfo.Password), UserId = user.Id };
                //UserApplicationStatus uAPP = new UserApplicationStatus { ApplicationStatusId = 2, UserId = user.Id, Date = DateTime.Today };
                Application application = new Application { ApplicationStatusId = 2, UserId = user.Id };
                Address address = new Address { Address1 = registration.RegisterInfo.Address, City = registration.RegisterInfo.City, PostalCode = registration.RegisterInfo.PostalCode, CountryId = registration.RegisterInfo.CountryID, UserId = user.Id, Country = new Country { CountryId = registration.RegisterInfo.CountryID } };
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

        //public bool updateFAQ(Faq faq)
        //{
        //    try { 
        //    Faq existingFaq = db.Faqs.Where(faqid => faqid.Faqid == faq.Faqid).FirstOrDefault();
        //    existingFaq.Faqquestion = faq.Faqquestion;
        //    existingFaq.FaqtypeId = faq.FaqtypeId;
        //    existingFaq.FaqcategoryId = faq.FaqcategoryId;
        //    existingFaq.Faqanswers = faq.Faqanswers;
        //    return true;
        //    }
        //    catch 
        //    {
        //        return false;
        //    }
        //}

        //Amandas Repository Code

        //Product Subsystem

        public object GetUserAddress(string id)
        {
            try
            {
                var userAdresses = db.Addresses.Where(x => x.UserId == id).Select(x => new
                {
                    Id = x.AddressId,
                    Address = x.Address1,
                    Country = x.Country.CountryName,
                    Province = x.Province.ProvinceName,
                    City = x.City,
                    PostalCode = x.PostalCode,
                    Phone = x.RecipientNumber
                });

                return userAdresses;
            }
            catch (Exception ex)
            {
                return ex.InnerException.Message;
            }
        }

        public object AddUserAddress(Address address)
        {

            Address nAddress = db.Addresses.Where(x => x.UserId == address.UserId && x.Address1 == address.Address1).FirstOrDefault();

            try
            {
                if (nAddress == null)
                {
                    nAddress = new Address()
                    {
                        Address1 = address.Address1,
                        City = address.City,
                        ProvinceId = address.ProvinceId,
                        CountryId = address.CountryId,
                        UserId = address.UserId,
                        RecipientNumber = address.RecipientNumber,
                        PostalCode = address.PostalCode
                    };
                    Add(nAddress);
                    SaveChanges();

                    return "New Address created";
                }
                else
                {
                    return "Address already exists";
                }


            }
            catch (Exception ex)
            {
                return ex.InnerException.Message;
            }
        }

        public object CreateMerch(MerchVM merch)
        {
            //Check if item exists
            Merchandise newMerch = db.Merchandises.FirstOrDefault(m => m.MerchName == merch.MerchName);

            try
            {
                //create item if null
                if (newMerch == null)
                {
                    newMerch = new Merchandise()
                    {
                        MerchName = merch.MerchName,
                        Description = merch.Description,
                        MerchImage = merch.MerchImage,
                        MerchStatusId = merch.StatusId,
                        MerchTypeId = merch.MerchTypeId,
                        MerchCategoryId = merch.MerchCategoryId

                    };
                    Add(newMerch);
                    SaveChanges();

                    //Create new price if null
                    // Need to make sure that the price isn't attached to any other ID
                    Price searchPrice = db.Prices.FirstOrDefault(p => p.Price1 == merch.Price && p.MerchandiseId == newMerch.MerchandiseId);

                    if (searchPrice == null)
                    {
                        Price price = new()
                        {
                            Price1 = merch.Price,
                            Date = DateTime.Now,
                            MerchandiseId = newMerch.MerchandiseId
                        };
                        Add(price);
                        SaveChanges();
                    }


                    return "Item added successfully";

                }
                else
                {
                    return "Item already Exists";
                }

            }
            catch (Exception ex)
            {
                return ex.InnerException.Message;
            }
        }

        public object UpdateMerch(int id, MerchVM merch)
        {
            try
            {
                //find the item by id
                Merchandise eMerch = db.Merchandises.FirstOrDefault(m => m.MerchandiseId == id);

                // make the replacements 
                eMerch.MerchName = merch.MerchName;
                eMerch.Description = merch.Description;
                eMerch.MerchImage = merch.MerchImage ?? eMerch.MerchImage;
                eMerch.MerchStatusId = merch.StatusId;
                eMerch.MerchTypeId = merch.MerchTypeId;
                eMerch.MerchCategoryId = merch.MerchCategoryId;
                SaveChanges();

                //Create new price if null
                //Thats it there is no mathing price for that id
                Price searchPrice = db.Prices.FirstOrDefault(p => p.Price1 == merch.Price && p.MerchandiseId == id);

                if (searchPrice == null)
                {
                    Price price = new()
                    {
                        Price1 = merch.Price,
                        Date = DateTime.Now,
                        MerchandiseId = eMerch.MerchandiseId
                    };
                    Add(price);
                    SaveChanges();
                }

                return "Item Updated successfully";
            }
            catch (Exception ex)
            {
                return ex.InnerException.Message;
            }
        }

        public object DeleteMerch(int id)
        {
            try
            {
                //Delete item
                var merch = db.Merchandises.Find(id);
                Delete(merch);

                //Delete associated prices
                db.Prices.RemoveRange(db.Prices.Where(p => p.MerchandiseId == id));
                SaveChanges();

                return true;
            }
            catch
            {
                return false;
            }
        }

        public object GetAllMerch()
        {
            try
            {
                var allMerch = db.Merchandises
                    .Select(x => new
                    {
                        ID = x.MerchandiseId,
                        Name = x.MerchName,
                        Description = x.Description,
                        Image = x.MerchImage,
                        Type = x.MerchType.MerchTypeName,
                        TypeID = x.MerchTypeId,
                        CatID = x.MerchCategoryId,
                        Category = x.MerchCategory.MerchCategoryName,
                        Price = x.Prices.OrderByDescending(o => o.Date).Select(p => p.Price1).FirstOrDefault(),
                        Status = x.MerchStatuses.MerchStatusName,
                        Quantity = 0
                    });

                return allMerch;
            }
            catch
            {
                return false;
            }
        }

        public object GetMerchById(int id)
        {
            try
            {
                var merch = db.Merchandises.Where(m => m.MerchandiseId == id).Select(x => new
                {
                    ID = x.MerchandiseId,
                    Name = x.MerchName,
                    Description = x.Description,
                    Image = x.MerchImage,
                    Type = x.MerchType.MerchTypeName,
                    TypeID = x.MerchTypeId,
                    CatID = x.MerchCategoryId,
                    Category = x.MerchCategory.MerchCategoryName,
                    Price = x.Prices.Select(p => p.Price1).First(),
                    Status = x.MerchStatuses.MerchStatusId,
                    Quantity = 0
                }).FirstOrDefault();

                return merch;
            }
            catch
            {
                return false;
            }
        }

        public object AmbassadorDiscount(string id)
        {
            //Fetch ambassador discount
            var varID = id;
            var discount = db.Ambassadors.Where(id => id.UserId == varID)
                                        .Select(x => new { Discount = x.AmbassadorType.DiscountPercentage });
            return discount;
        }

        public object GetVAT()
        {
            var VATAmount = db.Vats.OrderByDescending(x => x.Date).Select(x => x.VatPercentage).FirstOrDefault();

            return VATAmount;
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


        public object GenerateRefferralCode(string name, string surname)
        {
            Random rndNum = new Random();
            int[] code = new int[4];
            for (int j = 0; j < 4; j++)
            {
                code[j] = (rndNum.Next(0, 10));
            }
            var refferralcode = name.Substring(0, 2).ToUpper() + surname.Substring(0, 2).ToUpper() + string.Join("", code);
            return refferralcode;

        }
        public object GenerateToken(User user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Tokens:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

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

        public object AddToCart(string id, CartItem cartitem)
        {
            //Find the cart for the specific user
            Cart userCartID = db.Carts.FirstOrDefault(c => c.UserId == id);

            CartItem item = db.CartItems
                .Where(x => x.CartId == userCartID.CartId && x.MerchandiseId == cartitem.MerchandiseId)
                .FirstOrDefault();

            try
            {
                if (item == null)
                {
                    CartItem cart = new CartItem();
                    cart.CartId = userCartID.CartId;
                    cart.MerchandiseId = cartitem.MerchandiseId ?? null;
                    cart.SpecialId = cartitem.SpecialId ?? null;
                    cart.Quantity = cartitem.Quantity;
                    cart.Price = cartitem.Price;
                    Add(cart);
                    SaveChanges();
                    return "Added To Cart";

                }
                else
                {

                    item.Quantity += cartitem.Quantity;
                    SaveChanges();
                    return "Item Updated";
                }
            }
            catch (Exception ex)
            {
                return ex.InnerException.Message;
            }

        }

        public object loadCart(string id)
        {
            //Find the cart for the specific user
            Cart userCartID = db.Carts.FirstOrDefault(c => c.UserId == id);

            try
            {
                var loadcart = db.CartItems.Select(x => new
                {
                    Id = x.CartItemId,
                    CartId = x.CartId,
                    Price = x.Price,
                    Quantity = x.Quantity,
                    Name = x.Merchandise.MerchName ?? x.Special.SpecialName,
                    Image = x.Merchandise.MerchImage ?? x.Special.SpecialName
                });

                return loadcart;
            }
            catch (Exception ex)
            {
                return ex.InnerException.Message;
            }
        }

        public object increaseCartItem(int id)
        {
            try
            {
                var item = db.CartItems.Find(id);
                item.Quantity += 1;
                SaveChanges();

                return "Item increased";
            }
            catch (Exception ex)
            {
                return ex.InnerException.Message;
            }
        }

        public object decreaseCartItem(int id)
        {
            try
            {
                var item = db.CartItems.Find(id);

                if (item.Quantity > 1)
                {
                    item.Quantity -= 1;
                    SaveChanges();

                    return "Item decreased";
                }
                else
                {
                    return "Item already at 1";
                }

            }
            catch (Exception ex)
            {
                return ex.InnerException.Message;
            }
        }



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

        public object Checkout(Order checkout)
        {
            try
            {
                //Find the cart for the specific user
                Cart userCartID = db.Carts.FirstOrDefault(c => c.UserId == checkout.UserId);
                Delivery delivery = new Delivery();
                if (checkout.AddressId != null)
                {
                    delivery.DeliveryAmountId = 1;
                    Add(delivery);
                    SaveChanges();
                }

                Order newOrder = new Order();
                newOrder.OrderStatusId = checkout.OrderStatusId;
                newOrder.AddressId = checkout.AddressId;
                newOrder.CartId = userCartID.CartId;
                newOrder.UserId = checkout.UserId;
                newOrder.DeliveryId = checkout.AddressId == null ? null : delivery.DeliveryId;
                newOrder.ProofOfPayment = checkout.ProofOfPayment;
                newOrder.Date = DateTime.Today;
                Add(newOrder);
                SaveChanges();


                var cart = db.CartItems.Where(x => x.CartId == userCartID.CartId);
                foreach (var item in cart)
                {
                    OrderItem items = new OrderItem();
                    items.MerchandiseId = item.MerchandiseId ?? null;
                    items.SpecialId = item.SpecialId ?? null;
                    items.OrderId = newOrder.OrderId;
                    items.Quantity = item.Quantity;
                    items.Price = item.Price;
                    Add(items);
                }
                SaveChanges();

                ClearCart(userCartID.CartId);

                return "Order Placed";
            }
            catch (Exception ex)
            {
                return ex.InnerException.Message;
            }

        }

        public object ViewOrderHistory(string userID)
        {
            try
            {
                var orders = db.Orders.Where(id => id.UserId == userID)
                                 .Select(x => new
                                 {
                                     Id = x.OrderId,
                                     Date = x.Date,
                                     Status = x.OrderStatus.OrderStatusName,
                                     Price = x.OrderItems.Select(x => x.Price).First(),
                                     Quantity = x.OrderItems.Select(x => x.Quantity).First(),
                                 });
                return orders;
            }
            catch (Exception ex)
            {
                return ex.InnerException.Message;
            }

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


        public object GetProductList()
        {
            try
            {
                var productlist = db.Merchandises.Select(x => new
                {
                    ID = x.MerchandiseId,
                    Item = x.MerchName,
                    Description = x.Description,
                    MerchType = x.MerchType.MerchTypeName,
                    MerchCat = x.MerchCategory.MerchCategoryName,
                    UnitPrice = x.Prices.OrderByDescending(x => x.Date).Select(x => x.Price1).First(),
                    Status = x.MerchStatuses.MerchStatusName
                });

                return productlist;
            }
            catch
            {
                return false;
            }

        }


        public object AmbassadorListRep()
        {
            try
            {
                var amb = db.Ambassadors.Select(x => new
                {
                    Name = x.User.Name,
                    Surname = x.User.Surname,
                    Email = x.User.Email,
                    Province = x.User.Addresses.Select(x => x.Province.ProvinceName).First(),
                    Phone = x.User.PhoneNumber,
                    Ranking = x.AmbassadorType.AmbassadorTypeName


                });

                return amb;
            }
            catch
            {
                return false;
            }
        }

        public object SalesRep()
        {
            try
            {
                var sales = db.OrderItems
                .GroupBy(x => new
                {
                    x.MerchandiseId,
                    x.Price,
                    x.Merchandise.MerchName,
                    x.Merchandise.MerchCategory.MerchCategoryName,
                    v = x.Order.Date.Value.Month.Equals(DateTime.Today.Month)
                })
                .Select(x => new
                {
                    Key = x.Key.MerchandiseId,
                    Merchandise = x.Key.MerchName,
                    Category = x.Key.MerchCategoryName,
                    Price = x.Key.Price,
                    Quantity = x.Sum(x => x.Quantity),
                    Date = x.Key.v
                });

                return sales;
            }
            catch
            {
                return false;
            }
        }

        //Iteration 8 
        //Amanda 

        public object GetSpecialOptions()
        {
            try
            {
                var options = db.Merchandises.Select(x => new
                {
                    Item = x.MerchImage,
                    Name = x.MerchName,
                    Status = x.MerchStatuses.MerchStatusName
                });

                return options;
            }
            catch (Exception ex)
            {
                return ex.InnerException.Message;
            }
        }
    }



}

