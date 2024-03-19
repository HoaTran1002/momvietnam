
import Home from "@/pages/Client/Home";
import LoadingPage from "@/components/Loading/LoadingPage";
import { Suspense } from "react";
import React from "react";

// @ts-expect-error
const Courses = React.lazy(() => import("@/pages/Client/Courses"))
// @ts-expect-error
const CoursesDetail = React.lazy(() => import("@/pages/Client/CoursesDetail"))
// @ts-expect-error
const NewsDetail = React.lazy(() => import('@/pages/Client/NewsDetail'))
// @ts-expect-error
const News = React.lazy(() => import('@/pages/Client/News'))
// @ts-expect-error
const AboutUs = React.lazy(() => import('@/pages/Client/AboutUs'))
// @ts-expect-error
const Lessons = React.lazy(() => import('@/pages/Client/Lessons'))
// @ts-expect-error
const ContactUs = React.lazy(() => import('@/pages/Client/ContactUs'))
// @ts-expect-error
const FAQPage = React.lazy(() => import('@/pages/Client/FAQPage'))
// @ts-expect-error
const ErrorPage = React.lazy(() => import('@/pages/Error'))
// @ts-expect-error
const Login = React.lazy(() => import('@/pages/Auth/login'))
// @ts-expect-error
const AboutUsManage = React.lazy(() => import('@/pages/Admin/AboutUsManage'))
// @ts-expect-error
const CoursesManage = React.lazy(() => import('@/pages/Admin/Courses/CoursesManage'))
// @ts-expect-error
const LessonsManage = React.lazy(() => import('@/pages/Admin/LessonsManage'))
// @ts-expect-error
const NewsManage = React.lazy(() => import('@/pages/Admin/News/index'))
// @ts-expect-error
const OrderManage = React.lazy(() => import('@/pages/Admin/OrderManage'))
// @ts-expect-error
const ProductsManage = React.lazy(() => import('@/pages/Admin/Products/ProductsManage'));
// @ts-expect-error
const ProfileManage = React.lazy(() => import('@/pages/Admin/ProfileManage'));
// @ts-expect-error
const UsersManage = React.lazy(() => import('@/pages/Admin/UsersManage'));
// @ts-expect-error
const ClassManage = React.lazy(() => import('@/pages/Admin/ClassManage'));
// @ts-expect-error
const FAQManage = React.lazy(() => import('@/pages/Admin/FaqManage'));
// @ts-expect-error
const ChefManage = React.lazy(() => import('@/pages/Admin/Chef'));

// @ts-expect-error
const CoursesManageAdd = React.lazy(() => import('@/pages/Admin/Courses/CoursesManageAdd'));
// @ts-expect-error
const ProductManageAdd = React.lazy(() => import('@/pages/Admin/Products/ProductManageAdd'));
// @ts-expect-error
const ManagerInfo = React.lazy(() => import('@/pages/Admin/ManagerInfo'));
// @ts-expect-error
const BusinessInfo = React.lazy(() => import('@/pages/Admin/BusinessInfo'));
// @ts-expect-error
const AddNews = React.lazy(() => import('@/pages/Admin/News/NewsManageAdd'));

// @ts-expect-error
const ChefAdd = React.lazy(() => import('@/pages/Admin/Chef/ChefAdd'));

// @ts-expect-error
const DashBoard = React.lazy(() => import('@/pages/Admin/Dashboard'));
// @ts-expect-error
const Instructor = React.lazy(() => import('@/pages/Client/Instructor'));
// @ts-expect-error
const WorkShop = React.lazy(() => import('@/pages/Client/UpcomingWorkshop'));
// @ts-expect-error

const Service = React.lazy(() => import('@/pages/Client/ProductService'));

// @ts-expect-error
const FreeTrial = React.lazy(() => import('@/pages/Client/FreeTrial'));
export interface IPramsRoute {
  path: string;
  element: JSX.Element;
}

export const PublicRoute: IPramsRoute[] = [
  { path: "/", element: <Home /> },
  { path: "/tin-tuc/detail/:id", element: <NewsDetail /> },
  { path: "/tin-tuc/:page", element: <News /> },
  { path: "/khoa-hoc/:id", element: <CoursesDetail /> },
  { path: "/khoa-hoc", element: <Courses /> },
  { path: "/bai-hoc", element: <Lessons /> },
  { path: "/ve-chung-toi", element: <AboutUs /> },
  { path: "/lien-he", element: <ContactUs /> },
  { path: "/giang-vien", element: <Instructor /> },
  { path: "/dang-nhap-admin", element: <Login /> },
  { path: "/work-shop", element: <WorkShop /> },
  { path: "/dich-vu/:id", element: <Service /> },
  { path: "/free", element: <FreeTrial /> },
  { path: "/FAQ", element: <FAQPage /> },
  { path: "/*", element: <ErrorPage /> }
];

// Define your admin routes
export const AdminRoute: IPramsRoute[] = [
  { path: "/Admin/CoursesManage", element: <CoursesManage /> },
  { path: "/Admin/AboutUsManage", element: <AboutUsManage /> },
  { path: "/Admin/CoursesManage/Add", element: <CoursesManageAdd /> },
  { path: "/Admin/LessonsManage", element: <LessonsManage /> },
  { path: "/Admin/New", element: <NewsManage /> },
  { path: "/Admin/New/Add", element: <AddNews /> },
  { path: "/Admin/OrderManage", element: <OrderManage /> },
  { path: "/Admin/ProductsManage", element: <ProductsManage /> },
  { path: "/Admin/ProductsManage/Add", element: <ProductManageAdd /> },
  { path: "/Admin/ProfileManage", element: <ProfileManage /> },
  { path: "/Admin/UsersManage", element: <UsersManage /> },
  { path: "/Admin/ClassManage", element: <ClassManage /> },
  { path: "/Admin/FAQ", element: <FAQManage /> },
  { path: "/Admin/Chef", element: <ChefManage /> },
  { path: "/Admin/Chef/Add", element: <ChefAdd /> },
  { path: "/Admin/info/", element: <ManagerInfo /> },
  { path: "/Admin/info/business", element: <BusinessInfo /> },
  { path: "/Admin/", element: <DashBoard /> },
];

export const wrapWithSuspense = (element: JSX.Element, role: string) => (
  <Suspense fallback={<div className="w-screen h-screen flex items-center justify-center">
    <LoadingPage width="100vw" height="100vh" role={role} /></div>}>{element}
  </Suspense>
);

