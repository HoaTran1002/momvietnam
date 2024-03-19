
import useFetch from '@/hooks/useFetch.hook';
import React, { ReactNode, createContext, useContext, useState } from 'react';
import { useAlertMessage } from './AlertContext';
import { IFaq } from '@/interface/faq.interface';
import {  apiGetFaqsPagination } from '@/apis/faq.apis';

interface IFaqContext {
    listFaq?: IFaq[]
    loading?: boolean
    isReset?: boolean;
    total_pages?:number;
    page?:number;
    items?:number
    setPage?:React.Dispatch<React.SetStateAction<number>>;
    setItems?:React.Dispatch<React.SetStateAction<number>>;
    setIsReset?: React.Dispatch<React.SetStateAction<boolean>>;
}

const FaqContext = createContext<IFaqContext | undefined>(undefined);

export const useFaqState = () => {
  const context = useContext(FaqContext);
  if (!context) {
    throw new Error('useFaqNavbar must be used within a FaqProvider');
  }
  return context;
};

interface IFaqProviderProps {
  children: ReactNode;
}

export const FaqProvider: React.FC<IFaqProviderProps> = ({ children}: IFaqProviderProps) => {
  const [isReset, setIsReset] = useState<boolean>(true);
  const [page,setPage] = React.useState<number>(1)
  const [items,setItems] = React.useState<number>(50)
  const [faqState, callFaqState] = useFetch();
  const [faqs,setFaqs] = React.useState<IFaq[]>([])
  const [totalPage,setTotalPage] = React.useState<number>(0)
  const {addAlert} = useAlertMessage();
  React.useEffect(() => {
    callFaqState(
      async () => {
        try {
          const data = await apiGetFaqsPagination(page,items)
          setFaqs(data?.data?.data?.data);
          setTotalPage(data?.data?.data?.total_pages);
          
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

  const contextValue: IFaqContext = {
    isReset,
    setIsReset,
    loading: faqState?.loading,
    listFaq: faqs,
    setPage,
    page,
    items,
    setItems,
    total_pages:totalPage
  };

  return (
    <FaqContext.Provider value={contextValue}>
      {children}
    </FaqContext.Provider>
  );
};
