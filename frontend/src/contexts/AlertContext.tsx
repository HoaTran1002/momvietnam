import AlertMessage, { IPropsAlertMessage } from '@/components/AlertMessage';
import React, { createContext, useContext, useState } from 'react';

interface IAlertContextProps {
  children: JSX.Element;
}

interface IAlertContext {
  addAlert: (alert: IPropsAlertMessage) => void;
}

const AlertContext = createContext<IAlertContext | undefined>(undefined);

export const useAlertMessage = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlertMessage must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider: React.FC<IAlertContextProps> = ({ children }: IAlertContextProps) => {
  const [alerts, setAlerts] = useState<IPropsAlertMessage[]>([]);

  const addAlert = (alert: IPropsAlertMessage) => {
    setAlerts((prevAlerts) => [...prevAlerts, alert]);
  };

  const contextValue: IAlertContext = {
    addAlert,
  };
  return (
    <AlertContext.Provider value={contextValue}>
      {children}
      <div id="toast" className='fixed w-0 z-50 bottom-4 left-0 translate-x-3 transition-all flex flex-col-reverse gap-4 h-[400px]  max-sm:w-0 justify-start '>
        {alerts.map((alert, index) => (
          <AlertMessage key={index} {...alert} />
        ))}
      </div>
    </AlertContext.Provider>
  );
};
