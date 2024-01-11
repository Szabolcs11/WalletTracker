import { SpendingType, BarChartType } from "../types";
import { getSpendings } from "./storage";

const getWeekStartDate = (date: Date = new Date()) => {
    const dayOfWeek = date.getDay();
    const daysUntilSunday = (dayOfWeek - 1 + 7) % 7;
    const weekStartDate = new Date(date);
    weekStartDate.setDate(date.getDate() - daysUntilSunday);
    weekStartDate.setHours(0, 0, 0, 0);
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
    if (alldata.length == 0) {
      return [{weekRange: "", items: []}]
    }

    alldata.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
    });
    const earliestDate = new Date(alldata[0]?.date);
    const latestDate = new Date(alldata[alldata.length - 1]?.date);

    let currentWeekStart = getWeekStartDate(earliestDate);
    let all = [];
    while (currentWeekStart <= latestDate) {
        const nextWeekStart = new Date(currentWeekStart);
        nextWeekStart.setDate(currentWeekStart.getDate() + 6);
        const weekRange= `${currentWeekStart.toISOString().split('T')[0]} - ${
            nextWeekStart.toISOString().split('T')[0]
        }`;
        const weekData = alldata.filter((item) => {
            const itemDate = new Date(item.date);
            itemDate.setHours(0, 0, 0, 0);
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
        let split = weekRange.split(' - ')
        let a = new Date(split[0]);
        a.setDate(a.getDate() + 1);
        let b = new Date(split[1]);
        b.setDate(b.getDate() + 1);
        let newWeekRange = `${a.toISOString().split('T')[0]} - ${b.toISOString().split('T')[0]}`
        all.push({ weekRange: newWeekRange, items });
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
            return ""
      }
}

function formatDateWithLeadingZeros(date: Date): string {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${month}/${day}`;
}

// Return all of the Spendings in a specific Week Range
export const getWeeklySpendings = (weekRange: string) => {
  let spendingsByDay: BarChartType[] = [];
  const inputData = getSpendingsGroupByDate();
  let weekItems = inputData.filter((e) => e.weekRange === weekRange);
  const spendingsByDayMap = new Map<string, { Spendings: number; Date: string, Day: string }>();

  const [startDateStr, endDateStr] = weekRange.split(' - ');
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const weeklySpendings = [];

  // Set every day to Spending be 0
  let currentDate = startDate;
  while (currentDate <= endDate) {
    const formattedDate = formatDateWithLeadingZeros(currentDate);
    const dayOfWeek = translateDaysOfWeekToHungarian(currentDate.toLocaleDateString('en-US', { weekday: 'long' }).split(',')[0]);

    weeklySpendings.push({
      Date: formattedDate,
      Day: dayOfWeek,
      Spendings: 0,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  // Adding these itemts to spendingsByDayMap function
  weeklySpendings.forEach((value) => {
    spendingsByDayMap.set(value.Date, {Spendings: 0, Day: value.Day!, Date: value.Date})
  })

  weekItems[0].items.forEach((item) => {
    const itemDate = new Date(item.date);
    const dayKey = itemDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
    if (spendingsByDayMap.has(dayKey)) {
      spendingsByDayMap.get(dayKey)!.Spendings += item.amount;
    }
  });

  let spentInWeek = 0;
  spendingsByDayMap.forEach((value, key) => {
    spentInWeek += value.Spendings
    spendingsByDay.push({
      Day: value.Day,
      Spendings: value.Spendings,
      Date: value.Date
    });
  });


  let lastNonZeroIndex = -1;
  const todayDate = new Date()
  const dayKey = todayDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
  if (todayDate <= endDate) {
    for (let i = spendingsByDay.length - 1; i >= 0; i--) {
      if (spendingsByDay[i].Date === dayKey) {
        lastNonZeroIndex = i;
        break;
      }
    }
  }

  // If a last non-zero entry was found, remove subsequent entries with zero spending

  if (lastNonZeroIndex !== -1) {
    spendingsByDay = spendingsByDay.filter((entry, index) => {
      const entryDate = new Date(entry.Date);
      return index <= lastNonZeroIndex || (entry.Spendings !== 0 && entryDate <= currentDate);
    });
  }

  return { spendingByDay: spendingsByDay, spentInWeek };
};

// Return all of the Weeks With Spending
export const getWeeksWithSpending = () => {
    const inputData = getSpendings();
 
    inputData.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
    });

    const earliestDate = new Date(inputData[0]?.date);
    const latestDate = new Date(inputData[inputData.length - 1]?.date);

    let currentWeekStart = getWeekStartDate(earliestDate);
    let newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() + 1);
    let weeks = []
    while (newWeekStart <= latestDate) {
        const nextWeekStart = new Date(newWeekStart);
        nextWeekStart.setDate(newWeekStart.getDate() + 6);
        const weekRange = `${newWeekStart.toISOString().split('T')[0]} - ${
            nextWeekStart.toISOString().split('T')[0]
        }`;
        newWeekStart.setDate(newWeekStart.getDate() + 7);
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

export const getPieChartDataInWeek = (weekRange: string) => {
    const inputData = getSpendingsGroupByDate()
    let weekItems = inputData.filter((e) => e.weekRange === weekRange)
    let categorisedSpendings: any = {}
    weekItems[0].items.forEach((item: SpendingType) => {
        const {category, amount} = item;
        if (categorisedSpendings[category]) {
            categorisedSpendings[category] += amount;
        } else {
            categorisedSpendings[category] = amount;
        }
      });

    const sortedCategories = Object.keys(categorisedSpendings).map(category => ({
      category,
      color: getCategoryColor(category),
      legendFontColor: getCategoryColor(category),
      totalAmount: categorisedSpendings[category],
      name: category,
    }));
    sortedCategories.sort((a, b) => a.category.localeCompare(b.category));
    return sortedCategories;
}

const getCategoryColor = (category: string) => {
    category == 'Élelmiszer'
    switch (category) {
        case 'Élelmiszer':
          return '#e74645';
        case 'Alkohol':
          return '#fb7756';
        case 'Szükségletek':
          return '#facd60';
        case 'Utazás':
          return '#1ac0c6';
        default:
          return '#000';
      }
}