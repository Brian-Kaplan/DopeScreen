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
        <View style={{flexDirection: 'row'}}>
          <Image
              style={styles.icon}
              source={require('./brian_kaplan_180.jpg')}/>
          <View style={{marginLeft: 20, flexDirection: 'column'}}>
            <Text style={{color: 'white'}}>brian.kaplan</Text>
            <Text style={{color: 'white'}}>https://daily.appianci.net</Text>
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
    height: 40,
     width: 40,
     resizeMode: 'contain',
     alignSelf: 'center',
     borderRadius: 20,
     borderColor: 'white',
     borderWidth: 1
  },
  serverText: {

  },
  usernameText: {

  }
})
