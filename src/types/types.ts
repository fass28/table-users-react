export type User = {
    id: number;
    user: string;
    email: string;
    name: string;
    lastName_father: string;
    lastName_mother: string;
    password: string;
    user_type: string;
    created_at: string;
    updated_at: string;
}

export type Users = User[]