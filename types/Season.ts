import { IEpisode } from "./Episode";

export interface Season {
    _id:           string;
    air_date:      Date;
    episodes:      IEpisode[];
    name:          string;
    overview:      string;
    id:            number;
    poster_path:   string;
    season_number: number;
}