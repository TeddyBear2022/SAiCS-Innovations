using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAiCSInnovationsAPI_3._0.ViewModels
{
    public class RegistrationInfoVM
    {
        public int UsertypeID { get; set; }
        public int TitleID { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string EmailAddress { get; set; }
        public int PhoneNumber { get; set; }
        public int CountryID { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public int PostalCode { get; set; }
        public string Idnumber { get; set; }
        public string referralcode { get; set; }
        public string ProofOfAdderess { get; set; }
        public string IDPhoto { get; set; }
        public int? ambassadorType { get; set; }
        public string AliasName { get; set; }
        public int ProvinceID { get; set; }
        public string AboutMyself { get; set; }
    }
}
