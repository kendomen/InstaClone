import React, { Component } from "react";

import {
  View,
  Text,
  StyleSheet,
  ImageBackgroundProperties,
  Image,
  Dimensions,
  FlatList
} from "react-native";

import {
  Icon,
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Button
} from "native-base";

import { Navigation } from "react-native-navigation";
import FastImage from "react-native-fast-image";

import Ionicons from "react-native-vector-icons/Ionicons";
import AvView from "../AvView";
import AvViewThumb from "../AvViewThumb";

var { width, height } = Dimensions.get("window");
import SearchBar from "react-native-search-bar";

import EntypoIcon from "react-native-vector-icons/Entypo";
import HomeScreen from "./HomeScreen";

export default class SearchScreen extends HomeScreen {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      refreshing: false,
      activeIndex: 0
    };
  }

  render() {
    return (
      <Container style={{ flex: 1, backgroundColor: "white" }}>
        <Content>
          <View>
            <SearchBar ref={ref => (this.search1 = ref)} />
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {this.renderSection()}
            </View>
          </View>
        </Content>
      </Container>
    );
  }

  renderSectionOne = () => {
    return this.state.posts.map((post, index) => {
      return (
        <View
          key={index}
          style={[
            { width: width / 3 },
            { height: width / 3 }
          ]}
        >
          <AvViewThumb type={post.type} source={"https://nikeinstastorage.blob.core.windows.net/insta-thumb/" + post.name} />
        </View>
      );
    });
  };

  renderSection = () => {
    if (this.state.activeIndex == 0) {
      return (
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {this.renderSectionOne()}
        </View>
      );
    }
    if (this.state.activeIndex == 1) {
      return <View>{this.renderSectionTwo()}</View>;
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  image: {
    width: width / 3,
    height: width / 3,
    marginBottom: 2
  }
});
