import { Text, View } from "react-native"

function ExpensesSummary({ expenses, periodName }) {

    const expensesSum = expenses.reduce((sum, expenses) => {
        return sum += expenses.amount
    }, 0)

    return <View>

        <Text>{periodName}</Text>
        <Text>Rs {expensesSum.toFixed(2)}</Text>
    </View>
}


export default ExpensesSummary