import { createStackNavigator, createAppContainer } from "react-navigation";
import { HomeScreen } from "../screens/HomeScreen";
import { TodayScreen } from "../screens/TodayScreen";
import { RecordsScreen } from "../screens/RecordsScreen";

export const AppNavigation = createAppContainer(
  createStackNavigator({
    Home: {
      screen: HomeScreen
    },
    Today: {
      screen: TodayScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Today"
      })
    },
    Records: {
      screen: RecordsScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Records"
      })
    }
  })
);
