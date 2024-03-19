// import React from 'react' 
import ViewAround4 from "@/assets/images/Views/z4689941094081_17a75bcd7d0a6442ef4e7c240230ff2d.jpg";
const SubBackground = (): JSX.Element => {
    return (
        <>
            <div
                className="w-screen h-[300px] bg-cover bg-fixed bg-center"
                style={{
                    backgroundImage: `url(${ViewAround4})`,
                }}
            ></div>
        </>
    )
}
export default SubBackground