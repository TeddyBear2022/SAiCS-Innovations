using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class QuestionBank
    {
        public QuestionBank()
        {
            Options = new HashSet<Option>();
            Quizzes = new HashSet<Quiz>();
        }

        public int QuestionBankId { get; set; }
        public string Questions { get; set; }
        public string Answers { get; set; }

        public virtual ICollection<Option> Options { get; set; }
        public virtual ICollection<Quiz> Quizzes { get; set; }
    }
}
