import { SpendingType, BarChartType } from "../types";
import { getSpendings } from "./storage";

const getWeekStartDate = (date: Date = new Date()) => {
    const dayOfWeek = date.getUTCDay();
    const daysUntilSunday = (dayOfWeek - 1 + 7) % 7;
    const weekStartDate = new Date(date);
    weekStartDate.setUTCDate(date.getUTCDate() - daysUntilSunday);
    weekStartDate.setUTCHours(0, 0, 0, 0);
    return weekStartDate;
};

// Return the spendings group by date [{weekRange, items: []}]
export const getSpendingsGroupByDate = (data?: SpendingType[]) => {
    let alldata: SpendingType[];
    if (!data || data.length === 0) {
        alldata = getSpendings();
    } else {
        alldata = data;
    }

    alldata.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
    });

    const earliestDate = new Date(alldata[0].date);
    const latestDate = new Date(alldata[alldata.length - 1].date);

    let currentWeekStart = getWeekStartDate(earliestDate);
    let all = [];

    while (currentWeekStart <= latestDate) {
        const nextWeekStart = new Date(currentWeekStart);
        nextWeekStart.setDate(currentWeekStart.getDate() + 6);
        const weekRange = `${currentWeekStart.toISOString().split('T')[0]} - ${
            nextWeekStart.toISOString().split('T')[0]
        }`;
        const weekData = alldata.filter((item) => {
            const itemDate = new Date(item.date);
            itemDate.setUTCHours(0, 0, 0, 0);
            return (
                itemDate >= currentWeekStart && itemDate <= nextWeekStart
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
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateB - dateA;
        });
        all.push({ weekRange, items });
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    }

    all.sort((a, b) => {
        const dateA = new Date(a.weekRange.split(' - ')[0]).getTime();
        const dateB = new Date(b.weekRange.split(' - ')[0]).getTime();
        return dateB - dateA;
    });
    return all;
};

const translateDaysOfWeekToHungarian = (DayOfWeek: string) => {
    switch (DayOfWeek) {
        case "Monday":
        return "Hétfő"
        case "Tuesday":
            return "Kedd"
        case "Wednesday":
            return "Szerda"
        case "Thursday":
            return "Csütörtök"
        case "Friday":
            return "Péntek"
        case "Saturday":
            return "Szombat"
        case "Sunday":
            return "Vasárnap"
        default:
      }
}

// Return all of the Spendings in 1 specific Week
export const getWeeklySpendings = (weekRange: string) => {
  const inputData = getSpendingsGroupByDate()

  const spendingsByDay: BarChartType[] = [];


  let weekItems = inputData.filter((e) => e.weekRange === weekRange)

  const spendingsByDayMap = new Map<string, { Spendings: number, Date: string }>();
  weekItems[0].items.forEach((item) => {
    const itemDate = new Date(item.date);
    const dayOfWeek = translateDaysOfWeekToHungarian(itemDate.toLocaleDateString('en-US', { weekday: 'long' }).split(',')[0]);
    const dayKey = dayOfWeek + "|" + itemDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });

    if (spendingsByDayMap.has(dayKey)) {
      spendingsByDayMap.get(dayKey)!.Spendings += item.amount;
    } else {
      spendingsByDayMap.set(dayKey, {
        Spendings: item.amount,
        Date: itemDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })
      });
    }
  });

  let spentInWeek = 0;
  spendingsByDayMap.forEach((value, key) => {
    spentInWeek += value.Spendings
    const [dayOfWeek, date] = key.split('|');
    spendingsByDay.push({
      Day: dayOfWeek,
      Spendings: value.Spendings,
      Date: date
    });
  });

  return {spendingByDay: spendingsByDay.reverse(), spentInWeek};
}

// Return all of the Weeks With Spending
export const getWeeksWithSpending = () => {
    const inputData = getSpendings();
 
    inputData.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
    });

    const earliestDate = new Date(inputData[0].date);
    const latestDate = new Date(inputData[inputData.length - 1].date);

    let currentWeekStart = getWeekStartDate(earliestDate);
    let weeks = []
    while (currentWeekStart <= latestDate) {
        const nextWeekStart = new Date(currentWeekStart);
        nextWeekStart.setDate(currentWeekStart.getDate() + 6);
        const weekRange = `${currentWeekStart.toISOString().split('T')[0]} - ${
            nextWeekStart.toISOString().split('T')[0]
        }`;
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        weeks.push(weekRange)
    }
    return weeks.reverse();
}

export const getTotalSpending = () => {
    let inputData = getSpendings();
    let total = 0;
    inputData.map((e) => {
        total += e.amount
    })
    return total;
}