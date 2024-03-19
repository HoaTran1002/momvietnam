import { useAlertMessage } from '@/contexts/AlertContext';
import React from 'react'
import Button from '../Buttons';
import CardProduct from './CardProduct';
import ModalMessage from '../ModalMessage';
import { useProductState } from '@/contexts/ProductContext';
import { IProduct } from '@/interface/product.interface';
import useFetch from '@/hooks/useFetch.hook';
import { apiDeleteProduct } from '@/apis/product.api';
import LoadingPage from '../Loading/LoadingPage';
import ProductDetail from '@/pages/Admin/Products/ProductDetail';
import { CategoryProvider } from '@/contexts/CategoryContext';
interface IListProducts {
  handleCloseDetail: () => void
}
const ListProducts = ({ handleCloseDetail }: IListProducts): JSX.Element => {
  const [_open, setIsOpen] = React.useState<boolean>(false);
  const { listProduct, setIsReset, loading } = useProductState();
  const [listProductDelete, setListProductDelete] = React.useState<boolean>(false)
  const [deleteProduct, setDeleteProduct] = React.useState<boolean>(false)
  const [_isSave, setIsSave] = React.useState<boolean>(true);
  const [_isShowMessage, setIsShowMessage] = React.useState<boolean>(false);
  const [listChange, setListChange] = React.useState<boolean>(true)
  const [selectedProducts, setSelectedProducts] = React.useState<IProduct[]>([]);
  const { addAlert } = useAlertMessage();
  const [productCurrent, setProductCurrent] = React.useState<IProduct | undefined>(undefined);
  const [_productState, callProductState] = useFetch();

  //=================================
  const handleToggleCheck = (selectedProduct: IProduct) => {
    console.log(selectedProduct);

    const isProductSelected = selectedProducts.some((product: IProduct) => product.name === selectedProduct.name);
    if (isProductSelected) {
      setSelectedProducts((prevSelectedProducts) => prevSelectedProducts.filter((product) => product.name !== selectedProduct.name));
    } else {
      setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts, selectedProduct]);
    }
  };
  // const handleCloseModal = (): void | JSX.Element => {
  //   if (isSave) {
  //     setIsShowMessage(false);
  //     setIsOpen(false);
  //   } else {
  //     setIsShowMessage(true);
  //   }
  // };
  // const handleSubmitProduct = (): void => {
  //   setIsSave(true);
  //   addAlert({
  //     message: "Lưu thành công",
  //     title: "Thành công",
  //     type: "success",
  //   });
  // };
  const showProductDetail = (item: IProduct): void => {
    setIsOpen(true);
    setIsSave(false);
    setProductCurrent(item);
  };
  const handleDeleteProduct = () => {
    if (productCurrent) {
      callProductState(
        async () => {
          try {
            await apiDeleteProduct(productCurrent?._id || "")
            await addAlert({
              message: `Xóa thành công sản phẩm ${productCurrent.name} `,
              title: "Thành công",
              type: "success",
            });
            if (setIsReset) setIsReset(r => !r)
            setIsOpen(false);
            setIsShowMessage(false);
            setDeleteProduct(false)
          } catch {
            await addAlert({
              message: `Xóa thất bại sản phẩm ${productCurrent.name}, kiểm tra lại đường truyền  `,
              title: "Thất bại",
              type: "error",
            });
          }
        }
      )
    }
  }
  return (
    <>
     
        {
          productCurrent ? (
            <CategoryProvider idCourse={productCurrent.idCourse || ""}>
                <ProductDetail
                productCur={productCurrent}
                  handleCloseDetail={()=>setProductCurrent(undefined)}
                />
            </CategoryProvider>
          ) : (
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
              <div className="bg-white p-5 mt-5 flex items-center justify-between w-full">
                <div className="flex items-center">
                  <div className="flex items-center gap-4">
                    <span className="ml-5">
                      Đã chọn {selectedProducts.length} sản phẩm
                    </span>

                  </div>
                  <Button
                    disabled={selectedProducts.length < 1}
                    onClick={() => setListProductDelete(true)}
                    className="bg-gradient-to-br from-[#ff9f93] to-[#ff6854] text-white ml-3"
                    beforeIcon={<i className="ri-delete-bin-line"></i>}
                  >
                    Xóa
                  </Button>
                  <Button
                    // onClick={() => setListProductDelete(true)}
                    className="bg-gradient-to-br from-[#ff9f93] to-[#ff6854] text-white ml-3"
                    beforeIcon={<i className="ri-delete-bin-line"></i>}
                  >
                    Xóa tất cả sản phẩm
                  </Button>
                </div>
                <div>
                  <div className="flex gap-4 items-center">
                    <span
                      className={` rounded w-9 h-9 flex items-center justify-center cursor-pointer ${listChange ? 'bg-[#ead6ff] text-[#8a3fd9]' : 'text-gray-700'}`}
                      onClick={() => setListChange(r => !r)}>
                      <i className="ri-microsoft-line text-2xl"></i>

                    </span>
                    <span
                      className={` rounded w-9 h-9 flex items-center justify-center cursor-pointer ${!listChange ? 'bg-[#ead6ff] text-[#8a3fd9]' : 'text-gray-700'}`}
                      onClick={() => setListChange(r => !r)}
                    >
                      <i className="ri-list-check-2 text-2xl"></i>

                    </span>
                  </div>
                </div>
              </div>
              <div className="grid-cols-12 grid gap-3 mt-4">
                {
                  loading ? (
                    <div className='col-span-12 h-[500px]'>
                      <LoadingPage width='100%' height="400px" role='admin' />
                    </div>
                  ) : (
                    listProduct?.length || 0 > 0 ? (
                      listProduct?.map((r: IProduct, index: number) => (
                        <CardProduct
                          key={index}
                          onView={() => showProductDetail(r)}
                          product={r}
                          isListHorizone={listChange}
                          isCheckProduct={selectedProducts?.some((item: IProduct) => item._id === r._id)}
                          onToggleCheck={handleToggleCheck}
                        />
                      ))

                    ) : (
                      <div className='bg-white col-span-12 font-medium  p-5 text-3xl text-gray-500 flex items-center justify-center h-[350px]' >
                        Không có sản phẩm nào
                      </div>
                    )

                  )
                }
              </div>
              {
                listProductDelete && (
                  <ModalMessage
                    content={`Bạn có muốn xóa ${selectedProducts.length} sản phẩm này không `}
                    isClose={() => setListProductDelete(false)}
                  />
                )
              }
            </>
          )
        }
      {deleteProduct && (
        <ModalMessage
          content="Bạn có muốn xóa sản phẩm này hay không "
          isOk={() => handleDeleteProduct()}
          isClose={() => setDeleteProduct(false)}
          title="Thông báo"
        />
      )}
    </>
  )
}
export default ListProducts