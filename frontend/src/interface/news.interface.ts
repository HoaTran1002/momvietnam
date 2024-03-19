interface image {
  key?: string;
  url?: string;
}
export interface INew {
  _id?:string,
  title?: string;
  author?: string;
  dateCreated?: string;
  image?: image;
  content?: string;
  file?:File
}