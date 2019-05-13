import { createStackNavigator, createAppContainer } from "react-navigation";

import { DecisionScreen } from "../screens/DecisionScreen";
import { CreateCompanyScreen } from "../screens/CreateCompanyScreen";
import { JoinScreen } from "../screens/JoinScreen";
import { CreateEmployeeScreen } from "../screens/CreateEmployeeScreen";
import { SuccessScreen } from "../screens/SuccessScreen";
import { COLORS } from "../constants";

const navigationOptions = {
  headerStyle: {
    backgroundColor: COLORS.darkGreen
  },
  headerTintColor: COLORS.light,
  headerTitleStyle: {
    fontWeight: "bold"
  }
};
export const SetupNavigation = createAppContainer(
  createStackNavigator({
    Decision: {
      screen: DecisionScreen,
      navigationOptions: ({ navigation }) => ({
        ...navigationOptions,
        title: "Work Check-in"
      })
    },
    NewCompany: {
      screen: CreateCompanyScreen,
      navigationOptions: ({ navigation }) => ({
        ...navigationOptions,
        title: "Create Company"
      })
    },
    NewEmployee: {
      screen: CreateEmployeeScreen,
      navigationOptions: ({ navigation }) => ({
        ...navigationOptions,
        title: "Create Profile"
      })
    },
    Success: {
      screen: SuccessScreen
    },
    Join: {
      screen: JoinScreen,
      navigationOptions: ({ navigation }) => ({
        ...navigationOptions,
        title: "Join on a company"
      })
    }
  })
);
