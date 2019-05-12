import React, { Component } from "react";
import { Content, Text, Icon, Container } from "native-base";
import { StyleSheet, Dimensions } from "react-native";
import { PAGES, COLORS } from "../constants";

const { width, height } = Dimensions.get("window");

export class SuccessScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    setTimeout(() => {
      this.props.navigation.navigate(PAGES.decision);
    }, 1500);
  }

  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  render() {
    return (
      <Container>
        <Content
          contentContainerStyle={{
            display: "flex",
            flex: 1,
            justifyContent: "center"
          }}
        >
          <Icon style={styles.checkIcon} name="checkmark" />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  checkIcon: {
    alignSelf: "center",
    color: COLORS.lightGreen,
    fontSize: 200,
    fontWeight: "100"
  }
});
