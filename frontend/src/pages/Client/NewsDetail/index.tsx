import React from "react";
import LayoutMain from "@/components/layouts/Client/Main";
import { INew } from "@/interface/news.interface";
import view1 from "@/assets/images/Views/toa-heftiba-_K3uGqvmEsY-unsplash.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "@/components/Buttons";
import useFetch from "@/hooks/useFetch.hook";
import { apiGetNewsById } from "@/apis/news.api";
import { formatElapsedTime } from "@/utils/formatTime";
import { linkWebPath } from "@/utils/linkWebPath";
import SloganFooter from "@/components/layouts/Client/Footer/SloganFooter";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LoadingPage from "@/components/Loading/LoadingPage";
import Tooltip from "@/components/Tooltip";
import ViewListImage from "@/components/ViewListImage";
import Pagetitle from "@/components/PageTitle";
const NewsDetail = (): JSX.Element => {
  const [newdata, setNewData] = React.useState<INew | undefined>(undefined)
  const [openView, setOpenView] = React.useState<boolean>(false)
  const navigate = useNavigate();
  const [_newState, callNewState] = useFetch()
  const { id } = useParams();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  React.useEffect(() => {
    if (id) {
      callNewState(
        async () => {
          try{
            const data = await apiGetNewsById(id)
            setNewData(data?.data?.data)
          }catch{
            navigate("/tin-tuc/1")
          }
          
        }
      )
    }
  }, [])
  return (
    <LayoutMain>
      <>
      <Pagetitle title={newdata?.title || "tin tức"}/>
        <div className="relative">
          <div className="absolute text-4xl w-screen h-[105vh] bg-slate-950/20 flex items-center justify-center px-3 z-10 text-white uppercase tracking-widest font-normal text-center flex-col gap-3">
            <span>NEWS</span>
            <span className="text-base px-24 max-sm:px-2">
              Cập nhập những thông tin mới nhất, bài viết mới nhất
            </span>
          </div>
          <div
            style={{
              backgroundImage: `url(${view1})`,
            }}
            className="w-screen h-[105vh] bg-cover bg-fixed bg-bottom"
          ></div>
        </div>
        <div className="relative mt-10 container grid grid-cols-12 gap-3">
          <div className="col-start-2 col-end-12 max-sm:col-start-1 max-sm:col-end-13">
            <div className="relative">
              <LazyLoadImage
                placeholder={<LoadingPage height="700px" width="100%" />}
                src={`${linkWebPath(newdata?.image?.url || "") || ""}`}
                className="w-full h-auto max-h-[700px] rounded-sm object-cover object-center"
              />
              <Tooltip name="Xem ảnh">
                <span
                  className="rounded-full cursor-pointer bg-black/30 absolute bottom-2 right-2 w-[60px] h-[60px] text-white flex items-center justify-center"
                  onClick={() => setOpenView(true)}
                >
                  <i className="ri-fullscreen-line text-3xl"></i>
                </span>
              </Tooltip>
            </div>
            <div className="">
              <h2 className="text-3xl font-medium py-4">{newdata?.title}</h2>
              <p className="text-lg text-gray-600">Ngày đăng:<span className="font-semibold"> {formatElapsedTime(newdata?.dateCreated)}</span></p>
              <div className="py-4 ">
                <div
                  className="text-lg leading-9"
                  dangerouslySetInnerHTML={{ __html: newdata?.content || "" }}
                />

              </div>
            </div>
            <div>
              <Link className="" to={"/News"}></Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Button onClick={() => navigate(-1)} beforeIcon={<i className="ri-arrow-left-line"></i>} className="text-xl border border-solid border-[#92a365] rounded-sm  text-[#92a365] my-4 hover:bg-[#92a365] hover:text-white transition-all">
            Các tin tức khác
          </Button>
        </div>
        <SloganFooter />
        {
          openView && (
            <ViewListImage
              listImage={[linkWebPath(newdata?.image?.url || "") || ""]}
              onClose={() => setOpenView(false)}
            />

          )
        }
      </>
    </LayoutMain>
  );
};
export default NewsDetail;
