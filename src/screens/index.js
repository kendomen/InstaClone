import { Navigation } from 'react-native-navigation';

import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import AddScreen from './AddScreen';
import FavoriteScreen from './FavoriteScreen';
import ProfileScreen from './ProfileScreen';
import CameraScreen from './CameraScreen';

import CameraScreen2 from './CameraScreen2';
import VideoScreen from './VideoScreen'
import CommentsScreen from './CommentsScreen'
import EditProfileScreen from './EditProfileScreen'



//Ignore debugger
console.disableYellowBox = true;


// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('instaClone.HomeScreen', () => HomeScreen);
  Navigation.registerComponent('instaClone.SearchScreen', () => SearchScreen);
  Navigation.registerComponent('instaClone.AddScreen', () => AddScreen);
  Navigation.registerComponent('instaClone.CameraScreen', () => CameraScreen);
  Navigation.registerComponent('instaClone.FavoriteScreen', () => FavoriteScreen);
  Navigation.registerComponent('instaClone.ProfileScreen', () => ProfileScreen);


  Navigation.registerComponent('instaClone.CameraScreen2', () => CameraScreen2);
  Navigation.registerComponent('instaClone.VideoScreen', () => VideoScreen);
  Navigation.registerComponent('instaClone.CommentsScreen', () => CommentsScreen);
  Navigation.registerComponent('instaClone.EditProfileScreen', () => EditProfileScreen);
}
