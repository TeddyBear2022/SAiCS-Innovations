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
    public class TrainingController : ControllerBase
    {
        private readonly ISAiCSInnovationsRep _rep;
        public TrainingController(ISAiCSInnovationsRep rep)
        {
            _rep = rep;
        }
    }
}
