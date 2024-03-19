import server from "@/config/axios";
import { ICourse } from "@/interface/courses.interface";

export const getAllCourses = async (): Promise<any> => {
  try {
    const data = await server.get("/course/getAll")
    return data;
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message;
    throw new Error(message);
  }
};

export const createCourse = async ({
  description,
  price,
  images,
  discountPrice,
  roadmaps,
  title,
  videos,
  discountPercentage,
  timeCreate

}: ICourse): Promise<any> => {
  try {
    const data = await server.post("/course/create", {
      description,
      price,
      images,
      discountPrice,
      roadmaps,
      title,
      videos,
      discountPercentage,
      timeCreate
    })
    return data;
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message;
    throw new Error(message);
  }
};

export const updateCourse = async ({
  _id,
  description,
  price,
  images,
  discountPrice,
  roadmaps,
  title,
  videos,
  discountPercentage,
  timeCreate,
  position
}: ICourse): Promise<any> => {
  try {
    await server.put(`/course/${_id}/update`, {
      description,
      price,
      images,
      discountPrice,
      roadmaps,
      title,
      videos,
      discountPercentage,
      timeCreate,
      position
    })
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message;
    throw new Error(message);
  }
};

export const deleteCourse = async ({
  _id,
}: ICourse): Promise<any> => {
  try {
    await server.delete(`/course/${_id}/remove`)
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message;
    throw new Error(message);
  }
};

export const InsertImageCourse = async (
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

    await server.post(`/course/uploadImageFromLocal/${_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message;
    throw new Error(message);
  }
}

export const UpdateImageCourse = async (
  {
    _id,
    _idCourseImg,
    file
  }: {
    _id: string,
    _idCourseImg: string,
    file: File
  }
): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    await server.put(`/course/${_id}/updateContentImage/${_idCourseImg}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message;
    throw new Error(message);
  }
}

export const apiDeleteImageCourse = async (
  {
    idImage,
    idCourse,
  }: {
    idImage:string,
    idCourse:string,
  }
): Promise<any> => {
  try {
    await server.delete(`/course/${idImage}/deleteImageFromVPSByCourseId/${idCourse}`);
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message;
    throw new Error(message);
  }
}