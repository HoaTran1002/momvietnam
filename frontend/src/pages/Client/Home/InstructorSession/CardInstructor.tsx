// import React from 'react'
import ViewAroundInstructor from "@/assets/images/Chef/instuctors_2.jpg";
import LoadingPage from "@/components/Loading/LoadingPage";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const CardInstructorSession = ():JSX.Element=>{
    return(
        <>
            <LazyLoadImage  placeholder={<LoadingPage height="475px" width="100%"/>} src={ViewAroundInstructor} className="w-full h-full object-cover" alt="" />
                <div className="group absolute cursor-default bottom-0 left-0 flex items-center justify-center right-0 py-2 px-3 bg-[#9eb26c]/80 min-h-[70px] hover:bg-white/80  transition-all">
                  <Link
                    to={'/giang-vien'}
                    className="text-white cursor-pointer w-full h-full uppercase flex flex-col tracking-widest text-center text-xl font-medium group-hover:text-[#9eb26c]"
                  >
                    <span className="text-sm">INSTRUCTOR</span>
                    <span className="text-base">Instructor in MOM studio</span>
                  </Link>
                </div>
        </>
    )
}
export default CardInstructorSession