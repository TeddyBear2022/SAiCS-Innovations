using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SAiCS_Innovations_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAiCS_Innovations_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private  SaicsInnovationsDBContext db = new SaicsInnovationsDBContext();
        
        [HttpPost("CreateVAT")]
        public object VAT(Vat vat)
        {
            try
            {
                Vat NewVAT = new Vat
                {
                    Description = vat.Description,
                    VatPercentage = vat.VatPercentage
                };
                db.Vats.Add(NewVAT);
                db.SaveChanges();
                return "VAT Added";
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);

            }
        }
        [HttpPost("CreateCountry")]
        public object Country(Country country)
        {
            try
            {
                Country cntry = new Country
                {
                    //Proper
                    CountryName = country.CountryName,
                    CountryCode = country.CountryCode
                    //Stub for testing
                    //CountryName = "South Africa",
                    //CountryCode = "+27"
                };
                db.Countries.Add(cntry);
                db.SaveChanges();
                return "Country Added successfully";
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);

            }
        }
        //GetAmbassadors
        [HttpGet("getAmbassadorTypes")]
        public object GetAmbassadorTypes()
        {
            try
            {
                var ambassadorTypeList = db.AmbassadorTypes;

                return ambassadorTypeList.ToList();
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }

        [HttpGet("getCountry")]
        public object GetCountry()
        {
            try
            {
                return db.Countries.ToList();
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }

        }


        [HttpPost("CreateApplicationStatus")]
        public object ApplicationStatus(ApplicationStatus appstatus)
        {
            try
            {
                ApplicationStatus appStatus = new ApplicationStatus
                {
                    //Proper
                    StatusName = appstatus.StatusName
                    //Stub for testing
                    //StatusName = "Successful"
                };
                db.ApplicationStatuses.Add(appStatus);
                db.SaveChanges();
                return "Application Status Added successfully";
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);

            }
        }
        [HttpPost("CreateAddress")]
        public object Address(Address address)
        {
            try
            {
                Address Address = new Address
                {
                    //Proper
                    Address1 = address.Address1,
                    PostalCode = address.PostalCode,
                    City = address.City
                    //Stub for testing
                    //Address1 = "2080 Model park",
                    //PostalCode = 2055,
                    //City = "Pretoria"
                };
                db.Addresses.Add(Address);
                db.SaveChanges();
                return "Address Added successfully";
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);

            }
        }

        [HttpPost("CreateAccesslevel")]
        public object AccessLevel(AccessLevel accessLvl)
        {
            try
            {
                AccessLevel Access = new AccessLevel
                {
                    //Proper
                    AccessLevelName = accessLvl.AccessLevelName,
                    Description = accessLvl.Description,

                    //Stub for testing
                    //AccessLevelName = "Level5",
                    //Description = "Highest level of  functionality should be granted",

                };
                db.AccessLevels.Add(Access);
                db.SaveChanges();
                return "Access Level Added successfully";
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }


        [HttpGet("GetAccessLevels")]
        public object GetAccessLevels()
        {
            try
            {
                return db.AccessLevels.ToList();
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }

        }

        //Gets specific accessLevel
        [HttpGet("GetSpecificAccessLevel")]
        public AccessLevel GetSpecAccesslvl(int AccessLvl)
        {
            List<AccessLevel> AccessLevels = db.AccessLevels.Where(p => p.AccessLevelId == 1).ToList();
            AccessLevel tempAccessLvlInfo = new AccessLevel
            {
                AccessLevelId = AccessLevels[0].AccessLevelId,
                Description = AccessLevels[0].Description,
                AccessLevelName = AccessLevels[0].AccessLevelName
            };

            return tempAccessLvlInfo;
        }

        [HttpPost("CreateUserRoles")]
        public object AddUserRoles()
        {
            //New way
            try
            {
                ////Assigning a new user role to an existing accesslevel code:
                //UserRole userRole = new UserRole();
                //userRole.UserRoleName = "Demo with access level 1";

                ////Linking/ assigning the accesslevel with the previous one created
                //userRole.AccessLevel = new AccessLevel { AccessLevelId = 1 };
                //userRole.AccessLevel.UserRoles.Add(userRole);

                //db.Entry(userRole.AccessLevel).State = EntityState.Unchanged;
                //db.UserRoles.Add(userRole);
                //db.SaveChanges();

                //Adding a new user role with its own new accesslevel
                AccessLevel Accesslevel = new AccessLevel();
                Accesslevel.AccessLevelName = "Level4";
                Accesslevel.Description = "Advanced Functionality should be granted";

                UserRole Userrole = new UserRole();
                Userrole.UserRoleName = "Owner";
                Userrole.AccessLevelId = Accesslevel.AccessLevelId;

                //Linking AccessLevel and userRole
                Userrole.AccessLevel = Accesslevel;
                Accesslevel.UserRoles.Add(Userrole);

                //for showing data
                var userRoles = db.UserRoles.Include(role => role.AccessLevel).ThenInclude(b => b.UserRoles);
                //var accessLevels = db.AccessLevels.Include(access => access.UserRoles);
                //when you dont want to add new record in child entity
                //db.Entry(Userrole.AccessLevel).State = EntityState.Unchanged;
                db.UserRoles.Add(Userrole);
                db.SaveChanges();
                return Userrole;
            }
            catch(Exception error)
            {
                return BadRequest(error.Message);
            }
            //Previous way
            //try
            //{
            //    //TODO: find accesslevel id and description from  object param then it should work best on tests
            //    //var id = db.AccessLevel.Where(p => p.AccessLevelId == AccessLvl).Select(x=> x.AccessLevelId);
            //    var id = GetSpecAccesslvl(1).AccessLevelId;
            //    //var AccesslvlID = GetSpecAccesslvl("Level5").AccessLevelId;
            //    //var accessobj = new AccessLevel(1,"Level1", "Basic functionality should be granted");

            //    UserRole userR = new UserRole
            //    {
            //        //Stub for testing
            //        //Add a Accesslevel id equal variable.something
            //        AccessLevelId = id,
            //        Description = "Test",
            //        // AccessLevel = accessobj,

            //    };
            //    db.UserRole.Add(userR);
            //    db.SaveChanges();
            //    return "User role successfully added";
            //}
            //catch (Exception error)
            //{
            //    return BadRequest(error.Message);
            //}

        }

        [HttpPost("CreateAmbassadorType")]
        public object CreateAmbassadorType()
        {
            try
            {
                AmbassadorType ambassadorType = new AmbassadorType();
                ambassadorType.AmbassadorTypeName = "Junior Agent";
                db.AmbassadorTypes.Add(ambassadorType);
                db.SaveChanges();

                //viewing all ambassadors
                var ambassadorTypes = db.AmbassadorTypes.Include(ambassadors => ambassadors.Ambassadors);
                return ambassadorTypes;
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }
            //Video Create userroles
            //[HttpPost("TestCreateUserRoles")]
            //public async Task<ActionResult<UserRole>> CreateUserRole()
            //{
            //    var userroles = await db.UserRole.Incl
            //}

        [HttpGet("GetUserRoles")]
        public object GetUserRoles()
        {
            try
            {
                return db.UserRoles.ToList();
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }

        }

        [HttpPost("CreateTitle")]
        public object CreateTitle(string titleName)
        {
            try
            {
                Title title = new Title
                {
                    //Proper
                    TitleName = titleName
                    //Stub for testing
                    //TitleName = "Miss"
                };
                db.Titles.Add(title);
                db.SaveChanges();
                return "Title successfully created";
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }

        }
        [HttpGet("getTitles")]
        public object GetTitles()
        {
            try
            {
                return db.Titles.ToList();
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }

        }
    }
}
