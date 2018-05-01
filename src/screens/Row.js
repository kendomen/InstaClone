import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Text,
  LayoutAnimation
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import ParsedText from "react-native-parsed-text";
import FastImage from "react-native-fast-image";
import AvView from "../AvView";

const TimerMixin = require("react-timer-mixin");

const mL = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const { width, height } = Dimensions.get("window");

class Row extends Component {
  constructor(props) {
    super(props);
    this.doubleTap = this.doubleTap.bind(this);

    this.state = {
      isLiked: false,
      lastPress: 0,
      animation: false
    };
  }
  returnDate(timestamp) {
    return new Date(timestamp * 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        {/*<View style={styles.infoContainer}>*/}
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
          <View style={styles.usernameContainer}>
            <Text>kdomen</Text>
          </View>
        </View>
        <View>
        <TouchableOpacity onPress={this.doubleTap} activeOpacity={1}>
          <AvView resizeMode="contain" type={this.props.data.item.type} source={this.props.data.item.source} >
            <View style={styles.likedContainer}>
              {(this.state.animation) ? <Icon name="md-heart" size={76} color="white" /> : null}  
            </View>
          </AvView>
        </TouchableOpacity>
        </View>
        {/*<View style={styles.itemImageContainer}>*/}
        <View
              style={{
                height: 54,
                backgroundColor: "white",
                flexDirection: "row",
              }}
            >
          <TouchableOpacity
            style={styles.like}
            onPress={() => this.setState({ isLiked: !this.state.isLiked })}
          >
            {!this.state.isLiked ? (
              <Icon name="ios-heart-outline" size={30} color="black" />
            ) : (
              <Icon name="ios-heart" size={30} color="red" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.comment}
            onPress={() => alert("go comment!")}
          >
            <Icon name="ios-chatbubbles-outline" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.share}
            onPress={() => alert("Share!!")}
          >
            <Icon name="ios-redo-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
        {/*<View style={styles.seperator} />*/}
       
        
        <View style={{ paddingLeft: 15, paddingRight: 15 }}>
          { this.props.data.item.tags ?  
              <Text>#{this.props.data.item.tags.join(" #")}</Text>
                 : null
          }
        </View>
        

        <View style={styles.footer}>
          <View style={styles.likeCount}>
            <Icon name="ios-heart" size={12} color="black" />
            <Text style={styles.text}>
              {" "}
              {/*{this.props.data.likes.count} liked{" "}*/}
              {this.state.isLiked ? "Liked by kdomen" : "0 likes"}
            </Text>
          </View>
          <TouchableOpacity
            style={{ width: 100 }}
            onPress={() => alert("go comment")}
          />
        </View>
        <View style={{ marginBottom: 20, paddingLeft: 15 }}>
              <Text style={{ fontSize: 12, color: "gray" }}>
                {"X MINUTES AGO"}
              </Text>
        </View>
      </View>
    );
  }

  doubleTap() {
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Row;
