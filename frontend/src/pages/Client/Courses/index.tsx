import React from "react";
import LayoutMain from "@/components/layouts/Client/Main";
import { ICourse } from "@/interface/courses.interface";
import Pagetitle from "@/components/PageTitle";
import view1 from "@/assets/images/Views/bg_courses_list.png";
import { useTranslation } from "react-i18next";
import CoursesItemCard from "./CoursesItemCard";
import { getAllCourses } from "@/apis/courses.api";
import useFetch from "@/hooks/useFetch.hook";
import SubFooter from "@/components/layouts/Client/Footer/subFooter";
import { linkWebPath } from "@/utils/linkWebPath";
import BackgroundPage from "@/components/BackgroudPage";
import RuleSession from "./RuleSession/RuleSession";
import LoadingPage from "@/components/Loading/LoadingPage";


const Courses = (): JSX.Element => {
  const { t } = useTranslation("courses")
  const [coursesState, callCoursesState] = useFetch()
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  React.useEffect(() => {
    callCoursesState(getAllCourses)
  }, [])
  const renderItems = () => {
    const items = [];
    for (let i = 0; i < 5; i++) {
      items.push(
        <div key={i}>
          <LoadingPage height='450px' width='100%' />
        </div>
      );
    }
    return items;
  };
  const courses = coursesState?.payload?.data.filter((r: ICourse) => {
    const name = r.title?.split('__') || [];
    return name[0] !== "FREE";
  });
  return (
    <LayoutMain>
      <>
        <Pagetitle title="Khóa học" />
        <BackgroundPage
          bgImage={view1}
          bgDescription={t('sloganCourses')}
          bgName={t('courses')}
        />
        <div className=" py-16 ">
          <div className="grid grid-cols-5 gap-1 px-4" >
            {
              coursesState?.loading ? (
                renderItems()
              ) : (
                courses?.sort((a: ICourse, b: ICourse) => Number(a.position) - Number(b.position)).map((r: ICourse, index: number) => (
                  <div className=" max-sm:col-span-12" key={index}>
                    <CoursesItemCard
                      key={r._id}
                      index={index}
                      imgUrl={`${linkWebPath(r.images?.[0]?.url || "")}`}
                      title={r.title || ""}
                      subTitle={r.description}
                      path={`${r._id}`}
                    />
                  </div>
                ))
              )
            }
          </div>
          <RuleSession />
        </div>
        <SubFooter />
      </>
    </LayoutMain>
  );
};
export default Courses;
