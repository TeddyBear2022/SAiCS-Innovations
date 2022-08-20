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
    public class AmbassadorController : ControllerBase
    {
        private readonly ISAiCSInnovationsRep _rep;
        private readonly SaicsInnovationsDBContext _db;
        private readonly UserManager<User> _manager;
        private readonly IUserClaimsPrincipalFactory<User> _claims;
        private readonly IConfiguration _configuration;
        // public int otp = 0;

        public AmbassadorController(UserManager<User> manager,
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

        [HttpPost("GetRefferralCode")]
        public object GetRefferralCode(string name, string surname)
        {
            var newRefferralCode = _rep.GenerateRefferralCode(name, surname);
            return newRefferralCode;
        }

        [HttpPost("ViewCurrentAgents")]
        public object ViewCurrentAgents(credentialsVM credentials)
        {
            var listOfAgents = _rep.ViewCurrentAgents(credentials.userID);

            return listOfAgents;
        }

        [HttpPost("PromotionRequest")]
        public object PromotionRequest(string userID)
        {
            var positionRequest = _rep.RequestRankingPromotion(userID);
            if (positionRequest == true)
            {
                return "Promotion request completed";
            }
            else
            {
                return "Promotion request incomplete";
            }

        }

        [HttpPost("DemotionRequest")]
        public object DemotionRequest(string userID)
        {
            var positionRequest = _rep.RequestRankingDemotion(userID);
            if (positionRequest == true)
            {
                return "Promotion request completed";
            }
            else
            {
                return "Promotion request incomplete";
            }

        }

        [HttpPost("ViewFAQ")]
        public object ViewFAQ()
        {
            return "Stub";
        }

        [HttpPost("ViewClients")]
        public object ViewClients(credentialsVM credentials)
        {
            var clients = _rep.ViewClient(credentials.userID);

            return clients;
        }

        [HttpPost("ViewClientOrders")]
        public object ViewClientOrders()
        {
            return "Stub";
        }

        [HttpPost("ViewAmbassadorFeedback")]
        public object ViewAmbassadorFeedback(string userID)
        {
            var feedbacks = _rep.ViewAmbassadorFeedback(userID);
            return feedbacks;
        }

        [HttpPost("SearchAmbassadorFeedback")]
        public object SearchAmbassadorFeedback()
        {

            return "Stub";
        }

        [HttpPost("ViewPerformance")]
        public object ViewPerformance()
        {

            return "Stub";
        }

    }
}
