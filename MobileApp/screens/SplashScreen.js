import React, { Component } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Container, Content, Text, Button } from "native-base";
import { COLORS } from "../constants";
const { width, height } = Dimensions.get("window");

export default class SplashScreen extends Component {
  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    if (this.props.screenProps && this.props.screenProps.targetScreen) {
      let { employee, company, targetScreen } = this.props.screenProps;
      console.log(targetScreen);
      this.props.navigation.navigate(targetScreen, {
        employee,
        company
      });
    }
  }

  render() {
    return (
      <Container>
        <Content
          contentContainerStyle={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.darkGreen
          }}
        >
          <Text
            style={{
              fontSize: 80,
              fontWeight: "900",
              color: COLORS.lightGreen
            }}
          >
            Work
          </Text>
          <Text
            style={{
              fontSize: 50,
              fontWeight: "300",
              color: COLORS.lightGreen
            }}
          >
            Check In
          </Text>
        </Content>
      </Container>
    );
  }
}
