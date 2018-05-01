import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import NotImplemented from "../NotImplemented";

export default class FavoriteScreen extends Component {
  render() {
    return (
      <View
        style={{
          height: 60,
          backgroundColor: "white",
          paddingTop: 10,
          paddingLeft: 10
        }}
      >
        <Text>Activity</Text>

        <View
          style={{
            height: 60,
            backgroundColor: "white",
            flexDirection: "row"
          }}
        >
          <FastImage
            style={{
              width: 36,
              height: 36,
              margin: 12,
              borderRadius: 18,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: "lightgray"
            }}
            source={require("../assets/ken.jpeg")}
          />
          <Text
            style={{
              fontWeight: "bold",
              height: 60,
              lineHeight: 60,
              flex: 1
            }}
          >
            kdomen liked your post. 3d
          </Text>
        </View>
        <View
          style={{
            height: 60,
            backgroundColor: "white",
            flexDirection: "row"
          }}
        >
          <FastImage
            style={{
              width: 36,
              height: 36,
              margin: 12,
              borderRadius: 18,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: "lightgray"
            }}
            source={require("../assets/ken.jpeg")}
          />
          <Text
            style={{
              fontWeight: "bold",
              height: 60,
              lineHeight: 60,
              flex: 1
            }}
          >
            kdomen liked your post. 3d
          </Text>
        </View>
        <View
          style={{
            height: 60,
            backgroundColor: "white",
            flexDirection: "row"
          }}
        >
          <FastImage
            style={{
              width: 36,
              height: 36,
              margin: 12,
              borderRadius: 18,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: "lightgray"
            }}
            source={require("../assets/ken.jpeg")}
          />
          <Text
            style={{
              fontWeight: "bold",
              height: 60,
              lineHeight: 60,
              flex: 1
            }}
          >
            kdomen liked your post. 3d
          </Text>
        </View>
        <View
          style={{
            height: 60,
            backgroundColor: "white",
            flexDirection: "row"
          }}
        >
          <FastImage
            style={{
              width: 36,
              height: 36,
              margin: 12,
              borderRadius: 18,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: "lightgray"
            }}
            source={require("../assets/ken.jpeg")}
          />
          <Text
            style={{
              fontWeight: "bold",
              height: 60,
              lineHeight: 60,
              flex: 1
            }}
          >
            kdomen liked your post. 3d
          </Text>
        </View>
      </View>
    );
  }
}
