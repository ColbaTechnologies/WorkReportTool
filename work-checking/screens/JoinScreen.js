import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import CompanyService from "../services/companyService";
import { PAGES, COLORS, JOIN_INPUTS } from "../constants";
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

export class JoinScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: { code: "" }, errors: [] };
  }
  onChangeText = (text, input) => {
    let data = { ...this.state.data, ...{ [input]: text } };
    let errors = this.state.errors.filter(error => error !== input);
    this.setState({ data });
  };

  onSubmit = () => {
    const callback = () =>
      CompanyService.getByCode(this.state.data.code).then(company => {
        this.props.navigation.navigate(PAGES.newEmployee, {
          companyId: company[0]._id
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
            flex: 1,
            justifyContent: "center"
          }}
        >
          <Form>
            {JOIN_INPUTS.map(input => {
              let hasError = this.state.errors.includes(input.name);
              return (
                <Item
                  key={input.name}
                  error={hasError}
                  style={{ width: 130, alignSelf: "center" }}
                >
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
