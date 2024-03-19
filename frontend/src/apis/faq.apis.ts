import server from "@/config/axios";
import { IFaq } from "@/interface/faq.interface";

export const apiCreateFaq = async ({ answer, question }: IFaq): Promise<any> => {
    try {
        const resolve = await server.post("/faq/create", {
            answer,
            question
        });
        return resolve;
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message;
        throw new Error(message);
    }
};

export const apiGetFaqsPagination = async (page: number, size: number) => {
    try {
        const resolve = await server.get(`/faq/pagination/${page}/${size}`);
        return resolve;

    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message;
        throw new Error(message);
    }
};

export const apiGetAllFaqs = async () => {
    try {
        const resolve = await server.get(`/faq/getFAQs`);
        return resolve;
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message;
        throw new Error(message);
    }
};
export const apiGetFaqById = async (_id: string) => {
    try {
        const resolve = await server.get(`faq/${_id}/getFAQ`);
        return resolve;

    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message;
        throw new Error(message);
    }
};

export const apiUpdateFaq = async ({
    _id,
    question,
    answer
}: IFaq): Promise<any> => {
    try {
        const data = await server.put(`/faq/${_id}/update`, {
            question,
            answer
        })
        return data
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message;
        throw new Error(message);
    }
};


export const apiDeleteFaq = async ({
    _id
}: IFaq): Promise<any> => {
    try {
        await server.delete(`/faq/${_id}/delete`)
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message;
        throw new Error(message);
    }
};
