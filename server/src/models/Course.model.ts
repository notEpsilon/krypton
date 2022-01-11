import Professor, { ProfessorInfo } from "./Professor.model";
import Student, { StudentInfo } from "./Student.model";

export interface CourseInfo {
    code: string;
    name: string;
    departmentsAvailableIn: Array<string>;
    courseTotalSessions:Number;
    availableSeat:Number;
    professorArray?: Array<professorCourseData>;
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

    public stringifyArrays(): Course{
        this.courseInfo.professorArray = JSON.parse(JSON.stringify(this.courseInfo.professorArray));
        this.courseInfo.studentArray = JSON.parse(JSON.stringify(this.courseInfo.studentArray));
        return this;
    }

    public info(): CourseInfo {
        return this.courseInfo;
    }

    public addStudent(student:Student):Course{
        let temp = new studentCourseData(student);
        this.courseInfo.studentArray?.push(temp);
        return this;
    }

    public addProfessor(professor:Professor,lectureHall:string,lectureTime:string,lectureDuration:string):Course{
        let temp = new professorCourseData(professor,lectureHall,lectureTime,lectureDuration);
        this.courseInfo.professorArray?.push(temp);
        return this;
    }

}

interface StudentData{
    studentAttendance: number,
    studentGrade: number,
    student:StudentInfo
}

class studentCourseData{
    private studentData: StudentData;
    constructor(student:Student){
        let temp:StudentInfo = {
            email: student.info().email,
            faculty: student.info().faculty,
            department: student.info().department,
            gpa: student.info().gpa,
            id: student.info().id
        }
        this.studentData = {
            studentAttendance: 0,
            studentGrade: 0,
            student: temp
        }
    }
    
    public addStudentAttendance():void{
        this.studentData.studentAttendance += 1;
    }
    
    public setStudentGrade(grade:number):void{
        this.studentData.studentGrade = grade;
    }
}

interface ProfessorData{
    lectureHall:string,
    lectureTime:string,
    lectureDuration:string,
    professor:ProfessorInfo
}

class professorCourseData{
    private professorData: ProfessorData;
    constructor(professor:Professor,lectureHall:string,lectureTime:string,lectureDuration:string){
        let temp:ProfessorInfo = {
            email: professor.info().email,
            faculty: professor.info().faculty,
            department: professor.info().department,
            salary: professor.info().salary,
            id: ""
        }
        this.professorData = {
            lectureHall: lectureHall,
            lectureDuration: lectureDuration,
            lectureTime: lectureTime,
            professor: temp
        }
    }
    
    public setData(lectureHall:string,lectureTime:string,lectureDuration:string):void{
        this.professorData.lectureHall = lectureHall;
        this.professorData.lectureTime = lectureTime;
        this.professorData.lectureDuration = lectureDuration;
    }
    
}