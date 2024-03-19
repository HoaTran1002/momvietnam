import LayoutAdmin from "@/components/layouts/Admin/Layout";
import Pagetitle from "@/components/PageTitle";

import { CoursesProvider } from "@/contexts/CoursesContext";
import ProductsOfCourse from "./ProductsOfCourse";
const ProductsManage = (): JSX.Element => {
  return (
    <LayoutAdmin>
      <CoursesProvider>
        <Pagetitle title="Quản lý sản phẩm" />
        <ProductsOfCourse/>
      </CoursesProvider>
    </LayoutAdmin>
  );
};
export default ProductsManage;
