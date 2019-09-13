import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import MotionTilt from './components/MotionTilt'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MotionTilt />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
