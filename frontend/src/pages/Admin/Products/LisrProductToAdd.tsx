import ItemDataLoading from '@/components/CoursesManage/ItemLoading';
import { useCoursesState } from '@/contexts/CoursesContext';
import { ICourse } from '@/interface/courses.interface';
import React from 'react'
import ProductForAdd from './ProductForAdd';
import Input from '@/components/Input';
import Button from '@/components/Buttons';
import CardData from '@/components/CoursesManage/CardData';
import { EmptyList } from '@/components/CoursesManage/ListData';
import { CategoryProvider } from '@/contexts/CategoryContext';
const ListProductToAdd = ():JSX.Element=>{
    //==================================
    const [selectedCourse, setSelectedCourse] = React.useState<ICourse | undefined>(undefined);
    const [isDetail, setIsDetail] = React.useState<boolean>(false)
    const [coursesSearch, setCoursesSearch] = React.useState<string>('')
    const { listCourses, loading } = useCoursesState();
    const [courses, setCourses] = React.useState<ICourse[]>([])
    //================================
    console.log(selectedCourse?._id);
    
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
    const handleSearchCourses = () => {
        const list = courses.filter((r: ICourse) => r.title?.trim().toLowerCase().includes(coursesSearch.trim().toLowerCase()))
        setCourses(list);
    }
    //================================
    React.useEffect(() => {
        if (listCourses) {
            setCourses(listCourses)
        }
    }, [loading])

    return (
        <>

            {
                isDetail ? (
                    <CategoryProvider idCourse={selectedCourse?._id || ""}>
                        <ProductForAdd
                            handleCloseDetail={()=> setIsDetail(false)}
                        // courseItem={selectedCourse || {}}
                        />
                    </CategoryProvider>
                ) : (
                    loading ? (
                        <div className="grid grid-cols-2 gap-4">
                            {renderItems()}
                        </div>
                    ) : (
                        <>
                            <h2 className="text-3xl font-bold text-gray-600">Thêm sản phẩm</h2>
                            <span className='py-2 text-base text-gray-600 font-semibold text-red-500'> * Chọn 1 trong các khóa học sau để thêm sản phẩm </span>
                            <div className="bg-white p-5 grid grid-cols-2 gap-3 rounded-lg ">
                                <div className="flex items-center gap-4">
                                    <Input
                                        className="flex-1"
                                        value={coursesSearch}
                                        onChange={(e) => setCoursesSearch(e.target.value)}
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
                                            onClick={() => setCourses(listCourses || [])}
                                        >
                                            <i className="ri-restart-line"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                {courses ? (
                                    courses?.length !== 0 ? (
                                        courses?.map((item: ICourse, index: number) => (
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
}
export default ListProductToAdd
