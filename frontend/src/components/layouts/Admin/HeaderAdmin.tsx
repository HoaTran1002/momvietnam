import React from "react";
// import Input from "@/components/Input";
import Tooltip from "@/components/Tooltip";
import { useCollapseNavbar } from "@/contexts/CollapseNavbar";
import ModalMessage from "@/components/ModalMessage";
import useFetch from "@/hooks/useFetch.hook";
import { logoutAuth } from "@/apis/auth.api";
import { useAlertMessage } from "@/contexts/AlertContext";
import { useNavigate } from "react-router-dom";
const HeaderAdmin = (): JSX.Element => {
  const { isCollapse,handleChangeStatus } = useCollapseNavbar()
  const [isLogout,setIsLogout] = React.useState<boolean>(false)
  const [stateLogout,callStateLogout] = useFetch()
  const {addAlert} = useAlertMessage()
  const navigate = useNavigate()
  const handleLogout = () =>{
    callStateLogout(
      async () =>{
        try{
          await logoutAuth()
          localStorage.removeItem('jwt')
          addAlert({
            title:"Thành công",
            message:"Đăng Xuất thành công",
            type:"success"
          })
          navigate('/')
        }catch(error){
          console.log(stateLogout?.error);
          
          addAlert({
            title:"Lỗi ",
            message:"Đăng Xuất thất bại",
            type:"error"
          })
        }

      }
    )
  }
  return (
    <div className="px-5 gap-20 py-2  border-b-2 border-solid border-gray-200 flex items-center justify-between">
      <div>
        <span className=" w-10 h-10 text-2xl flex items-center justify-center bg-purple-100 rounded border border-solid cursor-pointer border-purple-300" onClick={()=>handleChangeStatus(!isCollapse)}>
          {
            isCollapse ? (
              <i className="ri-more-2-fill text-[#9446e0]"></i>
              ) : (
              <i className="ri-menu-fill text-[#9446e0]"></i>
            )
          }
        </span>
      </div>
      <div className="flex gap-2">
        <span className="text-gray-400">Xin chào,</span>
        <span className="font-medium text-[#9446e0]">Nguyễn Văn A</span>
      </div>
      <div className="flex items-center gap-6">
        <Tooltip name="Đăng xuất">
          <span className="h-11 w-11 text-xl rounded-full border-solid border-gray-200 border cursor-pointer flex items-center justify-center bg-white" onClick={()=>setIsLogout(true)}>
            <i className="ri-logout-box-line"></i>
          </span>
        </Tooltip>
      </div>
        {
          isLogout && (
            <ModalMessage
              content="Bạn có muốn đăng xuất"
              isClose={()=>setIsLogout(false)}
              isOk={handleLogout}
              title="Thông báo"
            />
          )
        }
    </div>
  );
};
export default HeaderAdmin;