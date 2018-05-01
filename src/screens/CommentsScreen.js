import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FastImage from "react-native-fast-image";
import NotImplemented from "../NotImplemented";

export default class CommentsScreen extends Component {
  render() {
    return (
      <View>
        <Text>Comments</Text>
        <Button
          onPress={() => {
            this.props.navigator.dismissModal();
          }}
          title="Close"
        />
      </View>
    );
  }
}
