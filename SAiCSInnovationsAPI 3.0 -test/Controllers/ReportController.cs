using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SAiCSInnovationsAPI_3._0.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAiCSInnovationsAPI_3._0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly ISAiCSInnovationsRep _rep;
        public ReportController(ISAiCSInnovationsRep rep)
        {
            _rep = rep;
        }

        [HttpGet("ProductListRep")]
        public object ProductListRep()
        {
            try
            {
                return _rep.GetProductList();
            }
            catch
            {
                return false;
            }
            
        }

        [HttpGet("AmbassadorListRep")]
        public object AmbassadorListRep()
        {
            try
            {
                return _rep.AmbassadorListRep();
            }
            catch
            {
                return false;
            }
        }

        [HttpGet("SalesRep")]
        public object SalesRep()
        {
            try
            {
                return _rep.SalesRep();
            }
            catch
            {
                return false;
            }
        }
    }
}
