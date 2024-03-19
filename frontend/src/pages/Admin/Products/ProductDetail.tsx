import { apiDeleteProduct, apiUpdateProduct } from '@/apis/product.api'
import Button from '@/components/Buttons'
import Divider from '@/components/Divider'
import Input from '@/components/Input'
import Select, { IOption } from '@/components/Select'
import UploadManyImages from '@/components/UploadManyImages'
import { useAlertMessage } from '@/contexts/AlertContext'
import { useCategoryState } from '@/contexts/CategoryContext'
import { useProductState } from '@/contexts/ProductContext'
import useFetch from '@/hooks/useFetch.hook'
import { ICategory } from '@/interface/category.interface'
import { IProduct } from '@/interface/product.interface'
import React from 'react'
import ProductServiceDetail from './ProductService/ProductServiceDetail'
interface IProductDetail {
    productCur: IProduct,
    handleCloseDetail: () => void
}
const ProductDetail = ({ productCur, handleCloseDetail }: IProductDetail): JSX.Element => {
    const [product, setProduct] = React.useState<IProduct | undefined>(productCur)
    const [_listImageProduct, setListImageProduct] = React.useState<FileList | undefined>(undefined)
    const [productState, callProductState] = useFetch()
    const { listCategory } = useCategoryState()
    const { setIsReset } = useProductState()
    const [categories, setCategories] = React.useState<IOption | undefined>(undefined)
    const [listCategoryItems, setListCategoryItems] = React.useState<IOption | undefined>(undefined)
    const { addAlert } = useAlertMessage();
    //===================================================
    const categoryList: IOption[] = listCategory?.map((r: ICategory) => (
        {
            name: r.name,
            value: r._id
        }
    )) || []
    const categoryItems: IOption[] = (listCategory
        ?.find((r: ICategory) => r._id === categories?.value)
        ?.listTimeLearning || []).map((item: string, index: number) => ({
            name: item,
            value: index.toString()
        }));
    const handleUpdateProduct = () => {
        callProductState(async () => {
            try {
                await apiUpdateProduct({
                    name:product?.name,
                    note:product?.note,
                    timeLearning:listCategoryItems?.name,
                    idCategory:categories?.value,
                    _id:product?._id
                })
                await addAlert({
                    message: "chỉnh sửa thông tin sản phẩm thành công",
                    title: "Thành công",
                    type: "success"
                })
                if (setIsReset) setIsReset(r => !r)
            } catch {
                await addAlert({
                    message: "Chỉnh sửa thông tin sản phẩm thất bại, hãy kiểm tra lại thông tin",
                    title: "Thất bại",
                    type: "error"
                })
            }
        })
    }
    const handleDeleteProduct = () => {
        if (product) {
            callProductState(
                async () => {
                    try {
                        await apiDeleteProduct(product?._id || "")
                        await addAlert({
                            message: `Xóa thành công sản phẩm ${product.name} `,
                            title: "Thành công",
                            type: "success",
                        });
                        if (setIsReset) setIsReset(r => !r)
                        handleCloseDetail()
                    } catch {
                        await addAlert({
                            message: `Xóa thất bại sản phẩm ${product.name}, kiểm tra lại đường truyền  `,
                            title: "Thất bại",
                            type: "error",
                        });
                    }
                }
            )
        }
    }
    React.useEffect(() => {
        setCategories(() => {
            const cate = listCategory?.find((r: ICategory) => r._id === product?.idCategory);
            return (
                {
                    name: cate?.name,
                    value: cate?._id
                }
            )
        })
        setListCategoryItems(() => {
            const cateItem = (listCategory
                ?.find((r: ICategory) => r._id === product?.idCategory)
                ?.listTimeLearning || []).indexOf(product?.timeLearning || "");
                console.log(cateItem);
                
            return ({
                name: product?.timeLearning,
                value:cateItem === -1 ? '0' : cateItem.toString()
            })
        })
    }, [product, listCategory])
    console.log(categoryItems);

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
            {
                productCur.linkMenu && productCur.title !== "" ? (
                    <ProductServiceDetail
                        productService={productCur}
                        handleCloseDetail = {handleCloseDetail}
                    />
                ):(
                    <div className="bg-white rounded-bl-lg rounded-br-lg p-5">
                        <h2 className="text-3xl font-bold text-gray-600 py-4 ">Thông tin sản phẩm</h2>
                        <Divider />
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-6">
                                <h3 className="text-3xl font-medium text-gray-600 pb-4">
                                    Hình nền của sản phẩm
                                    <span className='block italic text-lg text-red-500'>

                                    </span>
                                </h3>
                                <UploadManyImages
                                    onFilesSelect={(e) => setListImageProduct(e)}
                                />
                            </div>
                            <div className="col-span-6">
                                <div className="">
                                    <h2 className="text-3xl font-medium text-gray-600">Thông tin về khóa học</h2>
                                    <div className="grid grid-cols-1 gap-5 mt-4">
                                        <div>
                                            <Input
                                                value={product?.name}
                                                labelName="Tên sản phẩm"
                                                placeholder="Điền tên sản phẩm"
                                                onChange={(e) => setProduct((pre) => ({ ...pre, name: e.target.value }))}
                                            //   isError={courseError.title !== ""}
                                            //   errorMessage={courseError.title}
                                            />
                                            <Select
                                                options={categoryList}
                                                onSelect={(e) => { setCategories(e); setProduct((pre) => ({ ...pre, idCategory: e.value })) }}
                                                lableName='Danh mục sản phẩm'
                                                value={categories?.value}
                                            />
                                            <Select
                                                options={categoryItems}
                                                onSelect={(e) => { setListCategoryItems(e); setProduct((pre) => ({ ...pre, timeLearning: e.name })) }}
                                                lableName='Mốc thời gian'
                                                value={listCategoryItems?.value}
                                            />
                                            <Input
                                                type="text-area"
                                                value={product?.note}
                                                labelName="Mô tả sản phẩm"
                                                onChange={(e) => setProduct((pre) => ({ ...pre, note: e.target.value }))}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                            <Button
                                className="bg-gradient-to-br  from-sub_primary to-sub_secondary text-white"
                                isLoading={productState?.loading}
                                beforeIcon={<i className="ri-delete-bin-line"></i>}
                                onClick={handleDeleteProduct}
                            >
                                Xóa sản phẩm
                            </Button>
                            <Button
                                className="bg-gradient-to-br  from-[#8a3fd9] to-[#c163ff] text-white"
                                isLoading={productState?.loading}
                                beforeIcon={<i className="ri-add-line"></i>}
                                onClick={handleUpdateProduct}
                            >
                                chỉnh sửa thông tin sản phẩm
                            </Button>
                        </div>
                    </div>

                )
            }
        </>
    )
}
export default ProductDetail