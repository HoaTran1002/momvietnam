// import React from 'react'
interface IPropsProductDetail {
  isOpen?: boolean;
  styleModalClass?: string;
  children?: JSX.Element;
  onClose: () => void;
  styleClose?:string;
}
const ModalBox = ({ ...props }: IPropsProductDetail): JSX.Element => {
  return (
    <div
      className={`transition-all fixed bottom-0 left-0 right-0 top-0 z-50 duration-300 ${
        props.isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}   
    >
      <div
        className="absolute bg-slate-950/40 z-20 w-full h-full"
        onClick={props.onClose}
      ></div>
      <div
        className={`${props.styleModalClass} z-50 absolute  top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 h-5/6 w-5/6 bg-white rounded-sm`}
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="absolute right-2 top-2 text-3xl cursor-pointer"
          onClick={props.onClose}
        >
          <i className={`ri-close-line ${props.styleClose && props.styleClose }`}></i>
        </span>
        {props.children}
      </div>
    </div>
  );
};
export default ModalBox;
