import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import CompanyService from "../services/companyService";
import EmployeeService from "../services/employeeService";
import RecordService from "../services/recordService";
import moment from "moment";
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
  Spinner,
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
      records: null
    };
  }

  componentDidMount() {
    const employeeId = this.props.navigation.getParam("employeeId", null);
    RecordService.getEmployeeTodayRecords(employeeId)
      .then(records => {
        this.setState({ records });
      })
      .catch(e => console.log(e));
  }

  render() {
    if (this.state.records === null) {
      return <Spinner color={COLORS.darkGreen} />;
    }

    if (this.state.records.length === 0) {
      return (
        <Container>
          <Content padder>
            <Text>You don't have any records</Text>
          </Content>
        </Container>
      );
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
