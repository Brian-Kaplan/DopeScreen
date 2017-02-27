import React, { Component, PropTypes } from 'react';
import { WebView } from 'react-native'

export default class WebAuth extends Component {
  render() {
    console.log('render of webauth');
    return (
      <WebView
        source={{uri: 'https://daily.appianci.net'}}
      />
    );
  }
}
