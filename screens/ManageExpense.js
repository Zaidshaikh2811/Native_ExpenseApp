import { useLayoutEffect } from "react";

const { Text } = require("react-native");


function ManageExpense({ route, navigation }) {
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {

        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        })
    }, [navigation, isEditing])

    return <Text>ManageExpense</Text>
}

export default ManageExpense