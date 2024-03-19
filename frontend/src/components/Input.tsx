import React, { Component } from "react";
export interface IPropsInputCustom {
  id?: string;
  labelName?: string;
  value?: string;
  placeholder?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  icon?: JSX.Element;
  defaultValue?: string;
  isError?: boolean;
  errorMessage?: string;
  type?: "text" | "email" | "password" | "text-area" | "date-time" | "number" | "date";
}

class Input extends Component<IPropsInputCustom> {
  handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };

  render() {
    const {
      placeholder,
      className,
      id,
      disabled,
      labelName,
      icon,
      readOnly,
      type,
      value = "",
      defaultValue,
      isError,
      errorMessage,
    } = this.props;
    return type === "text-area" ? (
      <div className={`mb-2 `}>
        <label
          htmlFor={id}
          className={`block mb-2 text-sm font-medium text-gray-900`}
        >
          {labelName}
        </label>
        <div className="relative">
          <textarea
            defaultValue={defaultValue}
            readOnly={readOnly}
            value={value}
            id={id}
            disabled={disabled}
            onChange={this.handleChange}
            className={`min-h-[150px] max-h-[200px] outline-none bg-gray-50 border text-sm rounded-sm focus:max-sm:ring-blue-500  focus:max-sm:border-blue-500 block w-full ${
              icon !== undefined ? "pl-10" : ""
            } p-2.5 ${className} ${
              isError
                ? "border-red-600 text-red-400"
                : "border-gray-300 text-gray-900"
            }`}
            placeholder={placeholder}
          />
        </div>
        {isError && (
          <span className="text-red-400 text-sm">{errorMessage}</span>
        )}
      </div>
    ) : (
      <div className={`mb-2 `}>
        <label
          htmlFor={id}
          className={`block mb-2 text-sm font-medium text-gray-900`}
        >
          {labelName}
        </label>
        <div className="relative">
          <div
            className={`${
              icon !== undefined
                ? "flex absolute inset-y-0 left-0 pl-3  items-center pointer-events-none"
                : "hidden"
            }`}
          >
            <span
              className={`w-5 h-5 flex items-center justify-center ${
                isError ? "text-red-400" : "text-gray-900"
              } text-gray-500`}
            >
              {icon}
            </span>
          </div>
          <input
            defaultValue={defaultValue}
            type={type}
            readOnly={readOnly}
            value={value}
            id={id}
            disabled={disabled}
            onChange={this.handleChange}
            className={`bg-gray-50 border outline-none  text-sm rounded-sm focus:max-sm:ring-blue-500  focus:max-sm:border-blue-500 block w-full ${
              icon !== undefined ? "pl-10" : ""
            } p-2.5 ${className} ${
              isError
                ? "border-red-600 text-red-400"
                : "border-gray-300 text-gray-900"
            }`}
            placeholder={placeholder}
          />
        </div>
        {isError && (
          <span className="text-red-400 text-sm">{errorMessage}</span>
        )}
      </div>
    );
  }
}

export default Input;
