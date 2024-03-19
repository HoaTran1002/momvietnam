import LayoutAdmin from "@/components/layouts/Admin/Layout";
import Pagetitle from "@/components/PageTitle";
const OrderManage = (): JSX.Element => {
  return (
    <LayoutAdmin>
      <>
        <Pagetitle title="Quản lý đơn hàng" />
      </>
    </LayoutAdmin>
  );
};
export default OrderManage;
