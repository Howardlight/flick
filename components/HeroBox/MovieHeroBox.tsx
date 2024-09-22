'use client';
import { Fragment, ReactElement } from "react";
import { Movie } from "../../types/Movie";
import { DesktopView } from "../Movie-TV/Views/DesktopView";
import { MobileView } from "../Movie-TV/Views/MobileView";

interface HeroBoxProps {
  shouldRender?: boolean;
  className?: string;
  data: Movie;
  shouldHidePoster?: boolean;
  shouldHideGenres?: boolean;
  shouldHideRating?: boolean;
}

export default function HeroBox(props: HeroBoxProps): ReactElement {
  if (props.shouldRender === false) return <Fragment />;
  return (
    <Fragment>
      <DesktopView className={props.className}>
        <DesktopView.Poster shouldRender={!props.shouldHidePoster} name={props.data.title} url={props.data.poster_path} />
        <DesktopView.Wrapper>
          <div>
            <DesktopView.Wrapper.Description
              name={props.data.title}
              tagline={props.data.tagline}
              className="mb-5"
            />
          </div>
          <div>
            <DesktopView.Wrapper.Genres shouldRender={!props.shouldHideGenres} genres={props.data.genres} />
            <DesktopView.Wrapper.Rating
              shouldRender={!props.shouldHideRating}
              firstAirDate={props.data.release_date}
              voteAverage={props.data.vote_average}
              voteCount={props.data.vote_count}
            />
          </div>
        </DesktopView.Wrapper>
      </DesktopView>
      <MobileView className={props.className}>
        <MobileView.Poster url={props.data.poster_path} name={props.data.title} />
        <MobileView.Wrapper>
          <MobileView.Wrapper.Description
            name={props.data.title}
            tagline={props.data.tagline}
          />
          <MobileView.Wrapper.Genres genres={props.data.genres} />
        </MobileView.Wrapper>
      </MobileView>
    </Fragment>
  );
}
