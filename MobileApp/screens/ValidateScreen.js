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
      records: []
    };
  }

  componentDidMount() {
    const companyId = this.props.navigation.getParam("companyId", null);
    RecordService.getPendingRecordsByCompany(companyId).then(records => {
      records = prepareRecordsForValidate(records);
      this.setState({ records: records });
    });
  }

  changeStatus = (status, firstRegister) => {
    let data = {
      date: firstRegister.createdAt,
      employeeId: firstRegister.employeeId,
      status
    };
    let day = moment(firstRegister.createdAt).format("DD/MM/YY");
    let newRecords = { ...this.state.records };
    newRecords[day] = newRecords[day].filter(
      item => item.firstRegister._id !== firstRegister._id
    );
    RecordService.validatePending(data).then(updated => {
      this.setState({ records: newRecords });
    });
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
                  <ListItem key={register.firstRegister._id}>
                    <Button
                      onPress={() =>
                        this.changeStatus("cancelled", register.firstRegister)
                      }
                      rounded
                      style={{
                        backgroundColor: COLORS.orange
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
                      onPress={() =>
                        this.changeStatus("accepted", register.firstRegister)
                      }
                      style={{
                        backgroundColor: COLORS.lightGreen,
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
        </Content>
      </Container>
    );
  }
}
