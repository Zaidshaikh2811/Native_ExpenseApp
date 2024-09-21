import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/Style";
import Button from "../components/UI/Button";
import { ExpenseContext } from "../store/expense-context";
import { StyleSheet, View } from "react-native";

import ManageExpenseInput from "../components/manageExpense/ExpenseForm";




function ManageExpense({ route, navigation }) {
    const expenseCtx = useContext(ExpenseContext)

    const editedExpenseId = route.params?.expenseId;

    const isEditing = !!editedExpenseId;
    const expense = expenseCtx.expenses.find(expense => expense.id === editedExpenseId);
    useLayoutEffect(() => {

        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        })
    }, [navigation, isEditing])


    function deleteExpensesHandler() {
        expenseCtx.deleteExpense(editedExpenseId)

        navigation.goBack();

    }
    function cancelHandler() {

        navigation.goBack();
    }
    function confirmHandler(expenseData) {
        if (isEditing) {
            expenseCtx.updateExpense(editedExpenseId, expenseData)
        }
        else {
            expenseCtx.addExpense(expenseData)
        }
        navigation.goBack();
    }

    return <View style={styles.container}>
        <ManageExpenseInput defaultValue={expense} onCancel={cancelHandler} onSubmit={confirmHandler} isEditing={isEditing} />

        {isEditing &&
            <View style={styles.deleteContainer}>
                <IconButton icon="trash"
                    color={GlobalStyles.colors.error500}
                    size={36}
                    onPress={deleteExpensesHandler}
                />
            </View>
        }
    </View>
}

export default ManageExpense

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'

    },

})