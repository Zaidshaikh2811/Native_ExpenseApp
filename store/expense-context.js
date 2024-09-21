import { createContext, useReducer } from "react";


const DUMMY_EXPENSES = [
    {
        id: "e1",
        description: "A Pair of Shoes",
        amount: 59.99,
        date: new Date("2022-05-12")
    },
    {
        id: "e2",
        description: "Groceries",
        amount: 120.75,
        date: new Date("2022-05-10")
    },
    {
        id: "e3",
        description: "Laptop",
        amount: 899.99,
        date: new Date("2022-04-25")
    },
    {
        id: "e4",
        description: "Coffee",
        amount: 4.5,
        date: new Date("2022-05-08")
    },
    {
        id: "e5",
        description: "Electricity Bill",
        amount: 85.34,
        date: new Date("2022-05-02")
    },
    {
        id: "e6",
        description: "Restaurant Dinner",
        amount: 50.0,
        date: new Date("2022-05-14")
    },
    {
        id: "e7",
        description: "Books",
        amount: 30.45,
        date: new Date("2022-04-18")
    }
];


export const ExpenseContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount }) => { },
    setExpenses: (expenses) => { },
    clearExpenses: () => { }

})


function expenseReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString()

            return [{ ...action.payload, id }, ...state]

        case 'UPDATE':

            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);

            const updatableExpense = state[updatableExpenseIndex];

            const updatedItem = { ...updatableExpense, ...action.payload.data }

            const updatedExpenses = [...state];

            updatedExpenses[updatableExpenseIndex] = updatedItem;

            return updatedExpenses


        case 'DELETE':

            return state.filter((expense) => expense.id !== action.payload)

        case "SET":
            return action.payload; // Set new list of expenses

        case "CLEAR":
            return []; // Clear all expenses
        default:
            return state

    }
}

function ExpenseContextProvider({ children }) {

    const [expensesState, dispatch] = useReducer(expenseReducer, DUMMY_EXPENSES);

    function addExpense(expenseData) {
        dispatch({ type: "ADD", payload: expenseData });
    }
    function deleteExpense(id) {
        dispatch({ type: "DELETE", payload: id });
    }
    function updateExpense(id, expenseData) {
        dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
    }

    function setExpenses(expenses) {
        dispatch({ type: "SET", payload: expenses });
    }

    // Clear all expenses
    function clearExpenses() {
        dispatch({ type: "CLEAR" });
    }

    const value = {
        expenses: expensesState,
        addExpense,
        deleteExpense,
        updateExpense,
        setExpenses,
        clearExpenses
    }

    return (
        <ExpenseContext.Provider value={value}>
            {children}
        </ExpenseContext.Provider>
    );
}

export default ExpenseContextProvider