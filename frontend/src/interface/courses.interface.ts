export interface IProductsCourse {
  _id?: string;
  productName: string;
  productImage: string;
  description: string;
}
export interface ICoursesCardReview {
  imgUrl?: string;
  title: string;
  subTitle: string;
  path: string;
}
export interface IVideo {
  url: string;
  duration?: number;
}
export interface IRoadmap {
  name: string;
  startTime: Date;
  endTime: Date;
  knowledge: string;
  skill: string;
}
export interface ICourse {
  _id?: string,
  position?:string,
  title?: string,
  description?: string,
  price?: string,
  discountPrice?: string,
  discountPercentage?: string,
  images?: IImage[],
  videos?: [],
  roadmaps?: [],
  timeCreate?: string,
}
export interface IImage{
  url?: string,
  _id?: string
}
export type CourseKeys = "title" | "description" | "price" | "discountPrice" | "position" ;