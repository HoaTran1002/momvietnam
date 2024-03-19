// import React from 'react'
const LoadingItems = ():JSX.Element=>{
    return(
        <div
            className="col-span-3 max-sm:col-span-12 rounded-sm overflow-hidden bg-[#9eb26c]/80 animate-pulse "
          >
            <div className="w-full h-[450px] bg-[#99a381] "> </div>
            <div className="p-4 flex flex-col gap-4 ">
              <span className='h-2 w-[60%] bg-[#687547] rounded-lg block'></span>
              <span className='h-3 w-[100%] bg-[#687547] rounded-lg block'></span>
              <span className='h-3 w-[80%] bg-[#687547] rounded-lg block'></span>
            </div>
          </div>
    )
}
export default LoadingItems