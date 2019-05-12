import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import CompanyService from "../services/companyService";
import EmployeeService from "../services/employeeService";
import { validate } from "../helpers/helpers";
import { PAGES, NEW_EMPLOYEE_INPUTS, COLORS } from "../constants";
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
  Input
} from "native-base";
const width = Dimensions.get("window").width;

export class CreateEmployeeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { name: "", surname: "", nif: "", nass: "" },
      errors: []
    };
  }
  componentDidMount() {
    const companyId = this.props.navigation.getParam("companyId", null);
    const isAdmin = this.props.navigation.getParam("isAdmin", false);
    let data = { ...this.state.data, ...{ companyId, isAdmin } };
    this.setState({ data: data });
  }
  onChangeText = (text, input) => {
    let data = { ...this.state.data, ...{ [input]: text } };
    let errors = this.state.errors.filter(error => error !== input);
    this.setState({ data, errors });
  };

  onSubmit = () => {
    const callback = () =>
      EmployeeService.createNew(this.state.data).then(() => {
        this.props.navigation.navigate(PAGES.success, {
          targetScreen: PAGES.decision
        });
      });
    const fallback = errors => {
      this.setState({ errors });
    };
    validate(this.state.data, callback, fallback);
  };

  render() {
    return (
      <Container>
        <Content
          contentContainerStyle={{
            display: "flex",
            flex: 1
          }}
        >
          <Form>
            {NEW_EMPLOYEE_INPUTS.map(input => {
              let hasError = this.state.errors.includes(input.name);
              return (
                <Item key={input.name} error={hasError}>
                  <Input
                    placeholder={input.placeHolder}
                    onChangeText={text => this.onChangeText(text, input.name)}
                  />
                  {hasError && <Icon name="close-circle" />}
                </Item>
              );
            })}
          </Form>
          <Button
            block
            success
            style={{
              height: 80,
              position: "absolute",
              bottom: 0,
              width: width,
              backgroundColor: COLORS.lightGreen
            }}
            onPress={() => this.onSubmit()}
          >
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
