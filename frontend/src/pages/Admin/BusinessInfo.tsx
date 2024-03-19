import Input from "@/components/Input";
import LayoutAdmin from "@/components/layouts/Admin/Layout";
// import React from 'react'
const BusinessInfo = (): JSX.Element => {
  return (
    <LayoutAdmin>
      <>
        <div className="bg-white rounded-lg p-5">
          <h2>Thông tin cá nhân</h2>
          <div className="grid grid-cols-12">
            <div className="col-span-6">
              <Input labelName="" />
            </div>
          </div>
        </div>
      </>
    </LayoutAdmin>
  );
};
export default BusinessInfo;
