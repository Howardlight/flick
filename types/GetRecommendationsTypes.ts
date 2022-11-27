import { Movie } from "./Movie";
import { TVShow } from "./TVShow";

export interface MovieRecResponse {
    page: number,
    results: Array<Movie>,
    total_pages: number,
    total_results: number,
}

export interface TVRecResponse {
    page: number,
    results: Array<TVShow>,
    total_pages: number,
    total_results: number,
}