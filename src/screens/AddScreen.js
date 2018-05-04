import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  CameraRoll,
  TouchableHighlight,
  Modal,
  Button,
  Dimensions
} from "react-native";
import NotImplemented from "../NotImplemented";
const config = require("../config/config")

var { width, height } = Dimensions.get("window");

export default class AddScreen extends Component {
  constructor(props) {
    super(props);
    var controls = props.controls;
    this.state = {
      images: [],
      selected: "",
      fetchParams: { first: 61 },
      groupTypes: "SavedPhotos"
    };
    this._storeImages = this._storeImages.bind(this);
    this._logImageError = this._logImageError.bind(this);
    this._selectImage = this._selectImage.bind(this);
  }

  componentDidMount() {
    // get photos from camera roll
    CameraRoll.getPhotos(
      this.state.fetchParams,
      this._storeImages,
      this._logImageError
    );
  }

  // callback which processes received images from camera roll and stores them in an array
  _storeImages(data) {
    const assets = data.edges;
    const images = assets.map(asset => asset.node.image);
    this.setState({
      images: images
    });
  }

  _logImageError(err) {
    console.log(err);
  }

  _selectImage(uri) {
    // define whatever you want to happen when an image is selected here
    this.setState({
      selected: uri
    });
    console.log("Selected image: ", uri);

    let name = uri.substring(
      uri.lastIndexOf("id=") + 4,
      uri.lastIndexOf("id=") + 40
    );
    let ext = uri.substring(uri.lastIndexOf("ext=") + 4);

    console.log("name: " + name);
    console.log("ext: " + ext);

    name = name + "." + ext;
    let formData = new FormData();
    formData.append("content", {
      uri: uri,
      name: name
    });

    console.log("************************");
    console.log(name);
    console.log("************************");

    //fetch("https://nikenode-web.azurewebsites.net/upload", {
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
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView style={styles.container}>
          <View style={styles.imageGrid}>
            {this.state.images.map((image, index) => {
             if (index === 0) {
              return (
                <TouchableHighlight
                  onPress={() => this._selectImage(image.uri)}
                >
                  <Image
                    style={[
                      { width: width },
                      { height: width },
                      { marginBottom: 2 }
                    ]}
                    source={{ uri: image.uri }}
                  />
                </TouchableHighlight>
              );
             }
             else {
              return (
                <View>
                <TouchableHighlight
                  onPress={() => this._selectImage(image.uri)}
                >
                
                  <Image
                    style={[
                      { width: width/4 },
                      { height: width/4 },
                      { marginBottom: 2 },
                      index % 4 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 2 }
                    ]}
                    source={{ uri: image.uri }}
                  />
                  
                </TouchableHighlight>
                </View>
              );
             }
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  image: {
    width: width / 3,
    height: width / 3,
    marginBottom: 2
  }
});
