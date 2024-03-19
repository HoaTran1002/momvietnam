import {
  IPropsFooterItem,
  IPropsheader,
} from "../components/layouts/Client/client.interface";
import facebookLogo from "@/assets/images/Socials/facebook.png"
import youtubeLogo from "@/assets/images/Socials/youtube.png"
import tripadisorLogo from "@/assets/images/Socials/icons8-trip-advisor-48.png"
export enum PathEnum {
  Home = "home",
  Courses = "courses",
  Lessons = "lessons",
  News = "news",
  Contact = "contact",
  FAQ = "FAQ",
  AboutUs = "about_us",
}
export interface ISocial{
  name:string,
  alt:string,
  path:string,
  logo:string
}
export const AllSettingHeader: IPropsheader[] = [
  { name: "home", path: "/", icon: <i className="ri-home-line"></i> },
  {
    name: "courses",
    path: "/khoa-hoc",
    icon: <i className="ri-menu-5-line"></i>,
  },
  { name: "news", path: "/tin-tuc/1", icon: <i className="ri-newspaper-line"></i> },
  {
    name: "instructor",
    path: "/giang-vien",
    icon: <i className="ri-questionnaire-line"></i>,
  },
  {
    name: "lessons",
    path: "/bai-hoc",
    icon: <i className="ri-list-indefinite"></i>,
  },
  {
    name: "contact",
    path: "/lien-he",
    icon: <i className="ri-message-3-line"></i>,
  },
  {
    name: "about_us",
    path: "/ve-chung-toi",
    icon: <i className="ri-questionnaire-line"></i>,
  },
];

export const settingsWhenLoginSuccess: IPropsheader[] = [
  {
    name: "My Class",
    path: "/Schedule",
    icon: <i className="ri-calendar-todo-fill"></i>,
  },
  {
    name: "My Debt",
    path: "/Debit",
    icon: <i className="ri-wallet-3-fill"></i>,
  },
  {
    name:"My Info",
    path:"/Profile",
    icon:<i className="ri-user-5-line"></i>
  }
];

export const FooterItems: IPropsFooterItem[] = [
  {
    name: "about_us_footer",
    path:"/ve-chung-toi",
    children: [
      {
        nameTitle: "Most popular",
        path: "/",
      },
      {
        nameTitle: "We have a best chef",
        path: "/",
      },
      {
        nameTitle: "Contact us",
        path: "/",
      },
      {
        nameTitle: "Ours moments",
        path: "/",
      },
    ],
  },
  {
    name: "recruitment",
    children: [
      {
        nameTitle: "Kid course",
        path: "/",
      },
      {
        nameTitle: "Bread course",
        path: "/",
      },
      {
        nameTitle: "Private course",
        path: "/",
      },
    ],
  },
  {
    name: "member_privileges",
    children: [
      {
        nameTitle: "About us",
        path: "/About us",
      },
      {
        nameTitle: "Privacy policy",
        path: "/",
      },
      {
        nameTitle: "FAQ",
        path: "/",
      },
    ],
  },
  {
    name: "partners",
    children: [
      {
        nameTitle: "About us",
        path: "/About us",
      },
      {
        nameTitle: "Privacy policy",
        path: "/",
      },
      {
        nameTitle: "FAQ",
        path: "/",
      },
    ],
  },
  {
    name: "faq",
    path:"/FAQ",
    children: [
      {
        nameTitle: "About us",
        path: "/About us",
      },
      {
        nameTitle: "Privacy policy",
        path: "/",
      },
      {
        nameTitle: "FAQ",
        path: "/",
      },
    ],
  },
  {
    name: "terms",
    children: [
      {
        nameTitle: "About us",
        path: "/About us",
      },
      {
        nameTitle: "Privacy policy",
        path: "/",
      },
      {
        nameTitle: "FAQ",
        path: "/",
      },
    ],
  },
  {
    name: "policy",
    children: [
      {
        nameTitle: "About us",
        path: "/About us",
      },
      {
        nameTitle: "Privacy policy",
        path: "/",
      },
      {
        nameTitle: "FAQ",
        path: "/",
      },
    ],
  },
  {
    name: "corporate",
    children: [
      {
        nameTitle: "About us",
        path: "/About us",
      },
      {
        nameTitle: "Privacy policy",
        path: "/",
      },
      {
        nameTitle: "FAQ",
        path: "/",
      },
    ],
  },
  
];

export const allSettingsMainAdmin: IPropsheader[] = [
  {
    name: "Trang chủ",
    icon: <i className="ri-apps-line"></i>,
    children:[
      {
        name:"Thống kê hệ thống",
        path:"/Admin"
      }
    ]
  },
  {
    name: "Khóa học",
    icon: <i className="ri-artboard-line"></i>,
    children:[
      {
        name:"Danh sách khóa học",
        path:"/Admin/CoursesManage"
      },
      {
        name:"Thêm khóa học",
        path:"/Admin/CoursesManage/Add"
      }
    ]
  },
  {
    name: "Sản phẩm / Dịch vụ",
    icon: <i className="ri-menu-5-line"></i>,
    children:[
      {
        name:"Danh sách sản phẩm và dịch vụ",
        path: "/Admin/ProductsManage",
      },{
        name:"Thêm sản phẩm hoặc dịch vụ",
        path: "/Admin/ProductsManage/Add",
      }
    ]
  },
  {
    name: "Tin tức",
    icon: <i className="ri-newspaper-line"></i>,
    children:[
      {
        name:"Danh sách tin tức",
        path:"/Admin/New"
      },
      {
        name:"Tạo trang tin tức mới",
        path:"/Admin/New/Add"
      }
    ]
  },
  {
    name: "Câu hỏi FAQ",
    icon: <i className="ri-questionnaire-line"></i>,
    children:[
      {
        name:"Danh sách câu hỏi FAQ",
        path: "/Admin/FAQ/",
      }
    ]
  },
  {
    name: "Giảng viên",
    icon: <i className="ri-parent-line"></i>,
    children:[
      {
        name:"Danh sách giảng viên ",
        path: "/Admin/Chef/",
      },
      {
        name:"Thêm giảng viên ",
        path: "/Admin/Chef/Add",
      }
    ]
  },
  {
    name: "Thông tin cơ bản",
    icon: <i className="ri-profile-line"></i>,
    children:[
      {
        name:"Doanh nghiệp",
        path:"/Admin/info/business"
      }
    ]
  },
  {
    name:"Trang người dùng",
    icon:<i className="ri-expand-left-line"></i>,
    path:"/"
  }
];

export const listSocials:ISocial[]=[
  {
    name:"facebook",
    logo:facebookLogo,
    alt:"Logo facebook",
    path:"https://www.facebook.com/cookingclassbymom" 
  },
  {
    name:"Youtube",
    logo:youtubeLogo,
    alt:"Logo youtube",
    path:"https://www.youtube.com/@M.O.MCOOKINGSTUIDO" 
  },
  {
    name:"Trip advisor",
    logo:tripadisorLogo,
    alt:"Logo Trip advisor",
    path:"https://www.tripadvisor.com.vn/Attraction_Review-g293925-d12365770-Reviews-M_O_M_Cooking_Class-Ho_Chi_Minh_City.html" 
  },
  

]
