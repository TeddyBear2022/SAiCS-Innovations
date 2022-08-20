using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Quiz
    {
        public int QuizId { get; set; }
        public int? QuestionBankId { get; set; }
        public string QuizName { get; set; }
        public string QuizDescription { get; set; }
        public int? SectionId { get; set; }

        public virtual QuestionBank QuestionBank { get; set; }
        public virtual Section Section { get; set; }
    }
}
