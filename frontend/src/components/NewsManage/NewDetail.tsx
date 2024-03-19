import { INew } from '@/interface/news.interface'
import React from 'react'
import UploadImage from '../UploadImage'
import Input from '../Input'
import TextEditor from '../TextEditor'
import Button from '../Buttons'
import ModalMessage from '../ModalMessage'
import { useNewsState } from '@/contexts/NewContext'
import { linkUrlWeb } from '@/utils/getLinkUrl'
import { apiDeleteNew, apiUpdateImgNew, apiUpdateNews } from '@/apis/news.api'
import { useAlertMessage } from '@/contexts/AlertContext'
import useFetch from '@/hooks/useFetch.hook'
interface INewDetail {
    news: INew,
    onClose: () => void
}
const NewDetail = ({ news, onClose }: INewDetail): JSX.Element => {
    const [dataImage, setDataImage] = React.useState<File>();
    const [newSelect, setNewSelect] = React.useState<INew>(news);
    const [isUpdateNew, setIsUpdateNews] = React.useState<boolean>(false);
    const [isDeleteNew, setIsDeleteNews] = React.useState<boolean>(false);
    const [isEditNews, setIsEditNews] = React.useState<boolean>(false);
    const { setIsReset } = useNewsState()
    const [_stateUpdateNew, callStateUpdateNew] = useFetch();
    const { addAlert } = useAlertMessage();
    const handleFileSelect = (file: File) => {
        setDataImage(file);
    };


    const submitUpdateNew = () => {
        if (newSelect !== undefined) {
            callStateUpdateNew(async () => {
                try {
                    await apiUpdateNews({
                        ...newSelect
                    })
                    if (dataImage != undefined) {
                        await apiUpdateImgNew({
                            _id: newSelect?._id || "",
                            file: dataImage
                        })
                        addAlert(
                            {
                                title: "Thông báo",
                                message: "Hình ảnh sẽ mất một lúc để cập nhập",
                                type: "warning"
                            }
                        )
                    }
                    addAlert(
                        {
                            title: "Thành công",
                            message: "Cập nhập tin tức thành công",
                            type: "success"
                        }
                    )
                    if (setIsReset) {
                        setIsReset((prevIsReset) => !prevIsReset);
                    }
                } catch (error) {
                    addAlert(
                        {
                            title: "Thất bại",
                            message: "Đã có lỗi trong lúc cập nhập tin tức",
                            type: "error"
                        }
                    )
                }
            }
            )
            setIsUpdateNews(false);
        }
    };
    const handleExitsUpdateField = () => {
        setIsEditNews(false);
        onClose();
    };
    const handleDeleteNew = () => {
        callStateUpdateNew(
            async () => {
                try {
                    await apiDeleteNew({
                        _id: newSelect?._id || ""
                    })
                    addAlert(
                        {
                            title: "Thành công",
                            message: "Xóa tin tức thành công",
                            type: "success"
                        }
                    )
                    
                    setIsDeleteNews(false)
                    if (setIsReset) {
                        setIsReset((prevIsReset) => !prevIsReset);
                    }
                    onClose()
                } catch (error) {
                    addAlert(
                        {
                            title: "Thất bại",
                            message: "Đã có lỗi trong lúc xóa tin tức",
                            type: "error"
                        }
                    )
                }
            }
        )
    }
    return (
        <>
            <div className='bg-white p-5 rounded-lg my-4'>
                <Button
                    className='bg-gradient-to-br  from-[#8a3fd9] to-[#c163ff] text-white'
                    onClick={onClose}
                    beforeIcon={<i className="ri-arrow-left-line"></i>}
                >
                    Trở về
                </Button>
            </div>
                <h1 className="text-3xl font-semibold py-3">Thông tin tin tức {newSelect.title} </h1>
            <div className="bg-white rounded-lg p-5">
                <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-5 p-2">
                        <UploadImage
                            onFileSelect={handleFileSelect}
                            imgUrl={`${linkUrlWeb(newSelect?.image?.url )}`}/>
                    </div>
                    <div className="col-span-7">
                        <div>
                            <Input
                                value={newSelect.title}
                                onChange={(e) => setNewSelect((pre) => ({ ...pre, title: e.target.value }))}
                                labelName="Tiêu đề"
                                placeholder="Nhập tiêu đề"
                            />
                            <Input
                                value={newSelect.author}
                                onChange={(e) => setNewSelect((pre) => ({ ...pre, author: e.target.value }))}
                                labelName="Tác giả"
                            />
                        </div>
                        <div className="p-2"></div>
                    </div>
                    <div className="col-span-12">
                        <div>
                            <TextEditor
                                valueText={newSelect?.content}
                                onChange={(value: string) => {
                                    setNewSelect((pre) => ({ ...pre, content: value }))
                                }}
                            />
                        </div>
                        <div className="flex items-center gap-5 justify-end p-4">
                            <Button
                                className="bg-gradient-to-br from-[#ff8d8d] to-[#ff0000] text-white"
                                beforeIcon={<i className="ri-delete-bin-5-line"></i>}
                                onClick={() => setIsDeleteNews(true)}
                            >
                                <span className="ml-2">Xóa tin tức</span>
                            </Button>
                            <Button
                                className="bg-gradient-to-br from-[#8a3fd9] to-[#c163ff] text-white"
                                beforeIcon={<i className="ri-edit-2-line"></i>}
                                onClick={() => setIsUpdateNews(true)}
                            >
                                <span className="ml-2">Chỉnh sửa tin tức</span>
                            </Button>
                            <Button
                                className="bg-gradient-to-br from-[#ff9f93] to-[#ff6854] text-white"
                                onClick={() => setIsEditNews(true)}
                            >
                                <span>Trở về</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {isUpdateNew && (
                <ModalMessage
                    content="Bạn có muốn chỉnh sửa tin tức không ?"
                    title="Thông báo "
                    isOk={submitUpdateNew}
                    isClose={() => setIsUpdateNews(false)}
                />
            )}
            {isDeleteNew && (
                <ModalMessage
                    content="Bạn có muốn xóa tin tức này không ?"
                    title="Thông báo"
                    isOk={handleDeleteNew}
                    isClose={() => setIsDeleteNews(false)}
                />
            )}
            {isEditNews && (
                <ModalMessage
                    content="Bạn đang chỉnh tin tức, bạn có muốn thoát ?"
                    title="Lưu ý"
                    isOk={handleExitsUpdateField}
                    isClose={() => setIsEditNews(false)}
                />
            )}
        </>
    )
}
export default NewDetail