
import useFetch from '@/hooks/useFetch.hook';
import React, { ReactNode, createContext, useContext, useState } from 'react';
import { useAlertMessage } from './AlertContext';
import { IProduct } from '@/interface/product.interface';
import { apiGetAllProduct } from '@/apis/product.api';

interface IProductContext {
    idCourse: string
    listProduct?: IProduct[]
    loading?: boolean
    isReset?: boolean;
    setIsReset?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductContext = createContext<IProductContext | undefined>(undefined);

export const useProductState = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductNavbar must be used within a ProductProvider');
    }
    return context;
};

interface IProductProviderProps {
    children: ReactNode;
    idCourse: string
}

export const ProductProvider: React.FC<IProductProviderProps> = ({ children, idCourse }: IProductProviderProps) => {
    const [isReset, setIsReset] = useState<boolean>(true);
    const [productState, callProductState] = useFetch();
    const [products, setProducts] = React.useState<IProduct[]>([])
    const { addAlert } = useAlertMessage();
    React.useEffect(() => {
        callProductState(
            async () => {
                try {
                    const data = await apiGetAllProduct()
                    const productForCourses = data?.data?.data.filter((r:IProduct)=>r.idCourse === idCourse)
                    setProducts(productForCourses);
                } catch {
                    addAlert({
                        title: "Lỗi",
                        message: "Đã có lỗi trong quá trình tải danh mục, vui lòng thử lại sau ",
                        type: "error"
                    })
                }
            }
        )
    }, [isReset])

    const contextValue: IProductContext = {
        idCourse,
        isReset,
        setIsReset,
        loading: productState?.loading,
        listProduct: products
    };

    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    );
};
