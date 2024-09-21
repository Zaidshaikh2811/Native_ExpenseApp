import axios from "axios";

const BACKEND_URL = "https://native-expenses-4ddc3-default-rtdb.firebaseio.com"

export async function storeExpense(expenseData) {

    const resp = await axios.post(BACKEND_URL + "/expenses.json", expenseData);
    const id = resp.data.name;
    return id;

}
export async function fetchExpenses() {

    const resp = await axios.get(BACKEND_URL + "/expenses.json");

    const expenses = [];

    for (const key in resp.data) {
        const expensesObj = {
            id: key,
            amount: resp.data[key].amount,
            date: new Date(resp.data[key].date),
            description: resp.data[key].description
        }
        expenses.push(expensesObj)
    }
    return expenses


}


export async function updateExpense(id, expenseData) {
    return await axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);

}

export async function deleteExpense() {
    return await axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}