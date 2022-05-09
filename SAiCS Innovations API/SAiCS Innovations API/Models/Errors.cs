using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAiCS_Innovations_API.Models
{
    public class Errors
    {
        public Errors(string errorMsg)
        {
            Error = errorMsg;
        }
        public string Error { get; set; }
    }
}
