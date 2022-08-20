using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Referral
    {
        public int ReferralId { get; set; }
        public int? ReferralCodeId { get; set; }
        public string UserId { get; set; }
        public int? ReferralLinkTypeId { get; set; }
        public DateTime? Date { get; set; }

        public virtual ReferralCode ReferralCode { get; set; }
        public virtual ReferralLinkType ReferralLinkType { get; set; }
        public virtual User User { get; set; }
    }
}
