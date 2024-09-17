import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpense from './screens/ManageExpense';
import RecentExpense from './screens/RecentExpense';
import AllExpense from './screens/AllExpenses';
import { GlobalStyles } from './constants/Style';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpenseOverView() {
  return (
    <BottomTabs.Navigator screenOptions={{
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: "white",
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500
    }}>
      <BottomTabs.Screen name="RecentExpenses" component={RecentExpense} options={{ headerShown: false }} />
      <BottomTabs.Screen name="AllExpenses" component={AllExpense} />
    </BottomTabs.Navigator>

  )
}


export default function App() {
  return (
    <>
      <StatusBar style='auto' />

      <NavigationContainer>

        <Stack.Navigator>
          <Stack.Screen name="ExpenseOverview" component={ExpenseOverView} />
          <Stack.Screen name="ManageExpense" component={ManageExpense} />
        </Stack.Navigator>

      </NavigationContainer>

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
