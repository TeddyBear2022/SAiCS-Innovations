using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class BankAccount
    {
        public BankAccount()
        {
            Ambassadors = new HashSet<Ambassador>();
        }

        public int BankAccountId { get; set; }
        public int AccountNumber { get; set; }
        public int? BankId { get; set; }
        public int? AccountTypeId { get; set; }

        public virtual AccountType AccountType { get; set; }
        public virtual Bank Bank { get; set; }
        public virtual ICollection<Ambassador> Ambassadors { get; set; }
    }
}
