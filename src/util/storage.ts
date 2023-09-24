import { MMKV } from 'react-native-mmkv';
import uuid from 'react-native-uuid';
import { SpendingType } from '../types';

const storage = new MMKV();
const key = "spending"

// Add new spending to the list
export const addSpending = (name: string, amount: number, date:string) => {
    let currentSpendings = getSpendings() || [];
    let input = {
        id: uuid.v4(), 
        category:name, 
        amount, 
        date
    };
    currentSpendings.push(input);
    storage.set(key, JSON.stringify(currentSpendings));
}

//Delete a specific spending using id
export const deleteSpending = (id: string) => {
    let currentSpendings = (getSpendings() || []) as [];
    let temp = currentSpendings.filter((e:SpendingType) => e.id != id);
    storage.set(key, JSON.stringify(temp));
}

export const clearAllSpending = () => {
    storage.clearAll();
}

//Get all of the spendings
export const getSpendings = () => {
    return JSON.parse(storage.getString(key) || "[]");
}