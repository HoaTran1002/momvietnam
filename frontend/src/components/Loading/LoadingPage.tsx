// import * as React from "react";

// LoadingPage.js hoặc tên tập tin bạn đang sử dụng
// import React from "react";
import "./style.css"; // Đường dẫn đến tập tin CSS
interface ILoadingPage {
  height:string;
  width:string;
  role?:string;
}
export default function LoadingPage({role = "client",...props}:ILoadingPage) {
  return (
    <div className={`w-[${props.width}] h-[${props.height}] flex items-center justify-center`} >
      <div className={`square-loading ${role === "client" ? "bg-[#9eb26c]":"bg-[#c163ff]"}`}>
      </div>
    </div>
  );
}
