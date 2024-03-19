import { useState } from "react";
import LayoutAuth from "@/components/layouts/Auth/layout";
import Input from "@/components/Input";
import { useNavigate } from "react-router-dom";
import Pagetitle from "@/components/PageTitle";
import useFetch from "@/hooks/useFetch.hook";
import { ILogin, loginAuth } from "@/apis/auth.api";
import { getCookie } from "@/utils/cookiesStorage";
import React from "react";
import { useAlertMessage } from "@/contexts/AlertContext";
import { COOKIE_NAME_ACCESS_TOKEN } from "@/config/env";
const Login = (): JSX.Element => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginState, callLoginApi] = useFetch();
  const { addAlert } = useAlertMessage();
  const navigate = useNavigate();

  const submitLogin = async () => {
    if (userName == "" || password == "") {
      addAlert({
        title: "Thất bại",
        message: "Tên đăng nhập hoặc mật khẩu không đúng",
        type: "error",
      });
      return;
    }
    const dataLogin: ILogin = {
      userName: userName,
      password: password,
    };
    try {
      const data = await callLoginApi(loginAuth(dataLogin));
      if (data?.data?.accessToken) {
        addAlert({
          title: "Thành công",
          message: "Đã đăng nhập thành công với quyền quản trị viên",
          type: "success",
        });
        navigate("/Admin/");
      } else {
        addAlert({
          title: "Thất bại",
          message: "Tên đăng nhập hoặc mật khẩu không đúng",
          type: "error",
        });
      }
    } catch (error) {
      addAlert({
        title: "Thất bại",
        message: "Tên đăng nhập hoặc mật khẩu không đúng",
        type: "error",
      });
    }
  };
  React.useEffect(() => {
    const jwt = getCookie(COOKIE_NAME_ACCESS_TOKEN);
    console.log;
    if (jwt) {
      navigate("/Admin/");
    }
  }, [loginState?.loading]);
  return (
    <LayoutAuth>
      <>
        <Pagetitle title="Đăng nhập" />
        <h2 className="text-2xl text-center font-no p-2">
          ĐĂNG NHẬP TÀI KHOẢN
        </h2>
        <div className="flex flex-col gap-1 px-3 mt-4">
          <Input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            labelName="Tên đăng nhập"
            placeholder="Nhập tên đăng nhập"
            type="text"
            icon={<i className="ri-user-line"></i>}
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            labelName="Mật khẩu"
            placeholder="Nhập mật khẩu"
            type="password"
            icon={<i className="ri-key-2-line"></i>}
          />
        </div>
        <div className="mt-3 flex flex-col justify-center items-center gap-2">
          <button
            onClick={submitLogin}
            className="w-full py-1 text-lg bg-black text-white rounded-md text-center"
          >
            ĐĂNG NHẬP
          </button>
          {/* <span className="italic text-sm ">
            Quên mật khẩu?
            <Link to={"/Login"}>
              <span className="font-medium not-italic">
                &nbsp; nhấn để lấy lại mật khẩu
              </span>
            </Link>
          </span> */}
        </div>
      </>
    </LayoutAuth>
  );
};
export default Login;
