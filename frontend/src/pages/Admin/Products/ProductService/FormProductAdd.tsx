import { apiCreateProduct, apiUploadImageToProduct } from '@/apis/product.api';
import Button from '@/components/Buttons';
import Divider from '@/components/Divider';
import Input from '@/components/Input';
import Select, { IOption } from '@/components/Select';
import UploadManyImages from '@/components/UploadManyImages';
import { useAlertMessage } from '@/contexts/AlertContext';
import { useCategoryState } from '@/contexts/CategoryContext';
import useFetch from '@/hooks/useFetch.hook';
import { ICategory } from '@/interface/category.interface';
import { IProduct } from '@/interface/product.interface';
import React from 'react'
const FormProductAdd = (): JSX.Element => {
    const { idCourse, listCategory } = useCategoryState();
    //===================================================
    const initialProduct: IProduct = {
        name: "",
        note: "",
        timeLearning: "",
        idCategory: "",
        idCourse
    }
    const [listImageProduct, setListImageProduct] = React.useState<FileList>()
    const [product, setProduct] = React.useState<IProduct>(initialProduct)
    const [categories, setCategories] = React.useState<IOption | undefined>(undefined)
    const [listCategoryItems, setListCategoryItems] = React.useState<IOption | undefined>(undefined)
    const [productState, callproductState] = useFetch()
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

    const handleCreateProduct = () => {
        callproductState(
            async () => {
                try {
                    if (listImageProduct) {
                        const filesArray: File[] = Array.from(listImageProduct);
                        const productCreate = await apiCreateProduct(
                            {
                                name: product.name,
                                note: product.note,
                                idCourse: product.idCourse,
                                idCategory: product.idCategory,
                                timeLearning: product.timeLearning
                            }
                        )
                        console.log(productCreate);

                        await filesArray?.forEach(async (file: File) => {
                            await apiUploadImageToProduct({ _id: productCreate?.data?.data?._id, file })
                        });

                        await addAlert({
                            message: "Tạo sản phẩm cho khóa học thành công",
                            title: "Thành công",
                            type: "success"
                        })
                    } else {
                        addAlert({
                            message: "Sản phẩm phải có ít nhất 1 ảnh đại diện",
                            title: "Lỗi",
                            type: "error"
                        })
                    }

                } catch {
                    addAlert({
                        message: "Đã có lỗi trong quá trinh thêm sản phẩm, kiểm tra lại thông tin",
                        title: "Lỗi",
                        type: "error"
                    })
                }
            }
        )
    }
    return (
        <div className="bg-white rounded-bl-lg rounded-br-lg p-5">
            <h2 className="text-3xl font-bold text-gray-600 py-4 ">Thêm sản phẩm mới</h2>
            <Divider />
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-6">
                    <h3 className="text-3xl font-medium text-gray-600 pb-4">
                        Hình nền của khóa học
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
                                    value={product.name}
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
                                    value={product.note}
                                    labelName="Mô tả khóa học"
                                    onChange={(e) => setProduct((pre) => ({ ...pre, note: e.target.value }))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-end">
                <Button
                    className="bg-gradient-to-br  from-[#8a3fd9] to-[#c163ff] text-white"
                    isLoading={productState?.loading}
                    beforeIcon={<i className="ri-add-line"></i>}
                    onClick={handleCreateProduct}
                >
                    Thêm sản phẩm mới
                </Button>
            </div>
        </div>
    )
}
export default FormProductAdd