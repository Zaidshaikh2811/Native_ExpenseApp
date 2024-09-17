import { FlatList, Text } from "react-native"

function ExpensesList({ expenses }) {

    function renderExpensesItem(itemData) {
        return <Text>{itemData.item.description}</Text>
    }


    return <FlatList data={expenses} keyExtractor={(Data) => Data.id} renderItem={renderExpensesItem} />

}


export default ExpensesList