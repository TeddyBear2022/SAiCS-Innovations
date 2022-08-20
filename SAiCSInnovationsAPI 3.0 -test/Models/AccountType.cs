using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class AccountType
    {
        public AccountType()
        {
            BankAccounts = new HashSet<BankAccount>();
        }

        public int AccountTypeId { get; set; }
        public string AccountTypeName { get; set; }

        public virtual ICollection<BankAccount> BankAccounts { get; set; }
    }
}
