using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SAiCSInnovationsAPI_3._0.Models;
using SAiCSInnovationsAPI_3._0.Repository;
using SAiCSInnovationsAPI_3._0.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAiCSInnovationsAPI_3._0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestingController : ControllerBase
    {
        private readonly SmsController _sms;
        private readonly ISAiCSInnovationsRep _rep;
        private readonly SaicsInnovationsDBContext db;
        private readonly UserManager<User> _manager;
        private readonly IUserClaimsPrincipalFactory<User> _claims;
        private readonly IConfiguration _configuration;
        // public int otp = 0;

        public TestingController(UserManager<User> manager,
            IUserClaimsPrincipalFactory<User> claims,
            IConfiguration configuration,
            ISAiCSInnovationsRep rep,
            SaicsInnovationsDBContext _db,
            SmsController sms)

        {
            db = _db;
            _manager = manager;
            _claims = claims;
            _configuration = configuration;
            _rep = rep;
            _sms = sms;

        }

        [HttpPost("Referalcodelink")]
        public object Referalcodelink(string refferalcode)
        {
            var refferaluserdetails = _rep.FindRefferalLink(refferalcode);
            return refferaluserdetails;
        }
        //[HttpPost("Linktables")]
        //public object Linktables(string refferalCode, string emailaddress, string usertype)
        //{
        //    var tableLink = _rep.LinkUserstest(refferalCode,emailaddress,usertype);
        //    return tableLink;
        //}
        //[HttpPost("registertest")]
        //public object registertest(RegisterVM registration)
        //{
        //    var test =  _rep.RegisterClient(registration);
        //    return test;
        //}
        [HttpPost("TestingRegister")]
        public ActionResult TestingRegister(RegisterVM registration)
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
                user.PhoneNumber = registration.RegisterInfo.PhoneNumber;
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

                return Ok("true");
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }
        //[HttpPost("generaterefferalcode")]
        //public object generaterefferalcode(string name, string surname)
        //{
        //    return _rep.GenerateRefferralCode(name, surname);
        //}

        [HttpPost("SendSms")]
        public ActionResult SendSms()
        {
            _sms.Sms();
            return Ok("Message sent");
            db.Add(vat);
            return db.SaveChanges();
        }

        [HttpPost("TestingCarID")]
        public object TestingCarID(Cart vat)
        {
            db.Add(vat);
            return db.SaveChanges();
        }

        [HttpPost("TestVAT")]
        public object TestVAT(Vat vat)
        {
            db.Add(vat);
            return db.SaveChanges();
        }

        [HttpPost("TestingAmbType")]
        public object TestingAmbType(AmbassadorType type)
        {
            db.Add(type);
            return db.SaveChanges();
        }

        [HttpGet("GetSales")]
        public object GetSales()
        {
            var sales = db.OrderItems
                .GroupBy(x => new {
                    x.MerchandiseId, 
                    x.Price, x.Merchandise.MerchName, 
                    x.Merchandise.MerchCategory.MerchCategoryName,
                    v=x.Order.Date.Value.Month.Equals(DateTime.Today.Month)})
                .Select(x => new { 
                    Key = x.Key.MerchandiseId,
                    Merchandise = x.Key.MerchName,
                    Category = x.Key.MerchCategoryName,
                    Price = x.Key.Price,
                    Quantity = x.Sum(x => x.Quantity),
                    Date = x.Key.v});

            return sales;
        }
    }
}
