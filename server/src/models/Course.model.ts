import Professor from "./Professor.model";
import Student from "./Student.model";

export interface CourseInfo {
    code: string;
    name: string;
    departmentsAvailableIn: Array<string>;
    courseTotalSessions:Number;
    availableSeat:Number;
    professorArray?: Array<Professor>;
    studentArray?: Array<studentCourseData>;
};

export default class Course {
    private courseInfo: CourseInfo;

    constructor(course: CourseInfo) {
        this.courseInfo = course;  
        this.courseInfo.courseTotalSessions = 0;

        if(this.courseInfo.studentArray === undefined){
            this.courseInfo.studentArray = [];
        }

        if(this.courseInfo.professorArray === undefined){
            this.courseInfo.professorArray = [];
        }

    }

    public info(): CourseInfo {
        return this.courseInfo;
    }

    public addStudent(student:Student):void{
        let temp = new studentCourseData(student);
        this.courseInfo.studentArray?.push(temp);
    }

    public addProfessor(professor:Professor):void{
        this.courseInfo.professorArray?.push(professor);
    }
}

interface StudentData{
    studentAttendance: number,
    studentGrade: number,
    student:Student
}

class studentCourseData{
    private studentData: StudentData;
    constructor(student:Student){
        this.studentData = {
            studentAttendance: 0,
            studentGrade: 0,
            student: student
        }
        //TODO: Make the student info only accessable by the professor so that the professor 
        //can change the data with functions in his model
        //TODO: Redesign this mess after a good sleep
    }
    
    public addStudentAttendance():void{
        this.studentData.studentAttendance += 1;
    }
    
    public setStudentGrade(grade:number):void{
        this.studentData.studentGrade = grade;
    }
}