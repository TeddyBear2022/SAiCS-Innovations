using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Mail; //Included plugin 
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using SAiCS_Innovations_API.Models;
using SAiCS_Innovations_API.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Paket.Core.Common;

namespace SAiCS_Innovations_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly SaicsInnovationsDBContext db = new SaicsInnovationsDBContext();

        //Sending emails
        [HttpPost("SendEmail")]
        public String Email()
        {
            using (MailMessage email = new MailMessage("u20551313@tuks.co.za", "u20551313@tuks.co.za"))
            {
                email.Subject = "Welcome to SAiCs";
                email.Body = "Welcome to the SAiCS Innvoation app, we are happy that you chose to do business with us!";
                email.IsBodyHtml = false;

                using (SmtpClient Smtp = new SmtpClient())
                {
                    Smtp.Host = "smtp.gmail.com";
                    Smtp.EnableSsl = true;
                    NetworkCredential credentials = new NetworkCredential("u20551313@tuks.co.za", "FentseT@21");
                    Smtp.UseDefaultCredentials = false;
                    Smtp.Credentials = credentials;
                    Smtp.Port = 587; 
                    Smtp.Send(email);
                }
            }
            return "Message sent successfully";
        }

        //Register Admin
        //[HttpPost("TestRegisterAdmin")]
        //public object TestRegisterAdmin()
        //{
        //    try
        //    {
        //        //Creating an admin
        //        Admin admin = new Admin();
        //        admin.Idnumber = "020142100101";
        //        admin.Idphoto = null;
        //        admin.ProofOfAddressPhoto = null;

        //        //Creating user
        //        User user = new User();
        //        user.UserRole = new UserRole { UserRoleId = 3 };
        //        user.UserRoleId = user.UserRole.UserRoleId;
        //        user.Title = new Title { TitleId = 2 };
        //        user.TitleId = user.Title.TitleId;
        //        user.Country = new Country { CountryId = 1 };
        //        user.CountryId = user.Country.CountryId;
        //        user.Address = new Address { Address1 = "Parkview Oakland", City = "Cape town", PostalCode = 0110 };
        //        user.AddressId = user.Address.AddressId;
        //        user.Username = "Demo";
        //        user.Name = "DemoName ";
        //        user.Surname = " DemoSurname";
        //        user.EmailAddress = "demo@gmail.com";
        //        user.PhoneNumber = 0745258785;   
        //        Password password = new Password { Password1 = BCrypt.Net.BCrypt.HashPassword("Demo1"), UserId = user.UserId };
        //        UserApplicationStatus uAPP = new UserApplicationStatus { ApplicationStatusId = 1, UserId = user.UserId };
        //        uAPP.UserId = user.UserId;

        //        //Linking Tables
        //        //Admin->User
        //        user.Admins.Add(admin);
        //        admin.User = user;
        //        //Title->User
        //        user.Title.Users.Add(user);
        //        user.Title = user.Title;
        //        //UserRole->User
        //        user.UserRole.Users.Add(user);
        //        user.UserRole = user.UserRole;
        //        //Country->User
        //        user.Country.Users.Add(user);
        //        user.Country = user.Country;
        //        //Address->User
        //        user.Address.Users.Add(user);
        //        user.Address = user.Address;
        //        //password->User
        //        user.Passwords.Add(password);
        //        password.User = user;
        //        //userapplicationstatus
        //        //user.UserApplicationStatuses.Add(uAPP);
        //        //uAPP.User = user;

        //        //Assignings
        //        //userrole
        //        db.Entry(user.UserRole).State = EntityState.Unchanged;
        //        //title
        //        db.Entry(user.Title).State = EntityState.Unchanged;
        //        //Country
        //        db.Entry(user.Country).State = EntityState.Unchanged;
        //        //user application status
        //        //db.Entry(user.UserApplicationStatuses).State = EntityState.Unchanged;

        //        //Add to database
        //        db.UserApplicationStatuses.Add(uAPP);
        //        db.Admins.Add(admin);
        //        db.SaveChanges();

        //        return db.Admins.Include(user => user.User);

        //    }
        //    catch (Exception error)
        //    {
        //        return BadRequest(error.Message);
        //    }

        //}

        //Register User
        [HttpPost("RegisterUser")]
        public object RegisterUser(registerVM registration)
        {
            try
            {
                //if admin user
                if (registration.RegisterInfo.UsertypeID == 3) 
                {
                    if (RegisterAdmin(registration) == true)
                    {
                        return "Admin registered";
                    }
                }
                
                //if ambassasdor user
                if (registration.RegisterInfo.UsertypeID == 2)
                {
                    if (RegisterAmbassador(registration) == true)
                    {
                        return "Ambassador registered";
                    }
                       
                }

                //if client user
                if (registration.RegisterInfo.UsertypeID == 1)
                {
                    return "register client";
                }
                else
                {
                    return "not registered";
                }
                
            }
            catch(Exception error)
            {
                return BadRequest(error.Message);
            }
        }
       
        private  bool RegisterAdmin(registerVM registration)
        {
            try
            {
                                                        //Creating an admin
                Admin admin = new Admin();
                admin.Idnumber = registration.RegisterInfo.Idnumber.ToString();
                admin.Idphoto = null;
                admin.ProofOfAddressPhoto = null;

                                                         //Creating user
                User user = new User();
                user.UserRole = new UserRole { UserRoleId = 3 };
                user.UserRoleId = user.UserRole.UserRoleId;
                user.Title = new Title { TitleId = registration.RegisterInfo.TitleID };
                user.TitleId = user.Title.TitleId;
                user.Country = new Country { CountryId = registration.RegisterInfo.CountryID };
                user.CountryId = user.Country.CountryId;
                user.Address = new Address { Address1 = registration.RegisterInfo.Address, City = registration.RegisterInfo.City, PostalCode = registration.RegisterInfo.PostalCode };
                user.AddressId = user.Address.AddressId;
                user.Username = registration.AccessInfo.Username;
                user.Name = registration.RegisterInfo.Name;
                user.Surname = registration.RegisterInfo.Surname;
                user.EmailAddress = registration.RegisterInfo.EmailAddress;
                user.PhoneNumber = registration.RegisterInfo.PhoneNumber;
                Password password = new Password { Password1 = BCrypt.Net.BCrypt.HashPassword(registration.AccessInfo.Password), UserId = user.UserId };
                UserApplicationStatus uAPP = new UserApplicationStatus { ApplicationStatusId = 1, UserId = user.UserId };

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
                user.Country.Users.Add(user);
                user.Country = user.Country;
                //Address->User
                user.Address.Users.Add(user);
                user.Address = user.Address;

                //password->User
                user.Passwords.Add(password);
                password.User = user;

                //userapplicationstatus
                user.UserApplicationStatuses.Add(uAPP);
                uAPP.User = user;

                                                           //Assignings
                //userrole
                db.Entry(user.UserRole).State = EntityState.Unchanged;
                //title
                db.Entry(user.Title).State = EntityState.Unchanged;
                //Country
                db.Entry(user.Country).State = EntityState.Unchanged;

                                                        //Add to database
                db.UserApplicationStatuses.Add(uAPP);
                db.Admins.Add(admin);
                db.SaveChanges();

               return true;
            }
            catch (Exception error)
            {
                return false;
            }

        }
        //GetAdmins
        [HttpGet("GetAllAdmins")]
        public object GetAllAdmins()
        {
            try
            {
                var adminlist = db.Admins.Include(user => user.User)
                                             .ThenInclude(country => country.Country)
                                             .Include(user => user.User)
                                             .ThenInclude(address => address.Address)
                                             .Include(user => user.User)
                                            .ThenInclude(password =>password.Passwords)
                                            .Include(user => user.User)
                                            .ThenInclude(title => title.Title)
                                            .Include(user => user.User)
                                            .ThenInclude(userrole =>userrole.UserRole);
                return adminlist;
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }

        private bool RegisterAmbassador(registerVM registration)
        {
            try
            {
                //Create Ambassador
                Ambassador ambassador = new Ambassador();
                //ambassador.Course = new Course { CourseId = null };
                //ambassador.CourseId = ambassador.Course.CourseId;
                //ambassador.BankAccount = new BankAccount { AccountTypeId = 1, BankName = "FNB", CardNumber = 0101010012 };
                //ambassador.BankAccountId = ambassador.BankAccount.BankAccountId;
                ambassador.AmbassadorType = new AmbassadorType { AmbassadorTypeId = 1 };
                ambassador.AmbassadorTypeId = ambassador.AmbassadorType.AmbassadorTypeId;
                ambassador.Idnumber = registration.RegisterInfo.Idnumber.ToString();
                ambassador.Idphoto = null;
                ambassador.ProofOfAddressPhoto = null; //fix it up
                ambassador.ProfilePic = null;
                ambassador.AliasName = registration.RegisterInfo.AliasName;
                ambassador.ReferralCode = null;

                //Create User
                User user = new User();
                user.UserRole = new UserRole { UserRoleId = 2 };
                user.UserRoleId = user.UserRole.UserRoleId;
                user.Title = new Title { TitleId = registration.RegisterInfo.TitleID };
                user.TitleId = user.Title.TitleId;
                user.Country = new Country { CountryId = registration.RegisterInfo.CountryID };
                user.CountryId = user.Country.CountryId;
                user.Address = new Address { Address1 = registration.RegisterInfo.Address, City= registration.RegisterInfo.City, PostalCode = registration.RegisterInfo.PostalCode };
                user.AddressId = user.Address.AddressId;
                user.Username = registration.AccessInfo.Username;
                user.Name = registration.RegisterInfo.Name;
                user.Surname = registration.RegisterInfo.Surname;
                user.EmailAddress = registration.RegisterInfo.Address;
                user.PhoneNumber = registration.RegisterInfo.PhoneNumber;
                Password password = new Password { Password1 = BCrypt.Net.BCrypt.HashPassword(registration.AccessInfo.Password), UserId = user.UserId };
                UserApplicationStatus uAPP = new UserApplicationStatus { ApplicationStatusId = 2, UserId = user.UserId };

                //User
                user.Ambassadors.Add(ambassador);
                ambassador.User = user;

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
                user.Country.Users.Add(user);
                user.Country = user.Country;

                //userapplicationstatus
                user.UserApplicationStatuses.Add(uAPP);
                uAPP.User = user;

                //address
                user.Address.Users.Add(user);
                user.Address = user.Address;

                //password
                user.Passwords.Add(password);
                password.User = user;

                //Application status
                user.UserApplicationStatuses.Add(uAPP);
                uAPP.User = user;

                                                        //Assignings
                //userrole
                db.Entry(user.UserRole).State = EntityState.Unchanged;
                //title
                db.Entry(user.Title).State = EntityState.Unchanged;
                //Country
                db.Entry(user.Country).State = EntityState.Unchanged;
                //Ambassador Type
                db.Entry(ambassador.AmbassadorType).State = EntityState.Unchanged;

                                                        //add to database
                db.UserApplicationStatuses.Add(uAPP);
                db.Ambassadors.Add(ambassador);
                db.SaveChanges();

                return true;
            }
            catch (Exception error)
            {
                return false;
            }
        }
        //Register Ambassador
        [HttpPost("TestRegisterAmbassador")]
        public object TestRegisterAmbassador()
        {
            try
            {
                //Create Ambassador
                Ambassador ambassador = new Ambassador();
                //ambassador.Course = new Course { CourseId = null };
                //ambassador.CourseId = ambassador.Course.CourseId;
                ambassador.BankAccount = new BankAccount { AccountTypeId = 1, BankName = "FNB", CardNumber = 0101010012 };
                ambassador.BankAccountId = ambassador.BankAccount.BankAccountId;
                ambassador.AmbassadorType = new AmbassadorType { AmbassadorTypeId = 1 };
                ambassador.AmbassadorTypeId = ambassador.AmbassadorType.AmbassadorTypeId;
                ambassador.Idnumber = "01221321351";
                ambassador.Idphoto = null;
                ambassador.ProofOfAddressPhoto = null;
                ambassador.ProfilePic = null;
                ambassador.AliasName = "SAICS MAMABA";
                ambassador.ReferralCode = "TIM111";

                //Create User
                User user = new User();
                user.UserRole = new UserRole { UserRoleId = 2 };
                user.UserRoleId = user.UserRole.UserRoleId;
                user.Title = new Title { TitleId = 2 };
                user.TitleId = user.Title.TitleId;
                user.Country = new Country { CountryId = 1 };
                user.CountryId = user.Country.CountryId;
                user.Address = new Address { Address1 = "Bankenveld high, Woodhill village" };
                user.AddressId = user.Address.AddressId;
                user.Username = "SAICSMAMABA2022";
                user.Name = "Joseph";
                user.Surname = "Van Der Wyd";
                user.EmailAddress = "josephsaics@gmail.com";
                user.PhoneNumber = 0788596986;
                Password password = new Password { Password1 = BCrypt.Net.BCrypt.HashPassword("SaicsMAMBA@2022"), UserId = user.UserId };
                //UserApplicationStatus uAPP = new UserApplicationStatus { ApplicationStatusId = 1, UserId = user.UserId };
                // uAPP.UserId = user.UserId;

                //Linkings
                //Bank account
                ambassador.BankAccount.Ambassadors.Add(ambassador);
                ambassador.BankAccount = ambassador.BankAccount;

                //User
                user.Ambassadors.Add(ambassador);
                ambassador.User = user;

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
                user.Country.Users.Add(user);
                user.Country = user.Country;

                //address
                user.Address.Users.Add(user);
                user.Address = user.Address;

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
                db.Entry(user.Country).State = EntityState.Unchanged;
                //user application status
                //db.Entry(user.UserApplicationStatuses).State = EntityState.Unchanged;
                //Ambassador Type
                db.Entry(ambassador.AmbassadorType).State = EntityState.Unchanged;

                //addto database
                db.Ambassadors.Add(ambassador);
                db.SaveChanges();

                return db.Ambassadors.Include(user => user.User);
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }
        //GetAmbassadors
        [HttpGet("GetAllAmbassadors")]
        public object GetAllAmbassadors()
        {
            try
            {
                var ambassadorList = db.Ambassadors.Include(user => user.User)
                                              .ThenInclude(country => country.Country)
                                             .Include(user => user.User)
                                             .ThenInclude(address => address.Address)
                                             .Include(user => user.User)
                                            .ThenInclude(password => password.Passwords)
                                            .Include(user => user.User)
                                            .ThenInclude(title => title.Title)
                                            .Include(user => user.User)
                                            .ThenInclude(userrole => userrole.UserRole)
                                            .ThenInclude(access =>access.AccessLevel); 
                                                   
                return ambassadorList;
            }
            catch (Exception error)
            {
                 return BadRequest(error.Message);
            }
        }

        //Register Client
        [HttpPost("RegisterClient")]
        public object RegisterClient()
        {
            try 
            {
                //Create Client
                Client client = new Client();
                client.Ambassador = new Ambassador { AmbassadorId = 1 };
                client.AmbassadorId = client.Ambassador.AmbassadorId;

                //Create user
                User user = new User();
                client.UserId = user.UserId;
                user.UserRole = new UserRole { UserRoleId = 1 };
                user.UserRoleId = user.UserRole.UserRoleId;
                user.Title = new Title { TitleId = 1 };
                user.TitleId = user.Title.TitleId;
                user.Country = new Country { CountryId = 1 };
                user.CountryId = user.Country.CountryId;
                user.Address = new Address { Address1 = "Silver lakes, house 33, olive grove", City = "Johannesburg", PostalCode = 1055 };
                user.AddressId = user.Address.AddressId;
                user.Username = "SuperMan12";
                user.Name = "Dylan";
                user.Surname = "Smith";
                user.EmailAddress = "dylansaics2022@gmail.com";
                user.PhoneNumber = 0788596986;
                Password password = new Password { Password1 = BCrypt.Net.BCrypt.HashPassword("Treasure@2022"), UserId = user.UserId };
                //UserApplicationStatus uAPP = new UserApplicationStatus { ApplicationStatusId = 1, UserId = user.UserId };
                // uAPP.UserId = user.UserId;

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
                user.Country.Users.Add(user);
                user.Country = user.Country;

                //address
                user.Address.Users.Add(user);
                user.Address = user.Address;

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
                db.Entry(user.Country).State = EntityState.Unchanged;
                //ambassador
                db.Entry(client.Ambassador).State = EntityState.Unchanged;
                //user application status
                //db.Entry(user.UserApplicationStatuses).State = EntityState.Unchanged;

                //add to database
                db.Clients.Add(client);
                db.SaveChanges();

                return db.Clients;
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }

        }

        //Get clients
        [HttpGet("GetAllClients")]
        public object GetAllClients()
        {
            try
            {
                var clientList = db.Clients.Include(user => user.User)
                                              .ThenInclude(country => country.Country)
                                             .Include(user => user.User)
                                             .ThenInclude(address => address.Address)
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
            catch(Exception error)
            {
                return BadRequest(error.Message);
            }
        }
        [HttpPost("PasswordHash")]
        public object PasswordHash(string _password)
        {
            
            try
            {
                var password = BCrypt.Net.BCrypt.HashPassword(_password);
                return password;

            }
            catch(Exception error)
            {
                return BadRequest(error.Message);
            }       
        }
        [HttpPost("TestLogin")]
        public object TestLogin()
        {
            try
            {
                //code works
                // get account from database
                //var account = _context.Accounts.SingleOrDefault(x => x.Email == model.Email);
                // var account = db.Users.Include(password => password.Passwords).Select(x => new { x.UserId, x.Username, x.EmailAddress });
                var account = db.Users.SingleOrDefault(user => user.EmailAddress == "saicsinnovations@gmail.com"|| user.Username == "SAiCS innovations");
                var passwords = db.Passwords.Include(user => user.User).Where(x => x.UserId == account.UserId).Select(user => user.Password1).FirstOrDefault();
                // var password = db.Passwords.SingleOrDefault(user => user.UserId == account.UserId);
                var userpassword = BCrypt.Net.BCrypt.HashPassword("Saics@2022");

                // check account found and verify password
                if (account == null || !BCrypt.Net.BCrypt.Verify("Saics@2022", passwords ))
                {
                    //authentication failed
                    return false;
                }
                else
                {
                    //authentication successful
                    return true;
                }
                //bool verified = BCrypt.Net.BCrypt.Verify("Treasure", password);
                //return passwords.GetType();
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);

            }
        }
        [HttpPost("LatestLogin")]
        public object LatestLogin(LoginVM logindetails)
        {
            try
            {
                //code works
                // get account from database
                //var account = _context.Accounts.SingleOrDefault(x => x.Email == model.Email);
                // var account = db.Users.Include(password => password.Passwords).Select(x => new { x.UserId, x.Username, x.EmailAddress });
                var account = db.Users.SingleOrDefault(user => user.EmailAddress == logindetails.EmailorUsername || user.Username == logindetails.EmailorUsername);
                var passwords = db.Passwords.Include(user => user.User).Where(x => x.UserId == account.UserId).Select(user => user.Password1).FirstOrDefault();
                // var password = db.Passwords.SingleOrDefault(user => user.UserId == account.UserId);
                //var userpassword = BCrypt.Net.BCrypt.HashPassword("Saics@2022");

                // check account found and verify password
                if (account == null || !BCrypt.Net.BCrypt.Verify(logindetails.Password, passwords))
                {
                    //authentication failed
                    return false;
                }
                else
                {
                    //authentication successful
                    return true;
                }
                //bool verified = BCrypt.Net.BCrypt.Verify("Treasure", password);
                //return passwords.GetType();
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);

            }
        }
        [HttpPost("Login")]
        public object Login(LoginVM logindetails)
        {
            try
            {
                if ((db.Users.SingleOrDefault(user => user.EmailAddress == logindetails.EmailorUsername || user.Username == logindetails.EmailorUsername))== null)
                {
                    //account doesnt exist
                    return false;
                }
                else
                {
                    var account = db.Users.SingleOrDefault(user => user.EmailAddress == logindetails.EmailorUsername || user.Username == logindetails.EmailorUsername);
                    var passwords = db.Passwords.Include(user => user.User).Where(x => x.UserId == account.UserId).Select(user => user.Password1).FirstOrDefault();
                    if (!BCrypt.Net.BCrypt.Verify(logindetails.Password, passwords))
                    {
                        //authentication failed (passwords dont match)
                        return false;
                    }
                    else
                    {
                        //authentication successful
                        return true;
                    }
                }
               
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);

            }
        }
        //Update user
        [HttpPut("UpdateUser")]
        public object UpdateUser(User _user)
        {
            try
            {
                var oldUserDetails = db.Users.Where(user => user.UserId == _user.UserId).FirstOrDefault();
                if (oldUserDetails == null)
                {
                    return NotFound("user doesnt exist");
                }
                else
                {
                    return "not working";
                }
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }
        public void Delete<T>(T entity) where T : class
        {
            db.Remove(entity);
        }
        [HttpDelete("DeleteUser")]
        public object DeleteUser()
        {
            int userId = 12;
            try
            {
                var userDelete = db.Users.Where(user => user.UserId == userId).FirstOrDefault();
                var applicationsstatusdelete = db.UserApplicationStatuses.Where(user => user.UserId == userId).FirstOrDefault();
                var passwordDelete = db.Passwords.Where(user => user.UserId == userId).FirstOrDefault();
                if (userDelete == null)
                {
                    return "User Doesnt exist";
                }
                else
                {
                    Delete(userDelete);
                    Delete(applicationsstatusdelete);
                    Delete(passwordDelete);
                    //db.Remove(userDelete);
                    db.SaveChanges();
                    return "user deleted";
                }

            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }

        [HttpPost("getUserSessionInfo")]
        public object getUserSessionInfo(LoginVM logindetails)
        {
            try
            {
                var user =  db.Users.Where(user => user.Username == logindetails.EmailorUsername || user.EmailAddress == logindetails.EmailorUsername).Include(country => country.Country)
                                                                        .Include(title => title.Title)
                                                                        .Include(userrole => userrole.UserRole)
                                                                        .Include(address=>address.Address)
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
            catch(Exception error)
            {
                return BadRequest(error.Message);
            }
        }
       

    }
}
