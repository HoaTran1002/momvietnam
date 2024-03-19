// import React from 'react'
interface IPropsProductDetail {
  name: string;
  description: string;
  image: string;
  onClose: () => void;
}
const ProductDetail = ({ ...props }: IPropsProductDetail): JSX.Element => {
  return (
    <div className="z-50">
      <div
        className="fixed top-0 bottom-0 left-0 right-0 bg-slate-950/40 z-50"
        onClick={props.onClose}
      ></div>
      <div className="fixed z-50 top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 h-5/6 w-5/6 bg-white rounded">
        <span
          className="absolute right-2 top-2 text-3xl cursor-pointer"
          onClick={props.onClose}
        >
          <i className="ri-close-line"></i>
        </span>
      </div>
    </div>
  );
};
export default ProductDetail;
