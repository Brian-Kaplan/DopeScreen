import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView
} from 'react-native';

export default class AccountView extends Component {

  const savedAccounts = [{name: 'name', server: 'server', icon: 'icon'}]

  constructor(props) {
    super(props);
  }

  renderAccounts(name, server, icon){
    console.log(name);
    console.log(server);
    console.log(icon);
  }

  render() {
    const accounts = savedAccounts.map((name, server, icon) => this.renderAccounts(name, server, icon))
    return (
      <ScrollView>
        {accounts}
      </ScrollView>
    );
  }
}
