import React, { Component } from "react";
import SplashScreen from "./screens/SplashScreen";
import { AppNavigation } from "./navigations/AppNavigation";
import { SetupNavigation } from "./navigations/SetupNavigation";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      companyID: "",
      workerId: ""
    };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }
  render() {
    const screenProps = {
      employeeId: this.state.workerId,
      companyId: this.state.companyId
    };
    if (!this.state.isReady) {
      return <SplashScreen />;
    }
    if (this.state.companyID && this.state.workerId) {
      return <AppNavigation screenProps={screenProps} />;
    }
    return <SetupNavigation />;
  }
}