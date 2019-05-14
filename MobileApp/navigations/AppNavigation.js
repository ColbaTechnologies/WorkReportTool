import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { COLORS } from "../constants";
import { HomeScreen } from "../screens/HomeScreen";
import { TodayScreen } from "../screens/TodayScreen";
import { RecordsScreen } from "../screens/RecordsScreen";
import { ValidateScreen } from "../screens/ValidateScreen";
import Amplify from "aws-amplify";
import awsmobile from "../aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
Amplify.configure(awsmobile);
const navigationOptions = {
  headerStyle: {
    backgroundColor: COLORS.darkGreen
  },
  headerTintColor: COLORS.light,
  headerTitleStyle: {
    fontWeight: "bold"
  }
};

const AppNavigation = createAppContainer(
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

class AppNavigationAuth extends React.Component {
  render() {
    return <AppNavigation {...this.props} />;
  }
}

export default withAuthenticator(AppNavigationAuth, false);
