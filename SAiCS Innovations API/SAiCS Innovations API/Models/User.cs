using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class User
    {
        public User()
        {
            Admins = new HashSet<Admin>();
            Ambassadors = new HashSet<Ambassador>();
            Clients = new HashSet<Client>();
            Passwords = new HashSet<Password>();
            UserApplicationStatuses = new HashSet<UserApplicationStatus>();
        }

        public int UserId { get; set; }
        public int? UserRoleId { get; set; }
        public int? TitleId { get; set; }
        public int? CountryId { get; set; }
        public int? AddressId { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public byte[] EmailAddress { get; set; }
        public int PhoneNumber { get; set; }
        public int? ApplicationStatusId { get; set; }

        public virtual Address Address { get; set; }
        public virtual Country Country { get; set; }
        public virtual Title Title { get; set; }
        public virtual UserRole UserRole { get; set; }
        public virtual ICollection<Admin> Admins { get; set; }
        public virtual ICollection<Ambassador> Ambassadors { get; set; }
        public virtual ICollection<Client> Clients { get; set; }
        public virtual ICollection<Password> Passwords { get; set; }
        public virtual ICollection<UserApplicationStatus> UserApplicationStatuses { get; set; }
    }
}
