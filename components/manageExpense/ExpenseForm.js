import { Alert, StyleSheet, Text, View } from "react-native"
import Input from "./Input"
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedData } from "../../utils/date";
import { GlobalStyles } from "../../constants/Style";


function ManageExpenseInput({ onCancel, defaultValue, onSubmit, isEditing }) {

    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValue ? defaultValue.amount.toString() : '',
            isValid: true
        },
        date: {
            value: defaultValue ? getFormattedData(defaultValue.date) : '',
            isValid: true
        },
        description: {
            value: defaultValue ? defaultValue.description.toString() : '',
            isValid: true
        },
    });

    function inputChangeHandler(inputIdentifier, enteredAmount) {
        setInputs((curInput) => {

            return {
                ...curInput,
                [inputIdentifier]: { value: enteredAmount, isValid: true }
            }
        })

    }
    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }

        const amountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== "Invalid Date";
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountValid || !dateIsValid || !descriptionIsValid) {
            setInputs((currInputs) => {
                return {
                    amount: {
                        value: currInputs.amount.value, isValid: amountValid
                    },
                    date: {
                        value: currInputs.date.value, isValid: dateIsValid
                    },
                    description: {
                        value: currInputs.description.value, isValid: descriptionIsValid
                    },
                }
            })

            return
        }


        onSubmit(expenseData)
    }

    const formIsValid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid


    return <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={
            styles.inputsRow
        }>

            <Input label="Amount" invalid={!inputs.amount.isValid} style={styles.rowInput} textInputConfig={{

                keyboardType: 'decimal-pad',
                placeholder: 'Enter amount',
                onChangeText: inputChangeHandler.bind(this, 'amount'),
                value: inputs.amount.value

            }} />
            <Input label="Date" invalid={!inputs.date.isValid} style={styles.rowInput} textInputConfig={{

                placeholder: 'YYYY-MM-DD',

                maxLength: 10,
                onChangeText: inputChangeHandler.bind(this, 'date'),
                value: inputs.date.value

            }} />
        </View>
        <Input label="Description" invalid={!inputs.description.isValid} textInputConfig={{

            placeholder: 'Enter description',
            multiline: true,
            onChangeText: inputChangeHandler.bind(this, 'description'),
            value: inputs.description.value


        }} />
        {formIsValid && <Text style={styles.errorText}>
            Invalid Input Values !
        </Text>}
        <View style={styles.buttons}>
            <Button style={styles.button} mode="flat" onPress={onCancel} > Cancel </Button>
            <Button style={styles.button} onPress={submitHandler} >   {isEditing ? 'Update' : 'Add'}</Button>
        </View>
    </View >

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
    errorText: {
        textAlign: "center",
        color: GlobalStyles.colors.error500,
        margin: 8
    }
})