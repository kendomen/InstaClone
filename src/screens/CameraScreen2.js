import React from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";

import {
  CameraKitCamera,
  CameraKitCameraScreen
} from "react-native-camera-kit";

import Camera from "react-native-camera";
const config = require("../config/config")

export default class CameraScreen2 extends React.Component {
  async onBottomButtonPressed(event) {
    //const captureImages = JSON.stringify(event.captureImages);

    if (event.type === "capture") {
    //if (event.type === "left") {
      let formData = new FormData();
      formData.append("content", {
        uri: event.captureImages[0].uri,
        name: event.captureImages[0].name

        //uri: "assets-library://asset/asset.JPG?id=4CDA93E5-3616-41B1-8BCB-A92174505EB6&ext=JPG",
        //name: "test"
      });
      //fetch("https://nikenode-web.azurewebsites.net/upload", {
      fetch(config.server + "upload", {
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: formData
      }).then(res => {
        this.props.navigator.switchToTab({
          tabIndex: 0
        });
        this.props.navigator.dismissModal();
      });
    }

    if (event.type === "left") {
      this.props.navigator.dismissModal();
      this.props.navigator.switchToTab({
        tabIndex: 0
      });
    }
  }

  render() {
    return (
      <CameraKitCameraScreen
        ref={cam => {
          this.camera = cam;
        }}
        actions={{ rightButtonText: "Done", leftButtonText: "Cancel" }}
        onBottomButtonPressed={event => this.onBottomButtonPressed(event)}
        flashImages={{
          on: require("./../images/flashOn.png"),
          off: require("./../images/flashOff.png"),
          auto: require("./../images/flashAuto.png")
        }}
        cameraFlipImage={require("./../images/cameraFlipIcon.png")}
        captureButtonImage={require("./../images/cameraButton.png")}
       
      />
    );
  }
}
