
import useFetch from '@/hooks/useFetch.hook';
import React, { ReactNode, createContext, useContext, useState } from 'react';
import { useAlertMessage } from './AlertContext';
import { ICategory } from '@/interface/category.interface';
import { apiGetCategoryByIdCourse } from '@/apis/category.api';

interface ICategoryContext {
    idCourse:string
  listCategory?: ICategory[]
  loading?: boolean
  isReset?: boolean;
  setIsReset?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryContext = createContext<ICategoryContext | undefined>(undefined);

export const useCategoryState = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategoryNavbar must be used within a CategoryProvider');
  }
  return context;
};

interface ICategoryProviderProps {
  children: ReactNode;
  idCourse:string
}

export const CategoryProvider: React.FC<ICategoryProviderProps> = ({ children ,idCourse}: ICategoryProviderProps) => {
  const [isReset, setIsReset] = useState<boolean>(true);
  const [categoryState, callCategoryState] = useFetch();
  const [category,setCategory] = React.useState<ICategory[]>([])
  const {addAlert} = useAlertMessage();
  React.useEffect(() => {
    callCategoryState(
      async () => {
        try {
          const data = await apiGetCategoryByIdCourse(idCourse)
          setCategory(data?.data?.data);
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

  const contextValue: ICategoryContext = {
    idCourse,
    isReset,
    setIsReset,
    loading: categoryState?.loading,
    listCategory: category
  };

  return (
    <CategoryContext.Provider value={contextValue}>
      {children}
    </CategoryContext.Provider>
  );
};
