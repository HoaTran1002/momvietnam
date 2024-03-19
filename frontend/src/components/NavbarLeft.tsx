// import React from "react";
export interface IPropsNavbarLeft {
  children: JSX.Element;
  open: boolean;
  close: () => void;
}
const NavbarLeft = ({ ...props }: IPropsNavbarLeft): JSX.Element => {
  return (
    <>
      <div className=" w-screen bottom-0 left-0 h-screen top-0 transition-all duration-200 fixed z-50">
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-gray-950/50 z-50"
          onClick={props.close}
        ></div>
        <div className="menu_animation absolute h-screen w-screen top-0 bottom-0 bg-[#9eb26c]/80 z-50 p-10 overflow-y-scroll">
          {props.children}
        </div>
      </div>
    </>
  );
};
export default NavbarLeft;
