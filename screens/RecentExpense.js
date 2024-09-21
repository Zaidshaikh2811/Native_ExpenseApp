import { useContext } from "react";
import ExpenseOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expense-context";
import { getDateMinusDays } from "../utils/date";



function RecentExpense() {
    const expensesCtx = useContext(ExpenseContext)

    const recentExpenses = expensesCtx.expenses.filter(() => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7)

        return (expensesCtx.date >= date7DaysAgo) && (expense.date <= today)

    })

    return <ExpenseOutput expenses={recentExpenses} expensesperiod="Last 7 Days" fallbackText="NO Expenses Registered For Last 7 Days" />
}

export default RecentExpense