import User from '../models/User.model';
import Course from './Course.model';

export interface StudentInfo extends User {
    faculty: string;
    department: string;
    gpa: number;
    courses: Array<Course>;
    tuitionPaid: boolean;
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

        if (this.studentInfo.tuitionPaid === undefined) {
            this.studentInfo.tuitionPaid = false;
        }
    }

    public info(): StudentInfo {
        return this.studentInfo;
    }
}
