import { apiDeleteProduct, apiUpdateProduct, apiUploadImageToProduct } from '@/apis/product.api'
import { apiCreateTourOverView, apiGetAllTour, apiUpdateImageTourOverView, apiUpdateTourOverView } from '@/apis/tour.api'
import Button from '@/components/Buttons'
import Divider from '@/components/Divider'
import Input from '@/components/Input'
import ModalBox from '@/components/ModalBox'
import Select, { IOption } from '@/components/Select'
import Table, { ColumnsProps } from '@/components/Table'
import TextEditor from '@/components/TextEditor'
import Tooltip from '@/components/Tooltip'
import UploadImage from '@/components/UploadImage'
import UploadManyImages from '@/components/UploadManyImages'
import { useAlertMessage } from '@/contexts/AlertContext'
import { useCategoryState } from '@/contexts/CategoryContext'
import { useProductState } from '@/contexts/ProductContext'
import useFetch from '@/hooks/useFetch.hook'
import { ICategory } from '@/interface/category.interface'
import { IHightLight, IProduct } from '@/interface/product.interface'
import { ITourOverView } from '@/interface/tour.interface'
import { linkUrlWeb } from '@/utils/getLinkUrl'
import React from 'react'
interface IProductServiceDetail {
    productService: IProduct,
    handleCloseDetail:()=>void
}
const ProductServiceDetail = ({ productService,handleCloseDetail }: IProductServiceDetail): JSX.Element => {
    const { listCategory } = useCategoryState();
    const { setIsReset } = useProductState()
    const [product, setProduct] = React.useState<IProduct>(productService)
    const [listHighlight, setListHighlight] = React.useState<IHightLight[]>(product?.hightlight || [])
    const [listTourOverView, setListTourOverView] = React.useState<ITourOverView[]>([])
    const [tourOverView, setTourOverView] = React.useState<ITourOverView>({
        _id: "",
        idProduct: product._id || "",
        activityContent: "",
        activityName: "",
        endTime: "",
        startTime: "",
        file: undefined
    })
    const [listScript, setListScript] = React.useState<string[]>([])
    const [script, setScript] = React.useState<string>('')
    const [image, setImage] = React.useState<File | undefined>(undefined)
    const [_productState, callProductState] = useFetch()
    const { addAlert } = useAlertMessage();
    const [highlight, setHighlight] = React.useState<IHightLight>({ content: "", title: "" })
    const [openAddHighLight, setOpenAddHighLight] = React.useState<boolean>(false)
    const [openAddHighLightDetail, setOpenAddHighLightDetail] = React.useState<boolean>(false)
    const [openAddTourOverView, setOpenAddTourOverView] = React.useState<boolean>(false)
    const [openAddTourOverViewDetail, setOpenAddTourOverViewDetail] = React.useState<boolean>(false)
    const [openAddScript, setOpenAddScript] = React.useState<boolean>(false)
    // const [openAddScriptDetail, setOpenAddScriptDetail] = React.useState<boolean>(false)
    const columns: ColumnsProps[] = [
        {
            field: "stt",
            headerName: "STT"
        },
        {
            field: "highLight",
            headerName: "Tên điểm nổi bật"
        },
        {
            field: "hightLighDetail",
            headerName: "Chi tiết điểm nổi bật",
            isPag:true
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Tùy chọn",
            header_content_center: true,
            getActions: (param) => [
                <Button onClick={() => {
                    setHighlight({
                        content: param.hightLighDetail,
                        title: param.highLight
                    }),
                        setOpenAddHighLightDetail(true)
                }} key="delete" className="bg-gradient-to-br from-[#8a3fd9] to-[#c163ff] text-white" >
                    Sửa
                </Button>,
                <Button
                    key="edit" className="bg-gradient-to-br from-[#ff9393] to-[#ff3838] text-white"
                    onClick={() => handleDeleteHight(param.stt)}
                >
                    Xóa
                </Button>,
            ],
        },
    ]
    const handleDeleteHight = (param: number) => {
        const updatedHighlight = listHighlight.filter((_item: IHightLight, index: number) => index !== param - 1);
        setListHighlight(updatedHighlight);
    };
    const columnsTimes: ColumnsProps[] = [
        {
            field: "stt",
            headerName: "STT"
        },
        {
            field: "image",
            headerName: "Ảnh",
            image: true
        },
        {
            field: "startTime",
            headerName: "Thời gian bắt đầu"
        },
        {
            field: "endTime",
            headerName: "Thời gian kết thúc"
        },
        {
            field: "activityName",
            headerName: "Tên hoạt động"
        },
        {
            field: "activityContent",
            headerName: "Nội dụng hoạt động",
            isPag: true
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Tùy chọn",
            header_content_center: true,
            getActions: (param) => [
                <Button key="delete" className="bg-gradient-to-br from-[#8a3fd9] to-[#c163ff] text-white"
                    onClick={() => { setTourOverView(param); setOpenAddTourOverViewDetail(true) }}
                >
                    Sửa
                </Button>,
                <Button
                    key="edit" className="bg-gradient-to-br from-[#ff9393] to-[#ff3838] text-white"
                >
                    Xóa
                </Button>,
            ],
        },
        {
            field: "file",
            hidden: true
        },
        {
            field: "activityImages",
            hidden: true
        },
        {
            field: "_id",
            hidden: true
        },
    ]
    const categoryList: IOption[] = listCategory?.map((r: ICategory) => (
        {
            name: r.name,
            value: r._id
        }
    )) || []
    const [categories, setCategories] = React.useState<IOption | undefined>(undefined)
    const rows = listHighlight?.map((r: IHightLight, index: number) => (
        {
            stt: index + 1,
            highLight: r.title,
            hightLighDetail: r.content
        }
    )) || []

    const rowsTime = listTourOverView?.map((r: ITourOverView, index: number) => (
        {
            stt: index + 1,
            startTime: r.startTime,
            endTime: r.endTime,
            activityName: r.activityName,
            activityContent: r.activityContent,
            file: r.file,
            image: linkUrlWeb(r?.activityImages?.url),
            activityImages: r.activityImages,
            _id: r._id
        }
    )) || []

    const handleAddScript = () => {
        setListScript((pre) => ([...pre, script]))
        setScript('')
    }

    const handleUpdateServiceTour = () => {
        callProductState(async () => {
            try {
                await apiUpdateProduct({
                    _id: product._id,
                    content_review: product.content_review,
                    description: product.description,
                    executionTime: product.executionTime,
                    idCategory: product.idCategory,
                    idCourse: product.idCourse,
                    languageOfInstruction: product.languageOfInstruction,
                    linkMenu: product.linkMenu,
                    linkYoutube: product.linkYoutube,
                    numberOfAttendees: product.numberOfAttendees,
                    position: product.position,
                    price: product.price,
                    requiredWhenStudying: product.requiredWhenStudying,
                    serviceDetailsWhenStudying: product.serviceDetailsWhenStudying,
                    title: product.title,
                    name: product.name,
                    note: product.note,
                    hightlight: listHighlight || []
                })
                if (image) {
                    await apiUploadImageToProduct({
                        _id: product._id || "",
                        file: image
                    })
                }

                await listTourOverView.forEach(async (r: ITourOverView) => {
                    console.log(r);
                    if (r._id !== "") {
                        await apiUpdateTourOverView(r)
                    } else {
                        await apiCreateTourOverView(r)
                    }
                })
                await addAlert(
                    {
                        title: "Thành công",
                        message: `Cập nhập thành công thông tin của tour`,
                        type: "success"
                    }
                )
                if (setIsReset) setIsReset(r => !r)
            } catch (error: any) {
                addAlert(
                    {
                        title: "Lỗi",
                        message: `Đã có lỗi trong quá trình chỉnh sủa thông tin của tour, lỗi :${error}`,
                        type: "error"
                    }
                )
            }
        })
    }
    const handleAddHighLight = () => {
        setListHighlight((pre) => ([...pre, highlight]))
        setHighlight({ content: "", title: "" })
    }
    const handleUpdateHighLight = () => {
        setListHighlight((pre) => ([...pre, highlight]))
        setHighlight({ content: "", title: "" })
    }

    const handleAddTourOverView = () => {
        setListTourOverView((pre) => ([...pre, tourOverView]))
        setTourOverView({
            idProduct: product._id || "",
            activityContent: "",
            activityName: "",
            endTime: "",
            startTime: "",
            file: undefined
        })
    }

    const handleEditTourOverView = () => {
        callProductState(async () => {
            try {
                await apiUpdateTourOverView(tourOverView)
                if (tourOverView.file) {
                    await apiUpdateImageTourOverView({
                        _id: tourOverView?._id || "",
                        file: tourOverView?.file
                    })
                }

                await addAlert(
                    {
                        title: "Thành công",
                        message: `Cập nhập thành công mốc thời gian của tour`,
                        type: "success"
                    }
                )
                if (setIsReset) setIsReset(r => !r)
            } catch (error: any) {
                addAlert(
                    {
                        title: "Lỗi",
                        message: `Đã có lỗi trong quá trình chỉnh sủa thông tin của tour, lỗi :${error}`,
                        type: "error"
                    }
                )
            }
        })
    }


    const handleDeleteProductService = () =>{
            callProductState(
                async () => {
                    try {
                        await apiDeleteProduct(product._id || "")
                        await addAlert(
                            {
                                title: "Thành công",
                                message: `Cập nhập thành công nội dung của tour`,
                                type: "success"
                            }
                        )
                        if (setIsReset) setIsReset(r => !r)
                        handleCloseDetail()
                    } catch (error) {
                        addAlert(
                            {
                                title: "Lỗi",
                                message: `Đã có lỗi trong quá trình xóa tour, lỗi :${error}`,
                                type: "error"
                            }
                        )
                    }
                }
            )
    }
    React.useEffect(() => {
        setCategories(() => {
            const cate = listCategory?.find((r: ICategory) => r._id === product?.idCategory);
            return (
                {
                    name: cate?.name,
                    value: cate?._id
                }
            )
        })
    }, [product, listCategory])
    React.useEffect(() => {
        callProductState(
            async () => {
                const data = await apiGetAllTour();
                setListTourOverView(data?.data?.data.filter((r: ITourOverView) => r.idProduct === product._id))
            }
        )
    }, [])
    return (
        <>
            <div className="bg-white rounded-bl-lg rounded-br-lg p-5">
                <h2 className="text-3xl font-bold text-gray-600 py-4 ">Chi tiết dịch vụ</h2>
                <Divider />
                <div className='grid grid-cols-12 gap-5'>
                    <div className="col-span-6">
                        <div>
                            <h2 className='text-3xl font-medium text-gray-600 py-4'>Hình ảnh của dịch vụ tour</h2>
                            <UploadImage
                                imgUrl={linkUrlWeb(product.images?.[0]?.url)}
                                onFileSelect={(e) => setImage(e)}
                            />
                        </div>
                        <div>
                            <h2 className='text-3xl font-medium text-gray-600 py-4 mt-5'>Các hình ảnh khác </h2>
                            <UploadManyImages />
                        </div>
                        <Input
                            labelName='Link video Youtube'
                            placeholder='Điền link Youtube tại đây'
                            value={product?.linkYoutube}
                            onChange={(e) => setProduct((pre) => ({ ...pre, linkYoutube: e.target.value }))}
                        />
                    </div>
                    <div className="col-span-6">
                        <h3 className='text-2xl text-gray-600 font-medium'>Thông tin dịch vụ</h3>
                        <div className='flex flex-col gap-3'>

                            <Input
                                labelName='Tiêu đề dịch vụ'
                                placeholder='Điền tiêu đề dịch vụ'
                                value={product?.title}
                                onChange={(e) => setProduct((pre) => ({ ...pre, title: e.target.value }))}
                            />
                            <Input
                                labelName='Tên dịch vụ'
                                placeholder='Điền tên dịch vụ'
                                value={product?.name}
                                onChange={(e) => setProduct((pre) => ({ ...pre, name: e.target.value }))}
                            />
                            <Input
                                labelName='Mô tả dịch vụ '
                                type='text-area'
                                placeholder='Điền mô tả dịch vụ '
                                value={product?.description}
                                onChange={(e) => setProduct((pre) => ({ ...pre, description: e.target.value }))}
                            />
                            <Select
                                options={categoryList}
                                onSelect={(e) => { setCategories(e); setProduct((pre) => ({ ...pre, idCategory: e.value })) }}
                                lableName='Danh mục sản phẩm'
                                value={categories?.value}
                            />
                            <div>
                                <h4>Điền ghi chú của dịch vụ</h4>
                                <TextEditor
                                    valueText={product?.requiredWhenStudying}
                                    onChange={(e) => setProduct((pre) => ({ ...pre, requiredWhenStudying: e }))}
                                />
                            </div>
                            <Input
                                labelName='Giá dịch vụ '
                                placeholder='Điền giá dịch vụ '
                                value={product?.price}
                                onChange={(e) => setProduct((pre) => ({ ...pre, price: e.target.value }))}
                            />
                            <Input
                                labelName='Vị trí'
                                placeholder='Nhập vị trí diễn ra dịch vụ'
                                value={product?.position}
                                onChange={(e) => setProduct((pre) => ({ ...pre, position: e.target.value }))}
                            />
                            <Input
                                labelName='Thời gian'
                                placeholder='Thời gian thực hiện '
                                value={product?.executionTime}
                                onChange={(e) => setProduct((pre) => ({ ...pre, executionTime: e.target.value }))}
                            />
                            <Input
                                labelName='Số người tham dự'
                                placeholder='Điền số người tối thiểu và tối đa tham dự'
                                value={product?.numberOfAttendees?.toString()}
                                onChange={(e) => setProduct((pre) => ({ ...pre, numberOfAttendees: Number(e.target.value) }))}
                            />
                            <Input
                                labelName='Ngôn ngữ dạy học'
                                placeholder='Điền các ngôn ngữ sử dụng để dạy học   '
                                value={product?.languageOfInstruction}
                                onChange={(e) => setProduct((pre) => ({ ...pre, languageOfInstruction: e.target.value }))}
                            />
                            <div>
                                <h4>Chi tiết dịch vụ khi học</h4>
                                <TextEditor
                                    valueText={product?.serviceDetailsWhenStudying}
                                    onChange={(e) => setProduct((pre) => ({ ...pre, serviceDetailsWhenStudying: e }))}
                                />
                            </div>
                            <Input
                                labelName='Link thông tin thêm'
                                placeholder='Điền link để thêm thông tin thêm'
                                value={product?.linkMenu}
                                onChange={(e) => setProduct((pre) => ({ ...pre, linkMenu: e.target.value }))}
                            />
                            <Input
                                labelName='Review'
                                placeholder='Điền nội dung review'
                                value={product?.content_review}
                                onChange={(e) => setProduct((pre) => ({ ...pre, content_review: e.target.value }))}
                            />
                            <div>
                                <h4>Ghi chú dịch vụ Tour</h4>
                                <TextEditor
                                    valueText={product?.note}
                                    onChange={(e) => setProduct((pre) => ({ ...pre, note: e }))}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="bg-white rounded-lg p-5 mt-5">
                <Button onClick={() => setOpenAddHighLight(true)}>
                    Thêm một highlight mới
                </Button>
                <Table
                    rows={rows}
                    columns={columns}
                />
            </div>
            <div className="bg-white rounded-lg p-5 mt-5">
                <Button onClick={() => setOpenAddTourOverView(true)}>
                    Thêm mốc thời gian review
                </Button>
                <Table
                    rows={rowsTime}
                    columns={columnsTimes}
                />
            </div>
            <div className="bg-white rounded-lg p-5 mt-5">
                <Button
                    onClick={() => setOpenAddScript(true)}
                >
                    Thêm script mới
                </Button>
                {
                    listScript?.map((r: string, index: number) => (
                        <div key={index} className='p-4 relative mb-5 flex-wrap bg-gray-50 rounded-lg'>
                            <pre>
                                <code>
                                    {r}
                                </code>
                            </pre>
                            <div className='absolute top-2 right-2 flex flex-col'>
                                <Tooltip name='Thông tin'>
                                    <Button>
                                        <i className="ri-edit-line"></i>
                                    </Button>

                                </Tooltip>
                                <Tooltip name='Xóa'>
                                    <Button>
                                        <i className="ri-delete-bin-line"></i>
                                    </Button>

                                </Tooltip>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='flex items-center gap-5'>
                <Button className="bg-gradient-to-br  from-[#8a3fd9] to-[#c163ff] text-white" onClick={handleUpdateServiceTour}>
                    Cập nhập tour
                </Button>
                <Button
                    onClick={handleDeleteProductService}
                    className="bg-gradient-to-br  from-[#ff6b6b] to-[#ff3030] text-white"
                >
                    Xóa
                </Button>

            </div>
            <ModalBox
                onClose={() => setOpenAddHighLight(false)}
                isOpen={openAddHighLight}
                styleModalClass='w-[500px] h-auto'
            >
                <div className='pt-12 px-5'>
                    <h1> Thêm 1 điểm nổi bật mới</h1>
                    <div>
                        <Input
                            labelName='Điểm nổi bật'
                            value={highlight.title}
                            onChange={(e) => setHighlight((pre) => ({ ...pre, title: e.target.value }))}
                        />
                        <TextEditor
                            valueText={highlight.content}
                            onChange={(e) => setHighlight((pre) => ({ ...pre, content: e }))}
                        />
                        <Button
                            onClick={handleAddHighLight}
                        >
                            Thêm 1 điểm nổi bật mới
                        </Button>
                    </div>
                </div>
            </ModalBox>
            <ModalBox
                onClose={() => {
                    setOpenAddHighLightDetail(false),
                        setHighlight({ content: "", title: "" })
                }}
                isOpen={openAddHighLightDetail}
                styleModalClass='w-[500px] h-auto'
            >
                <div className='pt-12 px-5'>
                    <h1> Thông tin điểm nổi bật </h1>
                    <div>
                        <Input
                            labelName='Điểm nổi bật'
                            value={highlight.title}
                            onChange={(e) => setHighlight((pre) => ({ ...pre, title: e.target.value }))}
                        />
                        <TextEditor
                            valueText={highlight.content}
                            onChange={(e) => setHighlight((pre) => ({ ...pre, content: e }))}
                        />
                        <Button
                            onClick={handleUpdateHighLight}
                        >
                            Chỉnh sửa thông tin điểm nổi bật
                        </Button>
                    </div>
                </div>
            </ModalBox>
            <ModalBox
                onClose={() => setOpenAddTourOverView(false)}
                isOpen={openAddTourOverView}
                styleModalClass='w-[80vw] h-auto'
            >
                <div className='pt-12 px-5'>
                    <h1> Thêm 1 mốc thời gian mới</h1>
                    <div className='grid grid-cols-12 gap-4'>
                        <div className="col-span-6">
                            <UploadImage
                                onFileSelect={(e) => setTourOverView((pre) => ({ ...pre, file: e }))}
                            />
                        </div>
                        <div className="col-span-6">
                            <Input
                                labelName='Thời gian bắt đầu'
                                value={tourOverView.startTime}
                                onChange={(e) => setTourOverView((pre) => ({ ...pre, startTime: e.target.value }))}
                            />
                            <Input
                                labelName='Thời gian kết thúc'
                                value={tourOverView.endTime}
                                onChange={(e) => setTourOverView((pre) => ({ ...pre, endTime: e.target.value }))}
                            />
                            <Input
                                labelName='Tên hoạt động'
                                value={tourOverView.activityName}
                                onChange={(e) => setTourOverView((pre) => ({ ...pre, activityName: e.target.value }))}
                            />
                            <Input
                                labelName='Nội dung hoạt động'
                                value={tourOverView.activityContent}
                                onChange={(e) => setTourOverView((pre) => ({ ...pre, activityContent: e.target.value }))}
                            />
                            <Button
                                onClick={handleAddTourOverView}
                            >
                                Thêm 1 mốc thời gian hoạt động mới
                            </Button>
                        </div>

                    </div>
                </div>
            </ModalBox>
            <ModalBox
                onClose={() => {
                    setOpenAddTourOverViewDetail(false)
                    setTourOverView({
                        _id: "",
                        idProduct: product._id || "",
                        activityContent: "",
                        activityName: "",
                        endTime: "",
                        startTime: "",
                        file: undefined
                    })
                }}
                isOpen={openAddTourOverViewDetail}
                styleModalClass='w-[80vw] h-auto'
            >
                <div className='pt-12 px-5'>
                    <h1> Chỉnh sửa mốc thời gian mới</h1>
                    <div className='grid grid-cols-12 gap-4'>
                        <div className="col-span-6">
                            <UploadImage
                                imgUrl={linkUrlWeb(tourOverView.activityImages?.url)}
                                onFileSelect={(e) => setTourOverView((pre) => ({ ...pre, file: e }))}
                            />
                        </div>
                        <div className="col-span-6">
                            <Input
                                labelName='Thời gian bắt đầu'
                                value={tourOverView.startTime}
                                onChange={(e) => setTourOverView((pre) => ({ ...pre, startTime: e.target.value }))}
                            />
                            <Input
                                labelName='Thời gian kết thúc'
                                value={tourOverView.endTime}
                                onChange={(e) => setTourOverView((pre) => ({ ...pre, endTime: e.target.value }))}
                            />
                            <Input
                                labelName='Tên hoạt động'
                                value={tourOverView.activityName}
                                onChange={(e) => setTourOverView((pre) => ({ ...pre, activityName: e.target.value }))}
                            />
                            <Input
                                labelName='Nội dung hoạt động'
                                value={tourOverView.activityContent}
                                onChange={(e) => setTourOverView((pre) => ({ ...pre, activityContent: e.target.value }))}
                            />
                            <Button
                                onClick={handleEditTourOverView}
                                className="bg-gradient-to-br  from-[#8a3fd9] to-[#c163ff] text-white"
                            >
                                Chỉnh sửa mốc thời gian
                            </Button>
                        </div>
                    </div>
                </div>
            </ModalBox>
            <ModalBox
                onClose={() => setOpenAddScript(false)}
                isOpen={openAddScript}
                styleModalClass='w-[80vw] h-auto'
            >
                <div className='pt-12 px-5'>
                    <h1> Thêm 1 script mới</h1>
                    <div className='grid grid-cols-12 gap-4'>
                        <div className="col-span-12">
                            <Input
                                type='text-area'
                                labelName='Script '
                                value={script}
                                onChange={(e) => setScript(e.target.value)}
                            />
                            <Button
                                onClick={handleAddScript}
                            >
                                Thêm 1 script mới
                            </Button>
                        </div>

                    </div>
                </div>
            </ModalBox>
        </>
    )
}
export default ProductServiceDetail