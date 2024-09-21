import { StyleSheet, Text, View } from "react-native"
import Input from "./Input"
import { GlobalStyles } from "../../constants/Style";


function ManageExpenseInput() {

    function amountChangedHandler() {
        console.log("Amount changed");
    }

    return <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={
            styles.inputsRow
        }>

            <Input label="Amount" style={styles.rowInput} textInputConfig={{

                keyboardType: 'decimal-pad',
                placeholder: 'Enter amount',
                onChangeText: amountChangedHandler,

            }} />
            <Input label="Date" style={styles.rowInput} textInputConfig={{

                placeholder: 'YYYY-MM-DD',
                maxLength: 10,
                onChangeText: amountChangedHandler,

            }} />
        </View>
        <Input label="Description" textInputConfig={{

            placeholder: 'Enter description',
            multiline: true,
            onChangeText: amountChangedHandler,

        }} />
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
    }
})