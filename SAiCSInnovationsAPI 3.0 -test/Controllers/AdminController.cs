using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SAiCSInnovationsAPI_3._0.Repository;
using SAiCSInnovationsAPI_3._0.Models;
using Microsoft.EntityFrameworkCore;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace SAiCSInnovationsAPI_3._0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly SaicsInnovationsDBContext _db;
        private readonly ISAiCSInnovationsRep _rep;
        public AdminController(ISAiCSInnovationsRep rep, SaicsInnovationsDBContext db)
        {
            _rep = rep;
            _db = db;
        }

        //get all titles
        [HttpGet("getTitles")]
        public object GetTitles()
        {
            try
            {
                return _rep.GetTitles();
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }

        }

        //Get user roles
        [HttpGet("GetUserRoles")]
        public object GetUserRoles()
        {
            try
            {
                return _rep.GetUserRoles();
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }

        }
        //Get countries
        [HttpGet("getCountry")]
        public object GetCountry()
        {
            try
            {
                return _rep.GetCountry();
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }

        }

        //Creating a FAQ
        [HttpPost("createFAQ")]
        public ActionResult createFAQ(Faq faq)
        {
            try
            {
                _rep.Add(faq);
                _rep.SaveChanges();
                return Ok(true);
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }

        //Get Ambassador Types
        [HttpGet("getAmbassadorTypes")]
        public object GetAmbassadorTypes()
        {
            try
            {
                return _rep.GetAmbassadorTypes();
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }

        //Deleting a FAQ
        [HttpDelete("deleteFAQ")]
        public ActionResult deleteFAQ(int faqID)
        {
            try
            {
                var deleteFaq = _rep.FindFAQ(faqID);
                _rep.Delete(deleteFaq);
                _rep.SaveChanges();
                return Ok(true);
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }

        //Get all FAQs
        [HttpGet("getAllFAQS")]
        public object getAllFAQS()
        {
            try
            {
                var faqs = _rep.getAllFAQs();
                return faqs;
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }

        //Get faq categories
        [HttpGet("getFAQCategories")]
        public object getFAQCategories()
        {
            try
            {
                var categories = _rep.GetFAQCategories();
                return categories;
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }

        [HttpPost("createFAQCategory")]
        public object createFAQCategory(Faqcategory faqcategory)
        {
            try
            {
                _rep.Add(faqcategory);
                _rep.SaveChanges();
                return true;
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }

        [HttpDelete("deleteFAQCategory")]
        public ActionResult deleteFAQCategory(int faqCategoryID)
        {
            try
            {
                
                _rep.deleteFAQCategory(faqCategoryID);
                _rep.SaveChanges();
                return Ok(true);
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }

        [HttpPatch("updateFAQ")]
        public ActionResult updateFAQ(Faq faq)
        {
            try
            {
                if (_rep.updateFAQ(faq) == true)
                {
                    _rep.SaveChanges();
                    return Ok(true);
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error`");
                }


            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }
        [HttpGet("PositionRequests")]
        public ActionResult PositionRequests()
        {
            try
            {
                var requests = _rep.PositionRequests();
                return Ok(requests);
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.InnerException.Message);
            }
        }

        //Targets
        [HttpPost("CreateTarget")]
        public ActionResult CreateTarget(Target target)
        {
            try
            {
                _rep.Add(target);
                _rep.SaveChanges();
                return Ok(true);
            }
            catch(Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }

        }
        [HttpPatch("UpdateTarget")]
        public ActionResult UpdateTarget(Target target)
        {
            try
            {
                var updateTarget = _db.Targets.Where(id => id.TargetId == target.TargetId).FirstOrDefault();
                updateTarget.Target1 = target.Target1;
                updateTarget.StartDate = target.StartDate;
                updateTarget.EndDate = target.EndDate;
                _rep.SaveChanges();
                return Ok(true);
            }
            catch(Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }

        }
        [HttpGet("GetAllTarget")]
        public ActionResult GetAllTarget()
        {
            try
            {
                var targets = _db.Targets.Include(amb => amb.Ambassador).ThenInclude(ranking => ranking.AmbassadorType).ToList();
                //var testTarget = _db.($"select c.AmbassadorID, u.Name, u.Surname, r.AmbassadorTypeName from [dbo].[AspNetUsers] u inner join[dbo].[Ambassador] c on u.Id = c.USERID inner join[dbo].[AmbassadorType] r on r.AmbassadorTypeID = c.AmbassadorTypeID").ToList();

                var distributors = _db.Ambassadors.DefaultIfEmpty().Include(type => type.AmbassadorType)
                    .Where(type => type.AmbassadorTypeId == 6 || type.AmbassadorTypeId == 7 || type.AmbassadorTypeId == 8)
                    .Join(_db.Targets.DefaultIfEmpty(), r => r.AmbassadorId, ro => ro.AmbassadorId, (r, ro) => new { r, ro })
                    .ToList();
                return Ok(distributors);
            }
            catch(Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }
        //[HttpGet("GetSpecificTarget")]
        //public ActionResult GetSpecificTarget()
        //{

        //}
        [HttpDelete("DeleteTarget")]
        public ActionResult DeleteTarget(int targetID)
        {
            try
            {
                var deleteTarget = _db.Targets.Where(id => id.TargetId == targetID);
                _rep.Delete(deleteTarget);
                _rep.SaveChanges();
                return Ok(true);
            }
            catch(Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }

        [HttpGet("ViewFeedback")]
        public ActionResult ViewFeedback()
        {
            try
            {
                var allfeedbacks = _db.Feedbacks.Include(amb => amb.Ambassador)
                    .ThenInclude(user=>user.User)
                    .Include(merch=>merch.Merchandise)
                    .ToList();
                return Ok(allfeedbacks);

            }
            catch(Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }

        [HttpGet("ViewAmbassadorFeedback")]
        public ActionResult ViewAmbassadorFeedback()
        {
            try
            {
                var ambassadorfeedbacks = _db.Feedbacks.Where(ambassadors => ambassadors.AmbassadorId != null)
                    .Include(amb => amb.Ambassador)
                    .ThenInclude(user => user.User)                    
                    .ToList();
                return Ok(ambassadorfeedbacks);

            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }

        [HttpGet("ViewMerchFeedback")]
        public ActionResult ViewMerchFeedback()
        {
            try
            {
                var ambassadorfeedbacks = _db.Feedbacks.Where(merchandise => merchandise.MerchandiseId != null)
                    .Include(merch => merch.Merchandise).ThenInclude(type => type.MerchType)
                    .Include(merch => merch.Merchandise).ThenInclude(category => category.MerchCategory)                    
                    .ToList();
                return Ok(ambassadorfeedbacks);

            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }

        [HttpGet("ViewAmbassadors")]
        public ActionResult ViewAmbassadors()
        {
            try
            {
                var allambassadors = _db.Ambassadors
                    .Include(user => user.User)
                    .ThenInclude(title => title.Title)
                    .Include(type => type.AmbassadorType)
                    .ToList();

                return Ok(allambassadors); 
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }

        [HttpGet("SearchAmbassador")]
        public ActionResult SearchAmbassador(string nameorsurname)
        {
            try
            {
                var searchResults = _db.Ambassadors
                    .Include(user => user.User)
                    .Include(user => user.User).ThenInclude(title => title.Title)
                    .Include(type => type.AmbassadorType)
                    .Include(user => user.User).Where(searchInfo => searchInfo.User.Name.Contains(nameorsurname) || searchInfo.User.Surname.Contains(nameorsurname))
                    .ToList();

            
                if (searchResults.Count() == 0)
                {
                    return NotFound("Can't find ambassador");
                }
                return Ok(searchResults);
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }

    }
}
