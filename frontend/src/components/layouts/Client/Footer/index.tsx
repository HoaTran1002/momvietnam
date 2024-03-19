// import React from 'react'
import Logo from "@/assets/images/Logo/logo-removebg-preview.png";
// import facebook from "@/assets/images/Socials/facebook.png";
// import youtube from "@/assets/images/Socials/youtube.png";
// import instagram from "@/assets/images/Socials/instagram.png";
// import twitter from "@/assets/images/Socials/twitter.png";
import { Link } from "react-router-dom";
// import { IPropsFooterItem, ItemsFooter } from "../client.interface";
import { FooterItems, ISocial, listSocials } from "@/data/layouts";
import { IPropsFooterItem } from "../client.interface";
import Tooltip from "@/components/Tooltip";
import Divider from "@/components/Divider";
import { useTranslation } from "react-i18next";
const Footer = (): JSX.Element => {
  const {t} = useTranslation('menu');
  return (
    <>
      <div className="grid grid-cols-5 max-sm:grid max-sm:grid-cols-12  grids-rows-2 bg-[#f3f1de] text-[#545f3a]">
        <div className="col-span-5 max-sm:col-span-12 flex items-center justify-center">
          <Link to={'/'}>
            <img src={Logo} alt="logo" className="h-[120px] max-sm:h-[90px]" />
          </Link>
        </div>
        {
          FooterItems.map((r: IPropsFooterItem, index: number) => (
            <div key={index} className="text-lg px-3 py-2 max-sm:col-span-6 font-normal">
              <Link to={r.path || "#"}>
                {t(r.name as "about_us_footer"| "recruitment" |"member_privileges" |"partners" |"faq" |"terms" |"policy" |"corporate" )}
              </Link>
            </div>
          ))
        }
        <div className="col-span-5 max-sm:col-span-12">
          <Divider /> 
        </div>
        <div className="flex items-center col-span-5 pb-4 z-40 justify-end px-5 max-sm:col-span-12" >
          <div className="flex gap-6">
            {
              listSocials.map((r: ISocial, index: number) => (
                <Tooltip key={index} name={r.name}>
                  <a href={r.path} target="_blank">
                    <img src={r.logo} alt={r.alt} className="h-[30px] w-[30px] rounded-sm" />
                  </a>
                </Tooltip>
              ))
            }
          </div>
        </div>
        <div className="row-span-2 max-sm:col-span-12 col-span-5 py-2 flex max-sm:flex-col justify-center items-center gap-2 bg-[#9eb26c] text-xs">
          <span className=""> © copyright 2023 momvietnam.vn</span>
        </div>
      </div>
    </>
  );
};
export default Footer;
