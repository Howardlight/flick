import { Avatar } from '../pages/api/auth/user';


export type User = {
    isLoggedIn: boolean;
    avatar?: Avatar;
    id?: number;
    iso_639_1?: string;
    iso_3166_1?: string;
    name?: string;
    include_adult?: boolean;
    username?: string;
    login?: string;
    avatarUrl?: string;
};
