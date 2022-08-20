using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Feedback
    {
        public int FeedbackId { get; set; }
        public int? AmbassadorId { get; set; }
        public string Description { get; set; }
        public int? MerchandiseId { get; set; }
        public int? FeedbackTypeId { get; set; }
        public int? ClientId { get; set; }
        public DateTime? Date { get; set; }

        public virtual Ambassador Ambassador { get; set; }
        public virtual Client Client { get; set; }
        public virtual FeedbackType FeedbackType { get; set; }
        public virtual Merchandise Merchandise { get; set; }
    }
}
