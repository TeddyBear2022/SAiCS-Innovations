using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SAiCSInnovationsAPI_3._0.Models;
using SAiCSInnovationsAPI_3._0.Repository;
using SAiCSInnovationsAPI_3._0.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAiCSInnovationsAPI_3._0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainingController : ControllerBase
    {
        private readonly ISAiCSInnovationsRep _rep;
        private readonly SaicsInnovationsDBContext _db;
        private readonly UserManager<User> _manager;
        private readonly IUserClaimsPrincipalFactory<User> _claims;
        private readonly IConfiguration _configuration;
        public TrainingController(UserManager<User> manager,
            IUserClaimsPrincipalFactory<User> claims,
            IConfiguration configuration,
            ISAiCSInnovationsRep rep,
             SaicsInnovationsDBContext db)
        {
            _manager = manager;
            _claims = claims;
            _configuration = configuration;
            _rep = rep;
            _db = db;
            
        }

        //Courses
        [HttpPost("CreateCourse")]
        public ActionResult CreateCourse(NewCourseVM course)
        {
            try
            {
                //Create course
                Course newCourse =new Course();
                newCourse.CourseName = course.Course.CourseName;
                newCourse.Description = course.Course.Description;
                _rep.Add(newCourse);
                _rep.SaveChanges();

                //Create sections and content associated with the course
                for (var section=0; section<= course.SectionContent.Count()-1; section++)
                {
                    SectionContent newSectionContent = new SectionContent();
                    newSectionContent.SectionName = course.SectionContent[section].SectionName;
                    newSectionContent.CourseId =newCourse.CourseId;
                    newSectionContent.ContentHeading = course.SectionContent[section].ContentHeading;
                    newSectionContent.ContentLink = course.SectionContent[section].ContentLink;
                    newSectionContent.YoutubeHeading = course.SectionContent[section].YoutubeHeading;
                    newSectionContent.YoutubeLink = course.SectionContent[section].YoutubeLink;
                    _rep.Add(newSectionContent);
                }
                Quiz newQuiz = new Quiz();
                newQuiz.CourseId = newCourse.CourseId;
                newQuiz.QuizName = newCourse.CourseName;
                _rep.Add(newQuiz);
                _rep.SaveChanges();

                for (var quizQuestions=0; quizQuestions <= course.QuestionBank.Count()-1; quizQuestions++)
                {
                    QuestionBank newQuestionBank = new QuestionBank();
                    newQuestionBank.QuizId = newQuiz.QuizId;
                    newQuestionBank.Questions = course.QuestionBank[quizQuestions].Questions;
                    newQuestionBank.Answers = course.QuestionBank[quizQuestions].Answers;
                    newQuestionBank.Option1 = course.QuestionBank[quizQuestions].Option1;
                    newQuestionBank.Option2 = course.QuestionBank[quizQuestions].Option2;
                    newQuestionBank.Option3 = course.QuestionBank[quizQuestions].Option3;
                    _rep.Add(newQuestionBank);
                }
                _rep.SaveChanges();
                return Ok(true);
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
         
        }
        [HttpPatch("UpdateCourse")]
        public ActionResult UpdateCourse(NewCourseVM course)
        {
            try
            {
                //Update course
                Course newCourse = _db.Courses.Where(id=> id.CourseId==course.Course.CourseId).FirstOrDefault();
                newCourse.CourseName = course.Course.CourseName;
                newCourse.Description = course.Course.Description;
                //_rep.Add(newCourse);
                _rep.SaveChanges();

                //Update sections and content associated with the course
                for (var section = 0; section <= course.SectionContent.Count() - 1; section++)
                {
                    SectionContent UpdateSectionContent = _db.SectionContents.Where(sectionid=>sectionid.SectionContentId == course.SectionContent[section].SectionContentId).FirstOrDefault();
                    UpdateSectionContent.SectionName = course.SectionContent[section].SectionName;
                    UpdateSectionContent.CourseId = newCourse.CourseId;
                    UpdateSectionContent.ContentHeading = course.SectionContent[section].ContentHeading;
                    UpdateSectionContent.ContentLink = course.SectionContent[section].ContentLink;
                    UpdateSectionContent.YoutubeHeading = course.SectionContent[section].YoutubeHeading;
                    UpdateSectionContent.YoutubeLink = course.SectionContent[section].YoutubeLink;
                    //_rep.Add(newSectionContent);
                }
                Quiz newQuiz = _db.Quizzes.Where(quizid=> quizid.QuizId == course.Quiz.QuizId).FirstOrDefault();
                //newQuiz.CourseId = newCourse.CourseId;
                newQuiz.QuizName = course.Quiz.QuizName;
                //_rep.Add(newQuiz);
                _rep.SaveChanges();

                for (var quizQuestions = 0; quizQuestions <= course.QuestionBank.Count() - 1; quizQuestions++)
                {
                    QuestionBank newQuestionBank = _db.QuestionBanks.Where(questionbankId => questionbankId.QuestionBankId == course.QuestionBank[quizQuestions].QuestionBankId).FirstOrDefault();
                    //newQuestionBank.QuizId = newQuiz.QuizId;
                    newQuestionBank.Questions = course.QuestionBank[quizQuestions].Questions;
                    newQuestionBank.Answers = course.QuestionBank[quizQuestions].Answers;
                    newQuestionBank.Option1 = course.QuestionBank[quizQuestions].Option1;
                    newQuestionBank.Option2 = course.QuestionBank[quizQuestions].Option2;
                    newQuestionBank.Option3 = course.QuestionBank[quizQuestions].Option3;
                    //_rep.Add(newQuestionBank);
                }
                _rep.SaveChanges();
                return Ok(true);
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }
        [HttpGet("GetAllCourses")]
        public ActionResult GetAllCourses()
        {
            try {
                var courses = _db.Courses.Include(section => section.SectionContents);
            return Ok(courses);
            }
            catch(Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }
        [HttpGet("GetSpecificCourse")]
        public ActionResult GetSpecificCourse(int id)
        {
            try
            {
                NewCourseVM specificCourseDetails = new NewCourseVM();
                //Create course
                Course courseDetails = _db.Courses.Where(coureId =>coureId.CourseId==id).FirstOrDefault();
                //List<SectionContent> sectionContentDetails = new List<SectionContent>();
                List<SectionContent> sectionContentDetails= _db.SectionContents.Where(courseId => courseId.CourseId == courseDetails.CourseId).ToList();
                //Create sections and content associated with the course
                //for (var section = 0; section <=  - 1; section++)
                //{
                //    SectionContent newSectionContent = new SectionContent();
                //    newSectionContent.SectionName = course.SectionContent[section].SectionName;
                //    newSectionContent.CourseId = newCourse.CourseId;
                //    newSectionContent.ContentHeading = course.SectionContent[section].ContentHeading;
                //    newSectionContent.ContentLink = course.SectionContent[section].ContentLink;
                //    newSectionContent.YoutubeHeading = course.SectionContent[section].YoutubeHeading;
                //    newSectionContent.YoutubeLink = course.SectionContent[section].YoutubeLink;
                //    _rep.Add(newSectionContent);
                //}
                Quiz quizDetails = _db.Quizzes.Where(quiz=>quiz.CourseId == courseDetails.CourseId).FirstOrDefault();
                //newQuiz.CourseId = newCourse.CourseId;
                //newQuiz.QuizName = newCourse.CourseName;
                //_rep.Add(newQuiz);
                //_rep.SaveChanges();
                List<QuestionBank> quiestionBankDetails = _db.QuestionBanks.Where(bank => bank.QuizId == quizDetails.QuizId).ToList();

                //for (var quizQuestions = 0; quizQuestions <= course.QuestionBank.Count() - 1; quizQuestions++)
                //{
                //    QuestionBank newQuestionBank = new QuestionBank();
                //    newQuestionBank.QuizId = newQuiz.QuizId;
                //    newQuestionBank.Questions = course.QuestionBank[quizQuestions].Questions;
                //    newQuestionBank.Answers = course.QuestionBank[quizQuestions].Answers;
                //    newQuestionBank.Option1 = course.QuestionBank[quizQuestions].Option1;
                //    newQuestionBank.Option2 = course.QuestionBank[quizQuestions].Option2;
                //    newQuestionBank.Option3 = course.QuestionBank[quizQuestions].Option3;
                //    _rep.Add(newQuestionBank);
                //}
                //_rep.SaveChanges();

                specificCourseDetails.Course = courseDetails;
                specificCourseDetails.Quiz = quizDetails;
                specificCourseDetails.QuestionBank = quiestionBankDetails;
                specificCourseDetails.SectionContent = sectionContentDetails;
                return Ok(specificCourseDetails);

                //var courses = _db.Courses.Where(courseid=>courseid.CourseId == id).Include(section => section.SectionContents);
                //return Ok(courses);
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }
        [HttpPatch("UpdateSectionContent")]
        public ActionResult UpdateSectionContent(SectionContent sectionContent)
        {
            try
            {
                var section = _db.SectionContents.Where(sectionId => sectionId.SectionContentId == sectionContent.SectionContentId).FirstOrDefault();
                section.SectionName = sectionContent.SectionName;
                //section.CourseId = sectionContent.CourseId;
                section.ContentHeading = sectionContent.ContentHeading;
                section.ContentLink = sectionContent.ContentLink;
                section.YoutubeHeading = sectionContent.YoutubeHeading;
                section.YoutubeLink = sectionContent.YoutubeLink;
                _db.SaveChanges();
                return Ok(true);
        }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }
        [HttpPatch("UpdateQuizQuestions")]
        public ActionResult UpdateQuizQuestions(QuestionBank quizQuestion)
        {
            try
            {
                var updateQuizQuestion = _db.QuestionBanks.Where(id => id.QuestionBankId == quizQuestion.QuestionBankId).FirstOrDefault();
                updateQuizQuestion.Questions = quizQuestion.Questions;
                updateQuizQuestion.Answers = quizQuestion.Answers;
                updateQuizQuestion.Option1 = quizQuestion.Option1;
                updateQuizQuestion.Option2 = quizQuestion.Option2;
                updateQuizQuestion.Option3 = quizQuestion.Option3;

                _rep.SaveChanges();
                return Ok(true);
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }
        [HttpPatch("UpdateQuiz")]
        public ActionResult UpdateQuiz(Quiz quiz)
        {
            try
            {
                var updateQuiz = _db.Quizzes.Where(id => id.QuizId == quiz.QuizId).FirstOrDefault();
                updateQuiz.QuizName = quiz.QuizName;

                _rep.SaveChanges();
                return Ok(true);
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }
        [HttpPatch("UpdateCourseTest")]
        public ActionResult UpdateCourseTest(Course course)
        {
            try
            {
                var updateCourse = _db.Courses.Where(id => id.CourseId == course.CourseId).FirstOrDefault();
                updateCourse.CourseName = course.CourseName;
                updateCourse.Description = course.Description;

                _rep.SaveChanges();
                return Ok(true);
            }
            catch(Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }

        [HttpPost("CreateQuizQuestion")]
        public ActionResult CreateQuizQuestion(QuestionBank quizQuestion)
        {
            try
            {
                QuestionBank createQuizQuestion = new QuestionBank();
                createQuizQuestion.QuizId = quizQuestion.QuizId;
                createQuizQuestion.Questions = quizQuestion.Questions;
                createQuizQuestion.Answers = quizQuestion.Answers;
                createQuizQuestion.Option1 = quizQuestion.Option1;
                createQuizQuestion.Option2 = quizQuestion.Option2;
                createQuizQuestion.Option3 = quizQuestion.Option3;

                _rep.Add(createQuizQuestion);
                _rep.SaveChanges();
                return Ok(true);
            }
            catch(Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }

        [HttpGet("GetCourseQuestionBank")]
        public ActionResult GetCourseQuestionBank(int quizId)
        {
            //var questionBankList = _db.QuestionBanks.Where()
            try
            {
                List<QuestionBank> questionBankList = _db.QuestionBanks.Where(question => question.QuizId == quizId).ToList();
                return Ok(questionBankList);

            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }

        [HttpGet("GetCourseQuiz")]
        public ActionResult GetCourseQuiz(int courseId)
        {
            //var questionBankList = _db.QuestionBanks.Where()
            try
            {
                Quiz quizDetails = _db.Quizzes.Where(quiz => quiz.CourseId == courseId).FirstOrDefault();
                return Ok(quizDetails);

            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }

        [HttpGet("GetCourseSectionContent")]
        public ActionResult GetCourseSectionContent(int courseId)
        {
            //var questionBankList = _db.QuestionBanks.Where()
            try
            {
                List<SectionContent> courseSectionContent = _db.SectionContents.Where(Id => Id.CourseId == courseId).ToList();
                return Ok(courseSectionContent);

            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }
        [HttpDelete("DeleteSectionContent")]
        public ActionResult DeleteSectionContent(int sectionContentId)
        {
            try
            {
                var deleteSection = _db.SectionContents.Where(section => section.SectionContentId == sectionContentId).FirstOrDefault();
                _rep.Delete(deleteSection);
                _rep.SaveChanges();
                return Ok(true);
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }

        [HttpDelete("DeleteQuiz")]
        public ActionResult DeleteQuiz(int quizId)
        {
            try
            {
                var deleteQuiz = _db.Quizzes.Where(quiz => quiz.QuizId == quizId).FirstOrDefault();
                _rep.Delete(deleteQuiz);
                _rep.SaveChanges();
                return Ok(true);
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }

        [HttpDelete("DeleteCourseQuestion")]
        public ActionResult DeleteCourseQuestion(int questionBankId)
        {
            try
            {
                var deleteCourseQuestion = _db.QuestionBanks.Where(bank => bank.QuestionBankId == questionBankId).FirstOrDefault();
                _rep.Delete(deleteCourseQuestion);
                _rep.SaveChanges();
                return Ok(true);
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }

        [HttpDelete("DeleteCourse")]
        public ActionResult DeleteCourse(int courseId)
        {
            try
            {
                var deleteCourse = _db.Courses.Where(course => course.CourseId == courseId).FirstOrDefault();
                var deleteSectionContents = _db.SectionContents.Where(section => section.CourseId == deleteCourse.CourseId).ToList();
                var deleteQuiz = _db.Quizzes.Where(quiz => quiz.CourseId == deleteCourse.CourseId).FirstOrDefault();
                var deleteQuestions = _db.QuestionBanks.Where(bank => bank.QuizId == deleteQuiz.QuizId).ToList();
                for (var x = 0; x <= deleteSectionContents.Count() - 1; x++)
                {
                    _rep.Delete(deleteSectionContents[x]);
                }

                for (var q= 0; q<= deleteQuestions.Count()-1; q++)
                {
                    _rep.Delete(deleteQuestions[q]);
                }
                _rep.Delete(deleteQuiz);
                _rep.Delete(deleteCourse);
                _rep.SaveChanges();
                return Ok(true);
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }

        [HttpPost("CreateSectionContent")]
        public ActionResult CreateSectionContent(SectionContent sectionContent)
        {
            try
            {
                SectionContent createSectionContent = new SectionContent();
                createSectionContent.SectionName = sectionContent.SectionName;
                createSectionContent.CourseId = sectionContent.CourseId;
                createSectionContent.ContentHeading = sectionContent.ContentHeading;
                createSectionContent.ContentLink = sectionContent.ContentLink;
                createSectionContent.YoutubeHeading = sectionContent.YoutubeHeading;
                createSectionContent.YoutubeLink = sectionContent.YoutubeLink;

                _rep.Add(createSectionContent);
                _rep.SaveChanges();
                return Ok(true);
            }
            catch(Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }
        //[HttpPost("CreateQuiz")]
        //public ActionResult CreateQuiz(Quiz quiz)
        //{

        //}
        //[HttpDelete("DeleteCourse")]
        //public ActionResult DeleteCourse()
        //{

        //}

        ////Quizs
        //[HttpPost("CreateQuiz")]
        //public ActionResult CreateQuiz()
        //{

        //}
        //[HttpPatch("UpdateQuiz")]
        //public ActionResult UpdateQuiz()
        //{

        //}
        //[HttpGet("GetAllQuiz")]
        //public ActionResult GetAllQuizs()
        //{

        //}
        //[HttpGet("GetSpecificQuiz")]
        //public ActionResult GetSpecificQuiz()
        //{

        //}
        //[HttpDelete("DeleteQuiz")]
        //public ActionResult DeleteQuiz()
        //{

        //}

       
    }
}
