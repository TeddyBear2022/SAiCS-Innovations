using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SAiCSInnovationsAPI_3._0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MediaController : ControllerBase
    {
        [HttpPost("UploadFile"), DisableRequestSizeLimit]
        public ActionResult UploadFile(IFormFile file)
        {
            try
            {
                // Initialize the memory stream provider
                byte[] bytes;
                using (var memoryStream = new MemoryStream())
                {
                    file.CopyTo(memoryStream);
                    bytes = memoryStream.ToArray();
                }

                string base64 = Convert.ToBase64String(bytes);
                return Ok(base64);
            }
            catch (Exception ex)
            {

                return StatusCode(500, ex);
            }
        }


    }
}
