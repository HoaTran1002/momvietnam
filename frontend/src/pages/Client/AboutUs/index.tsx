import React from "react";
import LayoutMain from "@/components/layouts/Client/Main";
import views1 from "@/assets/images/Views/z5055870467722_0e51ff4e6c55392f376a2ec05bc24484.jpg";
// import "./style.css";
// import { achievements, steps } from "@/data/aboutus";
import View2 from "@/assets/images/Views/428658802_798237962318241_8569444207664212910_n.jpg"
import View3 from "@/assets/images/Views/team_webp.webp"
// import { IAboutAchievement, IAboutStep } from "@/interface/aboutus.interface";
// import Cheft1 from "@/assets/images/Chef/jason-briscoe-7MAjXGUmaPw-unsplash.jpg"
// import Cheft2 from "@/assets/images/Chef/jeff-siepman-z-IxdGQ7lPU-unsplash.jpg"
// import Cheft3 from "@/assets/images/Chef/louis-hansel-v3OlBE6-fhU-unsplash.jpg"
// import Cheft4 from "@/assets/images/Chef/mario-ciF10nRBW7o-unsplash.jpg"
// import Cheft5 from "@/assets/images/Chef/vitor-monthay-673jcnrm8bM-unsplash.jpg"
import Pagetitle from "@/components/PageTitle";
import SloganFooter from "@/components/layouts/Client/Footer/SloganFooter";
// import SloganFooter from "@/components/layouts/Client/Footer/SloganFooter";
// interface ICheft {
//   name:string,
//   img:string
// }
interface IAct{
  title:string,
  content:String
}
interface IRessonChose{
  title:string,
  content:string,
  img:string
}
const AboutUs = (): JSX.Element => {
  // const listCheft:ICheft[] = [
  //   {name:"Nguyễn Văn A",img:Cheft1},
  //   {name:"Nguyễn Văn B",img:Cheft2},
  //   {name:"Nguyễn Văn C",img:Cheft3},
  //   {name:"Nguyễn Văn D",img:Cheft4},
  //   {name:"Nguyễn Văn E",img:Cheft5},
  // ]
  const listAct :IAct[] = [
    {title:"NOV 1985",content:"Start-up company by joining tableware and cookware selling company with cooking school by Hiroyuki Yokoi at Fujieda-shi, Shizuoka, Japan"},
    {title:"NOV 1985",content:"Start-up company by joining tableware and cookware selling company with cooking school by Hiroyuki Yokoi at Fujieda-shi, Shizuoka, Japan"},
    {title:"NOV 1985",content:"Start-up company by joining tableware and cookware selling company with cooking cookware selling company with cooking  school by Hiroyuki Yokoi at Fujieda-shi, Shizuoka, Japan"},
  ]
  const listRessonChoses:IRessonChose[]=[
    {
      title:"5 Courses to choose from",
      content:"You can choose between cake, cooking, bread, wagashi and kids courses. You can also take up a package with a mixture of different courses to enjoy a cheaper rate.",
      img:views1
    },
    {
      title:"Zero experience needed",
      content:"Beginners with no experience are welcome to attend the lesson. We provide you with a guided and yet hands-on experience in making foods and we will not let you go home with a failed product.",
      img:View2 
    },
    {
      title:"Small group",
      content:"We always keep our class size small to a maximum of 4 people, so that you enjoy the optimal amount of time with our instructors.",
      img:View3
    },
    {
      title:"Plan your lessons",
      content:"We conduct numerous classes each day, with various menus, timing and instructors that you can choose from, hence you are able to plan and select the class that best fits your schedule or preference.",
      img:views1
    },
    {
      title:"MOM Original Illustrated Recipes",
      content:"You can bring back the original illustrated and easy-to-understand recipe developed specially by our professionals in Japan at the end of each class. You will be able to follow the recipes even you are at home.",
      img:View2 
    },
    {
      title:"Beginners to Masters",
      content:"We offer course with varying difficulty level. You can start from Basic courses and further sharpen your skills in Master course.",
      img:View3
    },
  ]
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <LayoutMain>
      <>
        <Pagetitle title="Về chúng tôi" />
        <div className="relative">
          <div className="absolute text-4xl w-screen h-screen bg-slate-950/30 flex items-center justify-center px-3 z-10 text-white uppercase tracking-widest font-normal text-center flex-col gap-3">
          <span>About us</span>
            <span className="text-base px-24">we are mom cooking</span>
          </div>
          <div
            style={{
              backgroundImage: `url(${View3})`,
            }}
            className="w-screen h-screen bg-cover bg-center"
          ></div>
        </div>
        <div className="py-10 max-sm:px-[20px] sm:px-[100px] bg-white max-sm:text-justify">
          <div className="pb-8">
            <h2 className="uppercase text-center font-semibold text-3xl py-2 px-4 text-gray-700 ">Câu chuyện của chúng tôi </h2>
            <p className="leading-7 text-base font-medium py-2 px-4 text-gray-700 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae laborum eveniet nobis ab ea, ex, eligendi minima sequi doloribus, debitis temporibus quo at necessitatibus voluptates quia vitae! Dolores, tempora amet! Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi totam doloremque impedit fugiat minima laborum explicabo asperiores, vitae rem enim necessitatibus quo ut cum placeat accusantium magnam deleniti vero dolore!</p>
            <p className="leading-7 text-base font-medium py-2 px-4 text-gray-700 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae laborum eveniet nobis ab ea, ex, eligendi minima sequi doloribus, debitis temporibus quo at necessitatibus voluptates quia vitae! Dolores, tempora amet! Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi totam doloremque impedit fugiat minima laborum explicabo asperiores, vitae rem enim necessitatibus quo ut cum placeat accusantium magnam deleniti vero dolore!</p>
          </div>
          <div className="pb-[30px]">
            {
              listAct.map((r:IAct,index:number)=>(
                <div key={index} className="flex relative mb-5 py-2 flex-col gap-1 before:w-1 before:absolute before:top-0 before:bottom-0 before:left-0  before:h-full before:rounded-md before:bg-[#7e8e56]/60 bg-[#7e8e56]/10 pl-3">
                  <span className="text-gray-700 font-medium text-xl">
                    {r.title}
                  </span>
                  <span className="text-lg text-gray-700 font-normal">
                    {r.content}
                  </span>
                </div>

              ))
            }
          </div>
        <div className="grid grid-cols-2 gap-6 " >
          <div className="col-span-2">
            <h2 className="text-center font-semibold text-3xl py-2 px-4 text-gray-700 uppercase">Lý do tham gia với chúng tôi</h2>
          </div>
            {
              listRessonChoses.map((r:IRessonChose,index:number)=>(
                <div className="w-full relative max-sm:col-span-2 bg-[#7e8e56]/10 before:w-1 before:absolute before:top-0 before:bottom-0 before:left-0  before:h-full before:rounded-md before:bg-[#7e8e56]/60 p-3 ">
                  <span className="text-6xl font-bold text-gray-700 ">
                    {(`0`+(index + 1) ).toString()}
                  </span>
                  <div className="mt-4">
                      <span className="text-lg font-semibold text-gray-700 ">
                        {r.title}
                      </span>
                      <p className="text-base font-medium py-2 px-4 text-gray-700 ">
                        {r.content}
                      </p>
                      <div className="px-4 pt-9">
                      <img src={r.img} alt={r.title} className="w-full h-[200px] object-cover"/>

                      </div>
                  </div>
                </div>
              ))
            }
        </div>
        </div>
          <SloganFooter/>
      </>
    </LayoutMain>
  );
};
export default AboutUs;
