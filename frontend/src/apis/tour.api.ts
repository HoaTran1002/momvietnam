import server from "@/config/axios";
import { ITourOverView } from "@/interface/tour.interface";

export const apiCreateTourOverView = async ({
    idProduct,
    activityContent,
    file,
    activityName,
    endTime,
    startTime
}:ITourOverView): Promise<any> => {
    try {
        const formData = new FormData();
        if(file) formData.append('file', file);
        if(activityContent) formData.append('activityContent', activityContent);
        if(activityName) formData.append('activityName', activityName);
        if(endTime) formData.append('endTime', endTime);
        if(startTime) formData.append('startTime', startTime);
        if(idProduct) formData.append('idProduct', idProduct);
        const resolve = await server.post(`/tour/create/product/${idProduct}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        return resolve;
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message;
        throw new Error(message);
    }
};
export const apiUpdateTourOverView  = async ({
    activityContent,
    activityName,
    endTime,
    startTime,
    _id
}: ITourOverView): Promise<any> => {
    try {
        const data = await server.put(`/tour/${_id}/update`, {
            activityContent,
            activityName,
            endTime,
            startTime,
        })
        return data
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message;
        throw new Error(message);
    }
};
export const apiUpdateImageTourOverView = async ({
    _id,
    file
}:ITourOverView): Promise<any> => {
    try {
        const formData = new FormData();
        if(file) formData.append('file', file);
        const resolve = await server.post(`/tour/${_id}/updateContentImage`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        return resolve;
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message;
        throw new Error(message);
    }
};
export const apiDeleteTourOverView = async ({
    _id,
}: ITourOverView): Promise<any> => {
    try {
        await server.delete(`/tour/${_id}/delete`)
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message;
        throw new Error(message);
    }
};
export const apiGetAllTour = async () => {
    try {
        const resolve = await server.get(`/tour/getTours`);
        return resolve;
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message;
        throw new Error(message);
    }
};
export const apiGetTourById = async (_id:string) => {
    try {
        const resolve = await server.get(`/tour/:${_id}/getTour`);
        return resolve;
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message;
        throw new Error(message);
    }
};

export const apiGetTourByPaginate = async (page:string,size:string) => {
    try {
        const resolve = await server.get(`/tour/pagination/${page}/${size}`);
        return resolve;
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message;
        throw new Error(message);
    }
};



