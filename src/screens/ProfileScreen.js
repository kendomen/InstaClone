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
import Loader from './Loader';
import Row from "./Row"

var { width, height } = Dimensions.get("window");

import EntypoIcon from "react-native-vector-icons/Entypo";
import HomeScreen from "./HomeScreen";
import NotImplemented from "../NotImplemented";
import EditProfileScreen from "./EditProfileScreen"

export default class ProfileScreen extends HomeScreen {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      refreshing: false,
      activeIndex: 0,
      loading: true
    };
  }

  segmentClicked = index => {
    this.setState({
      activeIndex: index
    });
  };

  render() {
    return (
      <Container style={{ flex: 1, backgroundColor: "white" }}>
        <Content>
          <View style={{ paddingTop: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Image
                  source={require("../assets/ken.jpeg")}
                  style={{ width: 75, height: 75, borderRadius: 37.5 }}
                />
              </View>

              <View style={{ flex: 3 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around"
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Text>10</Text>
                    <Text>posts</Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text>0</Text>
                    <Text>followers</Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text>0</Text>
                    <Text>following</Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    paddingTop: 10,
                    justifyContent: "space-around"
                  }}
                >
                  <Button
                    bordered
                    dark
                    style={{
                      flex: 3,
                      marginLeft: 10,
                      justifyContent: "center",
                      height: 33
                    }}
                    onPress={() => 
                      Navigation.showModal({
                        screen: "instaClone.EditProfileScreen",
                        title: "Edit Profile"
                      })
                    
                    }
                  >
                    <Text>Edit Profile</Text>
                  </Button>

                  <Button
                    bordered
                    dark
                    style={{
                      flex: 1,
                      height: 33,
                      marginRight: 10,
                      marginLeft: 5,
                      paddingTop: 2,
                      justifyContent: "center"
                    }}
                    onPress={() => alert('settings')}
                  >
                    <Icon name="settings" />
                  </Button>
                </View>
              </View>
            </View>

            <View
              style={{
                paddingBottom: 10,
                paddingHorizontal: 10,
                paddingTop: 10,
                paddingVertical: 10
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Ken Domen</Text>
              <Text>Tech Lead | SCC</Text>
              <Text>linkedin.com/kendomen</Text>
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  borderTopWidth: 1,
                  borderTopColor: "#eae5e5"
                }}
              >
                <Button
                  transparent
                  onPress={() => this.segmentClicked(0)}
                  active={this.state.activeIndex == 0}
                >
                  <Icon
                    name="ios-apps-outline"
                    style={[
                      this.state.activeIndex == 0 ? {} : { color: "grey" }
                    ]}
                  />
                </Button>
                <Button
                  transparent
                  onPress={() => this.segmentClicked(1)}
                  active={this.state.activeIndex == 1}
                >
                  <Icon
                    name="ios-list-outline"
                    style={[
                      this.state.activeIndex == 1 ? {} : { color: "grey" }
                    ]}
                  />
                </Button>
                <Button
                  transparent
                  onPress={() => this.segmentClicked(2)}
                  active={this.state.activeIndex == 2}
                >
                  <Icon
                    name="ios-people-outline"
                    style={[
                      this.state.activeIndex == 2 ? {} : { color: "grey" }
                    ]}
                  />
                </Button>
                <Button
                  transparent
                  onPress={() => this.segmentClicked(3)}
                  active={this.state.activeIndex == 3}
                >
                  <Icon
                    name="ios-bookmark-outline"
                    style={[
                      this.state.activeIndex == 3 ? {} : { color: "grey" }
                    ]}
                  />
                </Button>
              </View>
            </View>

            <View>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {this.renderSection()}
              </View>
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
            { height: width / 3 },
            { marginBottom: 2 },
            index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 }
          ]}
        >
         <AvViewThumb style={{ flex: 1, width: undefined, height: undefined }} type={post.type} source={"https://nikeinstastorage.blob.core.windows.net/insta-thumb/" + post.name} />
        </View>
        
      );
    });
  };

  renderSectionTwo = () => {
    return (
      
      <FlatList
        style={{ flex: 1 }}
        data={this.state.posts}
        refreshing={this.state.refreshing}
        keyExtractor={(item, index) => item.id}
        renderItem={item => this.renderRow(item)} 
      />
    );
  };

  renderRow(rowData){
      return(
        <Row data = {rowData}/>
      )
  }

  renderSectionThree = () => {
    
      return (
        <View
          style={[
            { width: width / 3 },
            { height: width / 3 },
            { marginBottom: 2 },
            { paddingLeft: 0 }
          ]}
        >
          <FastImage
            style={{ flex: 1, width: undefined, height: undefined }}
            source={require("../assets/ken.jpeg")}
          />
        </View>
      );
    
    
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
      return (
        <View>
          {this.renderSectionTwo()}
        </View>
      );
    }
    if (this.state.activeIndex == 2) {
      return (
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {this.renderSectionThree()}
        </View>
      );
    }
    if (this.state.activeIndex == 3) {
      return <NotImplemented/>
    }
  };
}
