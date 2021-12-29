export type StudentInfo = {
    userID: string
    password: string
    isVerified: boolean
    type?: 0
};

export default class Student {
    public userID: string = "";
    public password: string = "";
    public isVerified: boolean = false;
    public static readonly type: 0 = 0;

    constructor(student: StudentInfo) {
        this.userID = student.userID;
        this.password = student.password;
        this.isVerified = student.isVerified;
    }

    public info(): StudentInfo {
        return {
            userID: this.userID,
            password: this.password,
            isVerified: this.isVerified,
            type: Student.type
        };
    }
}
