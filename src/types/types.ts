export type User = {
    id: number;
    user: string;
    email: string;
    name: string;
    lastNameFather: string;
    lastNameMother: string;
    password: string;
    user_type: string;
    created_at: string;
    updated_at: string;
}

export type Users = User[]

export type UserUpdate = {
    id: number;
    name: string;
    lastNameFather: string;
    lastNameMother: string;
    user: string;
    email: string;
}