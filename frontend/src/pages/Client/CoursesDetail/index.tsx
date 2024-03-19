import React from "react";
import LayoutMain from "@/components/layouts/Client/Main";
// import view1 from "@/assets/images/Views/a2.jpg";
import {useNavigate, useParams } from "react-router-dom";
// import SliderCarousel from "@/components/SliderCarousel";
import { ICourse } from "@/interface/courses.interface";
// import ProductDetail from "./ProductDetail";
import Pagetitle from "@/components/PageTitle";

import useFetch from "@/hooks/useFetch.hook";
import { getAllCourses } from "@/apis/courses.api";

import ListProductForCourse from "./ListProductForCourse";
import { CategoryProvider } from "@/contexts/CategoryContext";
import { ProductProvider } from "@/contexts/ProductContext";
const CoursesDetail = (): JSX.Element => {
  const { id } = useParams();
  const [_stateCousre, callStateCourse] = useFetch();
  const [courseCurr, setCourseCurr] = React.useState<ICourse | undefined>(undefined)
  const navigate = useNavigate()
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  React.useEffect(() => {
    if (id !== undefined) {
      callStateCourse(
        async () => {
          const data = await getAllCourses()
          const listCourse: ICourse[] = data?.data
          const coures = listCourse.find((r: ICourse) => r._id == id)
          console.log(typeof (coures));
          if (coures === undefined) {
            navigate('/*')
          }
          setCourseCurr(coures || {})
        }
      )
    }
  }, [id])
  return (
    <LayoutMain>
      <>
        <Pagetitle title="Chi tiết khóa học" />
        <CategoryProvider idCourse={id || ""}>
          <ProductProvider idCourse={id || ""}>
            <ListProductForCourse
              courseCurr={courseCurr || {}}
            />
          </ProductProvider>
        </CategoryProvider>
      </>
    </LayoutMain>
  );
};
export default CoursesDetail;
