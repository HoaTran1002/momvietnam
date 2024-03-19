import Pagetitle from "@/components/PageTitle";
import TextEditor from "@/components/TextEditor";
import LayoutAdmin from "@/components/layouts/Admin/Layout";
import React, { useState } from "react";
import { apiCreateNews } from "@/apis/news.api";
import useFetch from "@/hooks/useFetch.hook";
import Button from "@/components/Buttons";
// import { TextField } from "@mui/material";
// import LoadingPage from "@/components/Loading/LoadingPage";
import UploadImage from "@/components/UploadImage";
import Input from "@/components/Input";
import { useAlertMessage } from "@/contexts/AlertContext";
import { INew } from "@/interface/news.interface";
// import LoadingPage from "@/components/Loading/LoadingPage";

const AddNews = (): JSX.Element => {
  const [newCreate, setNewCreate] = useState<INew>({
    author: "",
    content: "",
    dateCreated: new Date().toLocaleString(),
    file: undefined,
    title: ""
  })
  const [stateCreateTextEditor, upTextEditor] = useFetch();
  const { addAlert } = useAlertMessage();

  const handleFileSelect = React.useCallback((file: File) => {
    setNewCreate((pre) => ({ ...pre, file: file }));
  }, []);

  const onSubmitNews = async (): Promise<void> => {
    if(newCreate.file !== undefined){
      const dataUpNews: INew = {
        title: newCreate.title,
        author: newCreate.author,
        file: newCreate.file,
        content: newCreate.content,
        dateCreated: newCreate.dateCreated
      };
      await upTextEditor(async () => {
        try {
          await apiCreateNews(dataUpNews);
          addAlert({
            message: "Thêm thành công tin tức mới",
            title: "Thành công",
            type: "success",
          });
        } catch {
          addAlert({
            message: "Đã có lỗi trong quá trình thêm, vui lòng thử lại sau!",
            title: "Lỗi",
            type: "error",
          });
        }
      });
    }else{
      addAlert({
        message: "Chưa có hình ảnh nào được chọn cho bài viết này vui lòng chọn 1 hình ảnh",
        title: "Lỗi",
        type: "error",
      });
    }
  };
  return (
    <LayoutAdmin>
      <>
        <>
          <Pagetitle title="Thêm tin tức" />
          <h1 className="text-3xl font-semibold py-3 text-gray-600">Thêm tin tức mới </h1>
          <div className="bg-white rounded-lg p-5">
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-5 p-2">
                <UploadImage
                  onFileSelect={handleFileSelect} />
              </div>
              <div className="col-span-7">
                <div>
                  {/* <TextField type="text" onChange={onChangeTitle} /> */}
                  <Input
                    value={newCreate.title}
                    onChange={(e) => setNewCreate((pre)=>({...pre,title:e.target.value}))}
                    labelName="Tiêu đề"
                    placeholder="Nhập tiêu đề"
                  />
                  <Input
                    value={newCreate.author}
                    onChange={(e) => setNewCreate((pre)=>({...pre,author:e.target.value}))}
                    labelName="Tác giả (Người đăng bài viết)"
                    placeholder="Nhập tên người đăng bài"
                  />
                </div>
                <div className="p-2"></div>
              </div>
              <div className="col-span-12">
                <div>
                  <TextEditor
                    valueText={newCreate.content}
                    onChange={(value: string) => {
                      setNewCreate((pre)=>({...pre,content:value}));
                    }}
                  />
                </div>
                <div className="flex items-center gap-5 justify-end p-4">
                  <Button
                    onClick={onSubmitNews}
                    isLoading={stateCreateTextEditor.loading}
                    className="bg-gradient-to-br from-[#8a3fd9] to-[#c163ff] text-white"
                    beforeIcon={<i className="ri-add-fill"></i>}
                  >
                    <span className="ml-2">Thêm tin tức mới</span>
                  </Button>
                  <Button className="bg-gradient-to-br from-[#ff9f93] to-[#ff6854] text-white">
                    <span>Trở về</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      </>
    </LayoutAdmin>
  );
};
export default AddNews;
