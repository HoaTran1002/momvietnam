import { linkWebPath } from "@/utils/linkWebPath";
import React from "react";
export interface ColumnsProps {
  headerName?: string | null;
  field: string;
  type?: string;
  hidden?: boolean;
  image?: boolean;
  max_content?: boolean;
  header_content_center?: boolean;
  content_center?: boolean;
  header_max_content?: boolean;
  getActions?: (params?: any) => JSX.Element[];
  isPag?: boolean
}
interface TableProps {
  isLoading?: boolean;
  columns: ColumnsProps[];
  rows: any[];
  numberItems?: number;
}
const Table = ({ isLoading, columns, rows }: TableProps): JSX.Element => {
  return (
    <>
      <table className="min-w-full border-collapse font-medium overflow-hidden">
        <thead className="rounded-tl-md rounded-tr-md">
          <tr className="text-gray-700 border-b border-solid border-slate-300">
            {
              columns.map((r: ColumnsProps, index: number) => (
                r.hidden === true ? (null):(
                  <td
                    key={index}
                    className={`px-4 py-4 font-medium text-xl `}
                  >
                    <p className={`${r.header_content_center ? "text-center" : ""} ${r.header_max_content ? "w-max block" : ""}`}> 
                      {r.headerName}  
                    </p>
                  </td>

                )
              ))
            }
          </tr>
        </thead>
        <tbody className="">
          {
            isLoading ? (
              <tr>
                <td colSpan={columns.length} >
                  <div className="h-[300px] flex items-center justify-center">
                    <span className="animate-spin">
                      <i className="ri-loader-2-fill text-5xl text-sub_primary"></i>
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              rows.length < 1 ? (
                <tr>
                  <td colSpan={columns.length}>
                    <div className="flex flex-col gap-4 items-center py-5">
                      <i className="ri-inbox-2-fill text-4xl text-gray-600 "></i>
                      <span className="text-gray-600 text-2xl font-bold text-center">Không có gì ở đây</span>
                    </div>
                  </td>
                </tr>
              ) : (
                rows?.map((row, index: number) => (
                  <tr
                    key={index}
                    className={`border-b transition-all duration-150 border-solid border-slate-300 px-2 py-4  bg-white `}
                  >
                    {columns
                      .filter((r) => !r.hidden)
                      .map((column: ColumnsProps, columnIndex: number) => (
                        <td
                          key={columnIndex}
                          className="px-4 py-4 align-middle"
                        >
                          {column.getActions &&
                            typeof column.getActions === "function" ? (
                            <div className="flex gap-3 items-center" key={columnIndex}>
                              {column
                                .getActions(row)
                                .map((action: any, actionIndex: any) => (
                                  <span key={actionIndex}>
                                    {React.isValidElement(action)
                                      ? action
                                      : String(action)}
                                  </span>
                                ))}
                            </div>
                          ) : (
                            column.image ? (
                              <img
                                src={linkWebPath(row[column.field])}
                                className="w-[55px] h-[55px] max-w-[55px] max-h-[55px] rounded object-cover"
                              />
                            ) : (
                              column.isPag ? (
                                <div
                                  dangerouslySetInnerHTML={{ __html: row[column.field] || "" }}
                                />
                              ) : (
                                <span className={`${column.max_content ? "block w-max" : ""} ${column.content_center ? "text-center block" : ""} `}>
                                  {
                                    row[column.field]
                                  }
                                </span>
                              )
                            )
                          )}
                        </td>
                      ))}
                  </tr>
                ))
              )
            )
          }
        </tbody>
      </table>
    </>
  );
};
export default Table;
