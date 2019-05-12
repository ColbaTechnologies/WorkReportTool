import React, { Component } from "react";
import { StyleSheet, Dimensions } from "react-native";
import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  Body,
  Left,
  Right
} from "native-base";
import EmployeeService from "../services/employeeService";
import CompanyService from "../services/companyService";
import RecordService from "../services/recordService";

const { width, height } = Dimensions.get("window");

export class HomeScreen extends Component {
  static navigationOptions = {
    title: "Home"
  };
  constructor(props) {
    super(props);
    this.state = { company: null, employee: null, record: null };
  }
  componentDidMount() {
    const { employeeId } = this.props.screenProps;
    RecordService.getCurrent(employeeId)
      .then(records => {
        if (records.length > 0) {
          this.setState({ record: records[0] });
        }
      })
      .catch(err => console.log(err));
    EmployeeService.getById(employeeId).then(employee => {
      this.setState({ employee: employee[0] }, () => {
        let { employee } = this.state;
        CompanyService.getById(employee.companyId)
          .then(company => {
            this.setState({ company: company[0] });
          })
          .catch(err => console.log(err));
      });
    });
  }

  startRecord = () => {
    let data = {
      employeeId: this.state.employee._id,
      employeeName: this.state.employee.name,
      companyId: this.state.employee.companyId
    };
    RecordService.createNew(data).then(record => {
      this.setState({ record });
    });
  };
  stopRecord = () => {
    RecordService.stop(this.state.record._id).then(result => {
      this.setState({ record: null });
    });
  };

  render() {
    return (
      <Container>
        <Content
          contentContainerStyle={{
            display: "flex",
            flex: 1,
            justifyContent: "center"
          }}
        >
          <Button
            style={{
              height: 100,
              width: 100,
              alignSelf: "center",
              alignItems: "center"
            }}
            icon
            rounded
            light
            onPress={
              this.state.record
                ? () => this.stopRecord()
                : () => this.startRecord()
            }
          >
            <Icon
              style={{
                fontSize: 50,
                width: "100%",
                paddingLeft: this.state.record ? 35 : 40
              }}
              name={this.state.record ? "pause" : "play"}
            />
          </Button>
          <Text>{JSON.stringify(this.state)}</Text>
        </Content>
      </Container>
    );
  }
}
