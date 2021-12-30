import User from '../models/User.model';

export interface StudentInfo extends User {
    gpa: int;
    faculty: string;
    department: string;
    courses: Array<string>;
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
    }

    public info(): StudentInfo {
        return this.studentInfo;
    }
}
