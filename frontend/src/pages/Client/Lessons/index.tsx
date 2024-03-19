import React from "react";
import LayoutMain from "@/components/layouts/Client/Main";
// import SliderCarousel from "@/components/SliderCarousel";
// import { ICoursesCardReview } from "@/interface/courses.interface";
// import CoursesItemCard from "../Courses/CoursesItemCard";
// import { courses } from "@/data/courses";
import { Link } from "react-router-dom";
import view1 from "@/assets/images/Views/z4689941072190_e70f3ef9e5b8497daa343c8635bba872.jpg";
import Pagetitle from "@/components/PageTitle";
import View1 from "@/assets/images/Views/z4689941080887_08a34fc53c3e1611e70000aecc659bbd.jpg"
import View2 from "@/assets/images/Views/z4689941106305_ea41e5bc7ec36a69c9327f18fdca6bb2.jpg"
import { useTranslation } from "react-i18next";
import SubFooter from "@/components/layouts/Client/Footer/subFooter";
import Button from "@/components/Buttons";
interface ILesson {
  name: string,
  imgUrl: string,
  path: string
}
const Lessons = (): JSX.Element => {
  const { t } = useTranslation("lesson")
  const listLesson: ILesson[] = [
    { name: t("freeLesson"), path: "/free", imgUrl: View1 },
    { name: "UPCOMING WORKSHOPS", path: "/work-shop", imgUrl: View1 },
    { name: "COURSES", path: "/khoa-hoc", imgUrl: View2 },
  ]
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <LayoutMain>
      <>
        <Pagetitle title="Bài học" />
        <div className="relative">
          <div className="absolute text-4xl w-screen h-screen bg-slate-950/30 flex items-center justify-center px-3 z-10 text-white uppercase tracking-widest font-normal text-center flex-col gap-3">
            <span>{t("lessons")}</span>
            <span className="text-base px-24">
              {t('desLesson')}
            </span>
          </div>
          <div
            style={{
              backgroundImage: `url(${view1})`,
            }}
            className="w-screen h-screen bg-cover bg-center"
          ></div>
        </div>
        <div className="flex flex-col justify-center items-center pt-16 gap-1 bg-white">
          <h2 className="text-[#9eb26c] text-center font-bold text-3xl py-5">COOKING CLASS</h2>
          <p className="text-center text-lg leading-7 px-10 py-4 text-[#626e43] font-medium">
            Being away from home, what makes us really miss is still the meal with family and Mom who is always willing to cook for whole beloved members.
            M.O.M chefs who are representatives for our Vietnamese Mom will step by step give you the knowledge and experiences just like doing cooking in Mom's kitchen with care. Finish three main dishes and have them together with other "members" in a sweet home with love then take home with your recipes and certificate.
          </p>
          <span className="text-[#9eb26c] font-semibold ">
            Duration of the lesson: 2.5 hours
          </span>
          <span className="text-[#9eb26c] font-bold ">
            MOM cooking studio: 10AM - 1PM | 5PM - 8PM
          </span>
          <span className="text-[#9eb26c] font-bold ">
            Open: Tuesday - Sunday
          </span>
          <span className="text-[#9eb26c] font-bold ">
            Morning Class (10AM - 1PM) : <span className="text-red-700">35$</span>

          </span>
          <span className="text-[#9eb26c] font-bold ">
            Afternoon Class (5PM - 8PM): <span className="text-red-700">40$</span>

          </span>
          <Link
            to={'/lien-he'}
          >
            <Button
              className="border border-solid border-[#9eb26c] my-5 rounded-sm text-[#626e43] hover:bg-[#9eb26c] hover:text-white transition-all"
            >
              BOOK ONLINE NOW
            </Button>
          </Link>
        </div>
        <div className=" py-5 px-3">


          <div className="flex items-center max-sm:flex-col  gap-5 justify-center ">
            {listLesson.map((_lesson: ILesson, index: number) => (
              <div
                key={index}
                className="w-[400px] h-[450px]  group relative max-sm:h-[500px] flex max-sm:flex-col max-sm:w-full"
              >
                <img src={_lesson.imgUrl} alt={_lesson.name} className="w-full h-full object-cover" />
                <Link
                  to={_lesson.path}

                  className="absolute flex flex-col gap-2 text-white text-xl font-medium items-center 
                              justify-center text-center uppercase top-0 left-0 group-hover:min-h-full cursor-pointer
                               transition-all z-40 right-0 py-1 px-2 bg-[#9eb26c]/80 min-h-[0px] opacity-0 group-hover:opacity-100">
                  <span>

                    {_lesson.name}
                  </span>
                </Link>
                <span
                  className="bg-white text-lg font-medium uppercase absolute bottom-0 left-0 right-0 min-h-[80px] text-[#72814e] flex items-center justify-center text-center"
                >
                  {_lesson.name}

                </span>
              </div>
            ))}
          </div>
        </div>
        <SubFooter />
      </>
    </LayoutMain>
  );
};
export default Lessons;
