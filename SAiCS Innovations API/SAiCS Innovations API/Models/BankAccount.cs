using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class BankAccount
    {
        public BankAccount()
        {
            Ambassadors = new HashSet<Ambassador>();
        }

        public int BankAccountId { get; set; }
        public int CardNumber { get; set; }
        public string BankName { get; set; }
        public int AccountTypeId { get; set; }

        public virtual AccountType AccountType { get; set; }
        public virtual ICollection<Ambassador> Ambassadors { get; set; }
    }
}
