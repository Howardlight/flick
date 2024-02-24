'use client';
import { Fragment } from "react";
import { UpcomingResponse, UpcomingResult } from "../../../types/GetUpcomingTypes";
import { IndexWidget } from "../IndexWidgetBase";
import moment from 'moment';
import { landingBreakpoints } from "../../../utils";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ViewMore from "../../Atoms/ViewMore/ViewMore";
import './UpcomingMovies.css';


const UpcomingMoviesWidget = ({ upcomingMovies }: { upcomingMovies: UpcomingResponse }) => {
    if (!upcomingMovies) return <Fragment />;
    return (
        <Swiper
            id="upcoming-movies"
            spaceBetween={50}
            breakpoints={landingBreakpoints}
            modules={[Navigation]}
            navigation
        >
            {upcomingMovies.results.map((item: UpcomingResult) => {
                return (
                    <SwiperSlide key={`upcoming-movie-${item.id}`}>
                        <IndexWidget.Wrapper title={item.title} key={`upcoming-movie-${item.id}`} mediaType='movie' resultID={item.id}>
                            <IndexWidget.Poster title={item.title} url={item.poster_path} />
                            <div className='flex flex-col justify-end grow mt-2 max-w-[250px]'>
                                <p className='pb-2 ml-2 text-lg font-medium text-gray-100 truncate'>{item.title}</p>
                                <p className='justify-end pb-2 ml-2 font-medium text-gray-300 text-md'>{moment(item.release_date).startOf("day").fromNow()}</p>
                            </div>
                        </IndexWidget.Wrapper>
                    </SwiperSlide>
                );
            })}

            <SwiperSlide>
                <ViewMore href="./view-more" />
            </SwiperSlide>
        </Swiper>
    );
}

export default UpcomingMoviesWidget;