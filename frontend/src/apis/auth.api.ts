import server from "@/config/axios";
export interface ILogin {
  userName: string;
  password: string;
}
export const loginAuth = (record: ILogin) => {
  return async (): Promise<any> => {
    try {
      const result = await server
        .post("/auth/login", record)
      return result;
    } catch (error: any) {
      const message = error?.response?.data?.message ?? error.message;
      throw new Error(message);
    }
  };
};

export const logoutAuth = () => {
  return async (): Promise<any> => {
    try {
      await server
        .post("/auth/logout")
    } catch (error: any) {
      const message = error?.response?.data?.message ?? error.message;
      throw new Error(message);
    }
  };
};
