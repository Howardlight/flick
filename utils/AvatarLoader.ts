import Placeholder from "../assets/MovieSVG.svg";

//TODO: Figure out width handling
/**
 * 
 * @param src - File name of the poster
 * @param width - The desired Width. Currently unused, WIP
 * @returns 
 */
export const AvatarLoader = ({ src, width }: { src: string, width: number }) => {
    if (!src || src == null || src == undefined) return Placeholder.src;
    if (src == Placeholder.src) return Placeholder.src;
    if (src.startsWith("https://www.") || src.startsWith("www.")) return src;
    return `https://image.tmdb.org/t/p/w500/${src}`;
}