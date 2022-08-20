using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class AmbassadorEnrollment
    {
        public int AmbassadorEnrollmentId { get; set; }
        public int? CourseId { get; set; }
        public int? AmbassadorId { get; set; }
        public DateTime? Date { get; set; }

        public virtual Ambassador Ambassador { get; set; }
        public virtual Course Course { get; set; }
    }
}
