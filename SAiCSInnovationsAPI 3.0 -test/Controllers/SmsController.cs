using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Twilio;
using Twilio.AspNet.Mvc;
using Twilio.Rest.Api.V2010.Account;

namespace SAiCSInnovationsAPI_3._0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SmsController 
    {
        [HttpPost("SMS")]
        public object Sms()
        {
            var accSid = "AC7ed5f3a417819cf64200e56e92fdaea2";
            var authToken = "619d654e00b4a47de3f2f5086b180951";
            TwilioClient.Init(accSid, authToken);
            var to = "+27649008769";
            var from = "+12242191485";
             
            var message = MessageResource.Create(to: to, from: from, body:"Hey its working");
            return "sent";

        }
    }
}
