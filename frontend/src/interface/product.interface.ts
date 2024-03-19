export interface IProduct {
    _id?:string,
    name?: string,
    images?: [{url:string,_id:string}],
    videos?: [{url:string,_id:string}],
    note?: string,
    timeLearning?: string,
    idCourse?: string,
    idCategory?: string,
    linkYoutube?: string,
    title?: string,
    description?: string,
    price?: string,
    position?: string,
    executionTime?: string,
    numberOfAttendees?: number,
    languageOfInstruction?: string,
    serviceDetailsWhenStudying?: string,
    linkMenu?: string,
    requiredWhenStudying?: string,
    content_review?: string,
    listScript?: string[],
    hightlight?: IHightLight[],
  }

  export interface IHightLight {
    title?: string
    content?: string
  }