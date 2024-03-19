import React from 'react'
import { IProduct } from "@/interface/product.interface";
import { linkUrlWeb } from "@/utils/getLinkUrl";
interface IPropsCardProduct {
  onView: () => void;
  product: IProduct;
  isCheckProduct?: boolean;
  isListHorizone?: boolean;
  onToggleCheck: (product: IProduct) => void;
}
const CardProduct = ({ onView, isCheckProduct = false, product, onToggleCheck, isListHorizone = true }: IPropsCardProduct): JSX.Element => {
  const [isCheck, setIsCheck] = React.useState<boolean>(isCheckProduct)
  const handleToggleCheck = () => {
    setIsCheck((prevIsCheck) => !prevIsCheck);
    onToggleCheck(product); 
  };
  return (
    isListHorizone ? (
      <div className="col-span-3 relative shadow-sm rounded-md bg-white overflow-hidden cursor-pointer">
        <span className="absolute top-2 right-2 flex items-center justify-center bg-white w-6 h-6 rounded-sm cursor-pointer" onClick={handleToggleCheck}>
          {
            isCheck ? (
              <i className="ri-checkbox-fill text-2xl text-[#8a3fd9]"></i>
            ) : (
              <i className="ri-checkbox-blank-line text-2xl text-gray-600"></i>
            )
          }
        </span>
        <div
          style={{
            backgroundImage: `url(${linkUrlWeb(product.images?.[0]?.url || "")})`,
          }}
          className="bg-cover w-full h-[300px] bg-no-repeat "
          onClick={onView}
        ></div>
        <div className="p-4"  onClick={onView}>
          <h3 className="text-base text-[#666666] font-medium flex gap-3">
            <span>Tên Danh mục: </span><span>{product.idCourse}</span>
          </h3>
          <h3 className="text-base text-[#666666] font-medium flex gap-3">
            <span>Mốc thời gian : </span><span>{product.timeLearning}</span>
          </h3>
          <h2 className="text-xl font-medium py-2">{product.name}</h2>
        </div>
      </div >
    ) : (
      <div className="col-span-6 relative flex shadow-sm rounded-md bg-white overflow-hidden cursor-pointer" >
        <span className="absolute top-2 right-2 flex items-center justify-center bg-white w-6 h-6 rounded-sm cursor-pointer" onClick={handleToggleCheck}>
          {
            isCheck ? (
              <i className="ri-checkbox-fill text-2xl text-[#8a3fd9]"></i>
            ) : (
              <i className="ri-checkbox-blank-line text-2xl text-gray-600"></i>
            )
          }
        </span>
        <div
          style={{
            backgroundImage: `url(${linkUrlWeb(product.images?.[0]?.url || "")})`,
          }}
          onClick={onView}
          className="bg-cover w-[200px] h-[200px] bg-no-repeat "
        ></div>
        <div className="m-4 pt-5" onClick={onView}>
        <h3 className="text-base text-[#666666] font-medium flex gap-3">
            <span>Tên Danh mục: </span><span>{product.idCourse}</span>
          </h3>
          <h3 className="text-base text-[#666666] font-medium flex gap-3">
            <span>Mốc thời gian : </span><span>{product.timeLearning}</span>
          </h3>
          <h2 className="text-xl font-medium py-2">{product.name}</h2>
        </div>
      </div>
    )

  );
};
export default CardProduct;
