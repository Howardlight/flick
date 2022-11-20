import Image from 'next/image';
import useSWR, { SWRResponse } from 'swr';
import { PosterLoader } from '../../PosterLoader';
import Link from 'next/link';
import fetcher from '../../Fetcher';
import { UpcomingResponse, UpcomingResult } from '../../types/GetUpcomingTypes';
import React, { Fragment } from 'react';
import moment from 'moment';
import { IndexWidgetBase, IndexWidgetContentWrapper, IndexWidgetError, IndexWidgetScrollBar, IndexWidgetSkeletons } from './IndexWidgetBase';
import styles from "../../styles/IndexWidget.module.css";

export const UpcomingMovies = ({ className }: { className?: string }): React.ReactElement => {
  return (
    <IndexWidgetBase className={`${className}`} title='Upcoming Movies' key={"upcoming-movies"}>
      <UpcomingWidgetContent />
    </IndexWidgetBase>
  );
};
const UpcomingWidgetContent = (): React.ReactElement => {
  const { data, error }: SWRResponse<UpcomingResponse, Error> = useSWR("/api/Movie/getUpcomingMovies/1", fetcher);

  if (!data && !error) return <IndexWidgetSkeletons />;
  if (error) return <IndexWidgetError />;
  return (
    <IndexWidgetScrollBar>
      {
        data!.results.map((item: UpcomingResult) => {
          return (
            <IndexWidgetContentWrapper key={`upcoming-movie-${item.id}`} mediaType='movie' resultID={item.id}>
              <Image
                src={item.poster_path}
                loader={PosterLoader}
                alt={`${item.title} poster`}
                width={250}
                height={375}
                loading={"lazy"}
                className={["rounded-md h-[375px] max-w-[250px]", styles.autoWidth].join(" ")}
              />
              <div className='flex flex-col justify-end grow mt-2 max-w-[250px]'>
                <p className='font-medium text-lg ml-2 pb-2 text-gray-100 truncate'>{item.title}</p>
                <p className='font-medium text-md ml-2 pb-2 text-gray-300 justify-end'>{moment(item.release_date).startOf("day").fromNow()}</p>
              </div>
            </IndexWidgetContentWrapper>
          );
        })
      }
    </IndexWidgetScrollBar>
  );
};

export default UpcomingMovies;