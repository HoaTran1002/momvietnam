import { getAllCourses } from '@/apis/courses.api'
import LoadingPage from '@/components/Loading/LoadingPage'
import SliderCarousel from '@/components/SliderCarousel'
import useFetch from '@/hooks/useFetch.hook'
import { ICourse } from '@/interface/courses.interface'
import { linkWebPath } from '@/utils/linkWebPath'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import { ResponsiveObject } from 'react-slick'

const CardCoursesSession
    = (): JSX.Element => {
        const [coursesState, callCoursesState] = useFetch()
        const [courses, setCourses] = React.useState<ICourse[] | undefined>(undefined)
        const responsiveHomeSlider: ResponsiveObject[] = [
            {
                breakpoint: 2400,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 1,
                },
            },
        ];
        //==========================================
        const renderItems = () => {
            const items = [];
            for (let i = 0; i < 5; i++) {
                items.push(
                    <div key={i + 1} className='sm:col-span-1 bg-[#9eb26c]/10 max-sm:col-span-5'>
                        <LoadingPage 
                            height='350px'
                            width='100%'
                        />
                    </div>
                );
            }
            return items;
        };
        React.useEffect(() => {
            callCoursesState(
                async () => {
                    const data = await getAllCourses()
                    const filteredCourses = data?.data?.filter((r: ICourse) => {
                        const name = r.title?.split('__') || [];
                        return name[0] !== "FREE";
                    }).sort((a: ICourse, b: ICourse) => Number(a.position) - Number(b.position));
                    setCourses(filteredCourses)
                }
            )
        }, [])
        return (
            <div className='col-span-5'>
                <SliderCarousel
                    autoplay={true}
                    autoplaySpeed={2000}
                    arrows={false}
                    slidesToShow={1}
                    slidesToScroll={1}
                    className="sm:h-[370px] max-sm:h-[450px] "
                    dots={true}
                    responsive={responsiveHomeSlider}
                >
                    {
                        coursesState?.loading ? (
                            renderItems()
                        ) : (
                            courses?.map((r: ICourse, index: number) => (
                                <React.Fragment key={index}>
                                    <div className="group overflow-hidden relative">
                                        <LazyLoadImage
                                            src={`${linkWebPath(r.images?.[0]?.url || "")}`}
                                            alt={r.title}
                                            className="h-[370px] max-sm:h-[420px] w-full object-cover"
                                        />
                                        <Link
                                            to={`/khoa-hoc/${r._id}`}
                                            className="absolute flex text-white text-xl font-medium items-center 
                                                    justify-center text-center uppercase bottom-0 left-0 group-hover:min-h-full cursor-pointer
                                                    transition-all  right-0 py-1 px-2 bg-[#9eb26c]/80 min-h-[70px]"
                                        >
                                            {r.title}
                                        </Link>
                                    </div>
                                </React.Fragment>
                            )) || []
                        )
                    }
                </SliderCarousel>
            </div>

        )
    }
export default CardCoursesSession

