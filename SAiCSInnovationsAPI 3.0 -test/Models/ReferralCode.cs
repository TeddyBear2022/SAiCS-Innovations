using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class ReferralCode
    {
        public ReferralCode()
        {
            Referrals = new HashSet<Referral>();
        }

        public int ReferralCodeId { get; set; }
        public string ReferralCode1 { get; set; }
        public string IsActive { get; set; }
        public int? AmbassadorId { get; set; }

        public virtual Ambassador Ambassador { get; set; }
        public virtual ICollection<Referral> Referrals { get; set; }
    }
}
