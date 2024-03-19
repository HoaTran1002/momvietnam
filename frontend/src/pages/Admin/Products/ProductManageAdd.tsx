
import Pagetitle from "@/components/PageTitle";
// import UploadManyImages from '@/components/UploadManyImages'
import LayoutAdmin from "@/components/layouts/Admin/Layout";
import { CoursesProvider } from "@/contexts/CoursesContext";
import ListProductToAdd from "./LisrProductToAdd";
const ProductManageAdd = (): JSX.Element => {

  return (
    <LayoutAdmin>
      <CoursesProvider>
        <Pagetitle title="Thêm sản phẩm" />
        <ListProductToAdd/>
      </CoursesProvider>
    </LayoutAdmin>
  );
};
export default ProductManageAdd;
