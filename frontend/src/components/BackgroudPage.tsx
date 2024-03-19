// import React from 'react'
import ImageComingson from "@/assets/images/Views/coming_soon.jpg"
interface IBackgroundPage{
    bgName?:string,
    bgDescription?:string,
    bgImage:string
}
const BackgroundPage = ({bgImage,bgDescription,bgName}:IBackgroundPage): JSX.Element => {
    return (
        <>
            <div className="relative">
                <div className="absolute text-4xl w-screen h-[105vh] bg-slate-950/20 flex items-center justify-center px-3 z-10 text-white uppercase tracking-widest font-normal text-center flex-col gap-3">
                    <span>{bgName}</span>
                    <span className="text-base px-24 max-sm:px-1">
                        {bgDescription}
                    </span>
                </div>
                <div
                    style={{
                        backgroundImage: `url(${bgImage ?bgImage: ImageComingson})`,
                    }}
                    className="w-screen h-[105vh] bg-cover bg-fixed bg-center"
                ></div>
            </div>
        </>
    )
}
export default BackgroundPage