
import LoadingPage from "@/components/Loading/LoadingPage";
import EmptyList from "@/components/NewsManage/EmptyList";
import ListNews from "@/components/NewsManage/ListNews";
import Pagetitle from "@/components/PageTitle";
import { useNewsState } from "@/contexts/NewContext";
import { useEffect } from "react";
const NewsManage = (): JSX.Element => {
  // const [currentPage, setCurrentPage] = useState<number>(1);
  const {setItems,loading,listNews}= useNewsState()
  //==========================================
  const renderItems = () => {
    const items = [];
    for (let i = 0; i < 4; i++) {
      items.push(<div key={i} className="w-full col-span-3 bg-white rounded"><LoadingPage height="350px" width="100%" role="admin" key={i} /></div>);
    }
    return items;
  };

  //==========================================
  useEffect(() => {
    setItems&&setItems(8)
  }, []);
  console.log(listNews?.length);
  
  return (
      <>
        <Pagetitle title="Quản lý bài viết" />
        {loading ? (
          <div className="grid grid-cols-12 gap-4 mt-4">
            {renderItems()}
          </div>
        ) : (
          listNews&&listNews?.length < 1 ? (
            <EmptyList />
          ) : (
            <>
              <ListNews/>
            </>
          )
        )}
      </>
  );
};
export default NewsManage;
