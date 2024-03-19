import Tooltip from './Tooltip'
import { formatBytes } from '@/utils/formatBytes'


interface IItemImageUpload{
    handleDelete?:()=>void
    handleClickView?:()=>void
    name:string,
    image:string,
    size?:number
}

const ItemImageUpload = ({handleClickView,handleDelete,name,image,size}:IItemImageUpload):JSX.Element=>{
    const handleDeleteImage = () =>{
        if(handleDelete){
            handleDelete()
        }
    }

    const handleClickToView = () =>{
        if(handleClickView){
            handleClickView()
        }
    }
    return(
        <div className="bg-gray-100 w-full p-1 flex justify-between items-center rounded-lg relative ">
            <div className="group w-[60px] relative h-[60px] inline-block bg-white overflow-hidden rounded-lg m-1 cursor-pointer"
              onClick={handleClickToView}>
              <div className="hidden absolute group-hover:flex items-center justify-center w-full h-full bg-black/40 z-30">
                <span className="rotate-45 block">
                  <i className="ri-drag-move-2-fill  text-white text-3xl"></i>

                </span>
              </div>
              <img
                src={image}
                alt={`Image ${name}`}
                className="h-full w-full object-cover "
              />
            </div>
            <div className="flex flex-1 flex-col justify-evenly px-2 h-full">
              <h3 className="overflow-hidden w-[150px] h-6 line-clamp-1 font-medium ">
                {name}
              </h3>
              <span className="text-sm text-gray-600 font-medium">
                {formatBytes(size || 1024)}
              </span>
            </div>
            <div className="inline-block">
              <Tooltip name="Xóa ảnh">
                <span
                  className=" rounded-full p-3 bg-red-500 text-white w-[35px] h-[35px] flex items-center justify-center cursor-pointer"
                  onClick={handleDeleteImage}
                >
                  <i className="ri-delete-bin-7-line"></i>
                </span>
              </Tooltip>
            </div>
          </div>
    )
}
export default ItemImageUpload