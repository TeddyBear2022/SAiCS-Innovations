using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Vat
    {
        public int Vatid { get; set; }
        public DateTime? Date { get; set; }
        public decimal? VatPercentage { get; set; }
    }
}
