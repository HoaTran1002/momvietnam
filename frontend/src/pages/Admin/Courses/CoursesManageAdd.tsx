// import FloatingActionButtons from '@/components/CoursesManage/FloatAction'
import Input from "@/components/Input";
import UploadImage from "@/components/UploadImage";
import LayoutAdmin from "@/components/layouts/Admin/Layout";
import useFetch from "@/hooks/useFetch.hook";
import { CourseKeys, ICourse } from "@/interface/courses.interface";
import { createCourse, InsertImageCourse } from "@/apis/courses.api";
import React, { useCallback } from "react";
import { useAlertMessage } from "@/contexts/AlertContext";
import Button from "@/components/Buttons";
import { isNumeric } from "@/utils/checkNumber";
import OptionManage from "@/components/CoursesManage/optionManage";
import { ICategory } from "@/interface/category.interface";
import { apiCreateCategory } from "@/apis/category.api";
export const initialCourse: ICourse = {
  description: "",
  title: "",
  price: "",
  discountPrice: "",
  discountPercentage: "",
  position:"0"
};
export interface ICondition {
  field: string,
  condition: any,
  errorMessage: string
}
const CoursesManageAdd = (): JSX.Element => {
  // =============================================
  const [course, setCourse] = React.useState<ICourse>(initialCourse);
  const [courseError, setCourseError] = React.useState<ICourse>(initialCourse);
  const [category,setCategory] = React.useState<ICategory[] | undefined>(undefined)
  const [dataImage, setDataImage] = React.useState<File>();
  const [addCousre, callAddCourse] = useFetch();
  const { addAlert } = useAlertMessage();
  // const navigate = useNavigate();

  // =============================================
  const validateInputs = () => {
    const errorConditions: ICondition[] = [
      {
        field: "title",
        condition: course.title?.trim() === "",
        errorMessage: "Chưa có tên khóa học",
      },
      {
        field: "description",
        condition: course.description?.trim() === "",
        errorMessage: "Chưa có mô tả khóa học",
      },
      {
        field: "price",
        condition: course.price?.trim() !== "" && !isNumeric(course.price?.trim() || ""),
        errorMessage: "Giá khóa học không được chứa chữ",
      },
      {
        field: "discountPrice",
        condition: course.discountPrice?.trim() !== "" && !isNumeric(course.discountPrice?.trim() || ""),
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
  const handleChangeInput = (field: keyof ICourse, value: string) => {
    setCourse((prevCourse) => ({ ...prevCourse, [field]: value }));
  };
  const handleFileSelect = useCallback((file: File) => {
    setDataImage(file);
  }, []);
  
  const handelsubmit = (): void => {
    if (validateInputs()) {
      callAddCourse(async () => {
        try {
          if (dataImage !== undefined) {
            if(category){
              const courseInsert = await createCourse(course);
              await InsertImageCourse({ _id: courseInsert?.data.data._id, file: dataImage })
              await category.forEach(async (r:ICategory)=>{
                await apiCreateCategory({
                  idCourse:courseInsert?.data.data._id,
                  listTimeLearning:r.listTimeLearning,
                  name:r.name
                })
              })
              addAlert({
                title: "Thành công",
                message: "Thêm khóa học thành công thành công",
                type: "success",
              });
            }else{
              addAlert({
                title: "Lỗi",
                message: "Danh mục phải có ít nhất là 1 nội dung, nếu không muốn có nội dung hãy tạo và để nội dung cú pháp là __EMPTY__ ",
                type: "error",
                duration:10000
              });
            }
          } else {
            addAlert({
              title: "Thất bại",
              message: "Chưa có hình ảnh nào được thêm",
              type: "error",
            });
          }
        } catch (error) {
          addAlert({
            title: "Thất bại",
            message: `Thêm khóa học thất bại`,
            type: "error",
            duration: 5000,
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

  return (
    <LayoutAdmin>
      <>
        <h2 className="text-3xl font-bold text-gray-800 py-4 ">Thêm khóa học</h2>
        <div className="bg-white rounded-lg p-5">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-5">
              <h3 className="text-3xl font-medium text-gray-600 pb-4">Hình nền của khóa học</h3>
              <UploadImage
                onFileSelect={handleFileSelect}
              />
            </div>
            <div className="col-span-7">
            <div className="mt-8 bg-white p-5 rounded-lg">
                <span>*Ghi chú</span>
                    <ul className='text-sub_primary font-medium'>
                        <li>FREE__: Khóa học miễn phí </li>
                        <li>__EMPTY__: Để trống nội dung thay bằng nội dung comming soon</li>
                        <li>__BLANK__: Để trống nội dụng và không thay gì hết</li>
                    </ul>
            </div>
              <div className="">
                <h2 className="text-3xl font-medium text-gray-600">Thông tin về khóa học</h2>
                <div className="grid grid-cols-1 gap-5 mt-4">
                  <div>
                    <Input
                      value={course.title}
                      labelName="Tên khóa học"
                      placeholder="Điền tên khóa học"
                      onChange={(e) => handleChangeInput('title', e.target.value)}
                      isError={courseError.title !== ""}
                      errorMessage={courseError.title}
                    />
                    <Input
                      value={course?.price}
                      labelName="Giá khóa học (không muốn ghi điền 0)"
                      placeholder="Điền giá khóa học (USD)"
                      className="mt-2"
                      onChange={(e) => handleChangeInput('price', e.target.value)}
                      isError={isNumeric(courseError.price || "") && courseError.price !== ""}
                      errorMessage={courseError.price}
                    />
                    <Input
                      value={course?.discountPrice}
                      labelName="Giá khóa học sau khi giảm giá (không muốn ghi điền 0)"
                      placeholder="Điền giá khóa học giảm giá (USD)"
                      isError={isNumeric(courseError.discountPrice || "") && courseError.discountPrice !== ""}
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
                    <Input
                      type="text-area"
                      value={course.description}
                      labelName="Mô tả khóa học"
                      onChange={(e) => handleChangeInput('description', e.target.value)}
                      isError={courseError.description !== ""}
                      errorMessage={courseError.description}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <OptionManage handleChangeCategory={(e)=>setCategory(e)} />
          <div className="flex items-center justify-end">
            <Button
              className="bg-gradient-to-br  from-[#8a3fd9] to-[#c163ff] text-white"
              isLoading={addCousre?.loading}
              beforeIcon={<i className="ri-add-line"></i>}
              onClick={handelsubmit}
            >
              Thêm khóa học mới
            </Button>
          </div>
        </div>
      </>
    </LayoutAdmin>
  );
};

export default CoursesManageAdd;
