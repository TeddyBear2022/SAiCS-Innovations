using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Faqtype
    {
        public Faqtype()
        {
            Faqcategories = new HashSet<Faqcategory>();
            
        }

        public int FaqtypeId { get; set; }
        public string FaqtypeName { get; set; }

        public virtual ICollection<Faqcategory> Faqcategories { get; set; }
        //public virtual ICollection<Faq> Faqs { get; set; }
    }
}
