﻿using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Faqcategory
    {
        public Faqcategory()
        {
            Faqs = new HashSet<Faq>();
        }
        public int FaqcategoryId { get; set; }
        public int? FaqtypeId { get; set; }
        public string CategoryName { get; set; }

        public virtual Faqtype Faqtype { get; set; }
        public virtual ICollection<Faq> Faqs { get; set; }
    }
}
