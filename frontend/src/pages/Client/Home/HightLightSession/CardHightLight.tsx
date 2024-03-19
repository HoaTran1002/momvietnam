import LoadingPage from '@/components/Loading/LoadingPage'
import React from 'react'
import ViewAroundGiveWay from "@/assets/images/Views/give_a_way.jpg";

import { LazyLoadImage } from 'react-lazy-load-image-component'
import ViewListImage from '@/components/ViewListImage';
const CardHightLightSession = (): JSX.Element => {
    const [viewImage, setViewImage] = React.useState<boolean>(false)
    return (
        <>
            <LazyLoadImage onClick={() => setViewImage(true)} placeholder={<LoadingPage height="475px" width="100%" />} src={ViewAroundGiveWay} className="w-full h-full object-cover" alt="" />
            <div
                className="group absolute bottom-0 left-0 flex items-center justify-center right-0 py-2 px-3 bg-[#9eb26c]/80 min-h-[70px] hover:bg-white/80  transition-all cursor-pointer"
                onClick={() => setViewImage(true)}
            >
                <div className="text-white w-full h-full uppercase flex flex-col tracking-widest text-center text-xl font-medium group-hover:text-[#9eb26c]">
                    <span className="text-sm">HIGHT LIGHT</span>
                    <span className="text-base">Give away gift</span>
                </div>
            </div>
            {
                viewImage && (
                    <ViewListImage
                        listImage={[ViewAroundGiveWay]}
                        onClose={() => setViewImage(false)}
                    />
                )
            }
        </>
    )
}
export default CardHightLightSession