import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import CompanyService from "../services/companyService";
import EmployeeService from "../services/employeeService";
import RecordService from "../services/recordService";
import moment from "moment";
import { getDiffTime } from "../helpers/helpers";

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
      let sortedArray = records
        .sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
        .map(record => {
          let created = moment(record.createdAt);
          let stopped = moment(record.stoppedAt);
          record.cDate = created.format("DD/MM/YY");
          record.cTime = created.format("hh:mm:ss");
          record.sDate = stopped.format("DD/MM/YY");
          record.sTime = stopped.format("hh:mm:ss");
          record.difference = getDiffTime(created, stopped);
          return record;
        });
      let recordsGrouped = this.groupBy(sortedArray, "cDate");
      let recordsFinal = [];
      Object.keys(recordsGrouped).map(day => {
        let data = { day: day, records: recordsGrouped[day], total: 0 };
        recordsGrouped[day].map(item => {
          data.total += moment.duration(item.difference).asSeconds();
        });
        data.total = moment(data.total)
          .startOf("day")
          .seconds(data.total)
          .format("HH:mm:ss");
        recordsFinal.push(data);
      });

      this.setState({ records: recordsFinal });
    });
  }

  groupBy = (xs, key) => {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
  render() {
    return (
      <Container>
        <Content scrollEnabled={true}>
          <List>
            {this.state.records.map(recodBlock => (
              <View key={recodBlock.day}>
                <ListItem itemDivider>
                  <Left>
                    <Text style={{ fontSize: 16 }}>{recodBlock.day}</Text>
                  </Left>
                  <Body>
                    <Text style={{ fontSize: 16 }}>
                      Total: {recodBlock.total}
                    </Text>
                  </Body>
                  <Right />
                </ListItem>
                <View>
                  {recodBlock.records.map(record => (
                    <ListItem key={record._id}>
                      <Left>
                        <Text>{record.cTime}</Text>
                      </Left>
                      <Body>
                        <Text>{record.sTime}</Text>
                      </Body>
                      <Right>
                        <Text>{record.difference}</Text>
                      </Right>
                    </ListItem>
                  ))}
                </View>
              </View>
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}
