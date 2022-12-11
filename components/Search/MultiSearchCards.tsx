import Image from "next/image";
import { PosterLoader } from "../../PosterLoader";
import Placeholder from "../../assets/MovieSVG.svg";
import moment from "moment";
import { TVShow } from "../../types/TVShow";
import { Movie } from "../../types/Movie";
import { Person } from "../../types/Person";
import { Cast } from "../../types/Cast";
import { MultiSearchCardBase } from "./MultiSearchCardBase";
import { Fragment } from "react";
import { Metrics } from "../Index/IndexWidgetBase";

export const MultiSearchTVShowCard = ({ result }: { result: TVShow }) => {
    return (
        <MultiSearchCardBase resultID={result.id} mediaType="tv">
            <Image
                src={result.poster_path ? result.poster_path : Placeholder.src}
                loader={PosterLoader}
                alt={`Poster of ${result.name}`}
                width={125}
                height={187}
                className="rounded-md w-[125px] h-[187px]"
                loading="lazy" />
            <div className="grow flex flex-col justify-between font-medium text-base ml-2 mt-2">

                <div>
                    <p>{result.name}</p>
                    <p className="text-neutral-400">TV Show</p>
                    <div className="text-neutral-400">
                        <p className="inline">First aired on </p>
                        <p className="inline">{moment(result.first_air_date).format("LL")}</p>
                    </div>
                </div>

                {result.vote_count != 0 ? <Metrics vote_average={result.vote_average} /> : <Fragment />}
            </div>
        </MultiSearchCardBase>
    );
};

export const MultiSearchMovieCard = ({ result }: { result: Movie }) => {
    // console.log(result);
    return (
        <MultiSearchCardBase resultID={result.id} mediaType={"movie"}>
            <Image
                src={result.poster_path ? result.poster_path : Placeholder.src}
                loader={PosterLoader}
                alt={`Poster of ${result.title}`}
                width={125}
                height={187}
                className="rounded-md w-[125px] h-[187px]"
                loading="lazy" />
            <div className="grow flex flex-col justify-between font-medium text-base ml-2 mt-2">

                <div>
                    <p>{result.title}</p>
                    <p className="text-neutral-400">Movie</p>
                    <div className="text-neutral-400">
                        {result.release_date ?
                            <div>
                                <p className="inline">Released on </p>
                                <p className="inline">{moment(result.release_date).format("LL")}</p>
                            </div>
                            : <p>Unknown Release Date</p>
                        }
                    </div>


                </div>

                {result.vote_count != 0 ? <Metrics vote_average={result.vote_average} /> : <Fragment />}
            </div>
        </MultiSearchCardBase>
    );
};

export const MultiSearchPersonCard = ({ result }: { result: Person | Cast }) => {

    function HandleKnownForDepartment({ department, gender }: { department: string, gender: number }) {

        if (department === "Acting") return <p>{gender == 1 ? "Actress" : "Actor"}</p>;
        if (department === "Production") return <p>Producer</p>;
        if (department === "Visual Effects") return <p>Visual Effects Designer</p>;
        if (department === "Sound") return <p>Sound Designer</p>;
        if (department === "Writing") return <p>Writer</p>;
        else return <p>Unknown Department</p>;
    }

    return (
        <MultiSearchCardBase resultID={result.id} mediaType={"person"}>
            <Image
                src={result.profile_path ? result.profile_path : Placeholder.src}
                loader={PosterLoader}
                alt={`Poster of ${result.name}`}
                width={125}
                height={187}
                className="rounded-md w-[125px] h-[187px]"
                loading="lazy" />
            <div className="grow flex flex-col justify-between font-medium text-base ml-2 mt-2">
                <div>
                    <p>{result.name}</p>
                    <div className="text-neutral-400">
                        <HandleKnownForDepartment department={result.known_for_department} gender={result.gender} />
                    </div>
                </div>
            </div>
        </MultiSearchCardBase>
    );
};