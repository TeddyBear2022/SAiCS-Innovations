using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using SAiCS_Innovations_API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace SAiCS_Innovations_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly SaicsInnovationsDBContext db = new SaicsInnovationsDBContext();

        //Feedback section
        // Create feedback 
        [HttpPost]
        [Route("CreateFeedback")]
        public object Feedback(Feedback feedback)
        {

            try
            {
                Feedback newFeedBack = new Feedback
                {
                    FeedbackId = feedback.FeedbackId,
                    Description = feedback.Description,
                    ProductId = feedback.ProductId,
                    FeedbackTypeId = feedback.FeedbackTypeId,
                    ClientId = feedback.ClientId,
                    AmbassadorId = feedback.AmbassadorId,
                    Date = DateTime.Now


                };
                db.Feedbacks.Add(newFeedBack);
                db.SaveChanges();
                return  JsonSerializer.Serialize("Feedback created successfully");
            }
            catch (Exception error)
            {

                return error.InnerException.Message;

            }
        }


        // Delete feedback
        [HttpDelete]
        [Route("DeleteFeedback")]
        public object DeleteFeedback(int id)
        {
            try
            {
                Feedback feedback = db.Feedbacks.Where(x => x.FeedbackId == id).Single<Feedback>();
                db.Feedbacks.Remove(feedback);
                db.SaveChanges();
                return JsonSerializer.Serialize("Feedback deleted successfully");
            }
            catch (Exception error)
            {
                return error.InnerException.Message;
            }
        }

        // Get product feedback
        [HttpGet]
        [Route("GetProductFeedback")]
        public object GetProductFeedback()
        {
            try
            {


                var FeedbackList = (from f in db.Feedbacks
                                    join p in db.Products on f.ProductId equals p.ProductId
                                    join pt in db.ProductTypes on p.ProductTypeId equals pt.ProductTypeId
                                    select new
                                    {
                                        f.FeedbackId,
                                        f.FeedbackTypeId,
                                        f.Description,
                                        f.Date,
                                        f.ClientId,
                                        p.ProductName,
                                        pt.ProductTypeName
                                    });
                return FeedbackList;
            }
            catch (Exception error)
            {
                return error.InnerException.Message;
            }
        }


        // Get ambassador feedback
        [HttpGet]
        [Route("GetAmbassadorFeedback")]
        public object GetAmbassadorFeedback()
        {
            try
            {
                var FeedbackList = (from f in db.Feedbacks
                                    join a in db.Ambassadors on f.AmbassadorId equals a.AmbassadorId
                                    join u in db.Users on a.UserId equals u.UserId
                                    select new
                                    {
                                        f.FeedbackId,
                                        f.FeedbackTypeId,
                                        f.Description,
                                        f.Date,
                                        f.ClientId,
                                        u.Name,
                                        u.Surname

                                    }).ToList();
                return FeedbackList;
            }
            catch (Exception error)
            {
                return error.InnerException.Message;
            }
        }


        //FAQ section
        //Get Account FAQ 
        [HttpGet]
        [Route("GetAccountFAQ")]
        public object GetAccountFAQ()
        {
            try
            {
                var FAQList = db.Faqs.Where(x => x.Faqcategory.CategoryName == "Account").ToList();
                return FAQList;
            }
            catch (Exception error)
            {
                return error.InnerException.Message;
            }
        }

        //Get Product FAQ 
        [HttpGet]
        [Route("GetProductFAQ")]
        public object GetProductFAQ()
        {
            try
            {
                var FAQList = db.Faqs.Where(x => x.Faqcategory.CategoryName == "Product").ToList();
                return FAQList;
            }
            catch (Exception error)
            {
                return error.InnerException.Message;
            }
        }

        //Get Delivery FAQ 
        [HttpGet]
        [Route("GetDeliveryFAQ")]
        public object GetDeliveryFAQ()
        {
            try
            {
                var FAQList = db.Faqs.Where(x => x.Faqcategory.CategoryName == "Delivery").ToList();
                return FAQList;
            }
            catch (Exception error)
            {
                return error.InnerException.Message;
            }
        }

        //Ambassador section
        [HttpGet]
        [Route("MyAmbassador")]
        public object MyAmbassador(int id)
        {
            try
            {
                var ambassador = db.Ambassadors
                                .Include(user => user.User)
                                .Include(client => client.Clients)
                                .Include(user => user.User)
                                .ThenInclude(address => address.Address)
                                .Include(user => user.User)
                                .ThenInclude(country => country.Country)
                                .Include(fb => fb.Feedbacks).Where(x => x.AmbassadorId == id);
                return ambassador;
            }
            catch (Exception error)
            {
                return error.InnerException.Message;
            }
        }
    }
}
