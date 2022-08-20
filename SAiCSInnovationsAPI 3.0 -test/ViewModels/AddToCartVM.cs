using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SAiCSInnovationsAPI_3._0.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAiCSInnovationsAPI_3._0.ViewModels
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddToCartVM : ControllerBase
    {
        //public Product CartProduct { get; set; }
        //public Package CartPackage { get; set; }
        public Special CartSpecial { get; set; }
    }
}
