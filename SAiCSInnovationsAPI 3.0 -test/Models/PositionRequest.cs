using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class PositionRequest
    {
        public int PositionRequestId { get; set; }
        public int? AmbassadorId { get; set; }
        public int? RequestTypeId { get; set; }
        public DateTime? Date { get; set; }

        public virtual Ambassador Ambassador { get; set; }
        public virtual RequestType RequestType { get; set; }
    }
}
