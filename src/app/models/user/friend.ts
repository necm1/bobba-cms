import { User } from './user';

export interface Friend {
    friend: User;
    releation: number;
    friends_since: number;
}
