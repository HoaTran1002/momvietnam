// import React from 'react'
import LoadingPage from "@/components/Loading/LoadingPage";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
interface PropsCoursesItemCard {
  index?: number
  title: string;
  subTitle?: string;
  imgUrl: string | undefined;
  path: string;
}
const CoursesItemCard = ({ index = 0, ...props }: PropsCoursesItemCard): JSX.Element => {
  return (
    <Link
      to={`/khoa-hoc/${props.path}`}

      className="w-full h-[450px]  group relative max-sm:h-[400px] flex max-sm:flex-col max-sm:w-full"
    >
      <LazyLoadImage placeholder={<LoadingPage width="100%" height="450px" />} src={props.imgUrl} alt="" className="w-full h-full object-cover" />
      <span

        className="absolute flex flex-col gap-2 text-white text-xl font-medium items-center 
                      justify-center text-center uppercase top-0 left-0 group-hover:min-h-full cursor-pointer
                       transition-all z-40 right-0 py-1 px-2 bg-[#9eb26c]/80 min-h-[0px] opacity-0 group-hover:opacity-100">
        <span>

          {props.title}
        </span>
        <span className="text-sm leading-[25px] text-white/90">
          {props.subTitle}
        </span>
      </span>
      <span
        className="bg-white text-lg font-medium uppercase absolute bottom-0 left-0 right-0 min-h-[80px] text-[#72814e] flex items-center justify-center text-center"
      >
        {props.title}
      </span>
    </Link>
  );
};
export default CoursesItemCard;
