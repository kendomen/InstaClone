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
const config = require("../config/config")

const { width, height } = Dimensions.get("window");

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
    //console.log("makeRemoteRequest()...");
    //fetch("http://52.173.252.50:8080/")
    //fetch("https://nikenode-web.azurewebsites.net/")
    fetch(config.server)
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        //console.log("MAKE REMOTE REQUEST: " + responseJson);

        // -------------------------------------------------
        // Since we haven't implemented liked in the server
        // we adjust the state here
        // -------------------------------------------------
        responseJson.posts.forEach(function(post, index) {
          post["liked"] = [];
          //console.log(index)
          //this.state.liked = []
        });

        this.setState({
          posts: responseJson.posts,
          refreshing: false
        });
      })
      .catch(error => {
        console.log("Error: " + error);
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
        keyExtractor={(item, index) => item.id}
        extraData={this.state.refreshing}
        renderItem={({ item, index }) => (
          <View>
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
                kdomen
              </Text>
              <Ionicons
                name="ios-more"
                size={30}
                color="black"
                style={{ lineHeight: 60, marginRight: 15 }}
                onPress={this.share}
              />
            </View>
            <TouchableOpacity onPress={this.doubleTap} activeOpacity={1}>
              <AvView type={item.type} source={item.source} />
            </TouchableOpacity>
            <View
              style={{
                height: 54,
                backgroundColor: "white",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                style={styles.like}
                onPress={() => {
                  var userIndex = this.state.posts[index].liked.indexOf(
                    "kdomen"
                  );
                  if (this.state.posts[index].liked.includes("kdomen")) {
                    console.log("removing like");
                    this.state.posts[index].liked.splice(userIndex, 1);
                    this.setState({
                      posts: this.state.posts,
                      refreshing: true
                    });
                  } else {
                    console.log("adding like");
                    this.state.posts[index].liked.push("kdomen");
                    console.log(
                      "index: " +
                        this.state.posts[index].liked.indexOf("kdomen")
                    );
                    this.setState({
                      posts: this.state.posts,
                      refreshing: true
                    });
                  }
                }}
              >
                {!this.state.posts[index].liked.indexOf("kdomen") == 0 ? (
                  <Ionicons
                    name="ios-heart-outline"
                    size={34}
                    color="black"
                    style={{ marginTop: 8, marginLeft: 15 }}
                  />
                ) : (
                  <Ionicons
                    name="ios-heart"
                    size={34}
                    color="red"
                    style={{ marginTop: 8, marginLeft: 15 }}
                  />
                )}
              </TouchableOpacity>
              <Ionicons
                name="ios-text-outline"
                size={34}
                color="black"
                style={{ marginTop: 12, marginLeft: 20 }}
                onPress={() => 
                  Navigation.showModal({
                    screen: "instaClone.CommentsScreen",
                    title: "Comments"
                  })
                
                }
              />
              <Ionicons
                name="ios-send-outline"
                size={34}
                color="black"
                style={{ marginTop: 12, marginLeft: 20 }}
                onPress={() => alert("go send!")}
              />
              <View style={{ flex: 1 }} />
              <Ionicons
                name="ios-bookmark-outline"
                size={34}
                color="black"
                style={{ marginTop: 12, marginRight: 15 }}
              />
            </View>
            <View style={{ marginBottom: 20, paddingLeft: 15 }}>
              <Text
                style={{ fontSize: 12, color: "black", fontWeight: "bold" }}
              >
                {item.liked.length} likes
              </Text>
            </View>
            <View style={{ marginBottom: 20, paddingLeft: 15 }}>
              <Text style={{ fontSize: 12, color: "gray" }}>
                {"X MINUTES AGO"}
              </Text>
            </View>
          </View>
        )}
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
