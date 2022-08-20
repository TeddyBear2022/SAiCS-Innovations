using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class ReferralLinkType
    {
        public ReferralLinkType()
        {
            Referrals = new HashSet<Referral>();
        }

        public int ReferralLinkTypeId { get; set; }
        public string ReferralType { get; set; }

        public virtual ICollection<Referral> Referrals { get; set; }
    }
}
