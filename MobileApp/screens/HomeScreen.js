import React, { Component } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { COLORS } from "../constants";
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
import { getDiffTime, getButtons } from "../helpers/helpers";
import { NavigationButton } from "../components/NavigationButton";
import { PAGES } from "../constants";
import { Crono } from "../components/Crono";
const { width, height } = Dimensions.get("window");

export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: null,
      employee: null,
      record: null,
      diff: null,
      isReady: false
    };
  }
  componentDidMount() {
    const { employee, company } = this.props.screenProps;
    this.setState({ employee, company });
    RecordService.getCurrent(employee._id)
      .then(records => {
        if (records.length > 0) {
          this.setState({ record: records[0] });
          this.startCrono();
        } else {
          this.stopCrono();
        }
      })
      .catch(err => console.log(err));
  }

  startRecord = () => {
    let data = {
      employeeId: this.state.employee._id,
      employeeName: this.state.employee.name,
      companyId: this.state.employee.companyId
    };

    RecordService.createNew(data).then(record => {
      this.startCrono();
      this.setState({ record });
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
    let buttons = [];
    if (this.state.employee) {
      buttons = getButtons(PAGES.home, this.state.employee);
    }
    return (
      <Container>
        <Content contentContainerStyle={styles.root}>
          <Text style={styles.companyName}>
            {this.state.company && this.state.company.name}
          </Text>
          <Text style={styles.employeeName}>
            {this.state.employee &&
              `${this.state.employee.name} ${this.state.employee.surname}`}
          </Text>
          <Button
            style={[
              styles.workButton,
              {
                backgroundColor: !this.state.record
                  ? COLORS.lightGreen
                  : COLORS.orange
              }
            ]}
            icon
            rounded
            onPress={
              this.state.record
                ? () => this.stopRecord()
                : () => this.startRecord()
            }
          >
            <Icon
              style={[
                styles.workIcon,
                { paddingLeft: this.state.record ? 35 : 40 }
              ]}
              name={this.state.record ? "pause" : "play"}
            />
          </Button>
          {this.state.record && <Crono>{() => this.state.crono}</Crono>}
          <View style={styles.buttonsContainer}>
            {buttons.length > 0 &&
              buttons.map(button => (
                <NavigationButton
                  key={button.id}
                  {...button}
                  navigation={this.props.navigation}
                />
              ))}
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flex: 1,
    marginTop: 20
  },
  companyName: {
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "bold"
  },
  employeeName: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 40
  },
  workButton: {
    height: 100,
    width: 100,
    alignSelf: "center",
    alignItems: "center"
  },
  workIcon: {
    fontSize: 50,
    width: "100%"
  },
  buttonsContainer: { position: "absolute", bottom: 0, width: width }
});
