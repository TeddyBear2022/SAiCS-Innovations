using SAiCSInnovationsAPI_3._0.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAiCSInnovationsAPI_3._0.ViewModels
{
    public class NewCourseVM
    {
        public Course Course { get; set; }
        public List<SectionContent> SectionContent { get; set; }
        public Quiz Quiz { get; set; }
        public List<QuestionBank> QuestionBank { get; set; }
    }
}
