import LoadingPage from '@/components/Loading/LoadingPage'
import SliderCarousel from '@/components/SliderCarousel'
import ViewCommingSoon from "@/assets/images/Views/coming_soon.jpg";

import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom';
const CardLessonSession = (): JSX.Element => {
    return (
        <div className="h-[250px] w-full mt-2">
            <SliderCarousel
                autoplay={true}
                autoplaySpeed={1500}
                arrows={false}
                slidesToShow={1}
                slidesToScroll={1}
                className="sm:h-full max-sm:h-[350px] "
                dots={true}
            >
                <div>
                    <div className="h-[250px] w-full relative flex justify-start">
                        <div className="w-2/4 h-full inline-block">
                            <LazyLoadImage
                                placeholder={<LoadingPage width="100%" height="250px" />}
                                src={ViewCommingSoon}
                                className={`h-full w-full inline-block object-cover`}
                            />
                        </div>
                        <div className="group h-full w-2/4 inline-flex items-center justify-center  py-2 px-3 bg-[#9eb26c]/80  hover:bg-white/80  transition-all">
                            <Link
                                to={`/bai-hoc`}
                                className="text-white w-full inline-flex h-full uppercase justify-center flex-col tracking-widest text-center text-xl font-medium group-hover:text-[#9eb26c]"
                            >
                                <span className="text-sm">WATCH MORE</span>
                                <span className="text-base">TRIAL LESSON</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="h-[250px] w-full relative flex justify-start">
                        <div className="w-2/4 h-full inline-block">
                            <LazyLoadImage
                                placeholder={<LoadingPage height="250px" width="100%" />}
                                src={ViewCommingSoon}
                                className={`h-full w-full inline-block object-cover bg-gray-600 `}
                            />
                        </div>
                        <div className="group h-full w-2/4 inline-flex items-center justify-center  py-2 px-3 bg-[#9eb26c]/80  hover:bg-white/80  transition-all">
                            <Link
                                to={`/bai-hoc`}
                                className="text-white w-full inline-flex h-full uppercase justify-center flex-col tracking-widest text-center text-xl font-medium group-hover:text-[#9eb26c]"
                            >
                                <span className="text-sm">WATCH MORE</span>
                                <span className="text-base">UPCOMMING WORKSHOP</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </SliderCarousel>
        </div>
    )
}
export default CardLessonSession