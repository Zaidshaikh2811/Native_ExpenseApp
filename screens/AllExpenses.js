import { useContext } from "react"
import ExpenseOutput from "../components/ExpensesOutput/ExpensesOutput"
import { ExpenseContext } from "../store/expense-context"


function AllExpense() {
    const expensesCtx = useContext(ExpenseContext)


    return <ExpenseOutput expenses={expensesCtx.expenses} expensesperiod="Total" fallbackText="No Expenses Registered Expenses Found!!" />
}

export default AllExpense