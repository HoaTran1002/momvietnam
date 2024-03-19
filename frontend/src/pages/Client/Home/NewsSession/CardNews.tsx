import { apiGetNews } from '@/apis/news.api'
import LoadingPage from '@/components/Loading/LoadingPage'
import SliderCarousel from '@/components/SliderCarousel'
import useFetch from '@/hooks/useFetch.hook'
import { INew } from '@/interface/news.interface'
import { formatElapsedTime } from '@/utils/formatTime'
import { linkWebPath } from '@/utils/linkWebPath'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
const CardNewsSession = (): JSX.Element => {
    const [newsState, callNewsState] = useFetch()

    React.useEffect(() => {
        callNewsState(async () => apiGetNews(1, 999999))
    }, [])

    const news = newsState?.payload?.data?.data
    return (
        <SliderCarousel
            autoplay={true}
            autoplaySpeed={2000}
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
            className="sm:h-full max-sm:h-[450px] "
            dots={true}
        >
            {
                newsState?.loading ? (
                        <LoadingPage height='700px' width='100%'/>
                ):(
                    news?.reverse()?.map((r: INew, index: number) => (
                        index <= 4 && (
                            <div key={index} className="h-[700px] max-sm:h-[450px] w-full relative">
                                <LazyLoadImage
                                    placeholder={<LoadingPage height='700px' width='100%' />}
                                    src={`${linkWebPath(r.image?.url || "")}`}
                                    className={`h-full w-full object-cover `}
                                />
                                <div className="group absolute bottom-0 left-0 flex items-center justify-center right-0 py-2 px-3 bg-[#9eb26c]/80 min-h-[70px] hover:bg-white/80  transition-all">
                                    <Link
                                        to={`/tin-tuc/detail/${r._id}`}
                                        className="text-white w-full h-full uppercase flex flex-col tracking-widest text-center text-xl font-medium group-hover:text-[#9eb26c]"
                                    >
                                        <span className="text-sm">{formatElapsedTime(r.dateCreated)}</span>
                                        <span className="text-base">{r.title}</span>
                                    </Link>
                                </div>
                            </div>
                        )
                    ))

                )
            }
        </SliderCarousel>
    )
}
export default CardNewsSession