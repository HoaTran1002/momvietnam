// import React from 'react'
const ItemDataLoading = (): JSX.Element => {
  return (
    <div className="bg-white rounded-lg p-5 w-full my-5  animate-pulse">
      <div className="w-full flex items-center justify-between animate-pulse">
        <div className="flex items-center gap-2 w-full">
          <div className="w-[150px] h-[150px] rounded-lg overflow-hidden flex-none bg-gray-400">
          </div>
          <div className="px-5 flex gap-3 flex-col w-full">
            <span className='h-3 w-[90%] block bg-gray-400 rounded-lg'></span>
            <span className='h-3 w-[80%] block bg-gray-400 rounded-lg'></span>
            <span className='h-3 w-[30%] mt-6 block bg-gray-400 rounded-lg'></span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ItemDataLoading 