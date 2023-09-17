export function getFullDate() {
    var today = new Date();
    return today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
}

function formatDateNumbers(num: Date | number) {
    return num.toString().padStart(2, '0');
}

export function formatDate(date: string) {
    let tempdate = new Date(date);
    return formatDateNumbers(tempdate.getMonth()+1).toString() + "-" + formatDateNumbers(tempdate.getDate());
}