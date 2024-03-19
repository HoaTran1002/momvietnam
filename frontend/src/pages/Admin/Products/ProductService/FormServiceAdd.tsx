import { apiCreateProduct } from '@/apis/product.api'
import Button from '@/components/Buttons'
import Divider from '@/components/Divider'
import Input from '@/components/Input'
import ModalBox from '@/components/ModalBox'
import Select, { IOption } from '@/components/Select'
import Table, { ColumnsProps } from '@/components/Table'
import TextEditor from '@/components/TextEditor'
import UploadImage from '@/components/UploadImage'
import UploadManyImages from '@/components/UploadManyImages'
import { useAlertMessage } from '@/contexts/AlertContext'
import { useCategoryState } from '@/contexts/CategoryContext'
import useFetch from '@/hooks/useFetch.hook'
import { ICategory } from '@/interface/category.interface'
import { IHightLight, IProduct } from '@/interface/product.interface'
import React from 'react'
const FormServiceAdd = (): JSX.Element => {
    const { idCourse, listCategory } = useCategoryState();
    const initialProduct:IProduct = {
        linkMenu:"",
        content_review:"",
        description:"",
        hightlight:[{}],
        idCategory:"",
        idCourse,
        executionTime:"",
        languageOfInstruction:"",
        linkYoutube:"",
        listScript:[],
        numberOfAttendees:0,
        requiredWhenStudying:"",
        serviceDetailsWhenStudying:"",
        title:"",
        position:"",
        note:""
    }
    const [product,setProduct] = React.useState<IProduct>(initialProduct)
    const [listHighlight, setListHighlight] = React.useState<IHightLight[]>([])
    const [highlight, setHighlight] = React.useState<IHightLight>({content:"",title:""})
    const [_listScript,setListScript] = React.useState<string[]>([])
    const [script,setScript] = React.useState<string>('')
    const [_image,setImage] = React.useState<File | undefined>(undefined)
    const [_productState,callProductState] = useFetch()
    const [openAddHighLight,setOpenAddHighLight] = React.useState<boolean>(false)
    const {addAlert} = useAlertMessage();
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
            headerName: "Chi tiết điểm nổi bật"
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Tùy chọn",
            header_content_center: true,
            getActions: (_param) => [
                <Button key="delete" className="bg-gradient-to-br from-[#8a3fd9] to-[#c163ff] text-white" >
                    Sửa
                </Button>,
                <Button
                    key="edit" className="bg-gradient-to-br from-[#ff9393] to-[#ff3838] text-white"
                >
                    Xóa
                </Button>,
            ],
        },
    ]

    const columnsTimes: ColumnsProps[] = [
        {
            field: "stt",
            headerName: "STT"
        },
        {
            field: "image",
            headerName: "Ảnh",
            image:true
        },
        {
            field: "timeStart",
            headerName: "Thời gian bắt đầu"
        },
        {
            field: "timeEnd",
            headerName: "Thời gian kết thúc"
        },
        {
            field: "title",
            headerName: "Tên hoạt động"
        },
        {
            field: "content",
            headerName: "Nội dụng hoạt động"
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Tùy chọn",
            header_content_center: true,
            getActions: (_param) => [
                <Button key="delete" className="bg-gradient-to-br from-[#8a3fd9] to-[#c163ff] text-white" >
                    Sửa
                </Button>,
                <Button
                    key="edit" className="bg-gradient-to-br from-[#ff9393] to-[#ff3838] text-white"
                >
                    Xóa
                </Button>,
            ],
        },
    ]
    const categoryList: IOption[] = listCategory?.map((r: ICategory) => (
        {
            name: r.name,
            value: r._id
        }
    )) || []
    const [categories, setCategories] = React.useState<IOption | undefined>(undefined)
    const rows = listHighlight?.map((r, index: number) => (
        {
            stt: index + 1,
            highLight: r.title,
            hightLighDetail: r.content
        }
    )) || []

    // const rowsTime = listHighlight?.map((r:IHightLight, index: number) => (
    //     {
    //         stt: index + 1,
    //         highLight: r.title,
    //         hightLighDetail: r.content
    //     }
    // )) || []

    const handleAddScript = () => { 
        setListScript((pre)=>([...pre,script]))
        setScript('')
    }
    const handleAddServiceTour = () =>{
        callProductState(async () =>{
            try {
                await apiCreateProduct({
                    content_review:product.content_review,
                    description:product.description,
                    executionTime:product.executionTime,
                    idCategory:product.idCategory,
                    idCourse:product.idCourse,
                    languageOfInstruction:product.languageOfInstruction,
                    linkMenu:product.linkMenu,
                    linkYoutube:product.linkYoutube,
                    numberOfAttendees:product.numberOfAttendees,
                    position:product.position,
                    price:product.price,
                    requiredWhenStudying:product.requiredWhenStudying,
                    serviceDetailsWhenStudying:product.serviceDetailsWhenStudying,
                    title:product.title,
                    name:"__BLANK__",
                    note:product.note,
                    
                })
            } catch (error:any) {
                addAlert(
                    {
                        title:"Lỗi",
                        message:`Đã có lỗi trong quá trình tạo tour, lỗi :${error}`,
                        type:"error"
                    }
                )
            }
        })
    }
    const handleAddHighLight = () =>{
        setListHighlight((pre)=>([...pre,highlight]))
        setHighlight({content:"",title:""})
    }
    return (
        <>
            <div className="bg-white rounded-bl-lg rounded-br-lg p-5">
                <h2 className="text-3xl font-bold text-gray-600 py-4 ">Thêm dịch vụ mới</h2>
                <Divider />
                <div className='grid grid-cols-12 gap-5'>
                    <div className="col-span-6">
                        <UploadImage 
                            onFileSelect={(e)=>setImage(e)}
                        />
                        <UploadManyImages />
                        <Input
                            labelName='Link video Youtube'
                            placeholder='Điền link Youtube tại đây'
                            value={product?.linkYoutube}
                            onChange={(e)=>setProduct((pre)=>({...pre,linkYoutube:e.target.value}))}
                        />
                    </div>
                    <div className="col-span-6">
                        <h3 className='text-2xl text-gray-600 font-medium'>Thông tin dịch vụ</h3>
                        <div className='flex flex-col gap-3'>

                            <Input
                                labelName='Tiêu đề dịch vụ'
                                placeholder='Điền tiêu đề dịch vụ'
                                value={product?.title}
                            onChange={(e)=>setProduct((pre)=>({...pre,title:e.target.value}))}
                            />
                            <Input
                                labelName='Mô tả dịch vụ '
                                placeholder='Điền mô tả dịch vụ '
                                type='text-area'
                                value={product?.description}
                                onChange={(e)=>setProduct((pre)=>({...pre,description:e.target.value}))}
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
                                    onChange={(e)=>setProduct((pre)=>({...pre,requiredWhenStudying:e}))}
                                />
                            </div>
                            <Input
                                labelName='Giá dịch vụ '
                                placeholder='Điền giá dịch vụ '
                                value={product?.price}
                            onChange={(e)=>setProduct((pre)=>({...pre,price:e.target.value}))}
                            />
                            <Input
                                labelName='Vị trí'
                                placeholder='Nhập vị trí diễn ra dịch vụ'
                                value={product?.position}
                                onChange={(e)=>setProduct((pre)=>({...pre,position:e.target.value}))}
                            />
                            <Input
                                labelName='Thời gian'
                                placeholder='Thời gian thực hiện '
                                value={product?.executionTime}
                            onChange={(e)=>setProduct((pre)=>({...pre,executionTime:e.target.value}))}
                            />
                            <Input
                                labelName='Số người tham dự'
                                placeholder='Điền số người tối thiểu và tối đa tham dự'
                                value={product?.numberOfAttendees?.toString()}
                                onChange={(e)=>setProduct((pre)=>({...pre,numberOfAttendees:Number(e.target.value)}))}
                            />
                            <Input
                                labelName='Ngôn ngữ dạy học'
                                placeholder='Điền các ngôn ngữ sử dụng để dạy học   '
                                value={product?.languageOfInstruction}
                            onChange={(e)=>setProduct((pre)=>({...pre,languageOfInstruction:e.target.value}))}
                            />
                            <div>
                                <h4>Chi tiết dịch vụ khi học</h4>
                                <TextEditor 
                                    valueText={product?.serviceDetailsWhenStudying}
                                    onChange={(e)=>setProduct((pre)=>({...pre,serviceDetailsWhenStudying:e}))}
                                />
                            </div>
                            <Input
                                labelName='Link thông tin thêm'
                                placeholder='Điền link để thêm thông tin thêm'
                                value={product?.linkMenu}
                                onChange={(e)=>setProduct((pre)=>({...pre,linkMenu:e.target.value}))}
                            />
                            <Input
                                labelName='Review'
                                placeholder='Điền nội dung review'
                                value={product?.content_review}
                                onChange={(e)=>setProduct((pre)=>({...pre,content_review:e.target.value}))}
                            />
                            <div>
                                <h4>Ghi chú dịch vụ Tour</h4>
                                <TextEditor 
                                    valueText={product?.note}
                                    onChange={(e)=>setProduct((pre)=>({...pre,note:e}))}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="bg-white rounded-lg p-5 mt-5">
                <Button onClick={()=>setOpenAddHighLight(true)}>
                    Thêm một highlight mới
                </Button>
                <Table
                    rows={rows}
                    columns={columns}
                />
            </div>
            <div className="bg-white rounded-lg p-5 mt-5">
                <Button>
                    Thêm mốc thời gian review
                </Button>
                <Table
                    rows={rows}
                    columns={columnsTimes}
                />
            </div>
            <div className="bg-white rounded-lg p-5 mt-5">
                <Button
                    onClick={handleAddScript}
                >
                    Thêm script mới
                <Input
                    type='text-area'
                    value={script}
                    onChange={(e)=>setScript(e.target.value)}
                    placeholder='Nhập script vào đây'
                />
                </Button>
            </div>
            <Button onClick={handleAddServiceTour}>
                Thêm 1 tour mới 
            </Button>
            <ModalBox
                onClose={()=>setOpenAddHighLight(false)}
                isOpen={openAddHighLight}
                styleModalClass='w-[500px] h-auto'
            >
                <div className='pt-12 px-5'>
                    <h1> Thêm 1 điểm nổi bật mới</h1>
                    <div>
                        <Input
                            labelName='Điểm nổi bật'
                            value={highlight.title}
                            onChange={(e)=>setHighlight((pre)=>({...pre,title:e.target.value}))}
                        />
                        <TextEditor
                            valueText={highlight.content}
                            onChange={(e)=>setHighlight((pre)=>({...pre,content:e}))}
                        />
                        <Button
                            onClick={handleAddHighLight}
                        >
                            Thêm 1 điểm nổi bật mới
                        </Button>
                    </div>
                </div>
            </ModalBox>
        </>
    )
}
export default FormServiceAdd