export default interface User {
    name: string;
    email: string;
    password?: string;
    isVerified?: boolean;
};
