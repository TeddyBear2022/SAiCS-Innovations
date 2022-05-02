using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class Password
    {
        public int PasswordId { get; set; }
        public string Password1 { get; set; }
        public DateTime DateSet { get; set; }
        public string ResetPasswordLink { get; set; }
        public string HashedOtp { get; set; }
        public DateTime OtpexpireTime { get; set; }
        public int? UserId { get; set; }

        public virtual User User { get; set; }
    }
}
