using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAiCSInnovationsAPI_3._0.ViewModels
{
    public class credentialsVM
    {
        public string token { get; set; }
        public DateTime expirationDate { get; set; }
        public string userID { get; set; }
    }
}
