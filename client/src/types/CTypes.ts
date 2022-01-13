export interface NavLink {
    title: string;
    path: string;
};

export type TPendingStudent = {
    name: string;
    email: string;
    faculty: string;
    department: string;
    isVerified: boolean;
};

export interface VerifiedStudent extends TPendingStudent {
    tuitionPaid: boolean; // also hashed password, courses, absence
};

export interface Course {
    name: string;
    faculty: string;
    department: string[];
};
