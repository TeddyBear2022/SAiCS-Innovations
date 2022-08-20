using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
            var user = await _manager.FindByNameAsync(userVM.EmailorUsername);
            var checkpassword = _rep.CheckPassword(user.Id, userVM.Password);
            if (user != null && checkpassword == true)
            {
                try
                {
                    var principal = await _claims.CreateAsync(user);
                    await HttpContext.SignInAsync(IdentityConstants.ApplicationScheme, principal);
                    _db.SaveChanges();
                    var token = _rep.GenerateToken(user);
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

        //Fix up
        //Delete user/profile
        [HttpPost("DeleteUser")]
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
                return Ok("User Deleted");
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }

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

        [HttpGet("GetUserAddress")]
        public object GetUserAddress(string id)
        {
            try 
            { 
                return _rep.GetUserAddress(id);
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }

        [HttpPost("AddUserAddress")]
        public object AddUserAddress(Address address)
        {
            try
            {
                return _rep.AddUserAddress(address);
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
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
