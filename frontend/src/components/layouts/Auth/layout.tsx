// import React from "react";
import { IPorpsLayoutAuth } from "@/interface/auth.interface";
import Logo from "@/assets/images/Logo/Logo-Horizontal.png";
import bg_Auth from "@/assets/images/Views/z4689941080887_08a34fc53c3e1611e70000aecc659bbd.jpg";
const LayoutAuth = ({ ...prop }: IPorpsLayoutAuth): JSX.Element => {
  return (
    <div
      className="fixed w-screen h-screen bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${bg_Auth})` }}
    >
      <div className="rounded-md absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 bg-white p-3 w-5/6 sm:w-[550px] ">
        <div className="flex justify-center sm:items-center sm:flex sm:justify-center">
          <img src={Logo} alt="" className="h-16 w-16" />
        </div>
        <div>{prop.children}</div>
      </div>
    </div>
  );
};
export default LayoutAuth;
