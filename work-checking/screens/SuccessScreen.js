import React, { Component } from "react";
import { Content, Text, Icon } from "native-base";
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export class SuccessScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    setTimeout(() => {
      this.props.navigation.navigate("Decision");
    }, 2000);
  }

  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  render() {
    return (
      <Content style={styles.root}>
        <Icon style={styles.checkIcon} name="md-checkmark-circle-outline" />
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    height,
    backgroundColor: "#388E3C"
  },
  checkIcon: {
    alignSelf: "center",
    marginTop: 150,
    color: "#C8E6C9",
    fontSize: 200,
    fontWeight: "100"
  }
});
