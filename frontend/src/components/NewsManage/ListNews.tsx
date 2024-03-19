import React from "react";
import { formatElapsedTime } from "@/utils/formatTime";
import { INew } from "@/interface/news.interface";
import Tooltip from "../Tooltip";
import { useNewsState } from "@/contexts/NewContext";
import NewDetail from "./NewDetail";
import FilterNews from "./FilterNews";
import { Paginate } from "../Paginate/Paginate";
import { linkUrlWeb } from "@/utils/getLinkUrl";
// import { useNavigate } from "react-router-dom";

const ListNews = (): JSX.Element => {
  //==============================================
  const [newSelect, setNewSelect] = React.useState<INew>();
  const {page,setPage,total_pages,listNews}= useNewsState()

  //==============================================






  return (
    <>

      {
        newSelect !== undefined ? (
          <NewDetail
            news={newSelect}
            onClose={() => setNewSelect(undefined)}
          />

        ) : (
          <>
        <FilterNews />
        <div className="flex items-center justify-center">
                <Paginate
                  total_pages={total_pages || 1}
                  current={page || 1}
                  onChangePage={function (value: number): void {
                    setPage&&setPage(value);
                  }}
                />
              </div>
            <div className="grid grid-cols-12 gap-4 mt-5">
              {listNews?.map((item: INew, index: number) => (
                <div
                  key={index}
                  className="col-span-3 rounded-lg  bg-white"
                >
                  <div className="w-full h-56 overflow-hidden rounded-tl-lg rounded-tr-lg">
                    <img
                      loading="lazy"
                      src={`${linkUrlWeb(item.image?.url)}`}
                      alt={item?.title || ""}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-4">
                    <span>{formatElapsedTime(item?.dateCreated)}</span>
                    <Tooltip name={item.title} position="top_right">
                      <p className="text-xl cursor-pointer font-bold text-ellipsis overflow-hidden  h-[60px] line-clamp-2 text-gray-600" onClick={() => setNewSelect(item)}>
                        {item.title}
                      </p>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
                <Paginate
                  total_pages={total_pages || 1}
                  current={page || 1}
                  onChangePage={function (value: number): void {
                    setPage&&setPage(value);
                  }}
                />
              </div>
          </>
        )
      }

    </>
  );
};
export default ListNews;
