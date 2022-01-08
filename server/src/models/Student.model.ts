import User from '../models/User.model';
import Course from './Course.model';

export interface StudentInfo extends User {
    email: string;
    faculty: string;
    department: string;
    gpa: number;
    courseArray?: Array<Course>;    
    type?: 0;
};

export default class Student {
    private studentInfo: StudentInfo;
    public static readonly type: 0 = 0;

    constructor(student: StudentInfo) {
        this.studentInfo = student;

        if (this.studentInfo.isVerified === undefined) {
            this.studentInfo.isVerified = false;
        }

        if (this.studentInfo.type === undefined) {
            this.studentInfo.type = 0;
        }

        if(this.studentInfo.courseArray === undefined){
            this.studentInfo.courseArray = [];
        }
    }

    public info(): StudentInfo {
        return this.studentInfo;
    }

    public addCourse(course:Course):Student{
        this.studentInfo.courseArray?.push(course);
        // course.addStudent(this);
        return this;
    }

    public removeCourses():Student{
        this.studentInfo.courseArray = [];
        return this;
    }

    public getCourses():Array<Course>|undefined{
        return this.studentInfo.courseArray;
    }
}
