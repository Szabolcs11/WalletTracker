import { MMKV } from 'react-native-mmkv';
const storage = new MMKV();

const key = "spending"

// Add new spending to the list
export const addSpending = (name: string, amount: number) => {
    let currentSpendings = getSpendings() || [];
    let input = {name, amount}
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