export const linkWebPath = (name:string)=>{
    const string = name.split('/');
    return `https://momvietnam.vn/content/${string[string.length - 1]}`
}