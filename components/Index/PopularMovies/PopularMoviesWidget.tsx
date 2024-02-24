'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { PopularResponse, PopularResult } from '../../../types/GetPopularMoviesTypes';
import { IndexWidget } from '../IndexWidgetBase';
import Link from 'next/link';
import Image from 'next/image';
import Logo from './../../../assets/MovieSVG.svg';
import { landingBreakpoints } from '../../../utils';
import { Fragment } from 'react';
import './PopularMovies.css';
import ViewMore from '../../Atoms/ViewMore/ViewMore';

const PopularMoviesWidget = ({ popularMovies }: { popularMovies: PopularResponse | null }) => {
    if (!popularMovies) return <Fragment />;
    return (
        <Swiper
            id='popular-movies'
            spaceBetween={50}
            breakpoints={landingBreakpoints}
            modules={[Navigation]}
            navigation
        >
            {popularMovies.results.map((item: PopularResult) => {
                return (
                    <SwiperSlide key={`popular-movies-${item.id}`}>
                        <IndexWidget.Wrapper title={item.title} mediaType='movie' resultID={item.id} key={`popular-movies-${item.id}`}>
                            <IndexWidget.Poster title={item.title} url={item.poster_path} />
                            <div className='flex flex-col grow justify-end mt-2 max-w-[250px]'>
                                <p className='pb-2 ml-2 text-lg font-medium text-gray-100 truncate'>{item.title}</p>
                                <IndexWidget.Metrics vote_average={item.vote_average} />
                            </div>
                        </IndexWidget.Wrapper>
                    </SwiperSlide>
                );
            })}

            <SwiperSlide>
                <ViewMore href='/view-more' />
            </SwiperSlide>
        </Swiper>
    )
}

export default PopularMoviesWidget;