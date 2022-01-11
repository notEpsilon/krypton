import User from '../models/User.model';
import Course from './Course.model';

export interface ProfessorInfo extends User {
    email: string;
    salary: number;
    faculty: string;
    department: string;
    courseArray?: Array<Course>;
    type?: 1;
};

export default class Professor {
    private professorInfo: ProfessorInfo;
    public static readonly type: 1 = 1;

    constructor(professor: ProfessorInfo) {
        this.professorInfo = professor;

        if (this.professorInfo.type === undefined) {
            this.professorInfo.type = 1;
        }

        if(this.professorInfo.courseArray === undefined){
            this.professorInfo.courseArray = [];
        }
    }

    public info(): ProfessorInfo {
        return this.professorInfo;
    }

    public stringifyArrays(): Professor{
        this.professorInfo.courseArray = JSON.parse(JSON.stringify(this.professorInfo.courseArray));
        return this;
    }

    public addCourse(course:Course):Professor{
        this.professorInfo.courseArray?.push(course);
        return this;
    }

    public removeCourses():Professor{
        this.professorInfo.courseArray = [];
        return this;
    }

    public getCourses():Array<Course>|undefined{
        return this.professorInfo.courseArray;
    }
}
