using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Option
    {
        public int OptionId { get; set; }
        public string AnswerOption { get; set; }
        public int? QuestionBankId { get; set; }

        public virtual QuestionBank QuestionBank { get; set; }
    }
}
