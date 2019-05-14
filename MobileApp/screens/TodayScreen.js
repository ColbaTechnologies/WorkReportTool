import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import CompanyService from "../services/companyService";
import EmployeeService from "../services/employeeService";
import RecordService from "../services/recordService";
import moment from "moment";
import { getDiffTime, prepareRecords } from "../helpers/helpers";
import { Crono } from "../components/Crono";
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

export class TodayScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: []
    };
  }

  componentDidMount() {
    const employeeId = this.props.navigation.getParam("employeeId", null);
    console.log(employeeId);
    RecordService.getEmployeeTodayRecords(employeeId)
      .then(records => {
        records = prepareRecords(records);
        console.log(records);
        this.setState({ records });
      })
      .catch(e => console.log(e));
  }

  render() {
    if (this.state.records.length === 0) {
      return <Container />;
    }
    const recordBlock = this.state.records[0];
    return (
      <Container>
        <Content scrollEnabled={true}>
          <Crono>{() => recordBlock.total}</Crono>
          <RecordList
            header={() => (
              <ListItem
                itemDivider
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: COLORS.lightBlue
                }}
              >
                <Text>Started</Text>
                <Text>Stopped</Text>
                <Text>Time</Text>
              </ListItem>
            )}
            recordBlock={recordBlock}
          />
        </Content>
      </Container>
    );
  }
}
