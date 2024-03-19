import server from "@/config/axios";

export const apiGetInfoBusiness = async (): Promise<any> => {
    try {
      const data = await server.get("/informationBusiness/getAll")
      return data;
    } catch (error: any) {
      const message = error?.response?.data?.message ?? error.message;
      throw new Error(message);
    }
};

// export const apiGetInfoBusiness = async (): Promise<any> => {
//   try {
//     const data = await server.get("/informationBusiness/getAll")
//     return data;
//   } catch (error: any) {
//     const message = error?.response?.data?.message ?? error.message;
//     throw new Error(message);
//   }
// };
  