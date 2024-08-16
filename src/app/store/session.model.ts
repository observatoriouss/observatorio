export interface PayloadLogin {
    email:    string;
    password: string;
}
export interface PayloadRegister {
    user: {
        name: string;
        email: string;
        password: string;
        role: 'user'
    },
    verificationCode: string
}
export interface Session {
    user:  User;
    token: string;
}

export interface User {
    name:         string;
    email:        string;
    role:         string;
    image:        string;
    isActive:     boolean;
    createdAt:    string;
    id:           string;
    slug:         string;
}
