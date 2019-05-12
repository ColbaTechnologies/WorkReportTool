import React, { Component } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  Card,
  CardItem,
  Body,
  Title
} from "native-base";
import moment from "moment";
import EmployeeService from "../services/employeeService";
import CompanyService from "../services/companyService";
import RecordService from "../services/recordService";
import { getDiffTime } from "../helpers/helpers";
const { width, height } = Dimensions.get("window");

export class HomeScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Work Check-in"
  });
  constructor(props) {
    super(props);
    this.state = {
      company: null,
      employee: null,
      record: null,
      diff: null,
      isReady: false
    };
    this.props.navigation.se;
  }
  componentDidMount() {
    const { employeeId } = this.props.screenProps;
    RecordService.getCurrent(employeeId)
      .then(records => {
        if (records.length > 0) {
          this.setState({ record: records[0] });
          this.startCrono();
        } else {
          this.stopCrono();
        }
      })
      .catch(err => console.log(err));
    EmployeeService.getById(employeeId).then(employee => {
      this.setState({ employee: employee[0] }, () => {
        let { employee } = this.state;
        CompanyService.getById(employee.companyId)
          .then(company => {
            this.setState({ company: company[0], isReady: true });
          })
          .catch(err => console.log(err));
      });
    });
  }

  getButtons = isAdmin => {
    const buttons = [
      {
        icon: "clock",
        text: "Today",
        color: "info",
        id: 0,
        targetPage: "Today",
        params: { employeeId: this.state.employee._id }
      },
      {
        icon: "document",
        text: "Records",
        color: "primary",
        id: 1,
        targetPage: "Records",
        params: { employeeId: this.state.employee._id }
      }
    ];
    if (isAdmin) {
      buttons.push({
        icon: "clock",
        text: "Verify Records",
        color: "warning",
        id: 2,
        targetPage: "Join"
      });
    }
    return buttons;
  };
  startRecord = () => {
    let data = {
      employeeId: this.state.employee._id,
      employeeName: this.state.employee.name,
      companyId: this.state.employee.companyId
    };
    RecordService.createNew(data).then(record => {
      this.setState({ record });
      this.startCrono();
    });
  };

  startCrono = () => {
    this.interval = setInterval(() => {
      let nowMoment = moment();
      let crono = getDiffTime(this.state.record.createdAt, nowMoment);
      this.setState({ crono: crono });
    }, 1000);
  };

  stopCrono = () => {
    clearInterval(this.interval);
    this.setState({ crono: null });
  };

  stopRecord = () => {
    RecordService.stop(this.state.record._id).then(result => {
      this.setState({ record: null });
      this.stopCrono();
    });
  };

  render() {
    if (!this.state.isReady) {
      return <Container />;
    }
    let buttons = [];
    if (this.state.employee) {
      buttons = this.getButtons(this.state.employee.isAdmin);
    }
    return (
      <Container>
        <Content
          contentContainerStyle={{
            display: "flex",
            flex: 1,
            marginTop: 20
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 25,
              fontWeight: "bold"
            }}
          >
            {this.state.company && this.state.company.name}
          </Text>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              fontWeight: "300",
              marginBottom: 40
            }}
          >
            {this.state.employee &&
              `${this.state.employee.name} ${this.state.employee.surname}`}
          </Text>
          <Button
            style={{
              height: 100,
              width: 100,
              alignSelf: "center",
              alignItems: "center"
            }}
            icon
            success={this.state.record ? false : true}
            danger={this.state.record ? true : false}
            rounded
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
          {this.state.record && (
            <Text
              style={{
                fontSize: 40,
                alignSelf: "center"
              }}
            >
              {this.state.crono}
            </Text>
          )}
          <View style={{ position: "absolute", bottom: 0, width: width }}>
            {buttons.length > 0 &&
              buttons.map(button => (
                <Button
                  key={button.id}
                  block
                  iconLeft
                  info={button.color === "info"}
                  primary={button.color === "primary"}
                  warning={button.color === "warning"}
                  style={{
                    height: 80
                  }}
                  onPress={() => {
                    this.props.navigation.navigate(
                      button.targetPage,
                      button.params
                    );
                  }}
                >
                  <Icon name={`${button.icon}`} />
                  <Text>{button.text}</Text>
                </Button>
              ))}
          </View>
        </Content>
      </Container>
    );
  }
}
