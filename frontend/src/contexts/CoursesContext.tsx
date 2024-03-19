import { getAllCourses } from '@/apis/courses.api';
import useFetch from '@/hooks/useFetch.hook';
import { ICourse } from '@/interface/courses.interface';
import React, { ReactNode, createContext, useContext, useState } from 'react';
import { useAlertMessage } from './AlertContext';

interface ICoursesContext {
  listCourses?: ICourse[]
  loading?: boolean
  isReset?: boolean;
  setIsReset?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CoursesContext = createContext<ICoursesContext | undefined>(undefined);

export const useCoursesState = () => {
  const context = useContext(CoursesContext);
  if (!context) {
    throw new Error('useCoursesNavbar must be used within a CoursesProvider');
  }
  return context;
};

interface ICoursesProviderProps {
  children: ReactNode;
}

export const CoursesProvider: React.FC<ICoursesProviderProps> = ({ children }: ICoursesProviderProps) => {
  const [isReset, setIsReset] = useState<boolean>(true);
  const [coursesState, callCoursesState] = useFetch();
  const [courses,setCourses] = React.useState<ICourse[]>([])
  const {addAlert} = useAlertMessage();
  React.useEffect(() => {
    callCoursesState(
      async () => {
        try {
          const data = await getAllCourses()
          setCourses(data?.data);
        } catch {
          addAlert({
            title:"Lỗi",
            message:"Đã có lỗi trong quá trình tải khóa học, vui lòng thử lại sau ",
            type:"error"
          })
        }
      }
    )
  }, [isReset])

  const contextValue: ICoursesContext = {
    isReset,
    setIsReset,
    loading: coursesState?.loading,
    listCourses: courses
  };

  return (
    <CoursesContext.Provider value={contextValue}>
      {children}
    </CoursesContext.Provider>
  );
};
