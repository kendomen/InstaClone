import React from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";

import {
  CameraKitCamera,
  CameraKitCameraScreen
} from "react-native-camera-kit";

import Camera from "react-native-camera";

export default class CameraScreen2 extends React.Component {
  async onBottomButtonPressed(event) {
    //const captureImages = JSON.stringify(event.captureImages);

    if (event.type === "capture") {
      console.log("***: " + event.captureImages[0].uri);

      let formData = new FormData();
      formData.append("content", {
        uri: event.captureImages[0].uri,
        name: event.captureImages[0].name
      });
      fetch("https://nikenode-web.azurewebsites.net/upload", {
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: formData
      }).then(res => {
        /** 
        setTimeout(function(){
          console.log("sleep for 4 sec")
        }, 4000);*/
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
