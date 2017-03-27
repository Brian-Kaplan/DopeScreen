import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  Animated,
  View
} from 'react-native';
import styles from './AccountComponentStyleSheet';


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
              ellipsizeMode={'middle'}
              numberOfLines={1}>
              {this.props.domain}
            </Text>
          </View>
      </View>
      </Animated.View>
    );
  }
}
