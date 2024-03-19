import Button from '@/components/Buttons'
import { useNavigate } from 'react-router-dom'

interface IPageinationNewClient {
    totalPages: number,
    page: number
}
const PageinationNewClient = ({ page, totalPages }: IPageinationNewClient): JSX.Element => {
    const navigate = useNavigate()
    const renderItems = () => {
        const items = [];
        for (let i = 1; i <= totalPages; i++) {
            items.push(
                <Button key={i} className={`w-[45px] font-semibold text-xl flex items-center justify-center h-[45px] border border-solid border-primary ${page === i ?"bg-primary text-white":"text-primary"}`} onClick={() => navigate(`/tin-tuc/${i}`)}>
                    {i}
                </Button>
            );
        }
        return items;
    };
    return (
        <div className='flex items-center justify-center my-4'>
            <div className='flex gap-3 items-center'>
                <Button className='w-[45px] flex items-center justify-center h-[45px] border border-solid border-primary' disabled={Number(page) === 1} onClick={() => navigate(`/tin-tuc/1`)}>
                    <i className="ri-arrow-left-double-line text-2xl text-primary"></i>
                </Button>
                <Button className='w-[45px] flex items-center justify-center h-[45px] border border-solid border-primary' disabled={Number(page) === 1} onClick={() => navigate(`/tin-tuc/${Number(page) - 1}`)}>
                    <i className="ri-arrow-left-s-line text-2xl text-primary"></i>
                </Button>
                {renderItems()}
                <Button className='w-[45px] flex items-center justify-center h-[45px] border border-solid border-primary' disabled={Number(page) === totalPages} onClick={() => navigate(`/tin-tuc/${Number(page) + 1}`)}>
                    <i className="ri-arrow-right-s-line text-2xl text-primary"></i>
                </Button>
                <Button className='w-[45px] flex items-center justify-center h-[45px] border border-solid border-primary' disabled={Number(page) === totalPages} onClick={() => navigate(`/tin-tuc/${totalPages}`)}>
                    <i className="ri-arrow-right-double-line text-2xl text-primary"></i>
                </Button>
            </div>

        </div>
    )
}
export default PageinationNewClient