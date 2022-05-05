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
        [HttpPost("RegisterAdmin")]
        public object RegisterAdmin()
        {
            try
            {
                //Creating an admin
                Admin admin = new Admin();
                admin.Idnumber = "6516516516";
                admin.Idphoto = null;
                admin.ProofOfAddressPhoto = null;

                //Creating user
                User user = new User();
                user.UserRole = new UserRole { UserRoleId = 3 };
                user.UserRoleId = user.UserRole.UserRoleId;
                user.Title = new Title { TitleId = 1 };
                user.TitleId = user.Title.TitleId;
                user.Country = new Country { CountryId = 1 };
                user.CountryId = user.Country.CountryId;
                user.Address = new Address { Address1 = "Moreleta park", City = "Pretoria", PostalCode = 1080 };
                user.AddressId = user.Address.AddressId;
                user.Username = "SAiCS innovations";
                user.Name = "SAICS ";
                user.Surname = " Innovations";
                user.EmailAddress = "saicsinnovations@gmail.com";
                user.PhoneNumber = 0789875855;   
                Password password = new Password { Password1 = BCrypt.Net.BCrypt.HashPassword("Saics@2022"), UserId = user.UserId };
                //UserApplicationStatus uAPP = new UserApplicationStatus { ApplicationStatusId = 1, UserId = user.UserId };
                // uAPP.UserId = user.UserId;

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

                //Add to database
                db.Admins.Add(admin);
                db.SaveChanges();

                return db.Admins.Include(user => user.User);

            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
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
        
        //Register Ambassador
        [HttpPost("RegisterAmbassador")]
        public object RegisterAmbassador()
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
        public object PasswordHash()
        {
            string password = "treasure";
            try
            {
                password = BCrypt.Net.BCrypt.HashPassword("Treasure");
                bool verified = BCrypt.Net.BCrypt.Verify("Treasure", password);

                return password;

            }
            catch(Exception error)
            {
                return BadRequest(error.Message);
            }       
        }
        [HttpPost("Login")]
        public object Login()
        {
            try
            {
                // get account from database
                //var account = _context.Accounts.SingleOrDefault(x => x.Email == model.Email);
                // var account = db.Users.Include(password => password.Passwords).Select(x => new { x.UserId, x.Username, x.EmailAddress });
                
                var account = db.Users.SingleOrDefault(user => user.EmailAddress == "saicsinnovations@gmail.com"|| user.Username == "SAiCS innovations");
                var passwords = db.Passwords.Include(user => user.User).Where(x => x.UserId == account.UserId).Select(user => user.Password1).FirstOrDefault();
                // var password = db.Passwords.SingleOrDefault(user => user.UserId == account.UserId);
                var userpassword = BCrypt.Net.BCrypt.HashPassword("Saics@2022");
                // check account found and verify password

                //if (!BCrypt.Net.BCrypt.Verify(passwords.ToString(), "Saics@2022"))
                //{
                //    //authentication failed
                //    return false;
                //}
                //else
                //{
                //    //authentication successful
                //    return true;
                //}
                //bool verified = BCrypt.Net.BCrypt.Verify("Treasure", password);
                return passwords;
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);

            }
        }

 
        [HttpPost("generateHashPassword")]
        public object generateHashPassword()
        {
            var password = BCrypt.Net.BCrypt.HashPassword("Saics@2022");
            return password;
        }


    }
}
