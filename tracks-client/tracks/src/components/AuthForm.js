import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import Spacer from "../components/Spacer";

const AuthForm = ({
  headerText,
  errorMessage,
  submitButtonTitle,
  onSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Spacer>
        <Text h3>{headerText}</Text>
      </Spacer>
      <Input label="Email" value={email} onChangeText={setEmail}></Input>
      <Spacer />
      <Input
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
      ></Input>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          title={submitButtonTitle}
          onPress={() => onSubmit({ email, password })}
        ></Button>
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    marginLeft: 15,
    marginTop: 15,
    fontSize: 16,
    color: "red",
  },
});

export default AuthForm;
