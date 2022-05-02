using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Mail; //Included plugin 
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using SAiCS_Innovations_API.Models;

namespace SAiCS_Innovations_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly SaicsInnovationsDBContext db = new SaicsInnovationsDBContext();

        //Edit, this is just to make sure it works
        [HttpPost("SendEmail")]
        public String Email()
        {
            using (MailMessage email = new MailMessage("u20551313@tuks.co.za", "u20551313@tuks.co.za"))
            {
                email.Subject = "Welcome to SAiCs";
                email.Body = "Welcome to the SAiCS Innvoation app, we are happy that you chose to do business with us!";
                email.IsBodyHtml = false;


                using (SmtpClient Smtp = new SmtpClient())
                {
                    Smtp.Host = "smtp.gmail.com";
                    Smtp.EnableSsl = true;
                    NetworkCredential credentials = new NetworkCredential("u20551313@tuks.co.za", "FentseT@21");
                    Smtp.UseDefaultCredentials = false;
                    Smtp.Credentials = credentials;
                    Smtp.Port = 587;
                    Smtp.Send(email);
                }
            }
            return "Message sent successfully";
        }

        //TODO Create the 3 API endpoints for creating the user, but before figure out how you made it 
        //Still testing 
        [HttpPost("CreateUser")]
        public object CreateUser(User user)
        {

            try
            {
                if (user.UserRole.Description == "Client")
                {

                    User NewUserInfo = new User
                    {

                    };


                }

                //db.AccessLevel.Add(Access);
                //db.SaveChanges();
                return "Access Level Added successfully";
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);

            }
        }


    }
}
