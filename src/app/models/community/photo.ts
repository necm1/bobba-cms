import { User } from '../user/user';
import { Room } from '../user/room';

export interface Photo {
    id: number;
    timestamp: number;
    url: string;
    user: User;
    room: Room;
}
