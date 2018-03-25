import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, FlatList } from 'react-native'
import Video from 'react-native-video'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AvView from '../AvView'

const data = [{
  key: "1",
  username: 'ken',
  type: 'video',
  source: "https://nikeakshackfeststorage.blob.core.windows.net/nikeakshackfestblobcontainer/drive.mov?st=2018-03-18T08%3A47%3A00Z&se=2018-04-19T08%3A47%3A00Z&sp=rl&sv=2017-04-17&sr=b&sig=noacC6dFFoGBNO98lQNvY%2F%2BKk0oIpJavGRKTA7A9t44%3D",
  avatarUrl: 'https://unsplash.it/100?image=1005'
}, {
  key: "2",
  username: 'jennifer',
  type: 'image',
  source: "https://nikeakshackfeststorage.blob.core.windows.net/nikeakshackfestblobcontainer/baking.jpg?st=2018-03-18T03%3A47%3A00Z&se=2019-03-19T03%3A47%3A00Z&sp=rl&sv=2017-04-17&sr=c&sig=tTcn8TdQjxMAg3fzxuUbYOS9sObMU2TQ23Q1iSUut5M%3D",
  avatarUrl: 'https://unsplash.it/100?image=1027'
}, {
  key: "3",
  username: 'cathy',
  type: 'video',
  source: "https://nikeakshackfeststorage.blob.core.windows.net/nikeakshackfestblobcontainer/sky.mov?st=2018-03-18T03%3A47%3A00Z&se=2019-03-19T03%3A47%3A00Z&sp=rl&sv=2017-04-17&sr=c&sig=tTcn8TdQjxMAg3fzxuUbYOS9sObMU2TQ23Q1iSUut5M%3D",
  avatarUrl: 'https://unsplash.it/100?image=996'
}, {
  key: "4",
  username: 'zack',
  type: 'image',
  source: "https://nikeakshackfeststorage.blob.core.windows.net/nikeakshackfestblobcontainer/landscape.jpg?st=2018-03-18T03%3A47%3A00Z&se=2019-03-19T03%3A47%3A00Z&sp=rl&sv=2017-04-17&sr=c&sig=tTcn8TdQjxMAg3fzxuUbYOS9sObMU2TQ23Q1iSUut5M%3D",
  avatarUrl: 'https://unsplash.it/100?image=856'
}, {
  key: "5",
  username: 'luke',
  type: 'image',
  source: "https://nikeakshackfeststorage.blob.core.windows.net/nikeakshackfestblobcontainer/snow.jpg?st=2018-03-18T03%3A47%3A00Z&se=2019-03-19T03%3A47%3A00Z&sp=rl&sv=2017-04-17&sr=c&sig=tTcn8TdQjxMAg3fzxuUbYOS9sObMU2TQ23Q1iSUut5M%3D",
  avatarUrl: 'https://unsplash.it/100?image=669'
}, {
  key: "6",
  username: 'anna',
  type: 'video',
  source: "https://nikeakshackfeststorage.blob.core.windows.net/nikeakshackfestblobcontainer/garden.mov?st=2018-03-18T03%3A47%3A00Z&se=2019-03-19T03%3A47%3A00Z&sp=rl&sv=2017-04-17&sr=c&sig=tTcn8TdQjxMAg3fzxuUbYOS9sObMU2TQ23Q1iSUut5M%3D",
  avatarUrl: 'https://unsplash.it/100?image=823'
}, {
  key: "7",
  username: 'ken',
  type: 'image',
  source: "https://nikeakshackfeststorage.blob.core.windows.net/nikeakshackfestblobcontainer/town.jpg?st=2018-03-18T03%3A47%3A00Z&se=2019-03-19T03%3A47%3A00Z&sp=rl&sv=2017-04-17&sr=c&sig=tTcn8TdQjxMAg3fzxuUbYOS9sObMU2TQ23Q1iSUut5M%3D",
  avatarUrl: 'https://unsplash.it/100?image=550'
}]

export default class HomeScreen extends Component {
  render() {
    return (
      <FlatList
        style={{ flex: 1 }}
        data={data}
        renderItem={({ item }) => (
          <View>
            <View style={{ height: 60, backgroundColor: 'white', flexDirection: 'row' }}>
              <Image
                style={{ width: 36, height: 36, margin: 12, borderRadius: 18, borderWidth: StyleSheet.hairlineWidth, borderColor: 'lightgray' }}
                source={{ uri: item.avatarUrl }}
              />
              <Text style={{ fontWeight: 'bold', height: 60, lineHeight: 60, flex: 1 }}>{item.username}</Text>
              <Ionicons name="ios-more" size={30} color="black" style={{ lineHeight: 60, marginRight: 15 }} />
            </View>
            <AvView type={item.type} source={item.source} />
            <View style={{ height: 54, backgroundColor: 'white', flexDirection: 'row' }}>
              <Ionicons name="ios-heart-outline" size={34} color="black" style={{ marginTop: 12, marginLeft: 15 }} />
              <Ionicons name="ios-text-outline" size={34} color="black" style={{ marginTop: 12, marginLeft: 20 }} />
              <Ionicons name="ios-send-outline" size={34} color="black" style={{ marginTop: 12, marginLeft: 20 }} />
              <View style={{ flex: 1 }} />
              <Ionicons name="ios-bookmark-outline" size={34} color="black" style={{ marginTop: 12, marginRight: 15 }} />
            </View>
            <View style={{ marginBottom: 20, paddingLeft: 15 }}>
              <Text style={{ fontSize: 12, color: 'gray' }}>{'X MINUTES AGO'}</Text>
            </View>
          </View>
        )}
      />
    )
  }
}
