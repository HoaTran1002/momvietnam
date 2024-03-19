import Divider from '@/components/Divider'
import LoadingPage from '@/components/Loading/LoadingPage'
import ModalBox from '@/components/ModalBox'
import SloganFooter from '@/components/layouts/Client/Footer/SloganFooter'
import { useCategoryState } from '@/contexts/CategoryContext'
import { useProductState } from '@/contexts/ProductContext'
import { ICategory } from '@/interface/category.interface'
import { ICourse } from '@/interface/courses.interface'
import { IProduct } from '@/interface/product.interface'
import { linkWebPath } from '@/utils/linkWebPath'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
interface IListProductForCourse {
  courseCurr: ICourse
}
const ListProductForCourse = ({ courseCurr }: IListProductForCourse): JSX.Element => {
  const { listCategory, loading: loadingCate } = useCategoryState()
  const { listProduct, loading } = useProductState()
  const [cateChose, setCateChose] = React.useState<ICategory | undefined>(undefined)
  const [productChose, setProductChose] = React.useState<IProduct | undefined>(undefined)
  const [products, setProducts] = React.useState<IProduct[] | undefined>(undefined)

  const handleOpenDetailProduct = (item: IProduct): void => {
    setProductChose(item)
  };
  const handleCloseDetailProduct = (): void => {
    setProductChose(undefined)
  };
  React.useEffect(() => {
    const newProduct = listProduct?.filter((r: IProduct) => r.idCategory === cateChose?._id)
    setProducts(newProduct)
  }, [cateChose])
  React.useEffect(() => {
    const category = listCategory?.find((_: ICategory, index: number) => (index === 0 || _.name?.trim() !== "__EMPTY__" && _.listTimeLearning?.some(r => r !== "__EMPTY__"))) || {}
    setCateChose(category)
  }, [loadingCate])
  return (
    <>
      <div className="relative">
        <div className="absolute text-4xl w-screen h-[105vh] bg-slate-950/30 flex items-center justify-center px-3 z-10 text-white uppercase tracking-widest font-normal text-center flex-col gap-3">
          <span>{courseCurr?.title}</span>
          <span className="text-base px-24">
            {courseCurr?.description}
          </span>
        </div>
        <div
          style={{
            backgroundImage: `url(${linkWebPath(courseCurr?.images?.[0].url || "")})`,
          }}
          className="w-screen h-[105vh] bg-cover bg-fixed bg-center"
        ></div>
      </div>
      <div className="">
        <div className=" py-16 ">
          <div className="flex gap-3  max-sm:flex-col items-center justify-center py-8">
            {
              cateChose?.name === "__EMPTY__" ? (
                <span className={`text-xl text-[#809058] font-bold`}>
                  COMING SOON
                </span>
              ) : (
                listCategory?.map((r: ICategory) => (
                  <div key={r._id} className={`px-3 cursor-pointer ${r._id !== cateChose?._id ? "bg-none" : "bg-[#9eb26c]/40 text-white"}`} onClick={() => setCateChose(r)}  >
                    <span className={`text-xl ${r._id === cateChose?._id ? "text-[#809058] font-bold" : "text-[#9eb26c]"}`}>
                      {r.name}
                    </span>
                  </div>
                ))
              )
            }
          </div>
          {
            loading ? (
              <div className="flex py-9 items-center justify-center">
                <LoadingPage width="100%" height="500px" />
              </div>
            ) : (
              <div className=" grid grid-cols-3 max-sm:px-0 px-[250px] gap-1 bg-white pb-5">
                {
                  cateChose?.listTimeLearning?.map((r: string, i: number) => (
                    <>
                      <div key={i} className="col-span-3 mt-6 text-3xl max-sm:text-lg  text-center text-[#72814e] font-semibold py-3">
                        {r === "__EMPTY__" ? "COMEBACK HERE WHEN WE READY" : r}
                      </div>
                      {products?.map((r: IProduct) => (
                        r.linkMenu && r.title !== "" ? (
                          <Link to={`/dich-vu/${r._id}`} key={r._id} className="max-w-[890px] max-sm:col-span-3 group relative w-full h-[500px] max-sm:h-[450px] flex  flex-col">
                            <div className="h-full max-sm:w-full">
                              <LazyLoadImage
                                placeholder={<LoadingPage width='100%' height="500px" />}
                                src={linkWebPath(r.images?.[0]?.url || "")}
                                className="w-full object-cover h-full"
                                alt={r.name}
                              />
                            </div>
                            <span
                              className="absolute flex flex-col gap-2 text-white text-xl font-medium items-center justify-center text-center uppercase top-0 left-0   group-hover:min-h-full cursor-pointer transition-all z-40 right-0 py-1 px-2 bg-[#9eb26c]/80 min-h-[20px] opacity-0 group-hover:opacity-100"

                            >
                              <span>
                                {r.name}
                              </span>
                              <span className="text-sm leading-[25px] text-white/90">
                                {r.description}

                              </span>
                            </span>
                            <span className="absolute flex flex-col gap-2 text-[#9eb26c] text-xl font-medium items-center justify-center text-center uppercase bottom-0 left-0   cursor-pointer transition-all right-0 py-1 px-2 bg-[#f3f1de] min-h-[70px]">
                              <span>

                                {r.name}
                              </span>
                            </span>
                          </Link>
                        ) : (
                          <div key={r._id} onClick={() => handleOpenDetailProduct(r)} className="max-w-[890px] max-sm:col-span-3 group relative w-full h-[500px] max-sm:h-[450px] flex  flex-col">
                            <div className="h-full max-sm:w-full">
                              <LazyLoadImage
                                placeholder={<LoadingPage width='100%' height="500px" />}
                                src={linkWebPath(r.images?.[0]?.url || "")}
                                className="w-full object-cover h-full"
                                alt={r.name}
                              />
                            </div>
                            <span
                              className="absolute flex flex-col gap-2 text-white text-xl font-medium items-center justify-center text-center uppercase top-0 left-0   group-hover:min-h-full cursor-pointer transition-all z-40 right-0 py-1 px-2 bg-[#9eb26c]/80 min-h-[20px] opacity-0 group-hover:opacity-100"

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
                        )

                      ))}
                    </>
                  ))
                }

              </div>
            )
          }

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
        <ModalBox
          styleModalClass="w-[700px] max-sm:w-[95vw] h-max"
          isOpen={productChose !== undefined}
          onClose={handleCloseDetailProduct}
        >
          <div className="grid grid-cols-12 max-sm:h-[550px] max-sm:mt-12 max-sm:overflow-y-scroll">
            <div className="col-span-6 max-sm:col-span-12 max-sm:h-full relative">
              <LazyLoadImage
                placeholder={<LoadingPage height='400px' width='100%' />}
                src={linkWebPath(productChose?.images?.[0].url || "")}
                className="h-full  w-full object-cover rounded-sm"
                alt={`Ảnh sản phẩm ${productChose?.name} `}
              />
            </div>
            <div className="max-sm:col-span-12 max-sm:py-4  col-span-6 px-5 pt-[50px]">
              <h3 className="text-3xl text-center font-medium text-[#7f8d5b] uppercase">
                {productChose?.name}
              </h3>
              <Divider />
              <p className="mt-4 text-lg">
                {productChose?.note}
              </p>
            </div>
          </div>
        </ModalBox>
      </div>
    </>
  )
}
export default ListProductForCourse
