import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Dimensions,
  AppRegistry,
  TouchableHighlight,
  Image,
  View,
  TouchableOpacity
} from "react-native";
import Camera from "react-native-camera";
import { Button } from "native-base";
const config = require("../config/config")

export default class CameraScreen extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      cameraType: "back",
      mirrorMode: false
    };
  }

  render() {
    return (
      <Camera
        ref={cam => {
          this.camera = cam;
        }}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}
        captureTarget={Camera.constants.CaptureTarget.disk}
      >
       
        
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
        </View>
        
      </Camera>
    );
  }
  takePicture() {
    this.camera
      .capture()
      .then(data => {
        let name = data.path.substring(data.path.lastIndexOf("/") + 1);
        let formData = new FormData();
        formData.append("content", {
          uri: data.path,
          name: name
        });
        //fetch("http://localhost:8080/upload", {
        //fetch("http://nikenode-web.azurewebsites.net/upload", {
        fetch(config.server + "upload", {
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
      .catch(err => console.error(err));
  }
  switchCamera() {
    var state = this.state;
    state.cameraType =
      state.cameraType === Camera.constants.Type.back
        ? Camera.constants.Type.front
        : Camera.constants.Type.back;
    this.setState(state);
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
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
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
  switch: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 0,
    color: "#000",
    padding: 10,
    margin: 0,
    textAlign: 'left'
  }
});
