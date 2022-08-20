//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using SAiCSInnovationsAPI_3._0.Models;
//using SAiCSInnovationsAPI_3._0.Repository;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text.Json;
//using System.Threading.Tasks;

//namespace SAiCSInnovationsAPI_3._0.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ClientController : ControllerBase
//    {
//        private readonly ISAiCSInnovationsRep _rep;
//        public ClientController(ISAiCSInnovationsRep rep)
//        {
//            _rep = rep;
//        }
//        //Creating feedback
//        [HttpPost("CreateFeedback")]
//        public object CreateFeedback(Feedback feedback)
//        {
//            try
//            {
//                Feedback newFeedBack = new Feedback
//                {
//                    FeedbackId = feedback.FeedbackId,
//                    Description = feedback.Description,
//                    ProductId = feedback.ProductId,
//                    FeedbackTypeId = feedback.FeedbackTypeId,
//                    ClientId = feedback.ClientId,
//                    AmbassadorId = feedback.AmbassadorId,
//                    Date = DateTime.Now
                                      

//                };
//                _rep.Add(newFeedBack);
//                _rep.SaveChanges();
//                return JsonSerializer.Serialize("Feedback created successfully");

//            }
//            catch(Exception error)
//            {
//                return error.InnerException.Message;
//            }
//        }

//        // Delete feedback
//        [HttpDelete("DeleteFeedback")]
//        public object DeleteFeedback(int id)
//        {
//            try
//            {
//                _rep.Delete(_rep.FindFeedback(id));
//                _rep.SaveChanges();
//                return "Feedback deleted successfully";

//            }
//            catch (Exception error)
//            {
//                return error.InnerException.Message;
//            }
//        }

//        // Get product feedback
//        [HttpGet("GetProductFeedback")]
//        public object GetProductFeedback()
//        {
//            try
//            {
//                return _rep.GetProductFeedbacks();
//            }
//            catch (Exception error)
//            {
//                return BadRequest(error.InnerException.Message);
//            }
//        }
//        // Get ambassador feedback
//        //[HttpGet("GetAmbassadorFeedback")]
//        //public object GetAmbassadorFeedback()
//        //{
//        //    try
//        //    {
//        //        return _rep.GetAmbassadorFeedbacks();
//        //    }
//        //    catch(Exception error)
//        //    {
//        //        return BadRequest(error.InnerException.Message);
//        //    }
//        //}

//        //Get Account category FAQs
//        //[HttpGet("GetAccountFAQ")]
//        //public object GetAccountFAQ()
//        //{
//        //    try
//        //    {
//        //        return _rep.GetAccountFAQs();
//        //    }
//        //    catch (Exception error)
//        //    {
//        //        return BadRequest(error.InnerException.Message);
//        //    }
//        //}
//        //Get Product FAQ 
//        //[HttpGet("GetProductFAQ")]
//        //public object GetProductFAQ()
//        //{
//        //    try
//        //    {
//        //        return _rep.GetProductFAQs();
//        //    }
//        //    catch (Exception error)
//        //    {
//        //        return BadRequest(error.InnerException.Message);
//        //    }
//        //}

//        //Get Delivery FAQ 
//        //[HttpGet("GetDeliveryFAQ")]
//        //public object GetDeliveryFAQ()
//        //{
//        //    try
//        //    {
//        //        return _rep.GetDeliveryFAQs();
//        //    }
//        //    catch (Exception error)
//        //    {
//        //        return BadRequest(error.InnerException.Message);
//        //    }
//        //}

//        //Get ambassador assigned to users information
//        [HttpGet("MyAmbassador")]
//        public object GetMyAmbassador(int id)
//        {
//            try
//            {
//                return _rep.MyAmbassador(id);
//            }
//            catch (Exception error)
//            {
//                return BadRequest(error.InnerException.Message);
//            }
//        }

//        //Get Catalog by category
//        [HttpGet("GetCatalogByCategory")]
//        public object GetCatalogByCategory(int id)
//        {
//            try
//            {
//                return _rep.GetCatalogByCategory(id);
//            }
//            catch (Exception error)
//            {
//                return BadRequest(error.InnerException.Message);
//            }
//        }
//    }
//}
