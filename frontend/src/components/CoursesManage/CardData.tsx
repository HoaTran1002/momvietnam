// import * as React from "react";

// import DrawerButton from "./Drawer";
import { ICourse } from "@/interface/courses.interface";
import { getLastPathComponent } from "@/utils/getLastArray";
import Tooltip from "../Tooltip";
// import ModalMessage from "../ModalMessage";
interface IProps {
  course?: ICourse;
  onClick?: () => void;
}

export default function CardData({
  course,
  onClick,
}: IProps): JSX.Element {
  return (
    <>
      <div className="bg-white rounded-lg p-5 w-full hover:bg-[#faf5ff] transition-all cursor-pointer" onClick={onClick}>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-[150px] h-[150px] rounded-lg overflow-hidden flex-none">
              <img loading="lazy" src={`https://momvietnam.vn/content/${getLastPathComponent(course?.images?.[0]?.url || "")}`} alt={course?.title} className="w-full h-full object-cover"/>
            </div>
            <div className="px-5 flex gap-3 flex-col justify-between">
              <Tooltip name={course?.title} position="bottom_left">
                <h2 className="text-3xl font-medium line-clamp-1">{course?.title}</h2>
              </Tooltip>
              <p className="text-base text-[#666666] line-clamp-2">{course?.description}</p>
              <span className="text-gray-700 font-medium text-xl">
                Trước khi giảm giá: <span className="text-[#8a3fd9]">${course?.price}</span>
              </span>
              <span className="text-gray-700 font-medium text-xl">
                Sau khi giảm giá: <span className="text-[#8a3fd9]">${course?.discountPrice}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
