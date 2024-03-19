// import React from 'react'
interface ITooltip {
  children: JSX.Element;
  name?:string
  position?: "top_left" |"top_right" | "bottom_right" | "left_center" | "right_center" | "bottom_left" ;
}
const Tooltip = ({name, children,position = "bottom_right" }: ITooltip): JSX.Element => {
  return (
    <div className="relative group">
      {children}
      <div className={`absolute hidden  w-max w-max-[100px] group-hover:block bg-black text-white z-50 text-xs rounded py-1 px-4 
      ${
        position === "bottom_right" ? "top-full right-0":
        position === "bottom_left" ? "top-full left-0" :
        position === "top_left" ? "-top-[30px] left-0" :
        position === "top_right" ? "-top-[30px] right-0" :
        position === "left_center" ? "left-full top-2/4 -translate-y-2/4 " :"right-full top-2/4 -translate-y-2/4"
      }`}>
        {name}
      </div>
    </div>
  );
};
export default Tooltip;
