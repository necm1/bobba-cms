import { User } from '../User/user';

export interface Comment {
    id: number;
    content: string;
    created_at: string;
    updated_at: string;
    user: User;
}
