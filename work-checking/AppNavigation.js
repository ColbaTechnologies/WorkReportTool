import { createStackNavigator, createAppContainer } from "react-navigation";

import { DecisionScreen } from "./screens/DecisionScreen";
import { CreateCompanyScreen } from "./screens/CreateCompanyScreen";
import { JoinScreen } from "./screens/JoinScreen";
import { CreateEmployeeScreen } from "./screens/CreateEmployeeScreen";

const AppNavigation = createAppContainer(
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
    Join: { screen: JoinScreen }
  })
);

export default AppNavigation;
