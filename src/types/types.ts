export type User = {
    id: number;
    userName: string;
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
    name: string;
    lastNameFather: string;
    lastNameMother: string;
    userName: string;
    email: string;
}

export type UserEdit = {
    id: number;
    name: string;
    lastNameFather: string;
    lastNameMother: string;
    userName: string;
    email: string;
    isDialogOpen?: boolean;
}

export type UserResponse = {
    message: string;
    user: User;
}