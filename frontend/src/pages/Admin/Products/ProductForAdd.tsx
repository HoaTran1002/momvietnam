import Button from '@/components/Buttons'
import LocalStorage from '@/utils/localStorage'
import React from 'react'
import FormServiceAdd from './ProductService/FormServiceAdd'
import FormProductAdd from './ProductService/FormProductAdd'
interface IProductForAdd {
    handleCloseDetail: () => void
}
const ProductForAdd = ({ handleCloseDetail }: IProductForAdd): JSX.Element => {
    const [isService,setIsService] = React.useState<boolean>(false)
    
    React.useEffect(()=>{
        LocalStorage.setItem<boolean>('isService',isService)
    },[isService])
    
    return (
        <>
            <div className='bg-white p-5 rounded-lg '>
                <Button
                    className='bg-gradient-to-br  from-[#8a3fd9] to-[#c163ff] text-white'
                    onClick={handleCloseDetail}
                    beforeIcon={<i className="ri-arrow-left-line"></i>}
                >
                    Trở về
                </Button>
            </div>
            <div className='flex mt-6'>
                <div className={`${!isService && 'bg-white text-sub_primary font-medium'} cursor-pointer text-2xl py-3 px-4 `} onClick={()=>setIsService(r=>!r)}>
                    Sản phẩm
                </div>
                <div className={`${isService && 'bg-white text-sub_primary font-medium'} cursor-pointer text-2xl py-3 px-4 `} onClick={()=>setIsService(r=>!r)}>
                    Dịch vụ
                </div>
            </div>
            {
                isService ? (
                    <FormServiceAdd/>
                ):(
                    <FormProductAdd/>
                )
            }
            
        </>
    )
}
export default ProductForAdd
