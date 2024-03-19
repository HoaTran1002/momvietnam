// import React from "react";
import { Link } from "react-router-dom";
import { INew } from "@/interface/news.interface";
import { getLastPathComponent } from "@/utils/getLastArray";
import { formatElapsedTime } from "@/utils/formatTime";
import { LazyLoadImage } from "react-lazy-load-image-component";
interface IPropsNewItem {
  item:INew
}
const NewItem = ({item }: IPropsNewItem): JSX.Element => {
  return (
    <div>
      
      <Link to={`/tin-tuc/detail/${item._id}`}>
        <div className="list-news-items relative">
          <div className="list-news-items-img">
            <LazyLoadImage src={`/imgs/${getLastPathComponent(item.image?.url || "") || ""}`} loading="lazy" />
          </div>
          <div className="px-3 py-4 transition-all text-white absolute bottom-0 left-0 right-0 bg-[#9eb26c]/80 min-h-[70px] hover:bg-white hover:text-[#9eb26c] ">
              <h2 className="text-xl font-semibold text-ellipsis line-clamp-1 h-[30px] leading-8 mb-2">{item.title}</h2>
            <p className="text-base font-medium">
              {formatElapsedTime(item.dateCreated)}
            </p>
          </div>  
        </div>
      </Link>
    </div>
  );
};
export default NewItem;
