using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Bank
    {
        public Bank()
        {
            BankAccounts = new HashSet<BankAccount>();
        }

        public int BankId { get; set; }
        public string BankName { get; set; }

        public virtual ICollection<BankAccount> BankAccounts { get; set; }
    }
}
