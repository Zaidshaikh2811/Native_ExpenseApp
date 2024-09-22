import { useContext, useEffect, useState } from "react";
import ExpenseOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expense-context";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";



function RecentExpense() {
    const expensesCtx = useContext(ExpenseContext)
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState()




    useEffect(() => {
        const fetchExpensesData = async () => {
            setIsFetching(true)
            try {

                const response = await fetchExpenses()



                expensesCtx.setExpenses(response)
            } catch (error) {


                setError(error.message)
            }
            finally {

                setIsFetching(false)
            }
        }
        fetchExpensesData();
    }, [])

    const recentExpenses = expensesCtx.expenses.filter((expenses) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7)

        return ((expenses.date >= date7DaysAgo) && (expenses.date <= today))

    })

    function errorHandler() {
        setError(null)
    }

    if (error) {


        return <ErrorOverlay message={error} onConfirm={errorHandler}>{error}</ErrorOverlay>
    }
    if (isFetching) {
        return <LoadingOverlay />
    }

    return <ExpenseOutput expenses={recentExpenses} expensesperiod="Last 7 Days" fallbackText="NO Expenses Registered For Last 7 Days" />
}

export default RecentExpense