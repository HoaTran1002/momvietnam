import Pagetitle from '@/components/PageTitle'
import LayoutMain from '@/components/layouts/Client/Main'
import view1 from "@/assets/images/Views/z4689941072190_e70f3ef9e5b8497daa343c8635bba872.jpg";

import SloganFooter from '@/components/layouts/Client/Footer/SloganFooter';
const UpcomingWorkshop = (): JSX.Element => {
  return (
    <LayoutMain>
      <>
        <Pagetitle title="work shop" />
        <div className="relative">
          <div className="absolute  text-4xl w-screen h-[750px] bg-slate-950/20 flex items-center justify-center px-3 z-10 text-white uppercase tracking-widest font-normal text-center flex-col gap-3">
            <span>Upcoming Workshop</span>
            <span className="text-base px-24">
              Workshop
            </span>
          </div>
          <div
            style={{
              backgroundImage: `url(${view1})`,
            }}
            className="w-screen h-[750px] bg-cover bg-fixed bg-center"
          ></div>
        </div>
        <div className='bg-white p-6'>
          <span className='block text-center font-semibold text-3xl text-[#829359]'>Coming soon</span>
        </div>
        <SloganFooter />
      </>
    </LayoutMain>
  )
}
export default UpcomingWorkshop