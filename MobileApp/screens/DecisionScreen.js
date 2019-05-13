import React from "react";
import { Dimensions } from "react-native";
import { Container, Header, Content } from "native-base";
import { NavigationButton } from "../components/NavigationButton";
import { getButtons } from "../helpers/helpers";
import { PAGES } from "../constants";
const width = Dimensions.get("window").width;
let buttons = getButtons(PAGES.decision);

export const DecisionScreen = props => {
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
        {buttons.map(button => (
          <NavigationButton
            key={button.id}
            {...button}
            style={{
              marginBottom: 20
            }}
            navigation={props.navigation}
          />
        ))}
      </Content>
    </Container>
  );
};
