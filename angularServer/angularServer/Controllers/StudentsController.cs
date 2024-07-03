using angularServer.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace angularServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class StudentsController : ControllerBase
    {
        public static List<Student> STUDENTS = new List<Student>
        {
            new Student{
              id= 1, firstName="elisheva", lastName= "katzinelbogen", address= "Sorotzkin 4"
            , phone= "0504153454", active= true, year=Year.FirstYear, avgMark=98, gender= Gender.Female, courseId= 1,absence=new Absence[]{ new Absence{ missingFromDate = new DateTime(2024, 05, 05), missingDays = 2 } }
            },
            new Student{
              id= 2, firstName="michal", lastName= "mazoz", address= "BarIlan 20"
            , phone= "0504107969", active= true, year=Year.SecondYear, avgMark=99, gender= Gender.Female, courseId= 1,absence=new Absence[]{ new Absence{ missingFromDate = new DateTime(2024, 06, 01), missingDays = 1 } }
            },
            new Student{
              id= 3, firstName="avi", lastName= "choen", address= "Nuchom 8"
            , phone= "0527131307", active= false, year=Year.ThirdYear, avgMark=70.5, gender= Gender.Male, courseId= 2,absence=new Absence[]{ },date=new DateTime(2024, 06, 01)
            }
        };
        // GET: api/<StudentsController>
        [HttpGet]
        public IEnumerable<Student> Get()
        {
            return STUDENTS;
        }

        // GET api/<StudentsController>/5
        [HttpGet("{id}")]
        public Student Get(int id)
        {
            return STUDENTS.Find(x => x.id == id);
        }

        [HttpGet("filterByActive/{active}")]
        public IEnumerable<Student> Get(bool active)
        {
            if (active)
                return STUDENTS.Where(x => x.active);
            else
                return STUDENTS;
        }

        [HttpGet("filterByName/{name}")]
        public IEnumerable<Student> Get(string name="")
        {
           return STUDENTS.Where(x => x.firstName.StartsWith(name));
        }

        // POST api/<StudentsController>
        [HttpPost]
        public void Post([FromBody] Student studentsToAdd)
        {
            STUDENTS.Add(studentsToAdd);
        }

        // PUT api/<StudentsController>/5
        [HttpPut("{id}")]
        public bool Put(int id, [FromBody] Student studentToUpdate)
        {
            int index=STUDENTS.FindIndex(x => x.id == id);
            if (index != -1)
            {
                STUDENTS[index] = studentToUpdate;
                return true;
            }
            return false;
        }

        // DELETE api/<StudentsController>/5
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            Student s=STUDENTS.Find(x => x.id == id);
            if (s != null)
            {
                STUDENTS.Remove(s);
                return true;
            }
            return false;
        }
    }
}
