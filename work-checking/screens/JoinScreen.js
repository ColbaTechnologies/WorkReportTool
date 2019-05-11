import React from "react";
import { StyleSheet, Dimensions } from "react-native";

import CompanyService from "../services/companyService";
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

const inputs2 = [
  {
    name: "code",
    placeHolder: "Company Code"
  }
];

export class JoinScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: { code: "" }, errors: [] };
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
      CompanyService.getByCode(this.state.data.code).then(company => {
        console.log(company);
        this.props.navigation.navigate("NewEmployee", {
          companyId: company[0]._id
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
            flex: 1,
            justifyContent: "center"
          }}
        >
          <Form>
            {inputs2.map(input => {
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
