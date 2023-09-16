import { Fragment, ReactElement } from "react";
import { TVShow } from "../../types/TVShow";
import { DesktopView } from "../Movie-TV/Views/DesktopView";
import { MobileView } from "../Movie-TV/Views/MobileView";


export default function HeroBox({ data }: { data: TVShow }): ReactElement {
    return (
        <Fragment>
            <DesktopView>
                <DesktopView.Poster name={data.name} url={data.poster_path} />
                <DesktopView.Wrapper>
                    <div>
                        <DesktopView.Wrapper.Description name={data.name} tagline={data.tagline} className="mb-5" />
                        <div>
                            <DesktopView.Wrapper.AirDates firstAirDate={data.first_air_date} lastAirDate={data.last_air_date} />
                            <DesktopView.Wrapper.EpNumber epNum={data.number_of_episodes} />
                        </div>
                    </div>
                    <div>
                        <DesktopView.Wrapper.Genres genres={data.genres} />
                        <DesktopView.Wrapper.Rating firstAirDate={data.first_air_date} voteAverage={data.vote_average} voteCount={data.vote_count} />
                    </div>
                </DesktopView.Wrapper>
            </DesktopView>
            <MobileView>
                <MobileView.Poster url={data.poster_path} name={data.name} />
                <MobileView.Wrapper>
                    <MobileView.Wrapper.Description name={data.name} tagline={data.tagline} />
                    <MobileView.Wrapper.Genres genres={data.genres} />
                </MobileView.Wrapper>
            </MobileView>
        </Fragment>
    );
}