import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import CompanyService from "../services/companyService";
import EmployeeService from "../services/employeeService";
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

const inputs = [
  {
    name: "name",
    placeHolder: "Name"
  },
  {
    name: "surname",
    placeHolder: "Surname"
  },
  {
    name: "nif",
    placeHolder: "NIF"
  },
  {
    name: "nass",
    placeHolder: "NASS"
  }
];

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
    this.setState({ data });
  };

  onSubmit = () => {
    let emptyInputs = Object.keys(this.state.data).filter(key => {
      if (this.state.data[key] === "") {
        return key;
      }
    });
    if (emptyInputs.length !== 0) {
      this.setState({ errors: emptyInputs });
    } else {
      EmployeeService.createNew(this.state.data).then(() => {
        this.props.navigation.navigate("Success", {
          targetScreen: "Decision"
        });
      });
    }
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
            {inputs.map(input => {
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
              width: width
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
