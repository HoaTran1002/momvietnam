import LoadingPage from '@/components/Loading/LoadingPage'
import { IChef } from '@/interface/chef.interface'
import { linkWebPath } from '@/utils/linkWebPath'
import { LazyLoadImage } from 'react-lazy-load-image-component'
interface IChefItem {
    chef: IChef,
    handleClickChef:(e:IChef)=>void
}
const ChefItem = ({ chef,handleClickChef }: IChefItem): JSX.Element => {
    return (
        <div
            className="w-full h-[450px] group relative max-sm:h-full flex max-sm:flex-col max-sm:w-full"
            onClick={()=>handleClickChef(chef)}
        >
            <LazyLoadImage placeholder={<LoadingPage width="100%" height="450px" />} src={linkWebPath(chef.image?.url || "")} alt="" className="w-full h-full object-cover" />
            <span
                
                className="absolute flex flex-col gap-2 text-white text-xl font-medium items-center 
                      justify-center text-center uppercase top-0 left-0 group-hover:min-h-full cursor-pointer
                       transition-all z-40 right-0 py-1 px-2 bg-[#9eb26c]/80 min-h-[0px] opacity-0 group-hover:opacity-100">
                <span>
                    {chef.name}
                </span>
                <span className="text-sm leading-[25px] text-white/90">
                    {chef.slogan}

                </span>
            </span>
            <span
                className="bg-white text-lg font-medium uppercase absolute bottom-0 left-0 right-0 min-h-[60px] text-[#72814e] flex items-center justify-center text-center"
            >
                {chef.name}
            </span>
        </div>
    )
}
export default ChefItem