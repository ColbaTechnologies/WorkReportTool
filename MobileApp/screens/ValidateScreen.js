import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import CompanyService from "../services/companyService";
import EmployeeService from "../services/employeeService";
import RecordService from "../services/recordService";
import moment from "moment";
import {
  getDiffTime,
  prepareRecords,
  prepareRecordsForValidate
} from "../helpers/helpers";
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
  List,
  Body,
  Right,
  Left,
  ListItem,
  Thumbnail,
  Separator
} from "native-base";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export class ValidateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: {},
      cancelled: [],
      accepted: [],
      originalRecords: []
    };
  }

  componentDidMount() {
    const companyId = this.props.navigation.getParam("companyId", null);
    RecordService.getPendingRecordsByCompany(companyId)
      .then(records => {
        let cookedRecords = prepareRecordsForValidate(records);
        this.setState({ records: cookedRecords, originalRecords: records });
      })
      .catch(e => console.log(e));
  }

  changeStatus = (status, id) => {
    let { accepted, cancelled } = this.state;
    accepted = accepted.filter(item => item !== id);
    cancelled = cancelled.filter(item => item !== id);
    if (status === "cancelled") {
      cancelled.push(id);
    } else {
      accepted.push(id);
    }

    this.setState({
      accepted,
      cancelled
    });
  };

  onSubmit = () => {
    let { accepted, cancelled, originalRecords, records } = this.state;
    let data = {
      accepted: [],
      cancelled: []
    };
    console.log(records);
  };

  render() {
    if (this.state.records.length === 0) {
      return <Container />;
    }

    return (
      <Container>
        <Content scrollEnabled={true}>
          <List>
            {Object.keys(this.state.records).map(day => (
              <View key={day}>
                <ListItem itemDivider>
                  <Text>{day}</Text>
                </ListItem>
                {this.state.records[day].map(register => (
                  <ListItem key={register.id}>
                    <Button
                      onPress={() =>
                        this.changeStatus("cancelled", register.id)
                      }
                      rounded
                      disabled={
                        this.state.cancelled.includes(register.id)
                          ? true
                          : false
                      }
                      style={{
                        backgroundColor: this.state.cancelled.includes(
                          register.id
                        )
                          ? COLORS.orange
                          : COLORS.lightBlue
                      }}
                    >
                      <Icon
                        style={{
                          color: COLORS.white
                        }}
                        name="close"
                      />
                    </Button>
                    <Body
                      style={{
                        display: "flex",
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between"
                      }}
                    >
                      <View>
                        <Text>{register.employeeName}</Text>
                        <Text style={{ fontWeight: "300", fontSize: 10 }}>
                          {`${register.start} - ${register.end}`}
                        </Text>
                      </View>
                      <Text
                        note
                        style={{
                          fontWeight: "300",
                          fontSize: 20,
                          textAlignVertical: "center"
                        }}
                      >
                        {register.total}
                      </Text>
                    </Body>
                    <Button
                      rounded
                      disabled={
                        this.state.accepted.includes(register.id) ? true : false
                      }
                      onPress={() => this.changeStatus("accepted", register.id)}
                      style={{
                        backgroundColor: this.state.accepted.includes(
                          register.id
                        )
                          ? COLORS.lightGreen
                          : COLORS.lightBlue,
                        width: 50,
                        height: 50
                      }}
                    >
                      <Icon
                        style={{
                          color: COLORS.white
                        }}
                        name="checkmark"
                      />
                    </Button>
                  </ListItem>
                ))}
              </View>
            ))}
          </List>
          <Button
            block
            style={{
              height: 60,
              width: width,
              backgroundColor: COLORS.lightGreen
            }}
            onPress={() => this.onSubmit()}
          >
            <Text>Validate</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
