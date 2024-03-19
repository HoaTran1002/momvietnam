import * as React from "react";
import CardData from "./CardData";
import { ICourse } from "@/interface/courses.interface";
import Input from "../Input";
import ItemDataLoading from "./ItemLoading";
import Button from "../Buttons";
import { useCoursesState } from "@/contexts/CoursesContext";
import CoursesDetail from "./CoursesDetail";
import { CategoryProvider } from "@/contexts/CategoryContext";
export const EmptyList = (): JSX.Element => {
  return (
    <div className="w-full col-span-2 rounded-lg bg-white p-5 h-[170px] flex items-center justify-center flex-col gap-3 text-[#666666]">
      <span className="text-6xl">
        <i className="ri-inbox-2-line"></i>
      </span>
      <span className="text-2xl font-medium">
        Không có khóa học nào tại đây
      </span>
    </div>
  );
};

const ListData = (): JSX.Element => {
  //==================================
  const [selectedCourse, setSelectedCourse] = React.useState<ICourse | undefined>(undefined);
  const [isDetail, setIsDetail] = React.useState<boolean>(false)
  const [coursesSearch,setCoursesSearch] = React.useState<string>('')
  const { listCourses, loading } = useCoursesState();
  const [courses,setCourses] = React.useState<ICourse[]>([])
  //================================
  const handleOpenModel = (course: ICourse | undefined) => {
    setSelectedCourse(course);
  };
  const renderItems = () => {
    const items = [];
    for (let i = 0; i < 2; i++) {
      items.push(<ItemDataLoading key={i} />);
    }
    return items;
  };
  const handleSearchCourses = ()=>{
    const list = courses.filter((r:ICourse)=>r.title?.trim().toLowerCase().includes(coursesSearch.trim().toLowerCase()))
    setCourses(list);
  }
  //================================
  React.useEffect(()=>{
    if(listCourses){
      setCourses(listCourses)
    }
  },[loading])
  
  return (
    <>
      {
        isDetail ? (
          <CategoryProvider idCourse={selectedCourse?._id || ""}>
              <CoursesDetail
                handleCloseDetail={()=> setIsDetail(false)}
                courseItem={selectedCourse || {}}
              />
          </CategoryProvider>

        ) : (
          loading ? (
            <div className="grid grid-cols-2 gap-4">
              {renderItems()}
            </div>
          ) : (
            <>
              <div className="bg-white p-5 grid grid-cols-2 gap-3 rounded-lg ">
                <div className="flex items-center gap-4">
                  <Input
                    className="flex-1"
                    value={coursesSearch}
                    onChange={(e)=>setCoursesSearch(e.target.value)}
                    placeholder="Nhập tên khóa học tại đây"
                    icon={<i className="ri-search-2-line"></i>}
                  />
                  <div className="flex items-center gap-4">
                    <Button 
                      className="bg-gradient-to-br  from-[#8a3fd9] to-[#c163ff] text-white"
                      onClick={handleSearchCourses}
                    >
                      Tìm kiếm
                    </Button>
                    <span 
                      className=" bg-gradient-to-br rounded-lg cursor-pointer from-[#8a3fd9] to-[#c163ff] text-white w-10 h-10 flex items-center justify-center"
                      onClick={()=>setCourses(listCourses || [])}  
                    >
                      <i className="ri-restart-line"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {courses ? (
                  courses?.length !== 0 ? (
                    [...courses].sort((a:ICourse, b:ICourse) => Number(a.position) - Number(b.position))?.map((item: ICourse, index: number) => (
                      <CardData
                        key={index} 
                        course={item}
                        onClick={() => {
                          handleOpenModel(item)
                          setIsDetail(true)
                        }}
                      />
                    ))
                  ) : (
                    <EmptyList />
                  )
                ) : (
                  <EmptyList />
                )}
              </div>
              
            </>
          )
        )
      }

    </>
  );
};

export default React.memo(ListData);
