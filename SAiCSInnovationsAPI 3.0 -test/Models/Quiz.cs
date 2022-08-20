using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Quiz
    {
        public Quiz()
        {
            QuestionBanks = new HashSet<QuestionBank>();
        }
        public int QuizId { get; set; }
        //public int? QuestionBankId { get; set; }
        public string QuizName { get; set; }
        public string QuizDescription { get; set; }
        public int? CourseId { get; set; }

        //public virtual QuestionBank QuestionBank { get; set; }
        public virtual ICollection<QuestionBank> QuestionBanks { get; set; }
        public virtual Course Course { get; set; }
    }
}
