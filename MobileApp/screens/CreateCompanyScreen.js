import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { PAGES, NEW_COMPANY_INPUTS, COLORS } from "../constants";
import CompanyService from "../services/companyService";
import { validate } from "../helpers/helpers";
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

export class CreateCompanyScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: { name: "", ccc: "", cif: "" }, errors: [] };
  }
  onChangeText = (text, input) => {
    let data = { ...this.state.data, ...{ [input]: text } };
    let errors = this.state.errors.filter(error => error !== input);
    this.setState({ data, errors });
  };

  onSubmit = () => {
    const callback = () =>
      CompanyService.createNew(this.state.data).then(result => {
        this.props.navigation.navigate(PAGES.newEmployee, {
          companyId: result._id,
          isAdmin: true
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
            {NEW_COMPANY_INPUTS.map(input => {
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
