import React from "react";
import { Text } from "native-base";

export const Crono = ({ children }) => {
  return (
    <Text
      style={{
        fontSize: 40,
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 20
      }}
    >
      {children()}
    </Text>
  );
};
