namespace angularServer.Models
{
    public class Student
    {
        public int id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string address { get; set; }
        public string phone { get; set; }
        public bool active { get; set; }
        public Year year { get; set; }
        public double avgMark { get; set; }
        public Gender gender { get; set; }
        public int courseId { get; set; }
        public Absence[] absence { get; set; }
        public DateTime? date { get; set; }

    }
    public enum Course
    {
        SoftwareEngineer,
        Architecture,
        Accounting

    }
    public enum Gender
    {
        Male,
        Female
    }

    public enum Year
    {
        FirstYear,
        SecondYear,
        ThirdYear
    }

}
