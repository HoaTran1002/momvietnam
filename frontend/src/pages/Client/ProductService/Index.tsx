import LayoutMain from '@/components/layouts/Client/Main'
import React from 'react'
import Bg_Logo from "@/assets/images/Views/Background_logo.jpg"
import Logo from "@/assets/images/Logo/logo-removebg-preview.png"
import SloganFooter from '@/components/layouts/Client/Footer/SloganFooter'
import Button from '@/components/Buttons'
import Divider from '@/components/Divider'
import { useNavigate, useParams } from 'react-router-dom'
import { IHightLight, IProduct } from '@/interface/product.interface'
import useFetch from '@/hooks/useFetch.hook'
import { useAlertMessage } from '@/contexts/AlertContext'
import { apiGetProductById } from '@/apis/product.api'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import LoadingPage from '@/components/Loading/LoadingPage'
import { linkUrlWeb } from '@/utils/getLinkUrl'
import { apiGetAllTour } from '@/apis/tour.api'
import { ITourOverView } from '@/interface/tour.interface'
const Index = (): JSX.Element => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [product, setProduct] = React.useState<IProduct | undefined>(undefined)
    const [_productState, callProductState] = useFetch()
    const [listTourOverView, setListTourOverView] = React.useState<ITourOverView[] | undefined>(undefined)
    const { addAlert } = useAlertMessage()
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    React.useEffect(() => {
        if (id) {
            callProductState(
                async () => {
                    try {
                        const data = await apiGetProductById(id || "")
                        setProduct(data?.data?.data)
                        const listTour = await apiGetAllTour();
                        setListTourOverView(listTour?.data?.data.filter((r: ITourOverView) => r.idProduct === id))
                        console.log(listTour);
                        
                    } catch (error) {
                        addAlert({
                            message: `Đã có lỗi trong quá trình lấy dịch vụ, vui lòng kiểm tra lại đường truyền`,
                            title: "Thất bại",
                            type: "error",
                        });
                    }
                }
            )
        }
    }, [id])
    return (
        <LayoutMain>
            <>
                <div
                    style={{
                        backgroundImage: `url(${Bg_Logo})`
                    }}
                    className={`w-screen bg-fixed bg-no-repeat bg-cover pb-[20px] pt-[50px] max-sm:pt-[20px]`}
                >
                    <span className='mx-5 max-sm:flex max-sm:items-center max-sm:justify-center'>
                        <Button onClick={() => navigate(-1)} className='border-primary text-primary rounded-sm border border-solid bg-sell hover:bg-secondary hover:text-white  hover:border-secondary' beforeIcon={<i className="ri-arrow-drop-left-line"></i>}>
                            Trở về
                        </Button>
                    </span>
                    <div className='mt-6 flex justify-center'>
                        <div className='w-[80vw] max-sm:w-[95vw] bg-white py-5 px-3 '>
                            <div className='flex max-sm:flex-col'>
                                <div className='flex-none w-auto'>
                                    <img src={Logo} alt="Ảnh logo" className='h-[130px]' />
                                </div>
                                <div>
                                    <h1 className='text-5xl text-primary font-medium py-3 max-sm:text-3xl'>{product?.title}</h1>
                                    <p className='text-xl leading-9'>
                                        {product?.description}
                                    </p>
                                </div>
                            </div>
                            <div className='grid grid-cols-12  mt-12'>
                                <div className="col-span-5 px-[20px] flex flex-col gap-6 max-sm:col-span-12">
                                    <LazyLoadImage
                                        src={linkUrlWeb(product?.images?.[0].url)}
                                        placeholder={<LoadingPage width='100%' height='350px' />}
                                    />
                                    {
                                        product?.linkYoutube !== "__EMPTY__" && (
                                            <iframe
                                                className='w-full h-[280px]'
                                                src={product?.linkYoutube}
                                                title="YouTube video player"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            ></iframe>
                                        )
                                    }
                                </div>
                                <div className="col-span-7 px-10 max-sm:col-span-12">
                                    <div
                                        dangerouslySetInnerHTML={{ __html: product?.requiredWhenStudying || "" }}
                                    />
                                    <Divider />
                                    <div>
                                        <h3 className='text-3xl font-bold'>
                                            Giá: <span>{product?.price}</span>
                                        </h3>
                                        <div className='flex flex-col gap-2'>
                                            <span>
                                                <i className="ri-map-pin-2-line"></i>
                                                <span>
                                                    {product?.position}
                                                </span>
                                            </span>
                                            <span>
                                                <i className="ri-time-line"></i>
                                                <span>
                                                    {product?.executionTime}
                                                </span>
                                            </span>
                                            <span>
                                                <i className="ri-user-line"></i>
                                                <span>
                                                    {product?.numberOfAttendees}
                                                </span>
                                            </span>
                                            <span>
                                                <i className="ri-translate-2"></i>
                                                <span>
                                                    {product?.languageOfInstruction}
                                                </span>
                                            </span>
                                        </div>
                                        <div
                                            className="leading-9"
                                            dangerouslySetInnerHTML={{ __html: product?.serviceDetailsWhenStudying || "" }}
                                        />
                                        <div className='flex gap-2 py-3'>
                                            <i className="ri-check-fill text-xl text-sub_primary"></i>
                                            <span>
                                                For more details, please check <a href={product?.linkMenu} target='_blank' className='font-medium'>tour information here</a>
                                            </span>
                                        </div>
                                        <Button
                                            beforeIcon={<i className="ri-calendar-2-line"></i>}
                                            className='w-full text-xl border-primary text-primary rounded-sm border border-solid hover:bg-secondary hover:text-white hover:border-secondary my-4'>
                                            Liên hệ để đặt lịch ngay
                                        </Button>
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <h2 className='text-primary text-3xl text-center font-medium my-5'>Highlights of this activity</h2>
                                    <div className='flex flex-col gap-3'>
                                        {
                                            product?.hightlight?.map((r: IHightLight, index: number) => (
                                                <div className='px-3' key={index}>
                                                    <div className='flex gap-3 items-center font-medium text-primary'>
                                                        <i className="ri-circle-fill text-sm"></i>
                                                        <h4 className='text-2xl'>{r.title}</h4>
                                                    </div>
                                                    <div
                                                        className='px-7 py-2 text-lg font-normal text-gray-700'
                                                        dangerouslySetInnerHTML={{ __html: r?.content || "" }}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div>

                                    <div className='flex items-center justify-center'>
                                        <Button
                                            beforeIcon={<i className="ri-calendar-2-line"></i>}
                                            className=' text-xl border-primary text-primary rounded-sm border border-solid hover:bg-secondary hover:text-white hover:border-secondary my-4'>
                                            Liên hệ để đặt lịch ngay
                                        </Button>
                                    </div>
                                </div>
                                <div className='col-span-6 max-sm:col-span-12'>
                                    <h3 className='text-2xl font-bold text-gray-700'>Tour over view</h3>
                                    <div className='flex flex-col '>
                                        {
                                            listTourOverView?.map((item: ITourOverView) => (
                                                <div
                                                    key={item._id}
                                                    className='flex flex-col gap-3 pt-2 relative'
                                                >
                                                    <span className='ml-10 font-medium text-lg before:w-4 before:h-4 before:rounded-full before:bg-primary relative before:absolute before:-left-8 before:top-2/4 before:-translate-y-2/4'>
                                                        {
                                                            item.startTime === "__EMPTY__" && item.endTime === "__EMPTY__" ? (
                                                                <span></span>
                                                            ):(
                                                                <span>
                                                                    {item.startTime } - {item.endTime}
                                                                </span>
                                                            )
                                                        }
                                                    </span>
                                                    <div className='ml-[40px] before:absolute relative before:h-full before:-left-[26px] before:top-0  py-3 flex gap-6 before:w-1 before:min-w-1 before:max-w-1  before:rounded-sm before:bg-primary'>
                                                        <LazyLoadImage
                                                            src={linkUrlWeb(item?.activityImages?.url)}
                                                            alt="Ảnh hoạt động"
                                                            className='w-[80px] h-[80px] object-cover rounded-lg flex-none'
                                                        />
                                                        <div className='flex flex-col gap-3'>
                                                            <h4 className='font-medium text-lg'>{item.activityName === "__EMPTY__"?"":item.activityName}</h4>
                                                            <p>
                                                                {item.activityContent}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                            ))
                                        }
                                    </div>
                                    <div className='p-3 bg-sub_primary/10 mt-10'>
                                        <div className='flex font-medium flex-col gap-5 text-lg'>
                                            <span>
                                                Address: {product?.position}
                                            </span>
                                            <span>
                                                Time Learning: {product?.executionTime}
                                            </span>
                                            <span>
                                                Colloquial (Language): {product?.languageOfInstruction}
                                            </span>
                                        </div>
                                        <div
                                            className="leading-9"
                                            dangerouslySetInnerHTML={{ __html: product?.note || "" }}
                                        />
                                        <p className='text-3xl font-medium'>
                                            Giá: {product?.price}
                                        </p>
                                        <Button
                                            beforeIcon={<i className="ri-calendar-2-line"></i>}
                                            className='w-full text-xl border-sub_secondary text-sub_secondary rounded-sm border border-solid hover:bg-sub_secondary hover:text-white hover:border-sub_secondary my-4'>
                                            Liên hệ để đặt lịch ngay
                                        </Button>
                                    </div>
                                </div>
                                <div className="col-span-6 max-sm:col-span-12 gap-4">
                                    <div className='flex justify-center mt-8 w-full'>
                                        <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fcookingclassbymom&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"  
                                        className='w-full max-sm:w-[300px] ml-5 max-sm:ml-0' height="500" scrolling="no" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                                    </div>
                                    {

                                        product?.listScript?.map((r:string,index:number)=>(
                                                <div 
                                                   key={index}
                                                   dangerouslySetInnerHTML={{ __html: r || "" }}
                                               />
                                        ))
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-center py-5'>
                        <Button onClick={() => navigate(-1)} className='border-primary text-primary rounded-sm border border-solid bg-sell hover:bg-secondary hover:text-white hover:border-secondary' beforeIcon={<i className="ri-arrow-drop-left-line"></i>}>
                            Trở về
                        </Button>
                    </div>
                </div>
                <SloganFooter />
            </>
        </LayoutMain>
    )
}
export default Index