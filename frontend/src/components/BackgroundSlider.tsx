// import React from 'react'
import SliderCarousel from './SliderCarousel'

import { LazyLoadImage } from 'react-lazy-load-image-component';
import LoadingPage from '@/components/Loading/LoadingPage';
import { useTranslation } from 'react-i18next';
interface IBackgroundSlider {
    listImageBannerSlider: string[],
    scrollToFirstElement: boolean
}
const BackgroundSlider = ({listImageBannerSlider,scrollToFirstElement}:IBackgroundSlider): JSX.Element => {
    const { t } = useTranslation("home");
    return (
        <>
            <div className="w-screen h-[105vh]">
                <div className='w-screen h-[105vh]'>
                    <SliderCarousel
                        fade={true}
                        className="w-full h-[105vh]"
                        autoplaySpeed={3000}
                        autoplay={true}
                        dots={false}
                    >
                        {
                            listImageBannerSlider.map((item:string,index:number)=>(
                                <div className="" key={index}>
                                    <LazyLoadImage
                                        placeholder={<LoadingPage width='1000px' height='105vh' />}
                                        src={item}
                                        alt={item}
                                        className=" h-[105vh] w-full object-cover"
                                    />
                                </div>
                            ))
                        }
                    </SliderCarousel>
                </div>
                <div className="title_slogan">
                    {t("sloganBanner")}
                    {
                        scrollToFirstElement && (
                            <div className="absolute w-full bottom-[70px] left-0 right-0 flex items-center justify-center">
                                <a
                                    href="#the_first"
                                    className="animate-bounce absolute text-white cursor-pointer"
                                >
                                    <i className="ri-arrow-down-double-line text-5xl"></i>
                                </a>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}
export default BackgroundSlider