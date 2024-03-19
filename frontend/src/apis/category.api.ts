import server from "@/config/axios";
import { ICategory } from "@/interface/category.interface";

export const apiCreateCategory = async ({
idCourse,
listTimeLearning,
name
}:ICategory): Promise<any> => {
    try {
        const resolve = await server.post(`/category/create/${idCourse}`, {
            listTimeLearning,
            name
        });
        return resolve;
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message;
        throw new Error(message);
    }
};
export const apiUpdateCategory = async ({
    _id,
    idCourse,listTimeLearning,name
}: ICategory): Promise<any> => {
    try {
        const data = await server.put(`/category/${_id}/update`, {
            idCourse,listTimeLearning,name
        })
        return data
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message;
        throw new Error(message);
    }
};

export const apiDeleteCategory = async ({
    _id,
}: ICategory): Promise<any> => {
    try {
        await server.delete(`/category/${_id}/remove`)
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message;
        throw new Error(message);
    }
};

export const apiGetAllCategory = async () => {
    try {
        const resolve = await server.get(`/category/getAll`);
        return resolve;
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message;
        throw new Error(message);
    }
};
export const apiGetCategoryById = async (_id:string) => {
    try {
        const resolve = await server.get(`/category/${_id}/getAllById`);
        return resolve;
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message;
        throw new Error(message);
    }
};
export const apiGetCategoryByIdCourse = async (idCourse:string) => {
    try {
        const resolve = await server.get(`/category/getAllByCourseId/${idCourse}`);
        return resolve;
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message;
        throw new Error(message);
    }
};



