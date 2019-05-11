import React, { Component } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Container, Content, Text, Button } from "native-base";

const { width, height } = Dimensions.get("window");

export default class SplashScreen extends Component {
  static navigationOptions = {
    title: "Please sign in"
  };

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
          <Text>SplashScreen</Text>
        </Content>
      </Container>
    );
  }
}
