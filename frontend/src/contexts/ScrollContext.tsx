import React, { createContext, useContext, useState, useEffect } from "react";

interface ScrollContextProps {
  scrolled: boolean;
}

const ScrollContext = createContext<ScrollContextProps>({ scrolled: false });

export const useScroll = () => {
  return useContext(ScrollContext);
};

interface ScrollProviderProps {
  children: JSX.Element;
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({
  children,
}: ScrollProviderProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ scrolled }}>
      {children}
    </ScrollContext.Provider>
  );
};
