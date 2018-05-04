import React, { Component, PureComponent } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  LayoutAnimation,
  Dimensions,
  TouchableOpacity,
  Share
} from "react-native";
import Video from "react-native-video";
import Ionicons from "react-native-vector-icons/Ionicons";
import AvView from "../AvView";
import { Navigation } from "react-native-navigation";
import FastImage from "react-native-fast-image";
import Loader from "./Loader";
import Row from "./Row"
const { width, height } = Dimensions.get("window");
const config = require("../config/config")



export default class HomeScreen extends PureComponent {
  constructor(prop) {
    super(prop);
    this.doubleTap = this.doubleTap.bind(this);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      posts: [],
      refreshing: false,
      isLiked: false,
      lastPress: 0,
      animation: false,
      loading: true,
      liked: []
    };
    FastImage.preload([
      {
        uri: "../assets/ken.jpeg"
      }
    ]);
  }

  returnDate(timestamp) {
    return new Date(timestamp * 1000);
  }

  onNavigatorEvent(event) {
    if (event.id === "didAppear") {
      this.handleRefresh();
    }
  }

  componentDidMount() {
    console.log("****** componentDidMount");
    //this.handleRefresh();
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    console.log("******** server: " + config.server)
    //console.log("makeRemoteRequest()...");
    //fetch("http://52.173.252.50:8080/")
    //fetch("https://nikenode-web.azurewebsites.net/")
    fetch(config.server)
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        // -------------------------------------------------
        // Since we haven't implemented liked in the server
        // we adjust the state here
        // -------------------------------------------------
        responseJson.posts.forEach(function(post, index) {
          post["liked"] = [];
        });

        this.setState({
          posts: responseJson.posts,
          refreshing: false
        });
      })
      .catch(error => {
        console.log("Error2: " + error);
        console.log("Error2: " + config.server);
      });
  };

  handleRefresh = () => {
    //console.log("handle....");
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  // onRefresh={this.handleRefresh} below

  share() {
    Share.share(
      {
        message:
          "BAM: we're helping your business with awesome React Native apps",
        url: "http://bam.tech",
        title: "Wow, did you see that?"
      },
      {
        // Android only:
        dialogTitle: "Share BAM goodness",
        // iOS only:
        excludedActivityTypes: ["com.apple.UIKit.activity.PostToTwitter"]
      }
    );
  }

  render() {
    return (
      <FlatList
        style={{ flex: 1 }}
        data={this.state.posts}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh}
        keyExtractor={(item, index) => item.id}
        extraData={this.state.refreshing}
        renderItem={item => this.renderRow(item)}
      />
    );
  }

  renderRow(rowData){
      return(
        <Row data = {rowData}/>
      )
  }

  doubleTap() {
    console.log("doubletap");
    let delta = new Date().getTime() - this.state.lastPress;
    if (delta < 500) {
      //DoubleTap
      this.setState({
        lastPress: new Date().getTime(),
        isLiked: true,
        animation: true
      });
      LayoutAnimation.easeInEaseOut();
      setTimeout(() => {
        this.setState({ animation: false });
      }, 1500);
      return;
    }
    this.setState({
      lastPress: new Date().getTime()
    });
  }
  handleNamePress() {
    alert("its coming");
  }
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white", paddingTop: 5 },
  infoContainer: { flexDirection: "row", height: 45, alignSelf: "stretch" },
  image: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginHorizontal: 3,
    marginVertical: 3
  },
  usernameContainer: { justifyContent: "center", flexDirection: "column" },
  location: { fontSize: 10 },
  itemImageContainer: {
    flexDirection: "row",
    height: 40,
    alignSelf: "stretch"
  },
  like: { marginHorizontal: 5, marginVertical: 5, marginLeft: 20 },
  comment: { marginHorizontal: 10, marginVertical: 5 },
  share: { marginHorizontal: 10, marginVertical: 5 },
  likeCount: { flexDirection: "row", alignItems: "center", marginLeft: 2 },
  commentItem: { fontSize: 10, color: "rgba(0, 0, 0, 0.5)", marginTop: 5 },
  captionContainer: {
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center"
  },
  captionText: { fontSize: 12, fontWeight: "bold" },
  dateText: { fontSize: 8, color: "rgba(0, 0, 0, 0.5)", marginTop: 5 },
  seperator: {
    height: 1,
    alignSelf: "stretch",
    marginHorizontal: 10,
    backgroundColor: "rgba(0, 0, 0, 0.2)"
  },
  hashTag: { fontStyle: "italic", color: "blue" },
  footer: {
    marginVertical: 5,
    alignSelf: "stretch",
    marginHorizontal: 20,
    flexDirection: "column"
  },
  username: { color: "blue" },
  text: { fontSize: 12, color: "black" },
  likedContainer: {
    backgroundColor: "transparent",
    flex: 0,
    justifyContent: "center",
    alignItems: "center"
  }
});
