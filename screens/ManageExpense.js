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
    function confirmHandler() {
        if (isEditing) {
            expenseCtx.updateExpense(editedExpenseId, {
                description: 'test',
                amount: 123,
                date: new Date('2022-12-24')
            })
        }
        else {
            expenseCtx.addExpense({ description: 'test', amount: 123, date: new Date('2022-12-24') })
        }
        navigation.goBack();
    }

    return <View style={styles.container}>
        <ManageExpenseInput />
        <View style={styles.buttons}>
            <Button style={styles.button} mode="flat" onPress={cancelHandler} > Cancel </Button>
            <Button style={styles.button} onPress={confirmHandler} >   {isEditing ? 'Update' : 'Add'}</Button>
        </View>
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
})