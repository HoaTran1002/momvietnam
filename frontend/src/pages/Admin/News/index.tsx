import LayoutAdmin from "@/components/layouts/Admin/Layout";
import { NewsProvider } from "@/contexts/NewContext";
import NewsManage from "./NewsManage";
const Index = (): JSX.Element => {

  return (
    <LayoutAdmin>
      <NewsProvider>
        <NewsManage/>
      </NewsProvider>
    </LayoutAdmin>
  );
};
export default Index;
