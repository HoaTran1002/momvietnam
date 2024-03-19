import React from "react";
import LogoImage from "@/assets/images/Logo/Logo-Horizontal.png";
import LogoImageWhite from "@/assets/images/Logo/Logo-Horizontal-white.png";
import { Link, useLocation } from "react-router-dom";
import { ISocial, listSocials } from "@/data/layouts";
import SelectLanguage from "@/components/SelectLanguage";
import NavbarLeft from "@/components/NavbarLeft";
import { IPropsheader } from "../client.interface";
import { AllSettingHeader } from "@/data/layouts";

import { useScroll } from "@/contexts/ScrollContext";
import { useTranslation } from "react-i18next";
import Tooltip from "@/components/Tooltip";
const Header = (): JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(false);
  // const [openSetting, setOpenSetting] = React.useState<boolean>(false);
  const { scrolled } = useScroll();
  const location = useLocation();
  const { t } = useTranslation("menu");

  const handleCloseNavbar = (): void => {
    setOpen(false);
  };
  const handleOpenNavbar = (): void => {
    setOpen(true);
  };


  return (
    <>
      <div className="h-9 fixed top-0 bg-secondary left-0 right-0 flex items-center z-50 justify-between px-2" >
        <div className="text-white max-sm:hidden">
          +84 947 19 47 12 - cookingclass@momvietnamvn 
        </div>
        <div className="flex gap-2">
          {
            listSocials.map((r:ISocial,index:number)=>(
              <Tooltip key={index} name={r.name}>
                <a href={r.path} target="_blank">
                  <img src={r.logo} alt={r.alt} className="h-[30px] w-[30px] rounded-sm"/>
                </a>
              </Tooltip>
            ))
          }
        </div>
      </div>
      <div className={` flex items-center justify-between top-0 mt-9 sticky left-0 px-3 py-5 right-0 h-[70px] ${scrolled?"z-50":"z-40"}`}>
        <div className={`absolute top-0 right-0 left-0 bottom-0   ${scrolled ? "bg-[#9eb26c]" : "bg-[#f3f1de]"
          }`}>

        </div>
        <div className="h-full flex-2 z-40 flex justify-center">
          <Link to={"/"}>
            {
              scrolled ? (
                <img src={LogoImageWhite} alt="Logo Website" className="h-full" />
              ):(
                <img src={LogoImage} alt="Logo Website" className="h-full" />

              )
            }
          </Link>
        </div>
        <div
          className={`max-sm:hidden w-max transition-all flex-1 flex justify-evenly items-center  duration-300  sm:flex px-6 py-4 rounded-md`}
        >
          {AllSettingHeader.map((r: IPropsheader, index: number) => {
            return (
              <Link
                key={index}
                to={r.path!}
                className={`title_header_navbar font-semibold ${scrolled
                  ? "text-white before:bg-white"
                  : "text-[#5d6940] before:bg-[#5d6940]"
                  } ${location.pathname === r.path ? "before:w-full" : ""} `}
              >
                {t(r.name as "home" | "courses" | "lessons" | "news" | "contact" | "about_us").toUpperCase()}
              </Link>
            )
          })}
        </div>
        <div
          className={`sm:hidden z-50  mr-4 p-2 transition-all duration-300 `}
          onClick={handleOpenNavbar}
        >
          <i
            className={`ri-menu-line icons-navbar text-4xl ${!scrolled ? "text-[#5d6940]" : "text-white"
              } `}
          ></i>
        </div>
        <div
          className={`max-sm:hidden flex gap-4 transition-all duration-300 px-6 py-2 rounded-md`}
        >
          <SelectLanguage />
        </div>
        {open && (
          <NavbarLeft open={open} close={handleCloseNavbar}>
            <>
              <div className="mb-12">
                <div
                  className="absolute top-5 left-5 p-2"
                  onClick={handleCloseNavbar}
                >
                  <i className="ri-arrow-left-s-line text-white text-4xl"></i>
                </div>
              </div>
              <div className="flex flex-col gap-6 items-center justify-center w-full h-full">
                {AllSettingHeader.map((r: IPropsheader, index: number) => (
                  <div key={index} className="text-white text-2xl font-light">
                    <Link to={r.path!} className="block text-center font-light">
                      <span className="ml-5">{t(r.name as "home" | "courses" | "lessons" | "news" | "contact" | "about_us")}</span>
                    </Link>
                  </div>
                ))}
                <SelectLanguage />
              </div>
            </>
          </NavbarLeft>
        )}
      </div>
    </>
  );
};
export default Header;
