import React from "react";
import LayoutMain from "@/components/layouts/Client/Main";
import slider_home_page_1 from "@/assets/images/Views/Banner_home_webp.webp";
import slider_home_page_2 from "@/assets/images/Slider/bg-slider-home-page.jpg";
import Pagetitle from "@/components/PageTitle";
import { useTranslation } from "react-i18next";
import SubFooter from "@/components/layouts/Client/Footer/subFooter";
import CardNewsSession from "./NewsSession/CardNews";
import CardCoursesSession from "./CoursesSession/CardCourses";
import CardLessonSession from "./LessonSession/CardLesson";
import CardInstructorSession from "./InstructorSession/CardInstructor";
import CardHightLightSession from "./HightLightSession/CardHightLight";
import CardMemberSession from "./MemberSession/CardMember";
import CardPartnerSession from "./PartnerSession/CardPartner";
import BackgroundSlider from "@/components/BackgroundSlider";
import SubBackground from "@/components/layouts/Client/Footer/subBackground";
const Home = (): JSX.Element => {
  const { t } = useTranslation("home");
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <LayoutMain>
      <>
        <Pagetitle title="Trang chủ" />
        <BackgroundSlider
          scrollToFirstElement={true}
          listImageBannerSlider={[slider_home_page_1,slider_home_page_2]}
        />
        <div
          id="the_first"
          className="sm:grid sm:grid-cols-5 max-sm:grid-cols-2 max-sm:grid  sm:h-[370px] max-sm:h-auto"
        >
          <CardCoursesSession />
        </div>
        <div className="sm:grid sm:grid-cols-5  max-sm:grid-cols-2 max-sm:grid ">
          <div className="col-span-5 sm:grid sm:grid-cols-12 my-4 gap-2">
            <div className="sm:col-span-6">
              <div className="w-full h-[700px] max-sm:h-[450px]">
                <CardNewsSession />
              </div>
              <CardLessonSession />
            </div>
            <div className="sm:col-span-6 sm:grid sm:grid-cols-2 gap-2">
              <div className="h-[475px] relative" >
                <CardHightLightSession/>
              </div>
              <div className="h-[475px] relative" >
                <CardMemberSession/>
              </div>
              <div className="col-span-2 h-[475px] relative">
                <CardInstructorSession/>
              </div>
            </div>
          </div>
        </div>

        <SubFooter />
        <div className="grid sm:grid-cols-12 max-sm:grid-cols-12 py-6">
          <span className="col-span-12  text-3xl uppercase font-semibold py-4 text-center text-[#636f43]">
            {t("partner")}
          </span>
          <div className="col-span-12">
           <CardPartnerSession />
          </div>
        </div>
        <SubBackground/>
      </>
    </LayoutMain>
  );
};
export default Home;
