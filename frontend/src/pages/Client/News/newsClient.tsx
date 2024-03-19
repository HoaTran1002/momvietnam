import React, { useCallback, useMemo } from 'react'
import FilterDateForNews from './FilterDayNew/FilterDateForNews'
import LoadingItems from '@/components/NewsManage/LoadingItems'
import { useNewsState } from '@/contexts/NewContext'
import { INew } from '@/interface/news.interface'
import NewsCard from '@/components/NewsCard'
import {  useNavigate, useParams } from 'react-router-dom'
import { compareDayBetweenFromDateAndToDate, formatDate } from '@/utils/formatTime'
import PageinationNewClient from './PageinationNewClient/PaginationNewClient'
interface IDateFilter {
    fromDate: string,
    toDate: string
}
const NewsClient = (): JSX.Element => {
    const [dateFilter, setDateFilter] = React.useState<IDateFilter>({ fromDate: "", toDate: "" })
    const [keySearch, setKeySearch] = React.useState<string>('')
    const [isSearch, setIsSearch] = React.useState<boolean>(false)
    const [newsFind,setNewsFind] = React.useState<INew[]>([])
    const { loading, listNews, setIsReset, setTotalPages } = useNewsState()
    const { page } = useParams()
    const startIndex = (Number(page) - 1) * 8;
    const endIndex = Number(page) * 8;
    const totalPages = Math.ceil((listNews && listNews.length) ? listNews.length / 8 : 0);
    const navigate = useNavigate()
    //==========================================
    const renderItems = () => {
        const items = [];
        for (let i = 0; i < 8; i++) {
            items.push(<LoadingItems key={i} />);
        }
        return items;
    };

    const news = useMemo(() => listNews?.reverse(), [listNews]);
    const handleSearch = () => {
        let filteredNews = listNews || [];
        if (keySearch) {
            filteredNews = filteredNews.filter((item: INew) => item?.title?.toLowerCase().trim().includes(keySearch.toLowerCase().trim()));
        }
        if (dateFilter.fromDate && dateFilter.toDate) {
            filteredNews = filteredNews.filter((item: INew) => {
                return compareDayBetweenFromDateAndToDate(dateFilter.fromDate,dateFilter.toDate,item.dateCreated)
            });

            if (keySearch) {
                filteredNews = filteredNews.filter((item: INew) => item?.title?.toLowerCase().trim().includes(keySearch.toLowerCase().trim()));
            }
        }
        setNewsFind(filteredNews.reverse())
        setIsSearch(true);
    };

    const handleReset = useCallback(() => {
        setIsSearch(false);
        navigate('/tin-tuc/1')
    }, [setIsSearch]);
    React.useEffect(() => {
        if (setIsReset && setTotalPages) {
            setIsReset(r => !r)
            setTotalPages(Math.ceil((listNews && listNews.length) ? listNews.length / 8 : 0))
        }
    }, [])

    return (
        <>
            <FilterDateForNews
                onChangeFromDate={(value) => setDateFilter((pre) => ({ ...pre, fromDate: value }))}
                onChangeToDate={(value) => setDateFilter((pre) => ({ ...pre, toDate: value }))}
                onChangeSearch={(value) => setKeySearch(value)}
                handleClickSearch={handleSearch}
                handleResetState={handleReset}
            />
            {
                isSearch ? (
                    <>
                        <span className=" flex items-center justify-center text-2xl font-semibold text-primary my-3">
                            Có {newsFind?.length} tin tức được tìm thấy
                            {keySearch !== "" && " theo tin tức ' " + keySearch + "' "} {dateFilter.fromDate !== "" && "từ ngày " + formatDate(new Date(dateFilter.fromDate)) + "   đến ngày " + formatDate(new Date(dateFilter.toDate))}
                        </span>
                        <div className="grid grid-cols-12 gap-1 max-sm:gap-2 ">
                            {newsFind?.map((item: INew) => (
                                <div key={item._id} className="col-span-3 max-sm:col-span-12">
                                    <NewsCard item={item} />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    loading ? (
                        <div className="grid grid-cols-12 gap-4 mt-4">
                            {renderItems()}
                        </div>
                    ) : (
                        <>
                            <PageinationNewClient
                                page={Number(page)}
                                totalPages={totalPages}
                            />
                            <div className="grid grid-cols-12 gap-1 max-sm:gap-2 ">
                                {news?.slice(startIndex, endIndex)?.map((r: INew, index: number) => (
                                    <div key={index} className="col-span-3 max-sm:col-span-12">
                                        <NewsCard item={r} />
                                    </div>
                                ))}
                            </div>
                            <PageinationNewClient
                                page={Number(page)}
                                totalPages={totalPages}
                            />
                        </>
                    )

                )
            }
        </>
    )
}
export default NewsClient