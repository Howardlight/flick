import { Movie } from "./Movie";

export interface MovieRecResponse {
    page: number,
    results: Array<Movie>,
    total_pages: number,
    total_results: number,
}