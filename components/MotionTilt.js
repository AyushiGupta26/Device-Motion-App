import * as React from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import { DeviceMotion } from 'expo-sensors';

export default class MotionTilt extends React.Component {
  state = {
    dm: null,
    initial: null
  };

  componentDidMount() {
    // let fn = async () => {
    //   let data = await DeviceMotion.isAvailableAsync();
    //   console.log(data)
    //   return data;
    // };
    // let bool = fn();
    let bool = DeviceMotion.isAvailableAsync();
    if (bool) {
      DeviceMotion.addListener(motion => {
        this.setState(oldState => ({
          dm: motion,
          initial: oldState.initial ? oldState.initial : motion }));
        //alert(JSON.stringify(motion));
      });
      DeviceMotion.setUpdateInterval(16);
      // 60fps render
    } else {
      alert("Service not provided");
    }
  }

  componentWillUnmount() {
    DeviceMotion.removeAllListeners();
  }

  render() {
    let initialAngle = 0;
    if(this.state.initial && this.state.initial.rotation && this.state.initial.rotation.alpha){
      initialAngle = this.state.initial.rotation.alpha;
    }
    let angle = 0;
    if(this.state.dm && this.state.dm.rotation && this.state.dm.rotation.alpha){
      angle = this.state.dm.rotation.alpha;
    }
    angle -= initialAngle;
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/snack-icon.png')}
          style={{
            height: 240,
            width: 240,
            transform: [{ rotate: angle + 'rad' }],
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
