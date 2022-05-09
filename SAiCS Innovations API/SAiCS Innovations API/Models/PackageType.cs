using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class PackageType
    {
        public PackageType()
        {
            Packages = new HashSet<Package>();
        }

        public int PackageTypeId { get; set; }
        public string PackageTypeName { get; set; }

        public virtual ICollection<Package> Packages { get; set; }
    }
}
