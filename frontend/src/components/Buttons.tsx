import React, { ButtonHTMLAttributes } from 'react';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  customProp?: string;
  className?: string;
  beforeIcon?: JSX.Element;
  afterIcon?: JSX.Element;
  isLoading?: boolean
}

// Tạo hàm hoặc class cho CustomButton
const Button: React.FC<CustomButtonProps> = ({ isLoading, beforeIcon, afterIcon, className, customProp, ...props }) => {

  return (
    isLoading ? (
      <button {...props} className={`py-2 px-5 rounded ${className} hover:opacity-95 transition-all`} disabled  >
        <span className='animate-spin inline-block mr-2'>
          <i className="ri-loader-4-line text-base"></i>
        </span>
        <span>
          Đang thực thi
        </span>
      </button>
    ) : (
      <button {...props} className={`py-2 px-5 rounded ${className} ${props.disabled ? 'opacity-70':"opacity-100"} hover:opacity-90 transition-all`} >
        <span className='mr-2'>
          {beforeIcon}
        </span>
        {customProp} {props.children}
        <span className='ml-2'>
          {afterIcon}
        </span>
      </button>
    )
  )
};

export default Button;
