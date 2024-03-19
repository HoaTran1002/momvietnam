import AddFAQuestion from "@/components/FAQManage/AddFAQuestion";
import Pagetitle from "@/components/PageTitle";
import LayoutAdmin from "@/components/layouts/Admin/Layout";
import { FaqProvider } from "@/contexts/FaqContext";
import ListData from "./ListData";
const Index = (): JSX.Element => {
  return (
    <>
      <LayoutAdmin>
        <>
          <Pagetitle title="Quản lý câu hỏi thường gặp" />
          <h1 className="text-3xl font-medium py-4 text-gray-700">
            Danh sách câu hỏi thường gặp
          </h1>
          <div className="bg-white rounded-lg p-5">
            <FaqProvider>
                <AddFAQuestion/>
                <ListData/>
            </FaqProvider>
          </div>
        </>
      </LayoutAdmin>
    </>
  );
};
export default Index;
