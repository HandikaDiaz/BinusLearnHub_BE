export interface loginDto {
    email: string;
    password: string;
}

export interface registerDto {
    email: string;
    password: string;
    name: string;
    grade: string;
    school: string;
    level?: number;
    experience?: number;
    nextLevelExp?: number;
}
