import React from "react";
import LayoutMain from "@/components/layouts/Client/Main";
import Pagetitle from "@/components/PageTitle";
import view1 from "@/assets/images/Views/z4689941090686_42737766a48d0c06d3a6cd0b45158aeb.jpg";
import Input from "@/components/Input";
import { useTranslation } from "react-i18next";
import SloganFooter from "@/components/layouts/Client/Footer/SloganFooter";
import ListStudio from "./ListStudio"
import Button from "@/components/Buttons";
import BackgroundPage from "@/components/BackgroudPage";
interface IEmail {
  fristName?: string,
  lastName?: string,
  emailType?: string,
  message?: string
}

const initialEmail: IEmail = {
  fristName: "",
  lastName: "",
  emailType: "",
  message: ""
}
const ContactUs = (): JSX.Element => {
  const { t } = useTranslation(["contact","layout"]);
  const [email, setEmail] = React.useState<IEmail>(initialEmail)
  const handleSubmitEmailSubscribe = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`User ${email.fristName}${email.lastName} send message to contact support `);
    const message = encodeURIComponent(`${email.message}`);
    window.location.href = `mailto:cookingclass@momvietnam.vn?subject=${subject}&body=${message}`;
  }
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <LayoutMain>
      <>
        <Pagetitle title="Liên hệ chúng tôi" />
        <BackgroundPage
          bgImage={view1}
          bgDescription={t("sloganContact")}
          bgName={t("titleContact")}
        />
        <div className="pt-16">
          <div className="flex flex-col gap-20 pb-10 items-center justify-center w-full">
            <div className="w-5/6 rounded-md text-[#7e8e56] font-medium bg-white py-4 px-9 max-sm:px-2">
              <h2 className="uppercase text-2xl tracking-widest text-center ">
                {t("titleFieldType")}
              </h2>
              <div className="flex flex-col w-full gap-4 py-4">
                <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
                  <div>
                    <Input
                      value={email.fristName}
                      labelName={t('layout:firstNamePlaceholder')}
                      type="text"
                      onChange={(e) => setEmail((pre) => ({ ...pre, fristName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Input
                    value={email.lastName}
                      labelName={t('layout:lastNamePlaceholder')}
                      type="text"
                      onChange={(e) => setEmail((pre) => ({ ...pre, lastName: e.target.value }))}
                    />
                  </div>
                </div>
                <Input
                value={email.message}
                  placeholder={t("placeholderMessage")}
                  labelName={t("message")}
                  type="text-area"
                  onChange={(e) => setEmail((pre) => ({ ...pre, message: e.target.value }))}
                />
              </div>
              <div className="flex items-center justify-center">
                <Button onClick={handleSubmitEmailSubscribe} className="p-3 hover:bg-[#9eb26c] hover:text-white transition-all uppercase tracking-widest text-lg cursor-pointer rounded-sm">
                  {t("submitButton")}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="max-sm:flex max-sm:flex-col">
          <h2 className="uppercase text-4xl text-[#7e8e56] font-medium tracking-widest text-center">
            OUR STUDIOS
          </h2>
          <ListStudio />

        </div>
        <SloganFooter />
      </>
    </LayoutMain>
  );
};
export default ContactUs;
