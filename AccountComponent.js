import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  Animated,
  Alert,
  View,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import styles from './AccountComponentStyleSheet';
import Modal from 'react-native-modal'

export default class Account extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedForDeletion: false
    }
  }

  getSide(isBulkDeleteMode) {
    if (!isBulkDeleteMode) {
      return (
        <Animated.Image
            style={styles.icon}
            source={require('./brian_kaplan_180.jpg')}/>
      );
    }
    const exInCircle = this.state.selectedForDeletion ? <Text style={{alignSelf: 'center', marginTop: 10, color: 'white', fontSize: 25}}>X</Text> : null;

    return (
      <TouchableOpacity
        style={styles.icon}
        activeOpacity={.6}
        onPress={() => {
          this.setState({selectedForDeletion: !this.state.selectedForDeletion});
        }}>
        {exInCircle}
      </TouchableOpacity>
    );
  }

  render() {

    const flipImage = this.getSide(this.props.isBulkDeleteMode)

    return (
      <Animated.View style={this.props.style}>

        <Modal
          style={styles.modal}
            backdropOpacity={.6}
            animationInTiming={500}
            animationOutTiming={500}
            isVisible={this.state.modalVisible}>

          {/* Floating Circular Account Image */}
          <Image
              style={{
                alignItems: 'center',
                marginTop: 20,
                marginLeft: 100,
                zIndex: 1,
                height: 100,
                width: 100,
                borderRadius: 50,
                borderColor: 'white',
                borderWidth: 1,
                overflow: 'hidden',
                ...StyleSheet.absoluteFillObject,
              }}
              source={require('./brian_kaplan_180.jpg')}/>

          {/* The upper part of the view used to make the circular image look like its floating */}
          <View style={{flex: .25, backgroundColor: 'transparent'}}/>

          {/* The lower part of the view used to make the cirular image look like its floating */}
          <View style={{
            flex: .75,
            borderRadius: 5,
            borderWidth: 2,
            borderColor: 'white',
            backgroundColor: 'white',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}>
            <View style={{marginTop: 75, alignItems: 'center', paddingLeft: 5, paddingRight: 5}}>
              <Text
                style={{fontWeight: 'bold', color: 'black'}}>
                brian.kaplan
              </Text>

              <ScrollView
                horizontal={true}>
                <Text
                  numberOfLines={1}
                  style={{marginTop: 10, color: 'black'}}>
                  https://home.appian.com/suite/tempo/tasks/assignedtome
                </Text>
              </ScrollView>
              <TouchableOpacity style={{marginTop: 0}} onPress={() => {
                this.setState({modalVisible: false});
              }}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
      </Modal>


        <TouchableOpacity
          activeOpacity={.6}
          onLongPress={() => {
            this.setState({modalVisible: true});
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Animated.View style={this.props.spinAnimTransform}>
              {flipImage}
            </Animated.View>
            <View style={{marginLeft: 5, flexDirection: 'column'}}>
              <Text style={{color: 'white'}}>brian.kaplan</Text>
              <Text
                style={{color: 'white', width: 230}}
                ellipsizeMode={'middle'}
                numberOfLines={1}>
                {this.props.domain}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
