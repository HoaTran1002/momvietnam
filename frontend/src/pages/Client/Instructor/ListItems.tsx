import { apiGetAllChefPagination } from '@/apis/chef.api'
import LoadingPage from '@/components/Loading/LoadingPage'
import useFetch from '@/hooks/useFetch.hook'
import { IChef } from '@/interface/chef.interface'
import React from 'react'
import ChefItem from './ChefItem'
import ModalBox from '@/components/ModalBox'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { linkWebPath } from '@/utils/linkWebPath'
const ListItems = (): JSX.Element => {
    const [chefState, callChefState] = useFetch()
    const [chefs, setChefs] = React.useState<IChef[] | undefined>(undefined)
    const [chefSelect, setChefSelect] = React.useState<IChef | undefined>(undefined)
    const positionLevel: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    const renderItems = () => {
        const items = [];
        for (let i = 0; i < 5; i++) {
            items.push(
                <div className='sm:col-span-1 max-sm:col-span-5'>
                    <LoadingPage height='450px' width='100%' />
                </div>
            );
        }
        return items;
    };

    React.useEffect(() => {
        callChefState(
            async () => {
                const data = await apiGetAllChefPagination(1, 10)
                setChefs(data?.data?.data)
            }
        )
    }, [])
    console.log(chefs);

    return (
        <div className='grid grid-cols-5 gap-1 px-3'>
            {
                chefState?.loading ? (
                    renderItems()
                ) : (
                    <>
                        {
                            positionLevel.map((pos: string) => {
                                const chefsWithSamePosition = chefs?.filter((chef: IChef) => chef.position === Number(pos)) || [];

                                switch (chefsWithSamePosition.length) {
                                    case 1:
                                        return (
                                            <div className="grid-cols-5  gap-1 col-span-5 grid single-chef-container">
                                                {
                                                    chefsWithSamePosition.map((r: IChef) => (
                                                        <div key={r._id} className='col-start-3 max-sm:col-span-5'>
                                                            <ChefItem
                                                                chef={r}
                                                                key={r._id}
                                                                handleClickChef={(e) => setChefSelect(e)}
                                                            />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        );
                                    case 2:
                                        return (
                                            <div className="grid-cols-5 gap-1 col-span-5 grid double-chef-container">
                                                {
                                                    <>
                                                        <div className="col-start-1 "></div>
                                                        {
                                                            chefsWithSamePosition.map((r: IChef) => (
                                                                <>
                                                                    <div key={r._id} className='col-span-1 translate-x-2/4 max-sm:col-span-5 max-sm:translate-x-0'>
                                                                        <ChefItem
                                                                            chef={r}
                                                                            key={r._id}
                                                                            handleClickChef={(e) => setChefSelect(e)}
                                                                        />
                                                                    </div>
                                                                </>
                                                            ))

                                                        }
                                                    </>
                                                }
                                            </div>
                                        );
                                    case 3:
                                        return (
                                            <div className="grid-cols-5 gap-1 col-span-5 grid ">
                                                {
                                                    <>
                                                        <div className='col-start-1'></div>
                                                        {
                                                            chefsWithSamePosition.map((r: IChef) => (
                                                                <div key={r._id} className='max-sm:col-span-5' >
                                                                    <ChefItem
                                                                        chef={r}
                                                                        key={r._id}
                                                                        handleClickChef={(e) => setChefSelect(e)}
                                                                    />
                                                                </div>
                                                            ))
                                                        }
                                                    </>
                                                }
                                            </div>
                                        );
                                        case 4:
                                            return (
                                                <div className="grid-cols-5 gap-1 col-span-5 grid double-chef-container">
                                                    {
                                                        <>
                                                            {
                                                                chefsWithSamePosition.map((r: IChef) => (
                                                                    <>
                                                                        <div key={r._id} className='col-span-1 translate-x-2/4 max-sm:col-span-5 max-sm:translate-x-0'>
                                                                            <ChefItem
                                                                                chef={r}
                                                                                key={r._id}
                                                                                handleClickChef={(e) => setChefSelect(e)}
                                                                            />
                                                                        </div>
                                                                    </>
                                                                ))
    
                                                            }
                                                        </>
                                                    }
                                                </div>
                                            );
                                    default:
                                        return (
                                            <div className="grid-cols-5 gap-1 col-span-5 grid default-chef-container">
                                                {
                                                    chefsWithSamePosition.map((r: IChef) => (
                                                        <div key={r._id} className='max-sm:col-span-5'>
                                                            <ChefItem
                                                                chef={r}
                                                                key={r._id}
                                                                handleClickChef={(e) => setChefSelect(e)}
                                                            />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        );
                                }
                            })

                        }
                    </>
                )

            }
            <ModalBox 
                styleClose='max-sm:text-white'
            styleModalClass='h-[90vh] w-[60vw] max-sm:w-[95vw]' isOpen={chefSelect !== undefined} onClose={() => setChefSelect(undefined)}>
                <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-4 overflow-y-scroll not-scroll-ui h-full'>
                    <div className='h-full flex items-center'>
                        <LazyLoadImage
                            src={linkWebPath(chefSelect?.image?.url || "")}
                            placeholder={<LoadingPage width='100%' height='100%' />}
                            className='object-cover h-full w-full'
                        />
                    </div>
                    <div className='pt-2 pb-4 px-2 max-sm:px-5 max-sm:pb-7 text-[#59633e]'>
                        <div className='py-3 '>
                            <h3 className='text-2xl uppercase font-medium text-[#59633e]'>{chefSelect?.name}</h3>
                            <span className='text-base font-medium'>Mom Studio</span>
                        </div>
                        <p className='uppercase text-lg relative py-5 px-8 text-center my-7'>
                            <i className="ri-double-quotes-l absolute top-0 left-0"></i>
                            {chefSelect?.slogan}
                            <i className="ri-double-quotes-r absolute bottom-0 right-0"></i>
                        </p>

                        <div className=''>
                            <h4 className='text-2xl uppercase py-3 font-medium text-[#59633e]'>{chefSelect?.role}</h4>
                            <p className=' text-xl leading-7 '>{chefSelect?.description}</p>
                        </div>
                    </div>
                </div>
            </ModalBox>
        </div>
    )
}
export default ListItems