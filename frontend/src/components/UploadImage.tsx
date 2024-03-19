import React, { memo } from "react";
import Tooltip from "./Tooltip";
import ViewListImage from "./ViewListImage";
import { useAlertMessage } from "@/contexts/AlertContext";
import { formatBytes } from "@/utils/formatBytes";
export interface IPropUploadImage {
    children?: JSX.Element;
    imgUrl?: string;
    className?:string
    onFileSelect?: (file: File) => void;
}
const UploadImage = ({ children,className, imgUrl = "", onFileSelect }: IPropUploadImage): JSX.Element => {
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [openImage, setOpenImage] = React.useState<boolean>(false);
    const { addAlert } = useAlertMessage();
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file !== undefined && (file.size || 0) > 10 * 1024 * 1024) {
            addAlert(
                {
                    title: "Cảnh báo",
                    message: "Tệp ảnh có dung lượng khá lớn hơn 10MB điều này có thể khiến cho trang website chạy chậm, cân nhắc giảm dung lượng ảnh nhỏ hơn 5MB hoặc sử dụng ảnh có đuôi .webp",
                    type: "warning",
                    duration: 15000
                }
            )
        }

        setSelectedFile(file || null);
        if (onFileSelect && file) {
            onFileSelect(file);
        }
    };
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    return (
        <>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />
            <div className={`w-full h-[300px] overflow-hidden relative rounded-sm border border-dashed border-[#bd57ff] ${className} `}  >
                <div className="w-full h-full absolute flex flex-col justify-center items-center text-[#bd57ff] " onClick={handleButtonClick}>
                    <span className='w-16 h-16 rounded-full flex items-center justify-center bg-[#f7ecff] cursor-pointer'>
                        <i className="ri-upload-cloud-line text-4xl"></i>
                    </span>
                    <h2 className='text-lg font-medium text-gray-500'>
                        Nhấn hoặc thả hình ảnh vào để hiển thị
                    </h2>
                </div>
                {children}
                {selectedFile ? (
                    <>
                        <div className="absolute z-20 bottom-[60px] right-2 inline-flex items-center justify-center cursor-pointer w-11 h-11 rounded-full bg-gray-900/80" onClick={() => setOpenImage(true)}>
                            <Tooltip name="Xem ảnh">
                                <span className="block w-full h-full">
                                    <i className="ri-fullscreen-fill text-white text-xl"></i>
                                </span>
                            </Tooltip>
                        </div>
                        <div className='w-full absolute z-10 h-full bg-white'>
                            <img className='w-full h-full object-cover' src={URL.createObjectURL(selectedFile)} alt={selectedFile?.name} />
                            <span onClick={handleButtonClick} className='flex w-11 h-11 items-center justify-center rounded-full bg-[#f7ecff] text-[#bd57ff] absolute right-2 bottom-2 hover:bg-[#bd57ff] hover:text-white transition-all duration-300'>
                                <i className="ri-image-edit-line text-xl cursor-pointer"></i>
                            </span>
                        </div>
                    </>
                ) : (
                    (imgUrl === "") ? (
                        null
                    ) : (
                        <>
                            <div className="absolute z-20 bottom-[60px] right-2 inline-flex items-center justify-center cursor-pointer w-11 h-11 rounded-full bg-gray-900/80" onClick={() => setOpenImage(true)}>
                                <Tooltip name="Xem ảnh">
                                    <span className="block w-full h-full">
                                        <i className="ri-fullscreen-fill text-white text-xl"></i>
                                    </span>
                                </Tooltip>
                            </div>
                            <div className='w-full absolute z-10 h-full bg-white'>
                                <img className='w-full h-full object-cover' src={imgUrl} alt="Image sub Item" />
                                <span onClick={handleButtonClick} className='flex w-11 h-11 items-center justify-center rounded-full bg-[#f7ecff] text-[#bd57ff] absolute right-2 bottom-2 hover:bg-[#bd57ff] hover:text-white transition-all duration-300'>
                                    <i className="ri-image-edit-line text-xl cursor-pointer"></i>
                                </span>
                            </div>
                        </>
                    )
                )}
            </div>
            {
                selectedFile && (
                    <div className="flex flex-col gap-4 mt-4">
                        <span>
                            Tên: {selectedFile?.name}

                        </span>
                        <span>
                            Size: {formatBytes(selectedFile?.size)}
                        </span>
                    </div>
                )
            }
            {
                (selectedFile && openImage) && (
                    <ViewListImage
                        listImage={[URL.createObjectURL(selectedFile)]}
                        onClose={() => setOpenImage(false)}
                    />
                )
            }
            {
                (imgUrl !== "" && openImage) && (
                    <ViewListImage
                        listImage={[imgUrl]}
                        onClose={() => setOpenImage(false)}
                    />
                )
            }
        </>
    )
}
export default memo(UploadImage)
