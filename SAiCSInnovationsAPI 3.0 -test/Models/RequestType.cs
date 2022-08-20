using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class RequestType
    {
        public RequestType()
        {
            PositionRequests = new HashSet<PositionRequest>();
        }

        public int RequestTypeId { get; set; }
        public string RequestTypeName { get; set; }

        public virtual ICollection<PositionRequest> PositionRequests { get; set; }
    }
}
