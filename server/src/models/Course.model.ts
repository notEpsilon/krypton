import Professor from "./Professor.model";
import Student from "./Student.model";

export interface CourseInfo {
    code: string;
    departmentsAvailable: Array<string>;
    professorArray?: Array<Professor>;
    studentArray?: Array<studentData>;
};

export default class Course {
    private courseInfo: CourseInfo;
    public static readonly type: 0 = 0;

    constructor(course: CourseInfo) {
        this.courseInfo = course;

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
        let temp = new studentData(student);
        this.courseInfo.studentArray?.push(temp);
    }

    public addProfessor(professor:Professor):void{
        this.courseInfo.professorArray?.push(professor);
    }
}

interface StudentData{
    studentAttendance: Number,
    studentGrade: Number,
    student:Student
}
class studentData{
    constructor(student:Student){
        //TODO: Make the student info only accessable by the professor so that the professor 
        //can change the data with functions in his model
        //TODO: Redesign this mess after a good sleep
    }
}