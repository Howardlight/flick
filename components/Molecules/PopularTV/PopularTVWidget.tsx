'use client';
import { Swiper, SwiperSlide } from "swiper/react"
import { GetPopularTV, TVResult } from "../../../types/GetPopularTVTypes"
import { IndexWidget } from "../../Index/IndexWidgetBase"
import { Fragment } from "react"
import { landingBreakpoints } from "../../../utils";
import { Navigation } from "swiper/modules";
import ViewMore from "../../Atoms/ViewMore/ViewMore";
import './PopularTV.css';

const PopularTVWidget = ({ popularTV }: { popularTV: GetPopularTV }) => {
    if (!popularTV) return <Fragment />;
    return (
        <Swiper
            id='popular-tv'
            spaceBetween={50}
            breakpoints={landingBreakpoints}
            modules={[Navigation]}
            navigation
        >
            {popularTV.results.map((tv: TVResult) => {
                return (
                    <SwiperSlide key={`popular-tv-${tv.id}`}>
                        <IndexWidget.Wrapper title={tv.name} key={tv.id} mediaType="tv" resultID={tv.id}>
                            <IndexWidget.Poster title={tv.name} url={tv.poster_path} />
                            <div className='flex flex-col justify-end grow mt-2 max-w-[250px]'>
                                <p className='pb-2 ml-2 text-lg font-medium text-gray-100 truncate'>{tv.name}</p>
                                <IndexWidget.Metrics vote_average={tv.vote_average} />
                            </div>
                        </IndexWidget.Wrapper>
                    </SwiperSlide>
                )
            })}

            <SwiperSlide>
                <ViewMore href='/view-more' />
            </SwiperSlide>
        </Swiper>
    )
}

export default PopularTVWidget;