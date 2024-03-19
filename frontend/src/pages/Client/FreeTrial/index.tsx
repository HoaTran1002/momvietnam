import Pagetitle from '@/components/PageTitle'
import LayoutMain from '@/components/layouts/Client/Main'
import view1 from "@/assets/images/Views/z4689941072190_e70f3ef9e5b8497daa343c8635bba872.jpg";

import SloganFooter from '@/components/layouts/Client/Footer/SloganFooter';
import useFetch from '@/hooks/useFetch.hook';
import React from 'react';
import { ICourse } from '@/interface/courses.interface';
import { getAllCourses } from '@/apis/courses.api';
import { IProduct } from '@/interface/product.interface';
import { apiGetAllProduct } from '@/apis/product.api';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LoadingPage from '@/components/Loading/LoadingPage';
import { linkWebPath } from '@/utils/linkWebPath';
import { Link } from 'react-router-dom';
const FreeTrial = (): JSX.Element => {
    const [_courseState, callCourseState] = useFetch()
    const [course, setCourse] = React.useState<ICourse | undefined>(undefined)
    const [products, setProducts] = React.useState<IProduct[] | undefined>(undefined)
    React.useEffect(() => {
        callCourseState(
            async () => {
                const data = await getAllCourses()
                const filteredCourses = await data?.data?.find((r: ICourse) => {
                    const name = r.title?.split('__') || [];
                    return name[0] === "FREE";
                });
                const dataProduct = await apiGetAllProduct()
                const productForCourses = dataProduct?.data?.data.filter((r: IProduct) => r.idCourse === filteredCourses._id)
                setProducts(productForCourses);
                setCourse(filteredCourses)
            }
        )
    }, [])
    console.log(course, products);
    return (
        <LayoutMain>
            <>
                <Pagetitle title="free trial" />
                <div className="relative">
                    <div className="absolute  text-4xl w-screen h-[750px] bg-slate-950/20 flex items-center justify-center px-3 z-10 text-white uppercase tracking-widest font-normal text-center flex-col gap-3">
                        <span>{course?.title?.split('__')[1]}</span>
                        <span className="text-base px-24">
                            {course?.description}
                        </span>
                    </div>
                    <div
                        style={{
                            backgroundImage: `url(${view1})`,
                        }}
                        className="w-screen h-[750px] bg-cover bg-fixed bg-center"
                    ></div>
                </div>
                <div className='bg-white p-6'>
                    <div className=" grid grid-cols-3 max-sm:px-0 px-[250px] gap-1 bg-white pb-5">
                        
                            { products?.map((r: IProduct) => (
                                <div key={r._id} className="max-w-[890px] max-sm:col-span-3 group relative w-full h-[500px] max-sm:h-[450px] flex  flex-col">
                                    <div className="h-full max-sm:w-full">
                                        <LazyLoadImage
                                            placeholder={<LoadingPage width='100%' height="500px" />}
                                            src={linkWebPath(r.images?.[0].url || "")}
                                            className="w-full object-cover h-full"
                                            alt={r.name}
                                        />
                                    </div>
                                    <span
                                        className="absolute flex flex-col gap-2 text-white text-xl font-medium items-center justify-center text-center uppercase top-0 left-0   group-hover:min-h-full cursor-pointer transition-all z-40 right-0 py-1 px-2 bg-[#9eb26c]/80 min-h-[20px] opacity-0 group-hover:opacity-100"
                                        // onClick={() => handleOpenDetailProduct(r)}
                                    >
                                        <span>
                                            {r.name}
                                        </span>
                                        <span className="text-sm leading-[25px] text-white/90">
                                            {r.note}

                                        </span>
                                    </span>
                                    <span className="absolute flex flex-col gap-2 text-[#9eb26c] text-xl font-medium items-center justify-center text-center uppercase bottom-0 left-0   cursor-pointer transition-all right-0 py-1 px-2 bg-[#f3f1de] min-h-[70px]">
                                        <span>

                                            {r.name}
                                        </span>
                                    </span>
                                </div>
                            ))}
                            
                        
                    </div>
                </div>
                <div className="flex items-center justify-center py-3">
            <Link
              to={"/lien-he"}
              className="py-2 px-6 bg-[#9eb26c] min-w-max text-white font-medium rounded"
            >
              <i className="ri-calendar-line mr-2"></i>
              Liên hệ với chúng tôi để đặt lịch ngay
            </Link>
          </div>
                <SloganFooter />
            </>
        </LayoutMain>
    )
}
export default FreeTrial
