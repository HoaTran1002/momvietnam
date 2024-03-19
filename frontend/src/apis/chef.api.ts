import server from "@/config/axios";
import { IChef } from "@/interface/chef.interface";

export const apiGetAllChefPagination = async (page: number, items: number): Promise<any> => {
    try {
        const data = await server.get(`/chef/getAll/${page}/${items}`)
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message;
        throw new Error(message);
    }
};

export const apiGetChefById = async ({
    _id
}: IChef): Promise<any> => {
    try {
        const data = await server.post(`/chef/${_id}/get`)
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message;
        throw new Error(message);
    }
};

export const apiUpdateChef = async ({
    _id,
    name,
    description,
    slogan,
    role,
    position
}: IChef): Promise<any> => {
    try {
        const data = await server.put(`/chef/${_id}/updateTextDataChefById`, {
            name,
            description,
            slogan,
            role,
            position
        })
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message;
        throw new Error(message);
    }
};
export const apiUpdateImageChef = async ({
    _id,
    file
}: IChef): Promise<any> => {
    try {
        console.log(file);
        const formData = new FormData();
        if (file) formData.append('file', file);
        const data = await server.put(`/chef/${_id}/updateContentImage`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message;
        throw new Error(message);
    }
};
export const apiDeleteChef = async ({
    _id,
}: IChef): Promise<any> => {
    try {
        await server.delete(`/chef/${_id}/delete`)
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message;
        throw new Error(message);
    }
};


export const apiCreateChef = async ({
    file ,
    description,
    name,
    role,
    slogan
}: IChef): Promise<any> => {
    try {
        const formData = new FormData();
        if (file)formData.append('file', file);
        if (description) formData.append('description', description);
        if (name) formData.append('name', name);
        if (role) formData.append('role', role);
        if (slogan) formData.append('slogan', slogan);
        const data = await server.post(`/chef/create`,formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return data;
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message;
        throw new Error(message);
    }
};