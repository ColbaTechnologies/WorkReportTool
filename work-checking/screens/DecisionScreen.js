import React from "react";
import { Dimensions } from "react-native";
import { Container, Header, Content, Button, Icon, Text } from "native-base";
const width = Dimensions.get("window").width;
const buttons = [
  {
    icon: "home",
    text: "Create a company",
    color: "primary",
    id: 0,
    targetPage: "NewCompany"
  },
  {
    icon: "people",
    text: "Join on a company",
    color: "info",
    id: 1,
    targetPage: "Join"
  }
];

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
          <Button
            key={button.id}
            block
            iconLeft
            info={button.color === "info"}
            primary={button.color === "primary"}
            style={{
              height: 80,
              marginBottom: 20
            }}
            onPress={() => {
              props.navigation.navigate(button.targetPage);
            }}
          >
            <Icon name={`${button.icon}`} />
            <Text>{button.text}</Text>
          </Button>
        ))}
      </Content>
    </Container>
  );
};
