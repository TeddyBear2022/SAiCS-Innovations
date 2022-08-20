using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAiCSInnovationsAPI_3._0.ViewModels
{
    public class ProfileVM
    {
        public string Id { get; set; }
        public string TitleId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int PhoneNumber { get; set; }
        public int CountryId { get; set; }
        public string Address { get; set; }
        public int PostalCode { get; set; }
        public string City { get; set; }

    }
}
