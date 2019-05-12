import { createStackNavigator, createAppContainer } from "react-navigation";

import { DecisionScreen } from "../screens/DecisionScreen";
import { CreateCompanyScreen } from "../screens/CreateCompanyScreen";
import { JoinScreen } from "../screens/JoinScreen";
import { CreateEmployeeScreen } from "../screens/CreateEmployeeScreen";
import { SuccessScreen } from "../screens/SuccessScreen";

export const SetupNavigation = createAppContainer(
  createStackNavigator({
    Decision: {
      screen: DecisionScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Work Check-in"
      })
    },
    NewCompany: {
      screen: CreateCompanyScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Create Company"
      })
    },
    NewEmployee: {
      screen: CreateEmployeeScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Create Profile"
      })
    },
    Success: {
      screen: SuccessScreen
    },
    Join: { screen: JoinScreen }
  })
);

export const AppNavigation = createAppContainer(
  createStackNavigator({
    Home: {
      screen: DecisionScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Work Check-in"
      })
    },
    Success: {
      screen: SuccessScreen
    },
    Join: { screen: JoinScreen }
  })
);
