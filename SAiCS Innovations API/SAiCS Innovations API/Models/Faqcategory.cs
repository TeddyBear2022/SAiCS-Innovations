using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class Faqcategory
    {
        public Faqcategory()
        {
            Faqs = new HashSet<Faq>();
        }

        public int FaqcategoryId { get; set; }
        public string CategoryName { get; set; }

        public virtual ICollection<Faq> Faqs { get; set; }
    }
}
