using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Ambassador
    {
        public Ambassador()
        {
            AmbassadorEnrollments = new HashSet<AmbassadorEnrollment>();
            AuditTrails = new HashSet<AuditTrail>();
            Certificates = new HashSet<Certificate>();
            Clients = new HashSet<Client>();
            Feedbacks = new HashSet<Feedback>();
            Orders = new HashSet<Order>();
            PositionRequests = new HashSet<PositionRequest>();
            ReferralCodes = new HashSet<ReferralCode>();
            Targets = new HashSet<Target>();
        }

        public int AmbassadorId { get; set; }
        public int? BankAccountId { get; set; }
        public string UserId { get; set; }
        public int? AmbassadorTypeId { get; set; }
        public string Idnumber { get; set; }
        public string Idphoto { get; set; }
        public byte[] ProofOfAddress { get; set; }
        public string AliasName { get; set; }

        public string Motivation { get; set; }
        //Added for linking the ambassador and order tables
        public virtual ICollection<Order> Orders { get; set; }

        public virtual AmbassadorType AmbassadorType { get; set; }
        public virtual BankAccount BankAccount { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<AmbassadorEnrollment> AmbassadorEnrollments { get; set; }
        public virtual ICollection<AuditTrail> AuditTrails { get; set; }
        public virtual ICollection<Certificate> Certificates { get; set; }
        public virtual ICollection<Client> Clients { get; set; }
        public virtual ICollection<Feedback> Feedbacks { get; set; }
        public virtual ICollection<PositionRequest> PositionRequests { get; set; }
        public virtual ICollection<ReferralCode> ReferralCodes { get; set; }
        public virtual ICollection<Target> Targets { get; set; }
    }
}
