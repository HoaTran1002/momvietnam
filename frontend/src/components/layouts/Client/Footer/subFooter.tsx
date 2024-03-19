import React from 'react'
// import dot from "@/assets/images/dot.png";
import Input from '@/components/Input';
import { useTranslation } from "react-i18next";
import Button from '@/components/Buttons';
import View from "@/assets/images/Views/bg_contact_us_webp.webp"
import SloganFooter from './SloganFooter';
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
const SubFooter = (): JSX.Element => {
  const { t } = useTranslation(["layout", "home"])
  const [email, setEmail] = React.useState<IEmail>(initialEmail)

  // =================
  const handleSubmitEmailSubscribe = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`User ${email.fristName}${email.lastName} send message to contact support `);
    const message = encodeURIComponent(`${email.message}`);
    window.location.href = `mailto:cookingclass@momvietnam.vn?subject=${subject}&body=${message}`;
  }
  //==================
  return (
    <div className="sm:grid sm:grid-cols-12 max-sm:grid max-sm:grid-cols-2 mt-10">
      <div className='h-[600px] w-full sm:col-span-12 max-sm:col-span-12 relative '>
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/30'>

        </div>
        <img src={View} className='w-full h-full object-cover object-center' alt="Image Banner" />
        <div className='absolute flex items-center justify-center flex-col top-0 left-0 right-0 bottom-0'>
          <h2 className=" relative uppercase tracking-widest text-3xl font-medium py-2 text-white px-4 text-center">
            {t('subscribe')}
          </h2>
          <span className="text-slate-200 py-3  uppercase tracking-widest text-sm px-4 text-center">
            {t('subscribeProvider')}
          </span>
          <div
            className=" py-3 w-full flex justify-center flex-col items-center"
            style={{ gap: "20px" }}
          >
            <div className="grid grid-cols-2 w-[700px] max-sm:w-auto gap-3 px-3">
              <div className='max-sm:col-span-2'>
                <Input
                  value={email.fristName}
                  className="sm:text-base "
                  placeholder={t('firstNamePlaceholder')}
                  onChange={(e) => setEmail((pre) => ({ ...pre, fristName: e.target.value }))}
                />

              </div>
              <div className='max-sm:col-span-2'>
                <Input
                  value={email.lastName}
                  className=" sm:text-base "
                  placeholder={t('lastNamePlaceholder')}
                  onChange={(e) => setEmail((pre) => ({ ...pre, lastName: e.target.value }))}
                />

              </div>
              <div className='col-span-2 max-sm:col-span-2'>
                <Input
                  type="text-area"
                  value={email.message}
                  className="w-full sm:text-base"
                  placeholder={t("messagePlaceholder")}
                  onChange={(e) => setEmail((pre) => ({ ...pre, message: e.target.value }))}
                />

              </div>
            </div>
            <div className='flex items-center justify-center'>
              <Button onClick={handleSubmitEmailSubscribe} className="group input-button border text-white rounded-sm border-white hover:bg-[#9eb26c] hover:text-white hover:border-[#9eb26c] mt-3 transition-all">
                {t('HomeContactBtn')}
              </Button>

            </div>
          </div>
        </div>
      </div>
      <SloganFooter />
    </div>
  )
}
export default SubFooter