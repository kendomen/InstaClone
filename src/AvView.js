import React, { Component } from 'react'
import { View,  Text, StyleSheet, Dimensions, TouchableOpacity, LayoutAnimation } from 'react-native'
import Video from 'react-native-video'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FastImage from 'react-native-fast-image';

import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

//var timeago = require('timeago')


const { width } = Dimensions.get('window');

export default class AvView extends Component {
  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    controls: false,
    paused: true,
    skin: 'custom',
    ignoreSilentSwitch: null,
    isBuffering: false,
    imageHeight: 0,

    isLiked: false,
    lastPress: 0,
    animation: false
     
    
  }

  

  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onBuffer = this.onBuffer.bind(this);

    this.doubleTap = this.doubleTap.bind(this);

    
  }

  componentWillMount() {
    if (this.props.type === 'image') {
      Image.getSize(this.props.source, (w, h) => {
        this.setState({ imageHeight: Math.floor(h * (width / w)) })
      })
    }
  }

  onLoad(data) {
    this.setState({ duration: data.duration });
  }

  onProgress(data) {
    this.setState({ currentTime: data.currentTime });
  }

  onBuffer({ isBuffering }: { isBuffering: boolean }) {
    this.setState({ isBuffering });
  }

  render() {
    if (this.props.type === 'image') {
      return (
       
        <View>
        <TouchableOpacity onPress={this.doubleTap} activeOpacity={1}>
          <Image
            source={{ uri: this.props.source }}
            style={{ width, height: this.state.imageHeight }}
            resizeMode={'contain'}
          >
          
           <View style={styles.likedContainer}>
           {(this.state.animation && this.state.isLiked) ? <Ionicons name="md-heart" size={76} color="white" /> : null}     
            </View>
            
          </Image>
          </TouchableOpacity>

          {/* added from here */}
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
              <Ionicons name="ios-heart-outline" size={30} color="black" />
            ) : (
              <Ionicons name="ios-heart" size={30} color="red" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.comment}
            onPress={() => alert("go comment!")}
          >
            <Ionicons name="ios-chatbubbles-outline" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.share}
            onPress={() => alert("Share!!")}
          >
            <Ionicons name="ios-redo-outline" size={30} color="black" />
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
            <Ionicons name="ios-heart" size={12} color="black" />
            <Text style={styles.text}>
              {" "}
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
                {this.convertDate(this.props.data.item._ts)}
              </Text>
        </View>  

        {/*end here */}
        </View>
      )
    }
    
    
    return (
      <View>
      <TouchableOpacity
        onPress={() => {this.setState({ paused: !this.state.paused })}}
        activeOpacity={0.8}
        style={{ width, height: width }}
      >
        <Video
          source={{ uri: this.props.source }}
          style={{ width, height: width }}
          rate={this.state.rate}
          paused={this.state.paused}
          volume={this.state.volume}
          muted={this.state.muted}
          ignoreSilentSwitch={this.state.ignoreSilentSwitch}
          resizeMode={'cover'}
          onLoad={this.onLoad}
          onBuffer={this.onBuffer}
          onProgress={this.onProgress}
          onEnd={() => null}
          repeat={true}
        />
      <View style={{ position: 'absolute', right: 10, top: 10, backgroundColor: 'rgba(0, 0, 0, 0.6)', height: 40, width: 40, borderRadius: 20 }}>
        <Ionicons name="ios-videocam-outline" size={24} color="white" style={{ backgroundColor: 'transparent', lineHeight: 40, marginLeft: 10 }} />
      </View>
      </TouchableOpacity>

      {/* added from here */}
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
              <Ionicons name="ios-heart-outline" size={30} color="black" />
            ) : (
              <Ionicons name="ios-heart" size={30} color="red" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.comment}
            onPress={() => alert("go comment!")}
          >
            <Ionicons name="ios-chatbubbles-outline" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.share}
            onPress={() => alert("Share!!")}
          >
            <Ionicons name="ios-redo-outline" size={30} color="black" />
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
            <Ionicons name="ios-heart" size={12} color="black" />
            <Text style={styles.text}>
              {" "}
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
                {this.convertDate(this.props.data.item._ts)}
              </Text>
        </View>
        

        {/*end here */}

      </View>
    )
  }

  convertDate(epoch) {
     
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(epoch);
    return (d.toString());
    //return timeago.ago(d);
  }

  doubleTap() {
    let delta = new Date().getTime() - this.state.lastPress;
    if (delta < 500) {
      //DoubleTap
      if (!this.state.isLiked) {
        this.setState({
          lastPress: new Date().getTime(),
          isLiked: true,
          animation: true
        });
    }
    else {
      this.setState({
        lastPress: new Date().getTime(),
        isLiked: false,
        animation: true
      });
    }
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
