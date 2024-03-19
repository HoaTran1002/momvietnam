import { getLastPathComponent } from "./getLastArray";

export function linkUrlWeb(url: string | undefined) {
    if(url === undefined) url =""
    const link = `https://momvietnam.vn/content/${getLastPathComponent(url)}`;
    return link;
}
