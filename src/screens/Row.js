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
       
          <AvView resizeMode="contain" type={this.props.data.item.type} source={this.props.data.item.source} data={this.props.data} >
            <View style={styles.likedContainer}>
              {(this.state.animation) ? <Icon name="md-heart" size={76} color="white" /> : null}  
            </View>
          </AvView>
       
        </View>
        {/*<View style={styles.itemImageContainer}>*/}
        
        {/*<View style={styles.seperator} />*/}
       
        
        
        

        
       
      </View>
    );
  }

  convertDate(epoch) {
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(epoch);
    return (d.toString());
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
