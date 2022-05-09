using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class Ambassador
    {
        public Ambassador()
        {
            AmbassadorOrders = new HashSet<AmbassadorOrder>();
            AuditLogs = new HashSet<AuditLog>();
            Clients = new HashSet<Client>();
            Feedbacks = new HashSet<Feedback>();
        }

        public int AmbassadorId { get; set; }
        public int? CourseId { get; set; }
        public int? BankAccountId { get; set; }
        public int? UserId { get; set; }
        public int? AmbassadorTypeId { get; set; }
        public string Idnumber { get; set; }
        public byte[] Idphoto { get; set; }
        public byte[] ProofOfAddressPhoto { get; set; }
        public byte[] ProfilePic { get; set; }
        public string AliasName { get; set; }
        public string ReferralCode { get; set; }

        public virtual AmbassadorType AmbassadorType { get; set; }
        public virtual BankAccount BankAccount { get; set; }
        public virtual Course Course { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<AmbassadorOrder> AmbassadorOrders { get; set; }
        public virtual ICollection<AuditLog> AuditLogs { get; set; }
        public virtual ICollection<Client> Clients { get; set; }
        public virtual ICollection<Feedback> Feedbacks { get; set; }
    }
}
