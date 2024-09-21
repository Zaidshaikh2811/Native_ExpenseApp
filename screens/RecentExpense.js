import { useContext, useEffect, useState } from "react";
import ExpenseOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expense-context";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";



function RecentExpense() {
    const expensesCtx = useContext(ExpenseContext)
    const [isFetching, setIsFetching] = useState(true)




    useEffect(() => {
        const fetchExpensesData = async () => {
            setIsFetching(true)
            const response = await fetchExpenses()

            console.log(response);

            expensesCtx.setExpenses(response)
            setIsFetching(false)
        }
        fetchExpensesData();
    }, [])
    console.log(expensesCtx.expenses);
    const recentExpenses = expensesCtx.expenses.filter((expenses) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7)

        return ((expenses.date >= date7DaysAgo) && (expenses.date <= today))

    })
    // if (isFetching) {
    //     return <LoadingOverlay />
    // }

    return <ExpenseOutput expenses={recentExpenses} expensesperiod="Last 7 Days" fallbackText="NO Expenses Registered For Last 7 Days" />
}

export default RecentExpense