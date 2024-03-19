import { CourseKeys, ICourse, IImage } from '@/interface/courses.interface'
import { ICondition, initialCourse } from '@/pages/Admin/Courses/CoursesManageAdd';
import React, { useCallback } from 'react'
import UploadImage from '../UploadImage';
import { getLastPathComponent } from '@/utils/getLastArray';
import UploadManyImages from '../UploadManyImages';
import Input from '../Input';
import { isNumeric } from '@/utils/checkNumber';
import useFetch from '@/hooks/useFetch.hook';
import { UpdateImageCourse, deleteCourse, updateCourse, InsertImageCourse, apiDeleteImageCourse } from '@/apis/courses.api';
import { useAlertMessage } from '@/contexts/AlertContext';
import Button from '../Buttons';
import { useCoursesState } from '@/contexts/CoursesContext';
import OptionManage from './optionManage';
import Divider from '../Divider';
import ItemImageUpload from '../ItemImageUpload';
import ModalMessage from '../ModalMessage';
import { ICategory } from '@/interface/category.interface';
import { apiCreateCategory, apiDeleteCategory, apiUpdateCategory } from '@/apis/category.api';
import { useCategoryState } from '@/contexts/CategoryContext';
import LoadingPage from '../Loading/LoadingPage';
import { useNavigate } from 'react-router-dom';
import { linkUrlWeb } from '@/utils/getLinkUrl';
import ViewListImage from '../ViewListImage';
interface IPropsCoursesDetail {
    handleCloseDetail: () => void
    courseItem: ICourse
}
const CoursesDetail = ({ courseItem, handleCloseDetail }: IPropsCoursesDetail): JSX.Element => {

    const [courseError, setCourseError] = React.useState<ICourse>(initialCourse);
    const [course, setCourse] = React.useState<ICourse>(courseItem);
    const [category, setCategory] = React.useState<ICategory[] | undefined>(undefined)
    const [isDelete, setIsDelete] = React.useState<boolean>(false);
    const [dataImage, setDataImage] = React.useState<File>();
    const [listDataImage, setListDataImage] = React.useState<FileList | undefined>(undefined);
    const [listImageToShow, setListImageToShow] = React.useState<string[]>([])
    const [indexImage, setIndexImage] = React.useState<number>(0)
    const [updateCoursestate, callUpdateCourse] = useFetch();
    const [deleteCoursestate, callDeleteCourse] = useFetch();
    const [subImageId, setSubImageId] = React.useState<IImage | undefined>(undefined)
    const { setIsReset } = useCoursesState()
    const { addAlert } = useAlertMessage();
    const navigate = useNavigate()
    const { listCategory, loading } = useCategoryState()

    //================================



    //================================
    const validateInputs = () => {
        const errorConditions: ICondition[] = [
            {
                field: "title",
                condition: course?.title?.trim() === "",
                errorMessage: "Chưa có tên khóa học",
            },
            {
                field: "description",
                condition: course?.description === "",
                errorMessage: "Chưa có mô tả khóa học",
            },
            {
                field: "price",
                condition: isNumeric(course?.price || ""),
                errorMessage: "Giá khóa học không được chứa chữ",
            },
            {
                field: "discountPrice",
                condition: isNumeric(course?.discountPrice || ""),
                errorMessage: "Giá khóa học giảm giá không được chứa chữ",
            },
        ];

        const newErrors: ICourse = {};
        errorConditions.forEach(({ field, condition, errorMessage }: ICondition) => {
            newErrors[field as CourseKeys] = condition ? errorMessage : "";
        });

        setCourseError(newErrors);
        const hasErrors = Object.keys(newErrors).some((key) => newErrors[key as CourseKeys] !== undefined && newErrors[key as CourseKeys] !== "");

        return !hasErrors;
    };

    const handleEditCourse = () => {
        if (validateInputs()) {
            callUpdateCourse(async () => {
                try {
                    if (course && (category && listCategory)) {
                        await updateCourse(course);
                        if (listCategory && listCategory?.length > 0) {
                            await category?.forEach(async (r: ICategory) => {
                                if (r._id) {
                                    await apiUpdateCategory({
                                        _id: r._id,
                                        idCourse: r.idCourse,
                                        listTimeLearning: r.listTimeLearning,
                                        name: r.name
                                    })

                                } else {
                                    await apiCreateCategory({
                                        idCourse: course?._id,
                                        listTimeLearning: r.listTimeLearning,
                                        name: r.name
                                    })
                                }
                            })
                        } else {
                            await category?.forEach(async (r: ICategory) => {
                                await apiCreateCategory({
                                    idCourse: course?._id,
                                    listTimeLearning: r.listTimeLearning,
                                    name: r.name
                                })
                            })
                        }
                        if (category?.length < listCategory?.length) {
                            await listCategory.filter(async (r: ICategory) => {
                                const item = category.find((itemCurr: ICategory) => itemCurr._id === r._id)
                                if (!item) {
                                    await apiDeleteCategory({ _id: r._id })
                                }
                            })
                        }
                        if (dataImage !== undefined) {
                            await UpdateImageCourse({
                                _id: course?._id || "",
                                _idCourseImg: course?.images?.[0]?._id || "",
                                file: dataImage
                            })
                            addAlert({
                                title: "Thông báo",
                                message: "Hình ảnh sẽ mất một lúc để cập nhập",
                                type: "warning",
                                duration: 10000
                            });
                        }
                        if (listDataImage) {
                            if (course?.images?.length || 0 > 1) {
                                Array.from(listDataImage).forEach(async element => {
                                    await InsertImageCourse({
                                        _id: course._id || "",
                                        file: element
                                    })
                                });
                            }
                            addAlert({
                                title: "Thông báo",
                                message: "Hình ảnh sẽ mất một lúc để hiển thị",
                                type: "info",
                            });
                        }
                        addAlert({
                            title: "Thành công ",
                            message: "Đã cập nhập thông tin khóa học thành công",
                            type: "success",
                        });
                        addAlert({
                            title: "Thông báo",
                            message:
                                <span>
                                    Nếu bạn đã điều chỉnh mốc thời gian vui lòng di chuyển qua danh sách sản phẩm của khóa học {course.title} để điều chỉnh mốc thời gian <Button className='text-purple-600' onClick={() => navigate('/Admin/ProductsManage')}>Tại đây</Button>
                                </span>,
                            type: "warning",
                            duration: 15000
                        });

                        if (setIsReset) {
                            setIsReset((prevIsReset) => !prevIsReset);
                        }
                    } else {
                        addAlert({
                            title: "Lỗi ",
                            message: "Không tìm thấy khóa học này",
                            type: "error",
                        });
                    }
                } catch (error) {
                    addAlert({
                        title: "Lỗi ",
                        message: String(error),
                        type: "error",
                    });
                }
            });

        } else {
            addAlert({
                title: "Lỗi",
                message: `Thêm khóa học thất bại, hãy kiểm tra thông báo lỗi`,
                type: "error",
            });
        }
    };
    const handleDeleteCourse = () => {
        const request: { _id: string | undefined } = {
            _id: course?._id,
        };
        callDeleteCourse(async () => {
            try {
                await deleteCourse(request);
                await setIsDelete(false);
                await addAlert({
                    title: "Thành công ",
                    message: "Xóa khóa học thành công",
                    type: "success",
                });
                if (setIsReset) {
                    setIsReset((prevIsReset) => !prevIsReset);
                }
                handleCloseDetail()
            } catch (err: any) {
                addAlert({
                    title: "Lỗi ",
                    message: deleteCoursestate.error,
                    type: "error",
                });
            }
        });
    };

    const handleDeleteSubImage = () => {
        callDeleteCourse(
            async () => {
                try {
                    await apiDeleteImageCourse({
                        idImage: subImageId?._id || "",
                        idCourse: course._id || ""
                    })
                    setSubImageId(undefined)
                    await addAlert({
                        title: "Thành công ",
                        message: "Xóa hình ảnh khóa học thành công",
                        type: "success",
                    });
                    if (setIsReset) setIsReset(r => !r)
                } catch {
                    addAlert({
                        title: "Lỗi ",
                        message: "Đã có lỗi trong quá trình xóa khóa học",
                        type: "error",
                    });
                }
            }
        )
    }
    const handleChangeInput = (field: keyof ICourse, value: string) => {
        setCourse((prevCourse) => ({ ...prevCourse, [field]: value }));
    };
    const handleFileSelect = useCallback((file: File) => {
        setDataImage(file);
    }, []);
    React.useEffect(() => {
        setCategory(listCategory)
        course?.images?.map((r, index: number) => {
            if (index !== 0) {
                setListImageToShow((pre) => ([...pre, linkUrlWeb(r.url || "")]))
            }
        })
    }, [listCategory])

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
            <div className="grid grid-cols-12 gap-5 bg-white p-5 rounded-lg mt-2">
                <div className="col-span-5">
                    <h3 className="text-xl font-medium py-2">
                        Hình nền của khóa học
                    </h3>
                    <UploadImage
                        onFileSelect={handleFileSelect}
                        imgUrl={`https://momvietnam.vn/content/${getLastPathComponent(course?.images?.[0]?.url || "")}`}
                    />
                </div>
                <div className="col-span-7">
                    <h3 className="text-xl font-medium py-2">
                        Các hình ảnh liên quan khác
                    </h3>
                    <UploadManyImages
                        onFilesSelect={(e) => setListDataImage(e)}
                    />
                    {
                        
                        (course?.images?.length ?? 0) >= 2 && (
                            <>
                                <Divider />
                                <span className='text-base font-bold '>Ảnh khác trong khóa học</span>
                                <div className="grid grid-cols-2 gap-3">
                                    {course?.images?.map((r: IImage, index: number) => (
                                        index !== 0 ? (
                                            <ItemImageUpload
                                                key={r._id}
                                                name={`Ảnh ${index}`}
                                                image={linkUrlWeb(r.url)}
                                                handleClickView={() => setIndexImage(index)}
                                                handleDelete={() => setSubImageId(r)}
                                            />
                                        ) : (
                                            null
                                        )

                                    ))
                                    }
                                </div>
                            </>

                        )
                    }
                    {
                        indexImage > 0 && (
                            <ViewListImage
                                listImage={listImageToShow}
                                onClose={() => setIndexImage(0)}
                                indexImg={indexImage - 1}
                            />
                        )
                    }

                </div>
            </div>
            <div className="mt-8 bg-white p-5 rounded-lg">
                <span>*Ghi chú</span>
                <ul className='text-sub_primary font-medium'>
                    <li>FREE__: Khóa học miễn phí </li>
                    <li>__EMPTY__: Để trống nội dung thay bằng nội dung comming soon</li>
                    <li>__BLANK__: Để trống nội dụng và không thay gì hết</li>
                </ul>
            </div>
            <div className="mt-8 bg-white p-5 rounded-lg">
                <h2 className="text-3xl font-medium">Thông tin về khóa học</h2>
                <div className="grid grid-cols-2 gap-5 mt-4">
                    <div>
                        <Input
                            value={course?.position}
                            labelName="Vị Trí hiển thị"
                            onChange={(e) => handleChangeInput('position', e.target.value)}
                        />
                        <Input
                            value={course?.title}
                            labelName="Tên khóa học"
                            placeholder="Điền tên khóa học"
                            onChange={(e) => handleChangeInput('title', e.target.value)}
                            isError={courseError.title !== ""}
                            errorMessage={courseError.title}
                        />
                        <Input
                            labelName="Giá khóa học"
                            placeholder="Điền giá khóa học (USD)"
                            className="mt-2"
                            value={course?.price}
                            onChange={(e) => handleChangeInput('price', e.target.value)}
                            isError={isNumeric(courseError.price || "")}
                            errorMessage={courseError.price}
                        />
                        <Input
                            value={course?.discountPrice}
                            labelName="Giá khóa học sau khi giảm giá (không muốn giảm giá điền 0)"
                            placeholder="Điền giá khóa học giảm giá (USD)"
                            isError={isNumeric(courseError.price || "")}
                            errorMessage={courseError.discountPrice}
                            onChange={(e) => handleChangeInput('discountPrice', e.target.value)}
                        />
                        <Input
                            value={course?.discountPercentage}
                            labelName="Phần trăm giảm giá (không muốn ghi điền 0)"
                            placeholder="Điền phần trăm giảm giá (%)"
                            isError={courseError.discountPercentage !== ""}
                            errorMessage={courseError.discountPercentage}
                            onChange={(e) => handleChangeInput('discountPercentage', e.target.value)}
                        />
                    </div>
                    <div>
                        <Input
                            type="text-area"
                            className='h-max'
                            labelName="Mô tả khóa học"
                            onChange={(e) => handleChangeInput('description', e.target.value)}
                            value={course?.description}
                            isError={courseError.description !== ""}
                            errorMessage={courseError.description}
                        />
                    </div>
                </div>
            </div>
            {
                loading ? (
                    <div className='bg-white rounded-lg p-12 mt-7'>
                        <LoadingPage width='100%' height='500px' role='admin' />
                    </div>
                ) : (
                    <OptionManage
                        handleChangeCategory={(e) => setCategory(e)}
                        listOption={category}
                    />
                )
            }
            <div className="flex items-center justify-end gap-4 bg-white p-5 mt-8 rounded-lg">
                <Button
                    className="bg-gradient-to-br from-[#ff8d8d] to-[#ff0000] text-white"
                    beforeIcon={<i className="ri-delete-bin-5-line"></i>}
                    onClick={() => setIsDelete(true)}
                >
                    Xóa khóa học
                </Button>
                <Button
                    className='bg-gradient-to-br  from-[#8a3fd9] to-[#c163ff] text-white'
                    onClick={handleCloseDetail}
                    beforeIcon={<i className="ri-arrow-left-line"></i>}
                >
                    Trở về
                </Button>
                <Button
                    className="bg-gradient-to-br  from-[#8a3fd9] to-[#c163ff] text-white"
                    isLoading={updateCoursestate?.loading}
                    beforeIcon={<i className="ri-edit-2-line"></i>}
                    onClick={handleEditCourse}
                >
                    Chỉnh sửa thông tin khóa học
                </Button>
            </div>
            {isDelete && (
                <ModalMessage
                    title="Thông báo"
                    content="Bạn có chắc muốn xóa khóa học này"
                    isClose={() => setIsDelete(false)}
                    isOk={handleDeleteCourse}
                />
            )}
            {
                subImageId !== undefined && (
                    <ModalMessage
                        title="Thông báo"
                        content={
                            <div className='flex flex-col items-center gap-2'>
                                <span className='text-2xl font-medium'>Bạn có chắc muốn xóa hình ảnh này trong khóa học {course.title} không? </span>
                                <img src={linkUrlWeb(subImageId.url)} alt="Ảnh đang được xóa" className='h-[30vh]' />
                            </div>
                        }
                        isClose={() => setSubImageId(undefined)}
                        isOk={handleDeleteSubImage}
                    />
                )
            }
        </>
    )
}
export default CoursesDetail