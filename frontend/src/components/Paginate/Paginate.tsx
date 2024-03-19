import { useEffect, useState } from "react";
interface props {
  total_pages: number;
  current: number;
  onChangePage: (value: number) => void;
}
export function Paginate({ total_pages, current, onChangePage }: props) {
  const [currentPage, setCurrentPage] = useState(current);
  useEffect(() => {
    onChangePage(currentPage);
  }, [currentPage]);
  let maxPages = total_pages;
  let items = [];
  let leftSide = currentPage - 2;
  if (leftSide <= 0) leftSide = 1;
  let rightSide = currentPage + 2;
  if (rightSide > maxPages) rightSide = maxPages;
  for (let number = leftSide; number <= rightSide; number++) {
    items.push(
      <li
        key={number}
        className={
          `rounded-sm cursor-pointer font-medium text-xl w-8 h-8 flex items-center justify-center ${number === currentPage ? " border-[#373737] border border-solid text-gray-800 " : "text-gray-600"}`

        }
        onClick={() => {
          setCurrentPage(number);
        }}
      >
        {number}
      </li>
    );
  }
  const nextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginationRender = (
    <div className="py-6 ">
      <ul className="flex items-center gap-3">
        <li className="text-lg cursor-pointer" onClick={prevPage}>
          <i className="ri-arrow-left-s-line"></i>
        </li>
        {items}
        <li className="text-lg cursor-pointer" onClick={nextPage}>
          <i className="ri-arrow-right-s-line"></i>
        </li>
      </ul>
    </div>
  );
  return paginationRender;
}
