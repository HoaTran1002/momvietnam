import React from 'react'
import Button from './Buttons'
export interface IPropsModalMessage {
    title?: string
    content: string | JSX.Element

    isOk?: () => any
    isClose?: () => any
}
const ModalMessage = ({ title, content, isOk, isClose }: IPropsModalMessage): JSX.Element | null => {
    const [isOpen, setIsOpen] = React.useState<boolean>(true);
    const handleCloseMessage = (): void => {
        setIsOpen(false)
    }
    const handelIsOk = (): void => {
        isOk?.()
        setIsOpen(false)
    }
    const handelIsClose = (): void => {
        isClose?.()
        setIsOpen(false)
    }
    return isOpen ? (
        <div className={`transition-all fixed bottom-0 left-0 right-0 top-0 z-50 duration-300 ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`} >
            <div className='absolute bg-slate-950/40 z-20 w-full h-full' onClick={handleCloseMessage}>
            </div>
            <div className={`z-50 absolute px-5 py-12  top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 h-max w-[30vw] bg-white rounded-lg`} onClick={(e) => e.stopPropagation()}>
                <div className=' flex flex-col items-center'>
                    <span className='flex items-center justify-center w-14 h-14 border border-solid border-gray-400 rounded-full text-[#bd57ff] bg-[#fbf3ff]'>
                        <i className="ri-information-fill text-3xl"></i>
                    </span>
                    <h2 className='text-4xl font-semibold'>{title}</h2>
                    <p className='py-3 text-base text-gray-600'>
                        {content}
                    </p>
                </div>
                <div className='flex justify-center items-center gap-5 text-base mt-5 '>
                    <Button onClick={handelIsOk} className="bg-gradient-to-br from-[#8a3fd9] to-[#c163ff] text-white">Xác nhận</Button>
                    <Button onClick={handelIsClose} className='font-medium cursor-pointer bg-gray-200 '>
                        Trở về 
                    </Button>
                </div>
            </div>
        </div>
    ) : null
}
export default ModalMessage