import { apiCreateChef } from '@/apis/chef.api'
import Button from '@/components/Buttons'
import Input from '@/components/Input'
import UploadImage from '@/components/UploadImage'
import LayoutAdmin from '@/components/layouts/Admin/Layout'
import { useAlertMessage } from '@/contexts/AlertContext'
import useFetch from '@/hooks/useFetch.hook'
import { IChef } from '@/interface/chef.interface'
import React from 'react'
const ChefAdd = ():JSX.Element=>{
    const initialChef:IChef = {
        name:"",
        description:"",
        file:undefined,
        role:"",
        slogan:""
    }
    const [chef,setChef] = React.useState<IChef>(initialChef)
    const [chefState,callChefState] = useFetch();
    const {addAlert} = useAlertMessage();



    const handleAdd = () => {
        callChefState(
            async () =>{
                try {
                    await apiCreateChef(
                        {
                            file:chef.file,
                            description:chef.description,
                            name:chef.name,
                            role:chef.role,
                            slogan:chef.slogan
                        }
                    )
                    await addAlert({
                        title:"Thành công",
                        message:"Thêm giảng viên thành công",
                        type:"success"
                    })
                } catch {
                    addAlert({
                        title:"Lỗi",
                        message:"Thêm thất bại giảng viên, vui lòng kiểm tra lại thông tin",
                        type:"error"
                    })
                }
            }

        )
    }
    return(
        <LayoutAdmin>
            <>
                <h1 className="text-3xl font-medium py-4 text-gray-700">
                    Thêm giảng viên mới
                </h1>
                <div className='bg-white rounded-lg p-5'>
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-5">
                            <h3 className='text-3xl pb-2 text-gray-600 font-medium'>Hình ảnh giảng viên</h3>
                            <UploadImage
                                className='h-[450px]'
                                onFileSelect={(e)=>setChef((pre) => ({ ...pre, file:e}))}
                            />
                        </div>
                        <div className="col-span-7">
                            <h3 className='text-3xl pb-2 text-gray-600 font-medium'>Thông tin giảng viên</h3>
                            <div className='flex flex-col gap-4'>
                                <Input
                                    labelName='Tên giảng viên'
                                    placeholder='Nhập tên giảng viên'
                                    value={chef?.name}
                                    onChange={(e) => setChef((pre) => ({ ...pre, name: e.target.value }))}
                                />
                                <Input
                                    labelName='Slogan'
                                    placeholder='Nhập câu slogan của giảng viên'
                                    value={chef?.slogan}
                                    onChange={(e) => setChef((pre) => ({ ...pre, slogan: e.target.value }))}
                                />
                                <Input
                                    labelName='Chức vụ'
                                    placeholder='Nhập chức vụ giảng viên'
                                    value={chef?.role}
                                    onChange={(e) => setChef((pre) => ({ ...pre, role: e.target.value }))}
                                />
                                <Input
                                    type='text-area'
                                    placeholder='Nhập mô tả giảng viên'
                                    labelName='Mô tả giảng viên'
                                    value={chef?.description}
                                    onChange={(e) => setChef((pre) => ({ ...pre, description: e.target.value }))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-white rounded-lg p-5 flex gap-3 justify-end items-center my-5'>
                    <Button
                        beforeIcon={<i className="ri-add-fill"></i>} 
                        key="edit" 
                        className="bg-gradient-to-br w-max from-[#8a3fd9] to-[#c163ff] text-white"
                        onClick={handleAdd}
                        isLoading={chefState?.loading}
                    >
                        Thêm giảng viên
                    </Button>
                </div>
            </>
        </LayoutAdmin>
    )
}
export default ChefAdd