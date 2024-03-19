// import React from 'react'
import Header from "../Header";
import Footer from "../Footer";
// import React from 'react';
// import MouseTracker from "@/components/MouseTracker";

interface IPropsMain {
  children: JSX.Element;
}
const LayoutMain = ({ ...props }: IPropsMain): JSX.Element => {
  return (
    <>
      {/* <MouseTracker /> */}
      <Header />
      <div className="main-app">{props.children}</div>
      <Footer />
    </>
  );
};
export default LayoutMain;
