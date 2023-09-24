"use client";
import { Fragment, ReactElement } from "react";
import { Mobile } from "../../Breakpoints";
import { TVShow } from "../../types/TVShow";
import { DetailsBox } from "../DetailsBox";
import { Default } from "../MediaQueries";
import { MainPageMetrics } from "../Movie-TV/MainPageMetrics";
import { isInPast } from "../../utils";

export function TVDetailsBox({ data }: { data: TVShow }) {
    return (
        <Fragment>
            <Mobile>
                <Fragment>
                    <DetailsBox>
                        <DetailsBox.FirstAiredDate firstAirDate={data.first_air_date} />
                        <DetailsBox.LastAiredDate lastAirDate={data.last_air_date} />
                        <DetailsBox.NumOfEpisodes numOfEp={data.number_of_episodes} />
                    </DetailsBox>
                    {isInPast(data.first_air_date) ? <MainPageMetrics vote_average={data.vote_average} vote_count={data.vote_count} className="mt-5" /> : <Fragment />}
                    <br />
                </Fragment>
            </Mobile>
            <Default>
                <Fragment />
            </Default>
        </Fragment>
    );
}