import { SpendingType } from "../types";

const getWeekStartDate = (date: Date = new Date()) => {
    const dayOfWeek = date.getUTCDay();
    const daysUntilSunday = (dayOfWeek + 6) % 7; // Calculate days until Sunday
    const weekStartDate = new Date(date);
    weekStartDate.setUTCDate(date.getUTCDate() - daysUntilSunday);
    return weekStartDate;
};

 export const sortData = (data: SpendingType[]) => {
    data.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
    });

    let currentWeekStart = getWeekStartDate(new Date(data[0].date));

    let all = [];

    while (currentWeekStart <= new Date(data[data.length - 1].date)) {
        const nextWeekStart = new Date(currentWeekStart);
        nextWeekStart.setDate(currentWeekStart.getDate() + 6); // Get the end of the week
        const weekRange = `${currentWeekStart.toISOString().split('T')[0]} - ${
        nextWeekStart.toISOString().split('T')[0]
        }`;
        const weekData = data.filter(item => {
        const itemDate = new Date(item.date);
        return (
            (itemDate >= currentWeekStart && itemDate <= nextWeekStart) ||
            (itemDate < nextWeekStart && itemDate >= currentWeekStart)
        );
        });

        let items: SpendingType[] = [];

        weekData.forEach(item => {
            items.push({
                date: item.date,
                amount: item.amount,
                category: item.category,
                id: item.id,
            });
        });
        items = items.sort((a, b) => {
            const dateA = new Date(a.date.split(' - ')[0]).getTime();
            const dateB = new Date(b.date.split(' - ')[0]).getTime();
            return dateB - dateA;
          });

        all.push({weekRange, items});
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    }

    all.sort((a, b) => {
        const dateA = new Date(a.weekRange.split(' - ')[0]).getTime();
        const dateB = new Date(b.weekRange.split(' - ')[0]).getTime();
        return dateB - dateA;
    });

    // setDatas(all);
    // setSearchedSpendings(all);
    return all;
};