// import React from "react";
import { Link } from "react-router-dom";
import { INew } from "@/interface/news.interface";
import { formatElapsedTime } from "@/utils/formatTime";
import Tooltip from "./Tooltip";
import { linkWebPath } from "@/utils/linkWebPath";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LoadingPage from "./Loading/LoadingPage";
interface IPropsNewCard {
  item: INew
}
const NewsCard = ({ item }: IPropsNewCard): JSX.Element => {
  return (
    <div>
      <Link to={`/tin-tuc/detail/${item._id}`}>
        <div className="shadow-sm relative h-[450px]">
          <LazyLoadImage
            placeholder={<LoadingPage height="450px" width="100%" />}
            className="w-full h-full object-cover rounded-sm"
            src={`${linkWebPath(item.image?.url || "") || ""}`}
          />
          <div className="px-3 py-4 transition-all text-white absolute bottom-0 left-0 right-0 bg-[#9eb26c]/80 min-h-[70px] hover:bg-white hover:text-[#9eb26c] ">
            <Tooltip name={item.title}>
              <h2 className="text-xl font-semibold text-ellipsis line-clamp-1 h-[30px] leading-8 mb-2">{item.title}</h2>
            </Tooltip>
            <p className="text-base font-medium">
              {formatElapsedTime(item.dateCreated)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default NewsCard;
