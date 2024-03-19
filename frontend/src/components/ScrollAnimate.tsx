import React, { useEffect, useRef, useState } from "react";

interface IScrollAnimate {
  children: JSX.Element;
}

const ScrollAnimate: React.FC<IScrollAnimate> = ({
  children,
}: IScrollAnimate): JSX.Element => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const newIsVisible =
          rect.top <= window.innerHeight &&
          rect.bottom >= 0 &&
          rect.left <= window.innerWidth &&
          rect.right >= 0;
        if (newIsVisible !== isVisible) {
          setIsVisible(newIsVisible);
        }
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [isVisible]);

  return (
    <div
      ref={elementRef}
      className={` ${
        isVisible
          ? "transition-all duration-700 translate-y-0 opacity-100"
          : "translate-y-full opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

export default ScrollAnimate;
