using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class Quiz
    {
        public Quiz()
        {
            Courses = new HashSet<Course>();
        }

        public int QuizId { get; set; }
        public int? QuestionBankId { get; set; }
        public string QuizName { get; set; }
        public string QuizDescription { get; set; }

        public virtual QuestionBank QuestionBank { get; set; }
        public virtual ICollection<Course> Courses { get; set; }
    }
}
