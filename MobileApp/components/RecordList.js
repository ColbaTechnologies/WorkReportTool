import React from "react";
import { Text, List, ListItem, Left, Right, Body } from "native-base";

export const RecordList = ({ recordBlock, header }) => {
  return (
    <List key={recordBlock.day}>
      {header()}
      {recordBlock.records.map(record => (
        <ListItem
          key={record._id}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Text>{record.cTime}</Text>
          <Text>{record.sTime}</Text>
          <Text>{record.difference}</Text>
        </ListItem>
      ))}
    </List>
  );
};
