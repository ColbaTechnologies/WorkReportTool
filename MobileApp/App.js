import React, { Component } from "react";
import SplashScreen from "./screens/SplashScreen";
import { AppNavigation } from "./navigations/AppNavigation";
import Amplify, { Auth } from "aws-amplify";
import awsmobile from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import EmployeeService from "./services/employeeService";
import CompanyService from "./services/companyService";
Amplify.configure(awsmobile);
class App extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      company: {},
      employee: {},
      targetScreen: "Decision"
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
  }

  async componentDidMount() {
    await (await Auth.currentCredentials()).getPromise(); // Wait for credentials
    const info = await Auth.currentUserInfo();
    if (info.username) {
      EmployeeService.getByUserName(info.username).then(employee => {
        if (employee.length !== 0) {
          this.setState({ employee: employee[0] }, () => {
            let { employee } = this.state;
            CompanyService.getById(employee.companyId)
              .then(company => {
                this.setState({
                  company: company[0],
                  isReady: true,
                  targetScreen: "Home"
                });
              })
              .catch(err => console.log(err));
          });
        } else {
          this.setState({ isReady: true });
        }
      });
    }
  }

  setWorker = employee => {
    this.setState({ employee });
  };

  setCompany = company => {
    this.setState({ company });
  };
  render() {
    let screenProps = {
      employee: this.state.employee,
      company: this.state.company,
      targetScreen: this.state.targetScreen,
      setWorker: worker => this.setWorker(worker),
      setCompany: company => this.setCompany(company)
    };
    if (!this.state.isReady) {
      return <SplashScreen />;
    }
    return <AppNavigation screenProps={screenProps} />;
  }
}
export default withAuthenticator(App, false);
