import Button from '@/components/Buttons';
import ModalMessage from '@/components/ModalMessage';
import Pagetitle from '@/components/PageTitle';
import Table, { ColumnsProps } from '@/components/Table';
import { useChefState } from '@/contexts/CheftContext';
import { IChef } from '@/interface/chef.interface';
import { linkUrlWeb } from '@/utils/getLinkUrl';
import React from 'react'
import ChefSettings from './ChefSettings';
import useFetch from '@/hooks/useFetch.hook';
import { apiDeleteChef } from '@/apis/chef.api';
import { useAlertMessage } from '@/contexts/AlertContext';
const ListChef = (): JSX.Element => {
    const [isShow, setIsShow] = React.useState<boolean>(false)
    const [chef, setChef] = React.useState<IChef | undefined>(undefined)
    const { listChef,loading,setIsReset } = useChefState();
    const [isDelete, setIsDelete] = React.useState<boolean>(false)
    const [_chefState,callChefState] = useFetch();
    const {addAlert} = useAlertMessage();
    const headerColumns: ColumnsProps[] = [
        {
            field: "stt",
            headerName: "STT",
            content_center: true
        },
        {
            field: "linkImage",
            headerName: "Ảnh",
            image: true
        },
        {
            field: "name",
            headerName: "Tên giảng viên",
            max_content: true,
            header_max_content: true
        },
        {
            field: "slogan",
            headerName: "Slogan",
            header_content_center:true
        },
        {
            field: "description",
            headerName: "Mô tả",
        },
        {
            field: "role",
            headerName: "Chức vụ",
            header_max_content:true,
            max_content:true
        },
        {
            field: "position",
            headerName: "Vị trí xuất hiện",
            content_center:true
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Tùy chọn",
            header_content_center: true,
            getActions: (param: IChef) => [
                <Button
                    beforeIcon={<i className="ri-edit-line"></i>} key="edit" className="bg-gradient-to-br text-sm w-max from-[#8a3fd9] to-[#c163ff] text-white"
                    onClick={() =>{setChef(param);setIsShow(true)}}
                >
                    Chi tiết
                </Button>,
                <Button beforeIcon={<i className="ri-delete-bin-5-line"></i>} key="delete" className="w-max text-sm bg-gradient-to-br from-[#ff9393] to-[#ff3838] text-white"
                onClick={()=> {setChef(param);setIsDelete(true)}}>
                    Xóa
                </Button>,
            ],
        },
        {
            field: "_id",
            hidden: true
        },
        {
            field: "image",
            hidden: true
        },
        {
            field: "file",
            hidden: true
        },
    ];
    const chefRows = listChef?.sort((a:IChef,b:IChef)=>Number(a.position) - Number(b.position)).map((r: IChef, index: number) => ({
        stt: index + 1,
        linkImage: linkUrlWeb(r.image?.url || ""),
        name: r.name,
        slogan: r.slogan,
        role:r.role,
        description: r.description,
        _id: r._id,
        image: r.image,
        file:r.file,
        position:r.position
    })) || [];
    const handleDelete = () => {
        if(chef){
            callChefState(
                async () =>{
                    try {
                        await apiDeleteChef({_id:chef?._id})
                        await addAlert({
                            title:"Thành công",
                            message:"Xóa giảng viên thành công",
                            type:"success"
                        })
                        setIsDelete(false)
                        if(setIsReset) setIsReset(r=>!r)
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
    }
    return (
        isShow ? (
            <ChefSettings
                handleClose={() => setIsShow(false)}
                chef={chef}
            />
        ) : (
            <>
                <Pagetitle title="Quản lý giảng viên thường gặp" />
                <h1 className="text-3xl font-medium py-4 text-gray-700">
                    Danh sách giảng viên
                </h1>
                <div className="bg-white rounded-lg p-5">
                    <div>
                        <Table isLoading={loading}  columns={headerColumns} rows={chefRows} />
                    </div>
                </div>
                {
                isDelete && (
                    <ModalMessage
                        content={`Bạn có chắc xóa giảng viên ${chef?.name} không ?  `}
                        isClose={() => setIsDelete(false)}
                        isOk={handleDelete}
                        title='Thông báo'
                    />
                )
            }
            </>
        )
    )
}
export default ListChef