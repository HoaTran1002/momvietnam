import LayoutAdmin from '@/components/layouts/Admin/Layout'
import { Link } from 'react-router-dom'
// import React from 'react'
import { allSettingsMainAdmin } from '@/data/layouts'
import { IPropsheader } from '@/components/layouts/Client/client.interface'
const DashBoard = (): JSX.Element => {
    return (
        <LayoutAdmin>
            <>
                <div className='bg-white p-5'>
                    <div className='grid grid-cols-12 gap-4'>
                        {
                            allSettingsMainAdmin.map((r: IPropsheader, index: number) => (
                                index > 0 && (
                                    <Link to={`${r.children?.[0]?.path ?? ""}`} key={index} className='bg-gradient-to-r col-span-4 from-purple-500 to-pink-500 p-4 rounded-md'>
                                        <span className='w-11 h-11 flex items-center justify-center text-xl bg-white rounded-full'>
                                            {r.icon}
                                        </span>
                                        <h2 className='text-white font-medium'>{r.name}</h2>
                                    </Link>

                                )
                            ))
                        }
                    </div>
                </div>
            </>
        </LayoutAdmin>
    )
}
export default DashBoard
