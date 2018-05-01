import React, { Component } from "react";

import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  LayoutAnimation,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";

import Camera from "react-native-camera";

import NotImplemented from "../NotImplemented";
import Ionicons from "react-native-vector-icons/Ionicons";

let startVideo = false;

export default class VideoScreen extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      cameraType: "back",
      mirrorMode: false,
      captureMode: Camera.constants.CaptureMode.video
    };
  }

  render() {
    return (
      <Camera
        ref="camera"
        style={styles.preview}
        captureMode={this.state.captureMode}
        captureTarget={Camera.constants.CaptureTarget.disk}
        captureAudio={true}
      >
        <TouchableHighlight
          onPressIn={this._startRecord.bind(this)}
          onPressOut={this._endVideo.bind(this)}
        >
          <Ionicons
            name={"ios-radio-button-on"}
            size={80}
            style={styles.recordButton}
            color={"red"}
          />
        </TouchableHighlight>
      </Camera>
    );
  }

  _startRecord() {
    startVideo = setTimeout(this._recordVideo.bind(this), 50);
  }

  _recordVideo() {
    this.refs.camera.capture({mode: Camera.constants.CaptureMode.video})
    .then((data) => {
      let name = data.path.substring(data.path.lastIndexOf("/") + 1);
      let formData = new FormData();
      formData.append("content", {
        uri: data.path,
        name: name
      });
      fetch("https://nikenode-web.azurewebsites.net/upload", {
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: formData
      }).then(res => {
        this.props.navigator.dismissModal();
        this.props.navigator.switchToTab({
          tabIndex: 0
        });
      });
    })
    .catch((err) => console.log(err))
  }

  _endVideo() {
    this.refs.camera.stopCapture();
    this.props.navigator.dismissModal();
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  },
  switch: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 0,
    color: "#000",
    padding: 10,
    margin: 0,
    textAlign: "left"
  }
});
