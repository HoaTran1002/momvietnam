// import { useAlertMessage } from "@/contexts/AlertContext";
import React, { useState, useRef } from "react";
import ViewListImage from "./ViewListImage";
import { useAlertMessage } from "@/contexts/AlertContext";
import ItemImageUpload from "./ItemImageUpload";

interface IUploadManyImages {
  onFilesSelect?: (files: FileList) => void;
}


const UploadManyImages = ({ onFilesSelect }: IUploadManyImages) => {
  const [images, setImages] = useState<string[]>([]);
  const [imagesName, setImagesName] = useState<string[]>([]);
  const [imagesSize, setImagesSize] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [openListImg, setOpenListImg] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [indexImg, setIndexImg] = useState<number>(0)
  const { addAlert } = useAlertMessage()
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const files = Array.from(e.dataTransfer.files);
    await handleFile(files[0]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setLoading(true)
      try {
        const validImageFiles = Array.from(files).filter((file) => {
          return file.type.startsWith("image/");
        });

        for (let index = 0; index < validImageFiles.length; index++) {
          const file = validImageFiles[index];
          if (file.size > 10 * 1024 * 1024) {
            await addAlert({
              title: "Cảnh báo",
              message: `Ảnh ${file.name} có kích thước lớn hơn 10 MB hãy lựa chọn 1 hình ảnh tối đa 5MB để trang web có trải nghiệm tốt nhất`,
              type: "warning",
              duration: 3000 + (index * 2000)
            })
          } else {
            await handleFile(file);
          }
        }
        const validImageFilesToHangout = Array.from(files).filter((file) => {
          return file.type.startsWith("image/") && file.size < 10 * 1024 * 1024;
        });
        
        const filelist = new DataTransfer();
        validImageFilesToHangout.forEach((file) => {
          filelist.items.add(file);
        });
        
        if (onFilesSelect) {
          onFilesSelect(filelist.files);
        }
      } finally {
        setLoading(false)
      }
    }
  };

  const handleFile = async (file: File) => {
    setImagesName((pre) => [...pre, file.name]);
    setImagesSize((pre) => [...pre, file.size]);

    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const imageUrl = event.target.result as string;
          resolve(imageUrl);
        }
      };
      reader.readAsDataURL(file);
    }).then((imageUrl) => {
      setImages((prevImages) => [...prevImages, imageUrl]);
    });

  };

  const handleOpenFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleDeleteImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);

    setImagesName((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames.splice(index, 1);
      return updatedNames;
    });

    setImagesSize((prevSizes) => {
      const updatedSizes = [...prevSizes];
      updatedSizes.splice(index, 1);
      return updatedSizes;
    });
  };
  const handleOpenViewListImage = (index: number) => {
    setOpenListImg(true)
    setIndexImg(index)
  }

  return (
    <>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleOpenFileDialog}
        className="w-max w-full px-6 py-3 overflow-hidden bg-[#bd57ff]/20 rounded-xl border border-dashed border-[#bd57ff] cursor-pointer"
      >
        <div className="flex gap-2">
          <span className="text-[#bd57ff] text-5xl">
            <i className="ri-upload-cloud-2-line"></i>
          </span>
          <p className="flex flex-col gap-2 items-start">
            <span className="text-lg font-medium">
              Drag and drop images here or click to select
            </span>
            <span className="text-[#666666] text-base">JPG,JPEG,PNG,WEBP</span>
          </p>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          multiple
          onChange={handleFileInputChange}
        />
      </div>
      <div className="gap-3 mt-2 grid grid-cols-2">
        {images.length > 0 && (
          <span className="text-base font-bold col-span-2">
            Ảnh mới được thêm
          </span>
        )}
        {images.map((imageUrl, index) => (
            <ItemImageUpload
              key={index}
              name={imagesName[index]}
              size={imagesSize[index]}
              image={imageUrl}
              handleDelete={()=>handleDeleteImage(index)}
              handleClickView={()=>handleOpenViewListImage(index)}
            />
        ))}
        {
          loading && (
            <div className="bg-gray-100 w-full p-1 flex gap-3 items-center rounded-lg relative overflow-hidden ">
              <div className=" w-[60px] relative h-[60px] inline-block bg-white overflow-hidden rounded-lg m-1 ">
                <div className=" absolute items-center justify-center w-full bg-gray-600 animate-pulse h-full bg-black/40 z-30">

                </div>
              </div>
              <div className="flex flex-col gap-4 justify-center px-2 h-full">
                <span className="block w-[150px] h-2 bg-gray-600 animate-pulse delay-100"></span>
                <span className="block w-[70px] h-2 bg-gray-600 animate-pulse delay-200"></span>
              </div>
              <div className="inline-block">

              </div>
            </div>
          )
        }
      </div>
      {
        openListImg && (
          <ViewListImage
            onClose={() => setOpenListImg(false)}
            listImage={images}
            indexImg={indexImg}
          />
        )
      }
    </>
  );
};

export default UploadManyImages;
