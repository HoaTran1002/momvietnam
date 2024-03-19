
import useFetch from '@/hooks/useFetch.hook';
import React, { ReactNode, createContext, useContext, useState } from 'react';
import { useAlertMessage } from './AlertContext';
import { INew } from '@/interface/news.interface';
import { apiGetNews } from '@/apis/news.api';

interface INewsContext {
    listNews?: INew[]
    loading?: boolean
    isReset?: boolean;
    page?:number;
    items?:number;
    total_pages?:number;
    setPage?:React.Dispatch<React.SetStateAction<number>>;
    setItems?:React.Dispatch<React.SetStateAction<number>>;
    setIsReset?: React.Dispatch<React.SetStateAction<boolean>>;
    setTotalPages?: React.Dispatch<React.SetStateAction<number>>;
}

const NewsContext = createContext<INewsContext | undefined>(undefined);

export const useNewsState = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNewsNavbar must be used within a NewsProvider');
  }
  return context;
};

interface INewsProviderProps {
  children: ReactNode;
}

export const NewsProvider: React.FC<INewsProviderProps> = ({ children}: INewsProviderProps) => {
  const [isReset, setIsReset] = useState<boolean>(true);
  const [page,setPage] = React.useState<number>(1);
  const [totalPages,setTotalPages] = React.useState<number>(1);
  const [items,setItems] = React.useState<number>(50)
  const [newsState, callNewsState] = useFetch();
  const [news,setNews] = React.useState<INew[]>([])
  const {addAlert} = useAlertMessage();
  React.useEffect(() => {
    callNewsState(
      async () => {
        try {
          const data = await apiGetNews(page,items)
          setNews(data?.data?.data);
          setTotalPages(data?.data?.total_pages)
        } catch {
          addAlert({
            title:"Lỗi",
            message:"Đã có lỗi trong quá trình tải danh mục, vui lòng thử lại sau ",
            type:"error"
          })
        }
      }
    )
  }, [isReset,page,items])

  const contextValue: INewsContext = {
    isReset,
    setIsReset,
    page,
    total_pages:totalPages,
    items,
    loading: newsState?.loading,
    listNews: news,
    setPage,
    setItems,
    setTotalPages
  };

  return (
    <NewsContext.Provider value={contextValue}>
      {children}
    </NewsContext.Provider>
  );
};
