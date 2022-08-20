using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class User:IdentityUser
    {
        public User()
        {
            Addresses = new HashSet<Address>();
            Admins = new HashSet<Admin>();
            Ambassadors = new HashSet<Ambassador>();
            Applications = new HashSet<Application>();
            Carts = new HashSet<Cart>();
            Clients = new HashSet<Client>();
            Orders = new HashSet<Order>();
            Passwords = new HashSet<Password>();
            Referrals = new HashSet<Referral>();
        }

        public int UserId { get; set; }
        public int? UserRoleId { get; set; }
        public int? TitleId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        //public int? PhoneNumber { get; set; }

        public virtual Title Title { get; set; }
        public virtual UserRole UserRole { get; set; }
        public virtual ICollection<Address> Addresses { get; set; }
        public virtual ICollection<Admin> Admins { get; set; }
        public virtual ICollection<Ambassador> Ambassadors { get; set; }
        public virtual ICollection<Application> Applications { get; set; }
        public virtual ICollection<Cart> Carts { get; set; }
        public virtual ICollection<Client> Clients { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<Password> Passwords { get; set; }
        public virtual ICollection<Referral> Referrals { get; set; }
    }
}
