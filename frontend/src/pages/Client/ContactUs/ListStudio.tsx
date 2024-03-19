import Select from '@/components/Select'
import React from 'react'
import View1 from "@/assets/images/Views/z4689941072190_e70f3ef9e5b8497daa343c8635bba872.jpg"
import View2 from "@/assets/images/Views/z4689941094081_17a75bcd7d0a6442ef4e7c240230ff2d.jpg"
import View3 from "@/assets/images/Views/z4689941106305_ea41e5bc7ec36a69c9327f18fdca6bb2.jpg"
import { IOption } from '@/components/Select'
interface IStudio {
    id: string,
    name: string,
    img: string,
    info?: IInfo[]
}
interface IInfo {
    icon: JSX.Element,
    title: string
}
const ListStudio = (): JSX.Element => {
    const listStudioOption: IOption[] = [
        { name: "District 1, Ho Chi Minh City", value: "1" },
        { name: "District 3, Ho Chi Minh City", value: "2" },
        { name: "District 5, Ho Chi Minh City", value: "3" },
    ]
    const listStudio: IStudio[] = [
        {
            id: "1",
            name: "District 1, Ho Chi Minh City",
            img: View1,
            info: [
                { icon: <i className="ri-map-pin-2-line"></i>, title: "148/10 Lý Chính Thắng, Phường 14, Quận 3, Thành phố Hồ Chí Minh" },
                { icon: <i className="ri-time-line"></i>, title: "10AM - 1PM | 5PM - 8PM, Tuesday to Sunday" },
                { icon: <i className="ri-phone-line"></i>, title: "01023312122" },
            ]
        },
        {
            id: "2",
            name: "District 3, Ho Chi Minh City",
            img: View2,
            info: [
                { icon: <i className="ri-map-pin-2-line"></i>, title: "Coming soon" },
                { icon: <i className="ri-time-line"></i>, title: "Coming soon" },
                { icon: <i className="ri-phone-line"></i>, title: "Coming soon" },
            ]
        },
        {
            id: "3",
            name: "District 5, Ho Chi Minh City",
            img: View3,
            info: [
                { icon: <i className="ri-map-pin-2-line"></i>, title: "Coming soon" },
                { icon: <i className="ri-time-line"></i>, title: "Coming soon" },
                { icon: <i className="ri-phone-line"></i>, title: "Coming soon" },
            ]
        }
    ]
    const [optionChoses, setOptionChoses] = React.useState<IOption>(listStudioOption[0])
    const [studio, setStudio] = React.useState<IStudio | undefined>(listStudio[0])
    const handleChoseStudio = (e: IOption) => {
        setOptionChoses(e)
        const studio = listStudio.find((r: IStudio) => r.id === e.value) || undefined;
        setStudio(studio)
    }
    console.log(optionChoses);
    
    return (
        <div className='py-4 max-sm:flex max-sm:flex-col'>
            <div className='flex items-center justify-center py-5'>
                <Select
                    className='w-[300px]'
                    value={optionChoses?.value}
                    options={listStudioOption}
                    onSelect={(e) => handleChoseStudio(e)}
                />
            </div>
            <div className='grid grid-cols-2 max-sm:grid-cols-1 px-9 gap-5'>
                <div >
                    <img src={studio?.img} alt={studio?.name} className='h-[400px] w-full object-cover' />
                </div>
                <div>
                    <span className='flex items-center justify-center font-semibold text-xl py-3 px-2 bg-[#a3b770] text-white uppercase '>
                        {studio?.name}
                    </span>
                    <ul className='p-5 bg-white rounded-sm mt-3'>
                        {
                            studio?.info?.map((r:IInfo, index: number) => (
                                <li key={index} className='flex items-center gap-6 mb-3'>
                                    <span className='text-[#7e8e56] text-2xl'>
                                        {r.icon}
                                    </span>
                                    <span className='text-lg font-semibold text-[#667346] '>
                                        {r.title}
                                    </span>
                                </li>
                            ))
                        }

                    </ul>
                </div>
            </div>
        </div>
    )
}
export default ListStudio