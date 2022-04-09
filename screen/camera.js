import * as React from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import PickImage from './screens/camera.js';

export default class PickImage extends React.Component {
    render() {
        return <PickImage />;
      }
  constructor() {
    super();
    this.state = {
      image: null,
    };
  }
  componentDidMount() {
    this.get_permission();
  }
  get_permission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('sorry we need camera roll permission to make this work!');
      }
    }
  };
  upload_image = async (uri) => {
    const data = new FormData();
    let filename = uri.split('/')[uri.split('/').length - 1];
    let type = `image/${uri.split('.')[uri.split('.').length - 1]}`;
    console.log(filename,type)
    const fileToUpload = { uri: uri, name: filename, type: type };
    data.append('alphabet', fileToUpload);
    fetch('', {
      method: 'POST',
      body: data,
      headers: { 'content-type': 'multipart/form-data' },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  //The try block will contain the code we want to execute and the catch block will contain the error or the exception which we'll denote by "e".
  pickimage = async () => {
    try {
      var result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({
          image: result.data,
        });
        console.log(result.uri);
        this.upload_image(result.uri);
      }
    } catch (E) {
      console.log(E);
    }
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'yellow',
        }}>
        <Button color="red" title="pick a image" onPress={this.pickimage} />
      </View>
    );
  }
}
