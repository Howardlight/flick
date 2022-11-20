import Image from 'next/image';
import useSWR, { SWRResponse } from 'swr';
import { PosterLoader } from '../../PosterLoader';
import { PopularResponse, PopularResult } from '../../types/GetPopularMoviesTypes';
import Link from 'next/link';
import fetcher from '../../Fetcher';
import { IndexWidgetBase, IndexWidgetScrollBar, IndexWidgetError, IndexWidgetSkeletons, Metrics, IndexWidgetContentWrapper } from './IndexWidgetBase';
import styles from "../../styles/IndexWidget.module.css";

export const PopularMovies = ({ className }: { className?: string }): React.ReactElement => {
  return (
    <IndexWidgetBase className={`${className}`} title={`Popular Movies`} key={"popular-movies"}>
      <PopularWidgetContent />
    </IndexWidgetBase>
  );
};


const PopularWidgetContent = (): React.ReactElement => {
  const { data, error }: SWRResponse<PopularResponse, Error> = useSWR('/api/getPopularMovies/1', fetcher);

  if (!data && !error) return <IndexWidgetSkeletons />;
  if (error) return <IndexWidgetError />;
  return (
    <IndexWidgetScrollBar>
      {data!.results.map((item: PopularResult) => {
        return (
          <IndexWidgetContentWrapper mediaType='movie' resultID={item.id} key={`popular-movies-${item.id}`}>
            <Image
              src={item.poster_path}
              loader={PosterLoader}
              alt={`${item.title} poster`}
              width={250}
              height={375}
              loading="lazy"
              className={["rounded-md h-[375px]", styles.autoWidth].join(" ")}
            />
            <div className='flex flex-col grow justify-end mt-2 max-w-[250px]'>
              <p className='font-medium text-lg ml-2 pb-2 text-gray-100 truncate'>{item.title}</p>
              <Metrics vote_average={item.vote_average} />
            </div>
          </IndexWidgetContentWrapper>
        );
      })}
    </IndexWidgetScrollBar>
  );
};

