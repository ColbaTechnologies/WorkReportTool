import React from "react";
import { Button, Icon, Text } from "native-base";

export const NavigationButton = ({
  id,
  color,
  text,
  icon,
  navigation,
  targetPage,
  style = {},
  params = {}
}) => {
  return (
    <Button
      key={id}
      block
      iconLeft
      style={{
        ...style,
        height: 80,
        backgroundColor: color
      }}
      onPress={() => {
        navigation.navigate(targetPage, params);
      }}
    >
      <Icon name={`${icon}`} />
      <Text>{text}</Text>
    </Button>
  );
};
