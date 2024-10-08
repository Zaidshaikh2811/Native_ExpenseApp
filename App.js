import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpense from './screens/ManageExpense';
import RecentExpense from './screens/RecentExpense';
import AllExpense from './screens/AllExpenses';
import { GlobalStyles } from './constants/Style';
import { Ionicons } from "@expo/vector-icons"
import IconButton from './components/UI/IconButton';
import ExpenseContextProvider from './store/expense-context';


const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpenseOverView() {



  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => {
          return <IconButton icon="add" size={24} color={tintColor} onPress={() => {
            navigation.navigate('ManageExpense')
          }} />
        }
      })}
    >
      <BottomTabs.Screen name="RecentExpenses" component={RecentExpense}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="hourglass" size={size} color={color} />
          }
        }} />
      <BottomTabs.Screen name="AllExpenses" component={AllExpense} options={{
        title: "All Expenses",
        tabBarLabel: "All Expenses",
        tabBarIcon: ({ color, size }) => {
          return <Ionicons name="calendar" size={size} color={color} />
        }
      }} />
    </BottomTabs.Navigator>

  )
}


export default function App() {
  return (
    <>

      <StatusBar style='light' />

      <ExpenseContextProvider>
        <NavigationContainer>

          <Stack.Navigator options={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: "white",
            headerTitleStyle: { fontWeight: "bold" },
          }}>
            <Stack.Screen name="ExpenseOverview" component={ExpenseOverView} options={{ headerShown: false }} />
            <Stack.Screen name="ManageExpense" component={ManageExpense} options={{
              presentation: "modal",


            }} />
          </Stack.Navigator>

        </NavigationContainer>
      </ExpenseContextProvider>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
