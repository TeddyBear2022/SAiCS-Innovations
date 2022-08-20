using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Client
    {
        public Client()
        {
            Feedbacks = new HashSet<Feedback>();
        }

        public int ClientId { get; set; }
        public string UserId { get; set; }
        public int? AmbassadorId { get; set; }

        public virtual Ambassador Ambassador { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<Feedback> Feedbacks { get; set; }
    }
}
