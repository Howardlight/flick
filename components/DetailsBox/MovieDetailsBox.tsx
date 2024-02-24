"use client";
import { Fragment, ReactElement } from "react";
import { Movie } from "../../types/Movie";
import { DetailsBox } from "../DetailsBox";
import { Desktop, Mobile } from "../MediaQueries";
import MainPageMetrics from "../Movie-TV/MainPageMetrics";
import { isInPast } from "../../utils/utils";

export default function MovieDetailsBox({ data }: { data: Movie }): ReactElement {
    console.log(data);
    return (
        <Fragment>
            <Mobile>
                <DetailsBox>
                    <DetailsBox.FirstAiredDate firstAirDate={data.release_date} />
                    <DetailsBox.Runtime runtime={data.runtime} />
                    <DetailsBox.Budget budget={data.budget} />
                    <DetailsBox.Revenue revenue={data.revenue} />
                </DetailsBox>
                {isInPast(data.release_date) ? <MainPageMetrics vote_average={data.vote_average} vote_count={data.vote_count} className="mt-5" /> : <Fragment />}
                <br />
            </Mobile>
            <Desktop>
                <Fragment />
            </Desktop>
        </Fragment>
    );
}