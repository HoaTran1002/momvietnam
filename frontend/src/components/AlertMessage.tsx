import React from "react";
export interface IPropsAlertMessage {
  title: string;
  message: string | JSX.Element;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
}
const AlertMessage = ({
  title,
  message,
  type,
  duration,
}: IPropsAlertMessage): JSX.Element | null => {
  const iconType = {
    success: {
      icon: <i className="ri-checkbox-circle-fill"></i>,
      color: "text-green-500",
      bg: "bg-green-500",
    },
    error: {
      icon: <i className="ri-close-circle-fill"></i>,
      color: "text-red-500",
      bg: "bg-red-500",
    },
    warning: {
      icon: <i className={`ri-error-warning-fill`}></i>,
      color: "text-yellow-500",
      bg: "bg-yellow-500",
    },
    info: {
      icon: <i className="ri-information-fill"></i>,
      color: "text-blue-500",
      bg: "bg-blue-500",
    },
  };
  const [isVisible, setIsVisible] = React.useState<boolean>(true);
  const onAnimationEnd = () => {
    if (!isVisible) {
      setIsVisible(false);
    }
  };
  React.useEffect(() => {
    const timeout = setTimeout(
      async () => {
        setIsVisible(false);
      },
      (duration || 3000) + 1000
    );

    return () => clearTimeout(timeout);
  }, []);

  return isVisible ? (
    <div
      className={`transition-all  bg-white rounded-sm shadow-xl max-w-[450px] w-full p-2 min-w-[400px] max-sm:min-w-[90vw] flex`}
      style={{
        animation: `slideInLeft ease .5s,fadeOut ease .5s ${(
          (duration || 3000) / 1000
        ).toFixed(2)}s forwards`,
      }}
      onAnimationEnd={onAnimationEnd}
    >
      <span className={`w-[3px]  block rounded-md ${iconType[type].bg}`}></span>
      <div
        className={`flex items-center justify-center px-3 text-3xl ${iconType[type].color}`}
      >
        {iconType[type].icon}
      </div>
      <div className="flex flex-col justify-center grow">
        <h2 className="text-base font-semibold">{title}</h2>
        <div>{message}</div>
      </div>
    </div>
  ) : null;
};

export default AlertMessage;
