import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { COLORS } from "../constants";
import { HomeScreen } from "../screens/HomeScreen";
import { TodayScreen } from "../screens/TodayScreen";
import { RecordsScreen } from "../screens/RecordsScreen";
import { ValidateScreen } from "../screens/ValidateScreen";
import { DecisionScreen } from "../screens/DecisionScreen";
import { CreateCompanyScreen } from "../screens/CreateCompanyScreen";
import { JoinScreen } from "../screens/JoinScreen";
import { CreateEmployeeScreen } from "../screens/CreateEmployeeScreen";
import SplashScreen from "../screens/SplashScreen";

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
    Splash: { screen: SplashScreen },
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
    Join: {
      screen: JoinScreen,
      navigationOptions: ({ navigation }) => ({
        ...navigationOptions,
        title: "Join on a company"
      })
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        ...navigationOptions,
        headerLeft: null,
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
