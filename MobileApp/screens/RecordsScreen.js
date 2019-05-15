import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import CompanyService from "../services/companyService";
import EmployeeService from "../services/employeeService";
import RecordService from "../services/recordService";
import moment from "moment";
import { RecordList } from "../components/RecordList";
import { COLORS } from "../constants";
import {
  Container,
  Header,
  Spinner,
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
      records: null
    };
  }

  componentDidMount() {
    const employeeId = this.props.navigation.getParam("employeeId", null);
    RecordService.getEmployeeRecords(employeeId).then(records => {
      this.setState({ records });
    });
  }

  render() {
    if (this.state.records === null) {
      return <Spinner color={COLORS.darkGreen} />;
    }

    if (Object.keys(this.state.records).length === 0) {
      return (
        <Container>
          <Content padder>
            <Text>You don't have any records</Text>
          </Content>
        </Container>
      );
    }

    return (
      <Container>
        <Content scrollEnabled={true}>
          {this.state.records.map(recordBlock => {
            let pendings = recordBlock.records.filter(
              record => record.status === "pending"
            );
            return (
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
                    {pendings.length === 0 && (
                      <Text style={{ fontSize: 16, fontWeight: "600" }}>
                        Validiated
                      </Text>
                    )}
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                      {recordBlock.total}
                    </Text>
                  </ListItem>
                )}
              />
            );
          })}
        </Content>
      </Container>
    );
  }
}
