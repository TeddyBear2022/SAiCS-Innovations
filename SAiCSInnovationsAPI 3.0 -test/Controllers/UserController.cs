using Microsoft.AspNetCore.Authentication;
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
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace SAiCSInnovationsAPI_3._0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ISAiCSInnovationsRep _rep;
        private readonly SaicsInnovationsDBContext _db;
        private readonly UserManager<User> _manager;
        private readonly IUserClaimsPrincipalFactory<User> _claims;
        private readonly IConfiguration _configuration;
        // public int otp = 0;

        public UserController(UserManager<User> manager,
            IUserClaimsPrincipalFactory<User> claims,
            IConfiguration configuration,
            ISAiCSInnovationsRep rep,
             SaicsInnovationsDBContext db
            )
        {
            _manager = manager;
            _claims = claims;
            _configuration = configuration;
            _rep = rep;
            _db = db;

        }


        //Register User
        [HttpPost("RegisterUser")]
        public ActionResult RegisterUser(RegisterVM registration)
        {
            try
            {
                var registered = _rep.RegisterUser(registration) == true;
                if (registered == true)
                {
                    //Registered
                    return Ok(true);
                }
                else
                {
                    //Not registered
                    return StatusCode(StatusCodes.Status500InternalServerError, "Internal error occured. Please contact support");
                }
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }


        //Validate Refferral Code
        [HttpGet("ValidateRefferralCode")]
        public ActionResult ValidateRefferralCode(string refferalCode)
        {
            if (_rep.ValidateRefferralCode(refferalCode))
            {
                return Ok(true);
                //return true;
            }
            else
            {
                return NotFound("Refferral code invalid, not found");
            }
        }


        //Get Admins
        [HttpGet("GetAllAdmins")]
        public object GetAllAdmins()
        {
            try
            {
                return _rep.GetAllAdmins();
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }

        //Get Ambassadors
        [HttpGet("GetAllAmbassadors")]
        public object GetAllAmbassadors()
        {
            return _rep.GetAllAmbassadors();
        }

        //Get Clients
        [HttpGet("GetAllClients")]
        public object GetAllClients()
        {
            try
            {
                return _rep.GetAllClients();
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }

        //Login
        //Note revamp login and return strings to if an error pops up on teh frontend we know exctly which one to display on the alert
        //[HttpPost("Login")]
        //public object Login(LoginVM logindetails)
        //{
        //    try
        //    {
        //        //return _rep.Login(logindetails);
        //        return "tried";
        //    }
        //    catch(Exception error)
        //    {
        //        return BdadRequest(error.InnerException.Message);
        //    }
        //}

        [HttpPost("Login")]
        public async Task<ActionResult> Login(LoginVM userVM)
        {
            //find user
            var user = await _manager.FindByNameAsync(userVM.EmailorUsername);
           
            if (user != null )
            {
                //validate password
            var checkpassword = _rep.CheckPassword(user.Id, userVM.Password);
                if (checkpassword == true)
            {
                try
                {
                    var principal = await _claims.CreateAsync(user);
                    await HttpContext.SignInAsync(IdentityConstants.ApplicationScheme, principal);
                        var infoForToken = _db.Users.Where(find => find.Id == user.Id).Include(role =>role.UserRole).FirstOrDefault();
                    _db.SaveChanges();
                        var token = _rep.GenerateToken(infoForToken);
                    return Ok(token);
                }
                catch (Exception error)
                {
                    return BadRequest(error.InnerException.Message);
                }
                }
                else
                {
                    return NotFound("wrong password or email address");
                }
                
            }
            else
            {
                return NotFound("wrong password or email address");
            }

        }

        [HttpGet("Logout")]
        public async Task<IActionResult> Logout()
        {
            try { 
            await HttpContext.SignOutAsync(IdentityConstants.ApplicationScheme);

            return Ok(true);
            }
            catch(Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.InnerException.Message);
            }
        }

        //Fix up
        //Delete user/profile
        [HttpDelete("DeleteUser")]
        public ActionResult DeleteUser(string userID)
        {
            try
            {
                var user = _db.Users.Where(id => id.Id == userID);
                _rep.Delete(user);
                var addresses = _db.Addresses.Where(id => id.UserId == userID).ToList();
                if (addresses.Count() > 1)
                {
                    for (int i = 0; i <= addresses.Count(); i++)
                    {
                        _rep.Delete(addresses[i]);
                    }
                }
                else
                {
                    _rep.Delete(addresses[0]);
                }
                return Ok(true);
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }

        }

        [HttpPost("Email")]
        public ActionResult Email(string subject, string body, string emailto)
        {
            using (MailMessage emailSend = new MailMessage("u20551313@tuks.co.za", emailto))
            {
                emailSend.Subject = subject;
                emailSend.Body = body;
                emailSend.IsBodyHtml = false;

                using (SmtpClient Smtp = new SmtpClient())
                {
                    Smtp.Host = "smtp.zoho.com";
                    Smtp.EnableSsl = true;
                    NetworkCredential credentials = new NetworkCredential("u20551313@zoho.com", "FentseTM@21");
                    Smtp.UseDefaultCredentials = false;
                    Smtp.Credentials = credentials;
                    Smtp.Port = 587;
                    Smtp.Send(emailSend);
                }
            }
            return Ok(true);
        }

        [HttpPost("ForgotPassword")]
        public async Task<ActionResult> ForgotPassword(LoginVM email)
        {
            try
            {
                //find user in databse
                //var user = _db.Users.Where(Email => Email.Email == email || Email.UserName == email).FirstOrDefault();
                var user = await _manager.FindByNameAsync(email.EmailorUsername);
                if (user != null)
                {
                    //set otp information
                    var otp = _rep.GenerateOTP();
                    var usersOTP = _db.Passwords.Where(id => id.UserId == user.Id).FirstOrDefault();
                    usersOTP.OtpexpireTime = DateTime.Now.AddHours(2);
                    usersOTP.HashedOtp = BCrypt.Net.BCrypt.HashPassword(otp);

                    //send OTP to user
                    Email("Reset password OTP PIN", "Greetings! The following is your OTP pin : " + otp+". This OTP Pin will expire at "+ usersOTP.OtpexpireTime, "u20551313@tuks.co.za");
                    var usersID = user.Id;
                    return Ok(usersID);
                }
                else
                {
                    return NotFound("User does not exist!");
                }
                
            }
            catch(Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }
        [HttpPost("VerifyOTP")]
        public ActionResult VerifyOTP(OTPVM otp)
        {
            if (_rep.VerifyOTP(otp.UserID, otp.OTP) == true)
            {
                return Ok(true);
            }
            else
            {
                return BadRequest("Incorrect OTP");
            }
        }
        [HttpPost("ResetPassword")]
        public ActionResult ResetPassword(ResetPasswordVM reset)
        {

            //Save the new password to the database
            var usersPassword = _db.Passwords.Where(id => id.UserId == reset.UserID).FirstOrDefault();
            usersPassword.Password1 = BCrypt.Net.BCrypt.HashPassword(reset.password);
            usersPassword.OtpexpireTime = null;
            usersPassword.HashedOtp = null;
            _rep.SaveChanges();
            return Ok(true);
        }

        //Get session info after logged in's info
        [HttpPost("getUserSessionInfo")]
        public object getUserSessionInfo(LoginVM logindetails)
        {
            try
            {
                var user = _rep.getUserSessionInfo(logindetails);
                return user;
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }

        //getting ambassadors and admin application status
        [HttpGet("applicationStatus")]
        public ActionResult applicationStatus(string id)
        {
            try 
            { 
                var application = _rep.ApplicationStatus(id);
                return Ok(application);
            }
            catch(Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.InnerException.Message);
            }
        }

        //Update user profile
        [HttpPatch("updateUser")]
        public ActionResult updateUser(ProfileVM user)
        {
            try
            {
                if (_rep.UpdateUser(user))
                {
                    return Ok(true);
            }
                else
            {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Didn't update");
        }

        [HttpGet("GetProvinces")]
        public object GetProvinces()
        {
            try
            {
                return _rep.GetAll<Province>();
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.InnerException.Message);
                return BadRequest(error.Message);
            }
        }


        //for cart image
        //[HttpGet("GetimageById")]
        //public object GetimageById()
        //{
        //    try
        //    {
        //        var user = _rep.GetMerchImages();
        //        return user;
        //    }
        //    catch (Exception error)
        //    {
        //        return BadRequest(error.Message);
        //    }
        //}
    }
}
