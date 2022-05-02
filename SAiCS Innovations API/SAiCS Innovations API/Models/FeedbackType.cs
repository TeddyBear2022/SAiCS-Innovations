﻿using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class FeedbackType
    {
        public FeedbackType()
        {
            Feedbacks = new HashSet<Feedback>();
        }

        public int FeedbackTypeId { get; set; }
        public string FeedbackTypeName { get; set; }

        public virtual ICollection<Feedback> Feedbacks { get; set; }
    }
}
