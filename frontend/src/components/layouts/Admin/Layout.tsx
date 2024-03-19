// import React from 'react'
import HeaderAdmin from "./HeaderAdmin";
import FooterAdmin from "./FooterAdmin";
import SideBar from "./SideBarLeft";
import { useCollapseNavbar } from "@/contexts/CollapseNavbar";

interface IPropsMainAdmin {
  children: JSX.Element;
}
const LayoutAdmin = ({ ...props }: IPropsMainAdmin): JSX.Element => {
  const { isCollapse } = useCollapseNavbar()

  return (
      <div className="flex h-screen w-screen transition-all ">
        <div className={`transition-all  duration-300 ${isCollapse ? "w-[275px]" : "w-[100px]"}`}  >
          <SideBar />
        </div>
        <div className={`transition-all flex-1 delay-200 `}>
          <HeaderAdmin />
          <div className="main-app p-5 overflow-y-scroll not-scroll-ui bg-[#f6f6f6] w-full h-[90vh]">
            {props.children}
          </div>
          <FooterAdmin />
        </div>
      </div>
  );
};
export default LayoutAdmin;
