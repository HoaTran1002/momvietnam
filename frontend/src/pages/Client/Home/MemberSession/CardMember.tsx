import LoadingPage from '@/components/Loading/LoadingPage'
import React from 'react'
import ViewAroundMembers from "@/assets/images/Views/members.jpg";

import { LazyLoadImage } from 'react-lazy-load-image-component'
import ViewListImage from '@/components/ViewListImage';
const CardMemberSession = (): JSX.Element => {
    const [viewImage, setViewImage] = React.useState<boolean>(false)
    return (
        <>
            <LazyLoadImage onClick={()=>setViewImage(true)} placeholder={<LoadingPage height="475px" width="100%" />} src={ViewAroundMembers} className="w-full h-full object-cover" alt="" />
            <span
                className="absolute flex text-white text-xl font-medium items-center 
                      justify-center text-center uppercase bottom-0 left-0 hover:min-h-full cursor-pointer
                       transition-all  right-0 py-1 px-2 bg-[#9eb26c]/80 min-h-[70px]"
                onClick={()=>setViewImage(true)}
            >
                MEMBERS
            </span>
            {
                viewImage && (
                    <ViewListImage
                        listImage={[ViewAroundMembers]}
                        onClose={() => setViewImage(false)}
                    />
                )
            }
        </>
    )
}
export default CardMemberSession