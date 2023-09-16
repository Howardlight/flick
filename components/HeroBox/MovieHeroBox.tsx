import { ReactElement, Suspense } from "react";
import { Movie } from "../../types/Movie";
import { DesktopView } from "../Movie-TV/Views/DesktopView";
import { MobileView } from "../Movie-TV/Views/MobileView";

export default function HeroBox({ data }: { data: Movie }): ReactElement {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DesktopView>
        <DesktopView.Poster name={data.title} url={data.poster_path} />
        <DesktopView.Wrapper>
          <div>
            <DesktopView.Wrapper.Description
              name={data.title}
              tagline={data.tagline}
              className="mb-5"
            />
          </div>
          <div>
            <DesktopView.Wrapper.Genres genres={data.genres} />
            <DesktopView.Wrapper.Rating
              firstAirDate={data.release_date}
              voteAverage={data.vote_average}
              voteCount={data.vote_count}
            />
          </div>
        </DesktopView.Wrapper>
      </DesktopView>
      <MobileView>
        <MobileView.Poster url={data.poster_path} name={data.title} />
        <MobileView.Wrapper>
          <MobileView.Wrapper.Description
            name={data.title}
            tagline={data.tagline}
          />
          <MobileView.Wrapper.Genres genres={data.genres} />
        </MobileView.Wrapper>
      </MobileView>
    </Suspense>
  );
}
