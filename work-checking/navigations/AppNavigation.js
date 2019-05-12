import { createStackNavigator, createAppContainer } from "react-navigation";
import { HomeScreen } from "../screens/HomeScreen";

export const AppNavigation = createAppContainer(
  createStackNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Work Check-in"
      })
    }
  })
);
