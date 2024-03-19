import Button from '@/components/Buttons';
import Input from '@/components/Input';
import { useAlertMessage } from '@/contexts/AlertContext';
import { isStartDateBeforeEndDate } from '@/utils/formatTime';
import React from 'react'
interface InputFilterDate {
    fromDateStatus: boolean,
    toDateStatus: boolean,
    fromDate: string,
    toDate: string,

}
interface IFilterDateForNews {
    onChangeSearch: (value: string) => void;
    handleClickSearch: () => void;
    handleResetState: () => void;
    onChangeFromDate: (value: string) => void,
    onChangeToDate: (value: string) => void,
}
const FilterDateForNews = ({ onChangeSearch, onChangeFromDate, onChangeToDate, handleResetState, handleClickSearch }: IFilterDateForNews): JSX.Element => {
    const [statusFormDateInput, setStatusFormDateInput] = React.useState<InputFilterDate>({
        fromDateStatus: false,
        toDateStatus: false,
        fromDate: "",
        toDate: ""
    })
    const [search, setSearch] = React.useState<string>('')
    const { addAlert } = useAlertMessage()
    const handleFilterDate = () => {
        if (statusFormDateInput.fromDateStatus === true &&
            statusFormDateInput.toDateStatus === false ||
            statusFormDateInput.fromDateStatus === false &&
            statusFormDateInput.toDateStatus === true) {
            addAlert({
                message: "Bạn phải nhập tên tin tức tìm kiếm hoặc chọn ngày tìm kiếm trong ngày đến và ngày đi",
                title: "Thông báo",
                type: "warning"
            });
            return;
        } else {
            if (statusFormDateInput.fromDateStatus === true &&
                statusFormDateInput.toDateStatus === true && !isStartDateBeforeEndDate(statusFormDateInput.fromDate, statusFormDateInput.toDate)) {
                addAlert({
                    message: "Ngày bắt đầu phải nhỏ hơn ngày kết thúc",
                    title: "Thông báo",
                    type: "warning"
                });
            }else if(search.trim() === "" && !(statusFormDateInput.fromDateStatus === true &&
            statusFormDateInput.toDateStatus === true))  {
                addAlert({
                    message: "Chưa nhập tên tìm kiếm hoặc ngày tìm kiếm ",
                    title: "Thông báo",
                    type: "warning"
                });
            }else{
                
                handleClickSearch();
            }
        }


    }
    const handleReset = () => {
        setStatusFormDateInput({
            fromDateStatus: false,
            toDateStatus: false,
            fromDate: "",
            toDate: ""
        })
        setSearch('')
        handleResetState()
    }
    React.useEffect(() => {
        onChangeSearch(search)
        onChangeFromDate(statusFormDateInput.fromDate)
        onChangeToDate(statusFormDateInput.toDate)
    }, [search, statusFormDateInput.fromDate, statusFormDateInput.toDate])
    return (
        <div className='bg-secondary rounded-sm px-3 py-4 my-3 flex flex-col' >
            <div className='flex items-center gap-5 max-sm:gap-1 justify-center max-sm:flex-col'>
                <div className='flex items-center gap-2'>
                    <span className='text-white font-medium'>Từ ngày: </span>
                    <span className='bg-white inline-block rounded-sm py-2 px-4'>
                        <input className='bg-transparent outline-none' type="date"
                            value={statusFormDateInput.fromDate}
                            onChange={(e) => { setStatusFormDateInput((pre) => ({ ...pre, fromDate: e.target.value, fromDateStatus: true })) }}
                        />
                    </span>
                </div>
                <i className="ri-arrow-right-fill text-white max-sm:rotate-90"></i>
                <div className='flex items-center gap-2'>
                    <span className='text-white font-medium'>Đến ngày: </span>
                    <span className='bg-white inline-block rounded-sm py-2 px-4'>
                        <input
                            value={statusFormDateInput.toDate}

                            className='bg-transparent outline-none' type="date"
                            onChange={(e) => setStatusFormDateInput((pre) => ({ ...pre, toDate: e.target.value, toDateStatus: true }))}
                        />
                    </span>
                </div>
            </div>
            <div className='flex-col items-center gap-3  w-full'>
                <span className='flex-1 block w-full'>
                    <Input
                        value={search}
                        className='w-full '
                        placeholder='Nhập tên tin tức ...'
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </span>
                <span className='flex items-center gap-2 justify-center'>
                    <Button
                        afterIcon={<i className="ri-search-2-line"></i>}
                        className='bg-sub_secondary text-white '
                        onClick={handleFilterDate}
                    >
                        Tìm kiếm
                    </Button>
                    <Button
                        afterIcon={<i className="ri-refresh-line"></i>}
                        className='bg-sub_secondary text-white '
                        onClick={handleReset}
                    >
                        Khôi phục
                    </Button>
                </span>
            </div>
        </div>
    )
}
export default FilterDateForNews