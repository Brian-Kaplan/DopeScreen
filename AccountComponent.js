import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  Animated,
  View
} from 'react-native';

export default class Account extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Animated.View style={this.props.style}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
              style={styles.icon}
              overflow={'hidden'}
              source={require('./brian_kaplan_180.jpg')}/>
          <View style={{marginLeft: 5, flexDirection: 'column'}}>
            <Text style={{color: 'white'}}>brian.kaplan</Text>
            <Text
              style={{color: 'white'}}
              ellipsizeMode={'tail'}
              numberOfLines={1}>
              https://daily.appianci.netadasdasdadaads
            </Text>
          </View>
      </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  icon: {
     height: 50,
     width: 50,
     resizeMode: 'contain',
     alignSelf: 'center',
     borderRadius: 25,
     borderColor: 'white',
     borderWidth: 1
  }
})
