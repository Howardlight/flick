import MediaType from "./MediaType";
import { Movie } from "./Movie";
import { Person } from "./Person";
import { TVShow } from "./TVShow";

export interface MultiSearchResponse {
    page:          number;
    results:       Result[];
    total_pages:   number;
    total_results: number;
}

export interface ResultElements {
    media_type: MultiSearchMediaType;
}

enum MultiSearchMediaType {
    movie = "movie",
    person = "person",
    tv = "tv"
}

export type Result = Movie & ResultElements | Person & ResultElements | TVShow & ResultElements;

export function isMovieResult(result: Result): result is Movie & ResultElements {
    return (result as Movie & ResultElements).media_type === MultiSearchMediaType.movie;
}

export function isTVShowResult(result: Result): result is TVShow & ResultElements {
    return (result as TVShow & ResultElements).media_type === MultiSearchMediaType.tv;
}

//NOTE: Specifies type is TVShow??
export function isPersonResult(result: Result): result is TVShow & ResultElements {
    return (result as Person & ResultElements).media_type === MultiSearchMediaType.person;
}

export enum OriginalLanguage {
    Da = "da",
    En = "en",
    Sv = "sv",
}