using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Password
    {
        public int PasswordId { get; set; }
        public string Password1 { get; set; }
        public DateTime? DateSet { get; set; }
        public string ResetPasswordLink { get; set; }
        public string HashedOtp { get; set; }
        public DateTime? OtpexpireTime { get; set; }
        public string UserId { get; set; }

        public virtual User User { get; set; }
    }
}
