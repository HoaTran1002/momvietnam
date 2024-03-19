// import { PathEnum } from "@/data/layouts"

export interface IPropsheader {
    name: string,
    icon?: JSX.Element,
    path?: string,
    children?:IPropsheaderChildren[]
}
export interface IPropsheaderChildren{
    name: string,
    path: string,
}
export interface ItemsFooter {
    nameTitle:string,
    path:string
}
export interface IPropsFooterItem{
    name:string,
    path?:string,
    children:ItemsFooter[]
}