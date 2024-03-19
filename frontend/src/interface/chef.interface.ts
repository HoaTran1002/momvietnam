export interface IChef {
    _id?: string,
    name?: string,
    description?: string,
    slogan?: string,
    role?: string,
    image?: {
        url: string,
        _id: string
    },
    position?:number,
    file?:File
}