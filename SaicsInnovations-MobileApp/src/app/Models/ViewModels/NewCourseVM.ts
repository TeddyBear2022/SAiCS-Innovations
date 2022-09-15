import { SectionContent } from "../SectionContent";
import { Course } from "../Course";
import { Option } from "../Option";
import { QuestionBank } from "../QuestionBank";
import { Quiz } from "../Quiz";
import { Section } from "../Section";

export class NewCourseVM{
        Course:Course
        SectionContent:SectionContent[]
        Quiz:Quiz
        QuestionBank:QuestionBank[]
}