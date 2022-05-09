using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class QuestionBank
    {
        public QuestionBank()
        {
            Quizzes = new HashSet<Quiz>();
        }

        public int QuestionBankId { get; set; }
        public string Questions { get; set; }
        public string Answers { get; set; }

        public virtual ICollection<Quiz> Quizzes { get; set; }
    }
}
