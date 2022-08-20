using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Faq
    {
        public int Faqid { get; set; }
        public int? FaqcategoryId { get; set; }
        public string Faqquestion { get; set; }
        public string Faqanswers { get; set; }
        public virtual Faqcategory Faqcategory { get; set; }
    }
}
