
import useFetch from '@/hooks/useFetch.hook';
import React, { ReactNode, createContext, useContext, useState } from 'react';
import { useAlertMessage } from './AlertContext';
import { IChef } from '@/interface/chef.interface';
import { apiGetAllChefPagination } from '@/apis/chef.api';

interface IChefContext {
    listChef?: IChef[]
    loading?: boolean
    isReset?: boolean;
    setPage?:React.Dispatch<React.SetStateAction<number>>;
    setItems?:React.Dispatch<React.SetStateAction<number>>;
    setIsReset?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChefContext = createContext<IChefContext | undefined>(undefined);

export const useChefState = () => {
  const context = useContext(ChefContext);
  if (!context) {
    throw new Error('useChefNavbar must be used within a ChefProvider');
  }
  return context;
};

interface IChefProviderProps {
  children: ReactNode;
}

export const ChefProvider: React.FC<IChefProviderProps> = ({ children}: IChefProviderProps) => {
  const [isReset, setIsReset] = useState<boolean>(true);
  const [page,setPage] = React.useState<number>(1)
  const [items,setItems] = React.useState<number>(50)
  const [chefState, callChefState] = useFetch();
  const [chefs,setChefs] = React.useState<IChef[]>([])
  const {addAlert} = useAlertMessage();
  React.useEffect(() => {
    callChefState(
      async () => {
        try {
          const data = await apiGetAllChefPagination(page,items)
          setChefs(data?.data?.data);
        } catch {
          addAlert({
            title:"Lỗi",
            message:"Đã có lỗi trong quá trình tải danh mục, vui lòng thử lại sau ",
            type:"error"
          })
        }
      }
    )
  }, [isReset])

  const contextValue: IChefContext = {
    isReset,
    setIsReset,
    loading: chefState?.loading,
    listChef: chefs,
    setPage,
    setItems
  };

  return (
    <ChefContext.Provider value={contextValue}>
      {children}
    </ChefContext.Provider>
  );
};
