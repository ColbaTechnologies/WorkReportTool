import { createStackNavigator, createAppContainer } from "react-navigation";
import { COLORS } from "../constants";
import { HomeScreen } from "../screens/HomeScreen";
import { TodayScreen } from "../screens/TodayScreen";
import { RecordsScreen } from "../screens/RecordsScreen";
import { ValidateScreen } from "../screens/ValidateScreen";
const navigationOptions = {
  headerStyle: {
    backgroundColor: COLORS.darkGreen
  },
  headerTintColor: COLORS.light,
  headerTitleStyle: {
    fontWeight: "bold"
  }
};

export const AppNavigation = createAppContainer(
  createStackNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        ...navigationOptions,
        title: "Work Check In"
      })
    },
    Today: {
      screen: TodayScreen,
      navigationOptions: ({ navigation }) => ({
        ...navigationOptions,
        title: "Today"
      })
    },
    Records: {
      screen: RecordsScreen,
      navigationOptions: ({ navigation }) => ({
        ...navigationOptions,
        title: "Records"
      })
    },
    Validate: {
      screen: ValidateScreen,
      navigationOptions: ({ navigation }) => ({
        ...navigationOptions,
        title: "Validate Records"
      })
    }
  })
);
