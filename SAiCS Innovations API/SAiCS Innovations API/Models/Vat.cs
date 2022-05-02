using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class Vat
    {
        
        public int Vatid { get; set; }
        public string Description { get; set; }
        public decimal VatPercentage { get; set; }
    }
}
