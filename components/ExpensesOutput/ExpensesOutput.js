import { StyleSheet, View } from "react-native"
import ExpensesSummary from "./ExpensesSummary"
import ExpensesList from "./ExpensesList"
import { GlobalStyles } from "../../constants/Style";

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



function ExpenseOutput({ expenses, expensesperiod }) {
    return <View style={styles.container}>

        <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesperiod} />
        <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
}


export default ExpenseOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700
    }

})