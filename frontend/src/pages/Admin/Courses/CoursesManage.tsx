import ListData from "@/components/CoursesManage/ListData";
import LayoutAdmin from "@/components/layouts/Admin/Layout";
import Pagetitle from "@/components/PageTitle";
import { CoursesProvider } from "@/contexts/CoursesContext";
const CoursesManage = (): JSX.Element => {
  return (
    <LayoutAdmin>
      <CoursesProvider>
        <Pagetitle title="Course" />
        <ListData/>
      </CoursesProvider>
    </LayoutAdmin>
  );
};
export default CoursesManage;
