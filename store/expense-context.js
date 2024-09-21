import { createContext, useReducer } from "react";





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

            return [action.payload, ...state]

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

    const [expensesState, dispatch] = useReducer(expenseReducer, []);

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
        const inverted = action.payload.reverse();
        dispatch({ type: "SET", payload: inverted });
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