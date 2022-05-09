using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class Faq
    {
        public int Faqid { get; set; }
        public int? FaqtypeId { get; set; }
        public int? FaqcategoryId { get; set; }
        public string Faqquestion { get; set; }
        public string Faqanswers { get; set; }

        public virtual Faqcategory Faqcategory { get; set; }
        public virtual Faqtype Faqtype { get; set; }
    }
}
