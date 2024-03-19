
export const formatDate = (date: Date): string => {
    const day: number = date.getDate();
    const month: number = date.getMonth() + 1; // Months are zero-based
    const year: number = date.getFullYear();

    return `${day}/${month}/${year}`;
};
export function formatElapsedTime(dateString: string | undefined): string {
    if(dateString === undefined){
        return "";
    }
    const currentDate: Date = new Date();
    const givenDate: Date = new Date(dateString);
    const elapsedMilliseconds: number = currentDate.getTime() - ( givenDate.getTime() - (7 * 60 * 60 * 1000)) ;
    const elapsedSeconds: number = Math.floor(elapsedMilliseconds / 1000);
    const elapsedMinutes: number = Math.floor(elapsedSeconds / 60);
    const elapsedHours: number = Math.floor(elapsedMinutes / 60);
    const elapsedDays: number = Math.floor(elapsedHours / 24);
    const elapsedMonths: number = Math.floor(elapsedDays / 30);
    const elapsedYears: number = Math.floor(elapsedDays / 365);

    

    if (elapsedSeconds < 60) {
        return `${elapsedSeconds} s ago - ${formatDate(givenDate)}`;
    } else if (elapsedMinutes < 60) {
        return `${elapsedMinutes} min ago - ${formatDate(givenDate)}` ;
    } else if (elapsedHours < 24) {
        return `${elapsedHours} h ago - ${formatDate(givenDate)}`;
    } else if (elapsedDays < 30) {
        return `${elapsedDays} d ago - ${formatDate(givenDate)}`;
    } else if (elapsedMonths < 12) {
        const formattedDate: string = formatDate(givenDate);
        return `${formattedDate} - ${elapsedMonths} month ago`;
    } else {
        const formattedDate: string = formatDate(givenDate);
        return `${formattedDate} - ${elapsedYears} year ago`;
    }
}

export function isStartDateBeforeEndDate(startDateStr:string, endDateStr:string) {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    return startDate <= endDate;
}

export function compareDayBetweenFromDateAndToDate(fromDate:string,toDate:string,currentDate:string | undefined){
    if(currentDate === undefined) return false;
    const newsDate = new Date(currentDate || "");
    const fromDateCheck = new Date(fromDate);
    const toDateCheck = new Date(toDate);
    const formattedNewsDate = new Date(newsDate.getFullYear(), newsDate.getMonth(), newsDate.getDate());
    const formattedFromDate = new Date(fromDateCheck.getFullYear(), fromDateCheck.getMonth(), fromDateCheck.getDate());
    const formattedToDate = new Date(toDateCheck.getFullYear(), toDateCheck.getMonth(), toDateCheck.getDate());

    return formattedNewsDate >= formattedFromDate && formattedNewsDate <= formattedToDate;
}
