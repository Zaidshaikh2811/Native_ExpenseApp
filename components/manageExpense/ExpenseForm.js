import { Alert, StyleSheet, Text, View } from "react-native"
import Input from "./Input"
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedData } from "../../utils/date";


function ManageExpenseInput({ onCancel, defaultValue, onSubmit, isEditing }) {

    const [amountValue, setAmountValue] = useState({
        amount: defaultValue ? defaultValue.amount.toString() : '',
        date: defaultValue ? getFormattedData(defaultValue.date) : '',
        description: defaultValue ? defaultValue.description.toString() : '',
    });

    function inputChangeHandler(inputIdentifier, enteredAmount) {
        setAmountValue((curInputValues) => {

            return {
                ...curInputValues,
                [inputIdentifier]: enteredAmount
            }
        })

    }
    function submitHandler() {
        const expenseData = {
            amount: +amountValue.amount,
            date: new Date(amountValue.date),
            description: amountValue.description
        }

        const amountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== "Invalid Date";
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountValid || !dateIsValid || !descriptionIsValid) {
            Alert.alert("Invalid Input", "please Check Your Input Values")
            return
        }


        onSubmit(expenseData)
    }


    return <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={
            styles.inputsRow
        }>

            <Input label="Amount" style={styles.rowInput} textInputConfig={{

                keyboardType: 'decimal-pad',
                placeholder: 'Enter amount',
                onChangeText: inputChangeHandler.bind(this, 'amount'),
                value: amountValue.amount

            }} />
            <Input label="Date" style={styles.rowInput} textInputConfig={{

                placeholder: 'YYYY-MM-DD',

                maxLength: 10,
                onChangeText: inputChangeHandler.bind(this, 'date'),
                value: amountValue.date

            }} />
        </View>
        <Input label="Description" textInputConfig={{

            placeholder: 'Enter description',
            multiline: true,
            onChangeText: inputChangeHandler.bind(this, 'description'),
            value: amountValue.description


        }} />
        <View style={styles.buttons}>
            <Button style={styles.button} mode="flat" onPress={onCancel} > Cancel </Button>
            <Button style={styles.button} onPress={submitHandler} >   {isEditing ? 'Update' : 'Add'}</Button>
        </View>
    </View>

}

export default ManageExpenseInput

const styles = StyleSheet.create({
    form: {
        marginTop: 40
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginVertical: 24,
        textAlign: "center"
    },
    inputsRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    rowInput: {
        flex: 1
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