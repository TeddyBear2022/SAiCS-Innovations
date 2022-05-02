using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        private readonly SaicsInnovationsDBContext db = new SaicsInnovationsDBContext();
        
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
                db.Vat.Add(NewVAT);
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
                db.Country.Add(cntry);
                db.SaveChanges();
                return "Country Added successfully";
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
                return db.Country.ToList();
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
                db.ApplicationStatus.Add(appStatus);
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
                db.Address.Add(Address);
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
                db.AccessLevel.Add(Access);
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
                return db.AccessLevel.ToList();
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
            List<AccessLevel> AccessLevels = db.AccessLevel.Where(p => p.AccessLevelId == 1).ToList();
            AccessLevel tempAccessLvlInfo = new AccessLevel
            {
                AccessLevelId = AccessLevels[0].AccessLevelId,
                Description = AccessLevels[0].Description,
                AccessLevelName = AccessLevels[0].AccessLevelName
            };

            return tempAccessLvlInfo;
        }
        //  NOTE TO SELF FIGURE OUT WHY ITS ADDING ADDITIONAL FIELDS TO THE SQL FILES AND IF ITS FINE OR NOT YOU KNOW AS WELL AS THE ACCESS LEVEL NAMING
        [HttpPost("CreateUserRoles")]
        public object AddUserRoles()
        {
            try
            {
                //TODO: find accesslevel id and description from  object param then it should work best on tests
                //var id = db.AccessLevel.Where(p => p.AccessLevelId == AccessLvl).Select(x=> x.AccessLevelId);
                var id = GetSpecAccesslvl(1).AccessLevelId;
                //var AccesslvlID = GetSpecAccesslvl("Level5").AccessLevelId;
                //var accessobj = new AccessLevel(1,"Level1", "Basic functionality should be granted");

                UserRole userR = new UserRole
                {
                    //Stub for testing
                    //Add a Accesslevel id equal variable.something
                    AccessLevelId = id,
                    Description = "Test",
                    // AccessLevel = accessobj,

                };
                db.UserRole.Add(userR);
                db.SaveChanges();
                return "User role successfully added";
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }

        }

        [HttpGet("GetUserRoles")]
        public object GetUserRoles()
        {
            try
            {
                return db.UserRole.ToList();
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
                db.Title.Add(title);
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
                return db.Title.ToList();
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }

        }
    }
}
