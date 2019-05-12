import React, { Component } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Container, Content, Text, Button } from "native-base";

const { width, height } = Dimensions.get("window");

export class SuccessScreen extends Component {
  static navigationOptions = {
    title: "Please sign in"
  };
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  componentDidMount() {
    const targetScreen = this.props.navigation.getParam("targetScreen", null);
    setTimeout(() => {
      this.props.navigation.navigate(targetScreen);
    }, 3000);
  }

  render() {
    return (
      <Container>
        <Content
          contentContainerStyle={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text>Success</Text>
        </Content>
      </Container>
    );
  }
}
