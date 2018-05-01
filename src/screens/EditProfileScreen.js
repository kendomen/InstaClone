import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";


export default class EditProfileScreen extends Component {
  render() {
    return (
      <View>
        <Text>Edit Profile</Text>
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
