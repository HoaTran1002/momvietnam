import { apiDeleteChef, apiUpdateChef, apiUpdateImageChef } from '@/apis/chef.api'
import Button from '@/components/Buttons'
import Input from '@/components/Input'
import ModalMessage from '@/components/ModalMessage'
import UploadImage from '@/components/UploadImage'
import { useAlertMessage } from '@/contexts/AlertContext'
import { useChefState } from '@/contexts/CheftContext'
import useFetch from '@/hooks/useFetch.hook'
import { IChef } from '@/interface/chef.interface'
import { linkUrlWeb } from '@/utils/getLinkUrl'
import React from 'react'
interface IChefSettings {
    chef?: IChef,
    handleClose: () => void
}
const ChefSettings = ({ chef, handleClose }: IChefSettings): JSX.Element => {
    const [chefCurr, setChefCurr] = React.useState<IChef | undefined>(chef)
    const [isDelete, setIsDelete] = React.useState<boolean>(false)
    const [chefState, callChefState] = useFetch();
    const {setIsReset} = useChefState()
    const {addAlert} = useAlertMessage();



    const handleDelete = () => {
        callChefState(
            async () =>{
                try {
                    await apiDeleteChef({_id:chefCurr?._id})
                    await addAlert({
                        title:"Thành công",
                        message:"Xóa giảng viên thành công",
                        type:"success"
                    })
                    if(setIsReset) setIsReset(r=>!r)
                    handleClose()
                } catch {
                    addAlert({
                        title:"Lỗi",
                        message:"Xóa thất bại giảng viên, vui lòng thử lại sau",
                        type:"error"
                    })
                }
            }

        )
    }
    
    const handleEdit = () =>{
        
        if(chefCurr){
            callChefState(
                async () =>{
                    try {
                        await apiUpdateChef(chefCurr)
                        if(chefCurr.file){
                            console.log(chefCurr);
                            await apiUpdateImageChef(
                                {
                                    _id:chefCurr._id,
                                    file:chefCurr.file
                                }
                            )
                            await addAlert({
                                title:"Lưu ý",
                                message:"Hình ảnh sẽ cần 1 lúc để cập nhập trên giao diên",
                                type:"info",
                                duration:7000
                            })
                        }
                        await addAlert({
                            title:"Thành công",
                            message:"Chỉnh sửa thông tin giảng viên thành công",
                            type:"success"
                        })
                        if(setIsReset) setIsReset(r=>!r)
                    } catch {
                        addAlert({
                            title:"Lỗi",
                            message:"Chỉnh sửa thông tin giảng viên thất bại, vui lòng thử lại sau",
                            type:"error"
                        })
                    }
                }
    
            )
        }
    }
    return (
        <>
            <div className='bg-white p-5 rounded-lg mb-5'>
                <Button
                    className='bg-gradient-to-br  from-[#8a3fd9] to-[#c163ff] text-white'
                    onClick={handleClose}
                    beforeIcon={<i className="ri-arrow-left-line"></i>}
                >
                    Trở về
                </Button>
            </div>
            <div className='bg-white rounded-lg p-5'>
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-5">
                        <h3 className='text-3xl pb-2 text-gray-600 font-medium'>Hình ảnh giảng viên</h3>
                        <UploadImage
                            className='h-[600px]'
                            imgUrl={linkUrlWeb(chef?.image?.url || "")}
                            onFileSelect={(e)=>setChefCurr((pre)=>({...pre,file:e}))}
                        />
                    </div>
                    <div className="col-span-7">
                        <h3 className='text-3xl pb-2 text-gray-600 font-medium'>Thông tin giảng viên</h3>
                        <div className='flex flex-col gap-4'>
                            <Input
                                labelName='Tên giảng viên'
                                value={chefCurr?.name}
                                onChange={(e) => setChefCurr((pre) => ({ ...pre, name: e.target.value }))}
                            />
                            <Input
                                labelName='Slogan'
                                value={chefCurr?.slogan}
                                onChange={(e) => setChefCurr((pre) => ({ ...pre, slogan: e.target.value }))}
                            />
                            <Input
                                labelName='Chức vụ'
                                value={chefCurr?.role}
                                onChange={(e) => setChefCurr((pre) => ({ ...pre, role: e.target.value }))}
                            />
                            <Input
                                type='text-area'
                                labelName='Mô tả giảng viên'
                                value={chefCurr?.description}
                                onChange={(e) => setChefCurr((pre) => ({ ...pre, description: e.target.value }))}
                            />
                            <Input
                                labelName='Vị trí xuất hiện'
                                value={String(chefCurr?.position)}
                                onChange={(e) => setChefCurr((pre) => ({ ...pre, position: Number(e.target.value) }))}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white rounded-lg p-5 flex gap-3 justify-end items-center my-5'>
            <Button
                    className='bg-gradient-to-br  from-[#8a3fd9] to-[#c163ff] text-white'
                    onClick={handleClose}
                    beforeIcon={<i className="ri-arrow-left-line"></i>}
                >
                    Trở về
                </Button>
                <Button
                    beforeIcon={<i className="ri-edit-line"></i>} 
                    key="edit" 
                    className="bg-gradient-to-br w-max from-[#8a3fd9] to-[#c163ff] text-white"
                    onClick={handleEdit}
                    isLoading={chefState?.loading}
                >
                    Lưu thông tin giảng viên
                </Button>
                <Button
                    beforeIcon={<i className="ri-delete-bin-5-line"></i>}
                    key="delete"
                    className="w-max bg-gradient-to-br from-[#ff9393] to-[#ff3838] text-white"
                    onClick={() => setIsDelete(true)}
                >
                    Xóa giảng viên
                </Button>,
            </div>
            {
                isDelete && (
                    <ModalMessage
                        content={`Bạn có chắc xóa giảng viên ${chefCurr?.name} không ?  `}
                        isClose={() => setIsDelete(false)}
                        isOk={handleDelete}
                        title='Thông báo'
                    />
                )
            }
        </>
    )
}
export default ChefSettings