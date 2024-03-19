import React from "react";
import {
  IPropsheader,
  IPropsheaderChildren,
} from "../layouts/Client/client.interface";
import { Link, useLocation } from "react-router-dom";
import { useCollapseNavbar } from "@/contexts/CollapseNavbar";
// import { useTranslation } from "react-i18next";
interface IPropsItemNavbar {
  item: IPropsheader;
}
const ItemNavbar = ({ item }: IPropsItemNavbar): JSX.Element => {
  const location = useLocation();
  const { isCollapse, handleChangeStatus } = useCollapseNavbar()
  const [open, setIsOpen] = React.useState<boolean>(
    () =>
      item?.children?.some((child) => child.path === location.pathname) ?? false
  );

  return (
    <div>
      <div
        className={`${item?.children?.some((child) => child.path === location.pathname) ||
          item.path === location.pathname
          ? "bg-gradient-to-br from-[#8a3fd9] to-[#c163ff] text-white"
          : "text-[#626262] bg-transparent"
          } transition-all duration-300 font-medium py-2 px-4 rounded-lg cursor-pointer`}
        onClick={() => setIsOpen((r) => !r)}
      >
        <div className="flex font-normal items-center justify-between">
          <div className={`${isCollapse ? "flex items-center" : "flex items-center justify-center w-full"}`} onClick={isCollapse ? undefined : () => handleChangeStatus(!isCollapse)}>
            <span className={`${isCollapse ? "text-2xl" : "text-2xl"}`}>{item.icon}</span>
            {
              isCollapse && (
                item.path ? (
                  <Link to={item.path} className="ml-2 text-base">
                    {item.name}
                  </Link>
                ):(
                  <span className="ml-2 text-base">{item.name}</span>

                )
              )
            }
          </div>
          {item.children && isCollapse && (
            <span
              className={`transition-all duration-300 ${open ? "rotate-90" : "rotate-0"
                } `}
            >
              <i className="ri-arrow-right-s-line"></i>
            </span>
          )}
        </div>
      </div>
      {item?.children && isCollapse && open && (
        <div className="flex flex-col pt-4">
          {item?.children?.map((r: IPropsheaderChildren, index: number) => (
            <div
              key={index}
              className="flex py-3 pl-6 relative items-center gap-3 before:absolute before:w-[2px] before:h-[18px] before:bg-[#a5a5a5] before:-top-2 before:left-[27px] cursor-pointer"
            >
              <span
                className={`w-2 h-2 rounded-full block ${r.path === location.pathname ? "bg-[#8a3fd9]" : "bg-[#a5a5a5]"
                  } flex-none`}
              ></span>
              <Link
                to={r.path}
                className={`${r.path === location.pathname
                  ? "font-medium"
                  : "text-[#a5a5a5]"
                  }`}
                onClick={() => {
                  setIsOpen((prevState) => !prevState);
                }}
              >
                {r.name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ItemNavbar;
