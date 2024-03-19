import LoadingPage from '@/components/Loading/LoadingPage';
import SliderCarousel from '@/components/SliderCarousel'
import { IPartners, listPartners } from '@/data/partners';
// import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ResponsiveObject } from 'react-slick';
const CardPartnerSession = ():JSX.Element=>{
    const responsiveHomeSlider: ResponsiveObject[] = [
        {
          breakpoint: 1600,
          settings: {
            slidesToScroll: 1,
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToScroll: 1,
            slidesToShow: 2,
          },
        },
      ];
    return(
        <>
             <SliderCarousel
              autoplay={true}
              autoplaySpeed={1500}
              arrows={false}
              slidesToShow={4}
              slidesToScroll={1}
              dots={true}
              responsive={responsiveHomeSlider}
              className="sm:h-full max-sm:h-[100px] "
            >
                {listPartners.map((r: IPartners, index: number) => (
                  <div key={index}>
                    <LazyLoadImage  placeholder={<LoadingPage height="100px" width="100%"/>} src={r.logo} alt="" />
                  </div>
                ))}
            </SliderCarousel>
        </>
    )
}
export default CardPartnerSession