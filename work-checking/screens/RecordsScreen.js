import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import CompanyService from "../services/companyService";
import EmployeeService from "../services/employeeService";
import RecordService from "../services/recordService";
import moment from "moment";
import { getDiffTime, prepareRecords } from "../helpers/helpers";
import { RecordList } from "../components/RecordList";
import { COLORS } from "../constants";
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Text,
  Form,
  Item,
  Label,
  Input,
  List,
  Body,
  Right,
  Left,
  ListItem,
  Separator
} from "native-base";
const width = Dimensions.get("window").width;

export class RecordsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: []
    };
  }

  componentDidMount() {
    const employeeId = this.props.navigation.getParam("employeeId", null);
    RecordService.getEmployeeRecords(employeeId).then(records => {
      records = prepareRecords(records);
      this.setState({ records });
    });
  }

  render() {
    return (
      <Container>
        <Content scrollEnabled={true}>
          {this.state.records.map(recordBlock => (
            <RecordList
              key={recordBlock.day}
              recordBlock={recordBlock}
              header={() => (
                <ListItem
                  itemDivider
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: COLORS.lightBlue
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "600" }}>
                    {recordBlock.day}
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: "300" }}>
                    Total: {recordBlock.total}
                  </Text>
                </ListItem>
              )}
            />
          ))}
        </Content>
      </Container>
    );
  }
}
