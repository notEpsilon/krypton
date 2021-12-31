import User from '../models/User.model';

export interface ProfessorInfo extends User {
    profID: number;
    salary: number;
    faculty: string;
    department: string;
    courses: Array<string>;
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
    }

    public info(): ProfessorInfo {
        return this.professorInfo;
    }
}
