import { MMKV } from 'react-native-mmkv';
import { getFullDate } from '../config/globalFunctions';
const storage = new MMKV();

const key = "spending"

// Add new spending to the list
export const addSpending = (name: string, amount: number) => {
    let currentSpendings = getSpendings() || [];
    let date = getFullDate();
    let input = {name, amount, date}
    currentSpendings.push(input)
    storage.set(key, JSON.stringify(currentSpendings));
}

export const clearAllSpending = () => {
    storage.clearAll();
}

//Get all of the spendings
export const getSpendings = () => {
    return JSON.parse(storage.getString(key) || "[]");
}