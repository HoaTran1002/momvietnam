import server from "@/config/axios";
import { IProduct } from "@/interface/product.interface";


//==================== GET =======================
export const apiGetAllProduct = async (): Promise<any> => {
  try {
    const data = await server.get("/product/getAll")
    return data;
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message;
    throw new Error(message);
  }
};
export const apiGetProductById = async (_id: string): Promise<any> => {
  try {
    const data = await server.get(`/product/${_id}/getProductById`)
    return data;
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message;
    throw new Error(message);
  }
};


//==================== POST =======================
export const apiCreateProduct = async ({
  name,
  note,
  idCategory,
  idCourse,
  timeLearning,
  content_review,
  description,
  executionTime,
  hightlight,
  languageOfInstruction,
  linkMenu,
  linkYoutube,
  listScript,
  numberOfAttendees,
  position,
  price,
  requiredWhenStudying,
  serviceDetailsWhenStudying,
  title,

}: IProduct): Promise<any> => {
  try {
    const data = await server.post(`/product/create/${idCourse}/${idCategory}`, {
      name,
      note,
      idCourse,
      timeLearning,
      content_review,
      description,
      executionTime,
      hightlight,
      languageOfInstruction,
      linkMenu,
      linkYoutube,
      listScript,
      numberOfAttendees,
      position,
      price,
      requiredWhenStudying,
      serviceDetailsWhenStudying,
      title,
    })
    return data;
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message;
    throw new Error(message);
  }
};
export const apiUploadImageToProduct = async (
  {
    _id,
    file
  }: {
    _id: string,
    file: File
  }
): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    await server.post(`/product/uploadImageFromLocal/${_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message;
    throw new Error(message);
  }
}
export const apiUploadVideoToProduct = async (
  {
    _id,
    file
  }: {
    _id: string,
    file: File
  }
): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    await server.post(`/product/${_id}/uploadVideoFromLocalToVPS`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message;
    throw new Error(message);
  }
}

//==================== PUT =======================
export const apiUpdateProduct = async ({
  name,
  note,
  idCategory,
  idCourse,
  timeLearning,
  _id,
  content_review,
  description,
  executionTime,
  hightlight,
  languageOfInstruction,
  linkMenu,
  linkYoutube,
  listScript,
  numberOfAttendees,
  position,
  price,
  requiredWhenStudying,
  serviceDetailsWhenStudying,
  title,

}: IProduct): Promise<any> => {
  try {
    await server.put(`/product/${_id}/edit`, {
      name,
      note,
      idCategory,
      idCourse,
      timeLearning,
      content_review,
      description,
      executionTime,
      hightlight,
      languageOfInstruction,
      linkMenu,
      linkYoutube,
      listScript,
      numberOfAttendees,
      position,
      price,
      requiredWhenStudying,
      serviceDetailsWhenStudying,
      title,
    })
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message;
    throw new Error(message);
  }
};
export const apiUpdateImageProduct = async (idProduct: string, idImage: string, file: File): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    await server.put(`/product/${idProduct}/updateContentImage/${idImage}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message;
    throw new Error(message);
  }
};
export const apiUpdateVideoProduct = async (idProduct: string, idVideo: string, file: File): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    await server.put(`/product/${idProduct}/updateContentVideo/${idVideo}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message;
    throw new Error(message);
  }
};


//==================== DELETE =======================
export const apiDeleteProduct = async (idProduct: string): Promise<any> => {
  try {
    await server.delete(`/product/${idProduct}/delete`)
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message;
    throw new Error(message);
  }
};
export const apiDeleteImageProduct = async (idProduct: string, idImage: string): Promise<any> => {
  try {
    await server.delete(`/product/${idProduct}/deleteImageFromVPSByProductId/${idImage}`)
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message;
    throw new Error(message);
  }
};

export const apiDeleteVideoProduct = async (idProduct: string, idVideo: string): Promise<any> => {
  try {
    await server.delete(`/product/${idProduct}/deleteVideoByProductId/${idVideo}`)
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message;
    throw new Error(message);
  }
};