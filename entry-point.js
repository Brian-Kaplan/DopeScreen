import React, { Component, PropTypes} from 'react'
import { AppRegistry, View, Text, Navigator, TouchableHighlight, BackAndroid, Platform } from 'react-native'
import LoginForm from './LoginForm'
import WebAuth from './WebAuth'

export default class DopeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navBarOpacity: 0
    };
  }

  setNavBarOpacity(value) {
    this.setState({
      navBarOpacity: Platform.OS === 'ios' ? value : 0
    })
  }

  renderScene(route, navigator) {
    this.navigator = navigator;
    if (route.index == 0) {
      return (
        <LoginForm
          // Function to call when a new scene should be displayed
          onForward={() => {
            navigator.push({
              title: 'Web Auth View',
              index: 1
            })
            this.setNavBarOpacity(1)
          }}
        />
      )
    } else if (route.index == 1) {
      return (
        <WebAuth/>
      )
    }
  }

  render() {
    const routes = [
      {title: 'Login Form', index: 0},
      {title: 'Web Auth View', index: 1}
    ];

    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.navigator.getCurrentRoutes().length === 1  ) {
         return false;
      }
      this.navigator.pop();
      return true;
    });
    return (
      <Navigator
        initialRoute={routes[0]}
        renderScene={(route, navigator) => this.renderScene(route, navigator)}
        navigationBar={
         <Navigator.NavigationBar
           routeMapper={{
             LeftButton: (route, navigator, index, navState) =>
              {
              return (
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <TouchableHighlight onPress={() => {
                  this.setNavBarOpacity(0)
                  navigator.pop()
                }}>
                  <Text>Back</Text>
                </TouchableHighlight>
                </View>
              );
            },
             RightButton: (route, navigator, index, navState) =>
               { return null; },
             Title: (route, navigator, index, navState) =>
               { return null; },
           }}
           style={{
             backgroundColor: 'white',
             opacity: this.state.navBarOpacity
           }}/>
       }/>
    )
  }
}

AppRegistry.registerComponent('DopeScreen', () => DopeScreen);
