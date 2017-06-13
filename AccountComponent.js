import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity
} from 'react-native';
import styles from './AccountComponentStyleSheet';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Account extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedForDeletion: false
    }
  }

  getIcon() {
    if (!this.props.isBulkDeleteMode) {
      return (
        <Icon style={styles.icon} name="sign-in" size={30} color='white' />
      );
    }
    return (
      <Icon style={styles.icon} name="close" size={30} color='white' />
    );
  }

  render() {
    const icon = this.getIcon();
    return (
        <TouchableOpacity
          activeOpacity={.6}>
          <View style={styles.accountContainer}>
            <Image
                style={styles.accountImage}
                source={require('./brian_kaplan_180.jpg')}/>
            <View style={styles.accountTextContainer}>
              <Text style={styles.usernameText}>brian.kaplan</Text>
              <Text
                style={styles.domainText}
                ellipsizeMode={'middle'}
                numberOfLines={1}>
                {this.props.domain}
              </Text>
            </View>
            {icon}
          </View>
        </TouchableOpacity>
    );
  }
}
