using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class Client
    {
        public Client()
        {
            ClientOrders = new HashSet<ClientOrder>();
            Feedbacks = new HashSet<Feedback>();
        }

        public int ClientId { get; set; }
        public int UserId { get; set; }
        public int? AmbassadorId { get; set; }

        public virtual Ambassador Ambassador { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<ClientOrder> ClientOrders { get; set; }
        public virtual ICollection<Feedback> Feedbacks { get; set; }
    }
}
