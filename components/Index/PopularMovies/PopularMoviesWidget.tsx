'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { PopularResponse, PopularResult } from '../../../types/GetPopularMoviesTypes';
import { IndexWidget } from '../IndexWidgetBase';
import Link from 'next/link';
import Image from 'next/image';
import Logo from './../../../assets/MovieSVG.svg';
import { landingBreakpoints } from '../../../utils';

const PopularMoviesWidget = ({ popularMovies }: { popularMovies: PopularResponse | null }) => {
    return (
        <Swiper
            spaceBetween={50}
            breakpoints={landingBreakpoints}
            modules={[Navigation]}
        >
            {popularMovies!.results.map((item: PopularResult) => {
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
                <Link href="./view-more" className='me-16 flex flex-col h-[463px] w-[252px] rounded-sm justify-center items-center bg-black-100 hover:bg-neutral-900 transition delay-50 ease-in-out'>
                    <Image src={Logo} width={128} height={128} alt='Movie Logo' />
                    <p className='text-2xl font-bold text-center'>View More</p>
                </Link>
            </SwiperSlide>
        </Swiper>
    )
}

export default PopularMoviesWidget;