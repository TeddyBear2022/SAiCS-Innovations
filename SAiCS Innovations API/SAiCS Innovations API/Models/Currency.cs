using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class Currency
    {
        public Currency()
        {
            Prices = new HashSet<Price>();
        }

        public int CurrencyId { get; set; }
        public string CurrencyName { get; set; }
        public string CurrencySymbol { get; set; }
        public string CurrencyConversionsNames { get; set; }
        public int CurrencyConversion { get; set; }

        public virtual ICollection<Price> Prices { get; set; }
    }
}
