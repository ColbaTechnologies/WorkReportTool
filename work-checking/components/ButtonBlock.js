import React from "react";
import { Button, Icon, Text } from "native-base";

export const ButtonBlock = () => {
  return (
    <Button
      block
      iconLeft
      info
      style={{
        height: 80,
        marginBottom: 20
      }}
    >
      <Icon name="home" />
      <Text>Create a company</Text>
    </Button>
  );
};
