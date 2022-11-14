import { Episode } from "./Episode";

export interface Season {
    _id:           string;
    air_date:      Date;
    episodes:      Episode[];
    name:          string;
    overview:      string;
    id:            number;
    poster_path:   string;
    season_number: number;
}