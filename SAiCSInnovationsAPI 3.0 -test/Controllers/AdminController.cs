using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SAiCSInnovationsAPI_3._0.Repository;
using SAiCSInnovationsAPI_3._0.Models;

namespace SAiCSInnovationsAPI_3._0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly SaicsInnovationsDBContext db;
        private readonly ISAiCSInnovationsRep _rep;
        public AdminController(ISAiCSInnovationsRep rep)
        {
            _rep = rep;
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
        public object createFAQ(Faq faq)
        {
            try
            {
                _rep.Add(faq);
                _rep.SaveChanges();
                return true;
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
        [HttpPost("deleteFAQ")]
        public object deleteFAQ(Faq faq)
        {
            try
            {
                var deleteFaq = _rep.FindFAQ(faq.Faqid);
                _rep.Delete(deleteFaq);
                _rep.SaveChanges();
                return true;
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

        [HttpPost("deleteFAQCategory")]
        public object deleteFAQCategory(Faqcategory faqcategory)
        {
            try
            {
                var deletecategory = faqcategory;
                _rep.Delete(deletecategory);
                _rep.SaveChanges();
                return true;
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }
        //[HttpPost("updateFAQ")]
        //public object updateFAQ(Faq faq)
        //{
        //    try
        //    {
        //        if (_rep.updateFAQ(faq) == true) { 
        //        _rep.SaveChanges();
        //        return true;
        //        }
        //        else
        //        {
        //            return false;
        //        }


        //    }
        //    catch (Exception error)
        //    {
        //        return BadRequest(error.InnerException.Message);
        //    }
        //}

        //Iteration 8
        //Amanda

        [HttpGet("GetSpecialOptions")]
        public object GetSpecialOptions()
        {
            try
            {
                
                return _rep.GetSpecialOptions();
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }
    }
}
