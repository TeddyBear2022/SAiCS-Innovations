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
using SAiCS_Innovations_API.SAiCSRepository;

namespace SAiCS_Innovations_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly SaicsInnovationsDBContext db = new SaicsInnovationsDBContext();

        //Sending emails
        private void Email(string emailaddress,string username, string password, int usertype)
        {
            if (usertype == 1) {
            using (MailMessage email = new MailMessage("u20551313@tuks.co.za", emailaddress))
            {
                email.Subject = "Welcome to SAiCs!!!";
                email.Body = "Welcome to the SAiCS Innvoation app, we are happy that you chose to do business with us! The following are the details you can use to login :-). Username:"+username+" Password:"+password;
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
            }
           if(usertype == 2)
            {
                using (MailMessage email = new MailMessage("u20551313@tuks.co.za", emailaddress))
                {
                    email.Subject = "Welcome future SAiCs Ambassador!!!";
                    email.Body = "Congratulations on getting thus far, we are happy that you chose to do business with us! The following are the details you can use to login :-). Username:" + username + " Password:" + password +" Please be aware you will only have access to functionality once admin has verified your account";
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
            }
            if (usertype == 3)
            {
                using (MailMessage email = new MailMessage("u20551313@tuks.co.za", emailaddress))
                {
                    email.Subject = "Welcome future SAiCs Administrator!!!";
                    email.Body = "Congratulations on getting thus far, we are happy that you chose to do business with us! The following are the details you can use to login :-). Username:" + username + " Password:" + password + " Please be aware you will only have access to functionality once admin has verified your account";
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
            }
        }

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
                    if (RegisterClient(registration)== true)
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
                ambassador.AmbassadorType = new AmbassadorType { AmbassadorTypeId = Convert.ToInt32(registration.RegisterInfo.ambassadorType) };
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
                user.EmailAddress = registration.RegisterInfo.EmailAddress;
                user.PhoneNumber = registration.RegisterInfo.PhoneNumber;
                Password password = new Password { Password1 = BCrypt.Net.BCrypt.HashPassword(registration.AccessInfo.Password), UserId = user.UserId };
                UserApplicationStatus uAPP = new UserApplicationStatus { ApplicationStatusId = 1, UserId = user.UserId };

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

                //Send email
                Email(user.EmailAddress, user.Username, registration.AccessInfo.Password, user.UserRole.UserRoleId);
                return true;
            }
            catch (Exception error)
            {
                return false;
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
        private bool RegisterClient(registerVM registration)
        {
            try
            {
                                                                    //Create Client
                Client client = new Client();
                client.Ambassador = new Ambassador { AmbassadorId = Convert.ToInt32(getReferrelAmbassador(registration.RegisterInfo.referralcode)) };
                client.AmbassadorId = Convert.ToInt32(getReferrelAmbassador(registration.RegisterInfo.referralcode));

                                                                    //Create user
                User user = new User();
                client.UserId = user.UserId;
                user.UserRole = new UserRole { UserRoleId = 1 };
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
                UserApplicationStatus uAPP = new UserApplicationStatus { ApplicationStatusId = 2, UserId = user.UserId };

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
                user.UserApplicationStatuses.Add(uAPP);
                uAPP.User = user;

                //Assign 
                //userrole
                db.Entry(user.UserRole).State = EntityState.Unchanged;
                //title
                db.Entry(user.Title).State = EntityState.Unchanged;
                //Country
                db.Entry(user.Country).State = EntityState.Unchanged;
                //ambassador
                db.Entry(client.Ambassador).State = EntityState.Unchanged;

                                                                    //add to database
                db.UserApplicationStatuses.Add(uAPP);
                db.Clients.Add(client);
                db.SaveChanges();

                                                                    //Send welcome  email
                Email(user.EmailAddress, user.Username, registration.AccessInfo.Password, registration.RegisterInfo.UsertypeID);
                return true;
            }
            catch (Exception error)
            {
                return false;
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
        public object UpdateUser(int _userID)
        {
            try
            {
                var oldUserDetails = db.Users.Where(user => user.UserId == _userID).FirstOrDefault();
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

        //Delete user
        [HttpPost("DeleteUser")]
        public bool DeleteUser(DeleteUserVM deleteuser)
        {
             
            try
            {
                var userDelete = db.Users.Where(user => user.UserId == deleteuser.userId).Include(userrole=>userrole.UserRole).Include(client=>client.Clients).Include(ambassador=>ambassador.Ambassadors).Include(admin=>admin.Admins).FirstOrDefault();
                var applicationsstatusdelete = db.UserApplicationStatuses.Where(user => user.UserId == deleteuser.userId).FirstOrDefault();
                var passwordDelete = db.Passwords.Where(user => user.UserId == deleteuser.userId).FirstOrDefault();
                if (userDelete == null)
                {
                    return false;
                }
                else
                {
                    if (userDelete.UserRole.UserRoleId==1) {
                        Delete(userDelete);
                        Delete(applicationsstatusdelete);
                        Delete(passwordDelete);
                        db.SaveChanges();
                        return true;
                    }
                    if (userDelete.UserRole.UserRoleId == 2)
                    {
                        Delete(userDelete);
                        Delete(applicationsstatusdelete);
                        Delete(passwordDelete);
                        db.SaveChanges();
                        return true;
                    }
                    if (userDelete.UserRole.UserRoleId == 3)
                    {
                        Delete(userDelete);
                        Delete(applicationsstatusdelete);
                        Delete(passwordDelete);
                        db.SaveChanges();
                        return true;
                    }
                    //Delete(userDelete);
                    //Delete(applicationsstatusdelete);
                    //Delete(passwordDelete);
                    //db.SaveChanges();
                    return false;
                }

            }
            catch (Exception error)
            {
                return false;
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

        private object getReferrelAmbassador(string referralcode)
        {
            try
            {
                var ambassador = db.Ambassadors.Where(ambassador => ambassador.ReferralCode == referralcode).FirstOrDefault();
                if (ambassador == null)
                {
                    return "Ambassador not found/doesnt exist";
                }
                else
                {
                    db.Entry(ambassador).State = EntityState.Detached;
                    db.SaveChanges();
                    return ambassador.AmbassadorId;
                }
            }
            catch
            {
                return "Invalid Ambassador";
            }
        }

    }
}
