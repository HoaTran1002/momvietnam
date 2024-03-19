import Pagetitle from '@/components/PageTitle'
import LayoutMain from '@/components/layouts/Client/Main'
import view1 from "@/assets/images/Views/team_webp.webp";

import SloganFooter from '@/components/layouts/Client/Footer/SloganFooter';
import React from 'react';

import ListItems from './ListItems';
const Instructor = (): JSX.Element => {

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <LayoutMain>
      <>
        <Pagetitle title="Giảng viên" />
        <div className="relative">
          <div className="absolute text-4xl w-screen h-[105vh] bg-slate-950/20 flex items-center justify-center px-3 z-10 text-white uppercase tracking-widest font-normal text-center flex-col gap-3">
            <span>INSTRUCTOR</span>
            <p className="text-base px-24 max-sm:px-2">
              We have a team of professional, energetic and proficient instructors.<br />
              Come for lessons to find out more about them!<br />
              You may also support them by sending them a message or feedback.<br />
            </p>
          </div>
          <div
            style={{
              backgroundImage: `url(${view1})`,
            }}
            className="w-screen h-[105vh] bg-cover bg-fixed bg-top"
          ></div>
        </div>
        <div className='py-6'>
          <ListItems />
        </div>
        <SloganFooter />
      </>
    </LayoutMain>
  )
}
export default Instructor