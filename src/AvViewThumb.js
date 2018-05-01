import React, { Component } from 'react'
import { View,  Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import Video from 'react-native-video'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FastImage from 'react-native-fast-image';

import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

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
    imageHeight: 0
  }

  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onBuffer = this.onBuffer.bind(this);
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
          <Image
            source={{ uri: this.props.source }}
            style={{ height: 125 }}
          />
        </View>
      )
    }
    else {
      return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
          <Text>Video Thumbnail</Text>
        </View>
      )
    }
  }
}
