import { User } from '../User/user';
import { Vote } from './vote';
import { Comment as ArticleComment } from './comment';

export interface Article {
    id: number;
    user: User;
    title: string;
    description: string;
    image: string;
    content: string;
    created_at: string;
    updated_at: string;
    votes: Vote[];
    comments: ArticleComment[]
}
