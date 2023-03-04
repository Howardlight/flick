"use client";
import { Fragment, ReactElement } from "react";
import { Movie } from "../../types/Movie";
import { Default, Desktop, Mobile } from "../MediaQueries";
import { DesktopView } from "../Movie-TV/Views/DesktopView";
import { MobileView } from "../Movie-TV/Views/MobileView";

export default function HeroBox({ data }: { data: Movie }): ReactElement {
    return (
        <Fragment>
            <Default>
                <DesktopView>
                    <DesktopView.Poster name={data.title} url={data.poster_path} />
                    <DesktopView.Wrapper>
                        <div>
                            <DesktopView.Wrapper.Description name={data.title} tagline={data.tagline} className="mb-5" />
                            <div>
                                {/* <DesktopView.Wrapper.AirDates firstAirDate={data.first_air_date} lastAirDate={data.last_air_date} /> */}
                                {/* <DesktopView.Wrapper.EpNumber epNum={data.number_of_episodes} /> */}
                            </div>
                        </div>
                        <div>
                            <DesktopView.Wrapper.Genres genres={data.genres} />
                            <DesktopView.Wrapper.Rating firstAirDate={data.release_date} voteAverage={data.vote_average} voteCount={data.vote_count} />
                        </div>
                    </DesktopView.Wrapper>
                </DesktopView>
            </Default>
            <Mobile>
                <MobileView>
                    <MobileView.Poster url={data.poster_path} name={data.title} />
                    <MobileView.Wrapper>
                        <MobileView.Wrapper.Description name={data.title} tagline={data.tagline} />
                        <MobileView.Wrapper.Genres genres={data.genres} />
                    </MobileView.Wrapper>
                </MobileView>
            </Mobile>
        </Fragment>
    );
}
