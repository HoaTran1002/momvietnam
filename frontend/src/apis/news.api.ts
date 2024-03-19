import server from "@/config/axios";
import { INew } from "@/interface/news.interface";
export interface CreateData {
  title: string;
  author: string;
  content: string;
  file: File;
}
export const apiCreateNews = async (data: INew): Promise<any> => {
  try {
    const formData = new FormData();

    if (data.title) formData.append("title", data.title);
    if (data.author) formData.append("author", data.author);
    if (data.content) formData.append("content", data.content);
    if (data.dateCreated) formData.append("dateCreated", data.dateCreated);

    if (data.file) {
      formData.append("file", data.file);
    }
    const resolve = await server.post("/news/createNews", formData);
    return resolve;
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message;
    throw new Error(message);
  }

};

export const apiGetNews = async (page: number, size: number) => {
  const resolve = await server.get(`news/getAll/${page}/${size}`);

  return resolve;
};
export const apiGetNewsById = async (_id: string) => {
  const resolve = await server.get(`news/${_id}/get`);
  return resolve;
};

export const apiUpdateNews = async ({
  _id,
  author,
  content,
  dateCreated,
  title,
}: INew): Promise<any> => {
  try {
    const data = await server.put(`/news/${_id}/update`, {
      author,
      content,
      dateCreated,
      title,
    })
    return data
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message;
    throw new Error(message);
  }
};


export const apiUpdateImgNew = async (
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

    await server.put(`/news/${_id}/updateContentImage`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message;
    throw new Error(message);
  }
}

export const apiDeleteNew = async ({
  _id,
}: INew): Promise<any> => {
  try {
    await server.delete(`/news/${_id}/delete`)
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message;
    throw new Error(message);
  }
};
