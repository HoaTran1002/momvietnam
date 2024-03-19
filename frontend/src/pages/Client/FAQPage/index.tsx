import React from "react";
import LayoutMain from "@/components/layouts/Client/Main";
import FAQuestion from "@/components/F_A_Q";
import Pagetitle from "@/components/PageTitle";
import faqimage from "@/assets/images/Views/z4689941094081_17a75bcd7d0a6442ef4e7c240230ff2d.jpg"
import { useTranslation } from "react-i18next";
import SubFooter from "@/components/layouts/Client/Footer/subFooter";
import { IFaq } from "@/interface/faq.interface";
import useFetch from "@/hooks/useFetch.hook";
import { apiGetAllFaqs } from "@/apis/faq.apis";
import LoadingPage from "@/components/Loading/LoadingPage";
const FAQPage = (): JSX.Element => {
  const { t } = useTranslation("faq")
  const [faqs, setFaqs] = React.useState<IFaq[] | undefined>(undefined)
  const [faqState, callFaqState] = useFetch()
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  React.useEffect(() => {
    callFaqState(
      async () => {
        const data = await apiGetAllFaqs();
        setFaqs(data?.data?.data)
      }
    )
  }, []);
  return (
    <LayoutMain>
      <div>
        <Pagetitle title="FAQ" />
        <div className="absolute text-4xl w-screen h-[750px] bg-slate-950/20 flex items-center justify-center px-3 z-10 text-white uppercase tracking-widest font-normal text-center flex-col gap-3">
          <span >
            {t('titleFaq')}
          </span>
          <span className="text-base px-24">
            {t('sloganFaq')}
          </span>
        </div>
        <div style={{
          backgroundImage: `url(${faqimage})`
        }}
          className="w-screen h-[750px] bg-cover bg-fixed bg-bottom"
        >
        </div>
        <div className=" py-16">
          <div className="flex flex-col gap-5 sm:px-[200px] max-sm:px-2">
            {
              faqState?.loading ? (
                <div className="w-100%">
                  <LoadingPage width="100%" height="600%" />
                </div>
              )
                : (
                  faqs?.map((r: IFaq) => (
                    <FAQuestion answer={r.answer || ""} question={r.question || ""} key={r._id} />
                  ))
                )
            }
          </div>

        </div>
        <SubFooter />
      </div>
    </LayoutMain>
  );
};
export default FAQPage;
