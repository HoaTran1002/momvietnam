import React from "react";
import LayoutMain from "@/components/layouts/Client/Main";
import view1 from "@/assets/images/Views/toa-heftiba-_K3uGqvmEsY-unsplash.jpg";
import { useTranslation } from "react-i18next";
import SloganFooter from "@/components/layouts/Client/Footer/SloganFooter";
import Pagetitle from "@/components/PageTitle";
import BackgroundPage from "@/components/BackgroudPage";
import { NewsProvider } from "@/contexts/NewContext";
import NewsClient from "./newsClient";

const News = (): JSX.Element => {
  const { t } = useTranslation("news")
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
 
  return (
    <LayoutMain>
      <>
        <Pagetitle title="Tin tức" />
        <BackgroundPage
          bgImage={view1}
          bgDescription={t("sloganNews")}
          bgName={t("titleNews")}
        />
        <div className="container py-16 max-sm:px-[20px] sm:px-[150px] ">
          <h2 className="text-4xl font-bold py-5 text-center text-[#6e7b4b]">
            Tin tức mới nhất
          </h2>
          <NewsProvider>
            <NewsClient/>
          </NewsProvider>
        </div>
        <SloganFooter />
      </>
    </LayoutMain>
  );
};
export default News;
