import React from 'react'
interface IPropsViewListImage {
    listImage: string[]
    onClose: () => void
    indexImg?: number
}
const ViewListImage = ({ indexImg, listImage, onClose }: IPropsViewListImage): JSX.Element => {
    const [indexImage, setIndexImage] = React.useState<number>(indexImg || 0)
    return (
        <div className='z-50 delay-200 transition-all fixed top-0 left-0 right-0 bottom-0'>
            <span className='absolute z-50 top-6 right-[80px] inline-flex items-center justify-center text-5xl cursor-pointer max-sm:right-[20px] max-sm:top-[10px]' onClick={onClose}>
                <i className="text-white ri-close-line"></i>
            </span>
            <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/70' onClick={onClose} >

            </div>
            <div className='absolute top-2/4 left-2/4 -translate-x-2/4 transition-all -translate-y-2/4 max-h-[90vh] max-sm:w-[90vw]'>
                <img src={listImage[indexImage]} className='max-h-[90vh] ' />
            </div>
            {
                listImage.length > 1 && (
                    <>
                        <button className='absolute left-0 top-0 bottom-0 transition-all hover:bg-white/10 text-white text-7xl' onClick={() => setIndexImage((pre) => (pre - 1 < 0 ? listImage.length - 1 : pre - 1))}>
                            <i className="ri-arrow-drop-left-line"></i>
                        </button>
                        <button className='absolute right-0 top-0 bottom-0 transition-all hover:bg-white/10 text-white text-7xl' onClick={() => setIndexImage((pre) => (pre + 1 > listImage.length - 1 ? 0 : pre + 1))} >
                            <i className="ri-arrow-drop-right-line"></i>
                        </button>
                    </>
                )
            }
        </div>
    )
}
export default ViewListImage