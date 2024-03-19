import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ICollapseContext {
  isCollapse: boolean;
  handleChangeStatus: (status: boolean) => void;
}

const CollapseContext = createContext<ICollapseContext | undefined>(undefined);

export const useCollapseNavbar = () => {
  const context = useContext(CollapseContext);
  if (!context) {
    throw new Error('useCollapseNavbar must be used within a CollapseProvider');
  }
  return context;
};

interface ICollapseProviderProps {
  children: ReactNode;
}

export const CollapseProvider: React.FC<ICollapseProviderProps> = ({ children }: ICollapseProviderProps) => {
  const [isCollapse, setIsCollapse] = useState<boolean>(true);

  const handleChangeStatus = (status: boolean) => {
    setIsCollapse(status);
  };

  const contextValue: ICollapseContext = {
    isCollapse,
    handleChangeStatus,
  };

  return (
    <CollapseContext.Provider value={contextValue}>
      {children}
    </CollapseContext.Provider>
  );
};
