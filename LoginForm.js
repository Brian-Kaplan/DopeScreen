import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Image,
  Animated,
  Alert,
  TouchableHighlight,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Navigator,
  WebView
} from 'react-native';

import Account from './AccountComponent'


export default class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      colorAnim: new Animated.Value(0),
      logoFadeAnim: new Animated.Value(0),
      logoTransAnim: new Animated.ValueXY(),
      accountsListFadeAnim: new Animated.Value(0),
      addAccountFadeAnim: new Animated.Value(0),
      addAcountFormTransAnim: new Animated.ValueXY(),
      serverFadeAnim: new Animated.Value(0),
      indicatorAnim: new Animated.Value(0),
      formFadeAnim: new Animated.Value(0),
      indicating: false,
      serverPlaceholder: 'Server',
      usernamePlaceholder: 'Username',
      passwordPlaceholder: 'Password',
      formIsEditable: false,
      serverIsEditable: false,
      isAddAccountDisabled: false,
    };
  }

  // Looping animation of the background color
  cycleColorAnimation() {
    Animated.sequence([
      Animated.timing(
        this.state.colorAnim, {
          toValue: 600,
          duration: 30000
      }),
      Animated.timing(
        this.state.colorAnim, {
          toValue: 0,
          duration: 30000
      })
    ]).start(() => {
      this.cycleColorAnimation();
    });
  }

  enableForm() {
    this.setState({formIsEditable: true});
  }

  validateServer() {
    this.setState({indicating: false});
    if (this.state.serverText == 'valid') {
      this.setState({indicating: false})
      Animated.timing(
        this.state.formFadeAnim, {
          toValue: 1,
          duration: 1000
        }
      ).start(() => this.enableForm());
    } else if(this.state.serverText == 'webauth') {
      this.props.onForward()
    }
  }

  animateWorkingIndicator() {
    this.setState({indicating: true})
    Animated.timing(
      this.state.indicatorAnim, {
        toValue: 1,
        duration: 2000
      }).start(() => this.validateServer());
    }

  componentDidMount() {
    Animated.sequence([
      Animated.timing(
        this.state.logoFadeAnim,
        {toValue: 1}
      ),
      Animated.parallel([
        Animated.spring(this.state.logoTransAnim, {
            friction: 4,
            toValue: {x: 0, y: -200}
        }),
        Animated.timing(
          this.state.accountsListFadeAnim, {
            duration: 1000,
            toValue: 1
        }),
        Animated.timing(
          this.state.addAccountFadeAnim, {
            duration: 1000,
            toValue: 1
        })
      ]
    )
    ]).start();
    this.cycleColorAnimation();
  }

  slideInAddAccountForm() {
    Animated.parallel([
      Animated.timing(
        this.state.accountsListFadeAnim, {
          duration: 100,
          toValue: 0
      }),
      Animated.timing(
        this.state.serverFadeAnim, {
          duration: 1000,
          toValue: 1
      }),
      Animated.spring(
        this.state.addAcountFormTransAnim, {
          friction: 4,
          toValue: {x: 0, y: -200}
        }
      )
    ]).start();
  }

  renderLoginForm() {

    var interpolatedColorAnimation = this.state.colorAnim.interpolate({
        inputRange: [0, 100, 200, 300, 400, 500, 600],
        outputRange: [
          'rgba(33, 150, 243, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(156, 39, 176, 1)',
          'rgba(244, 67, 54, 1)',
          'rgba(255, 152, 0, 1)',
          'rgba(255, 235, 59, 1)',
          'rgba(76, 175, 80, 1)']
    });

    let spinner = (this.state.indicating) ? (
      <ActivityIndicator
        color={'white'}
        style={styles.indicator}
        animating={this.state.indicating}
        />
      ) : (
        null
      );

    return (
      <Animated.View style={[styles.container, {backgroundColor: interpolatedColorAnimation}]}>
        <Animated.View style={[styles.appianLogo, { opacity: this.state.logoFadeAnim, transform: this.state.logoTransAnim.getTranslateTransform()}]}>
          <Image
            style={{height: 169, width: 300, resizeMode: 'contain', alignSelf: 'center'}}
            source={require('./Appian_white.png')} />
        </Animated.View>

        <Animated.View style={{height: 200, width: 250, opacity: this.state.accountsListFadeAnim, marginTop: 200}}>
          <ScrollView style={{borderWidth: 2, borderColor: 'white', padding: 10}}>
            <Account style={{marginBottom: 5}}/>
            <Account style={{marginBottom: 5}}/>
            <Account style={{marginBottom: 5}}/>
            <Account style={{marginBottom: 5}}/>
            <Account style={{marginBottom: 5}}/>
          </ScrollView>
        </Animated.View>

        <TouchableHighlight
          underlayColor={null}
          activeOpacity={.75}
          disabled={this.state.isAddAccountDisabled}
          style={styles.addAccountButtonWrapper}
          onPress={() => {
            this.slideInAddAccountForm(),
            this.setState({serverIsEditable: true})
          }}>
            <Animated.View
              style={[
                styles.addAccountButton,
                { opacity: this.state.addAccountFadeAnim }
              ]}>
              <Image
                style={{height: 20, width: 20, marginRight: 10}}
                source={require('./iconmonstr-plus-6-240.png')} />
              <Text
                style={{
                  color: 'white',
                }}>
                  Add an Account
              </Text>
            </Animated.View>
        </TouchableHighlight>

        <Animated.View style={[
          styles.addAccountForm,
          { transform: this.state.addAcountFormTransAnim.getTranslateTransform() }
        ]}>
          <Animated.View
            style={{opacity: this.state.serverFadeAnim}}>
            <View style={styles.serverInputBox}>
              <TextInput
                style={styles.serverInputText}
                onChangeText={(serverText) => this.setState({serverText})}
                value={this.state.serverText}
                editable={this.state.serverIsEditable}
                placeholder={this.state.serverPlaceholder}
                onFocus={() => this.setState({serverPlaceholder: ''})}
                onEndEditing={() => this.setState({serverPlaceholder: 'Server'})}
                autoCorrect={false}
                autoCapitalize={'none'}
                placeholderTextColor={'#ffffff'}
                underlineColorAndroid={'rgba(0,0,0,0)'}
                onSubmitEditing={(event) => (
                  this.animateWorkingIndicator()
                )}/>
                {spinner}
            </View>
          </Animated.View>

          <Animated.View style={{opacity: this.state.formFadeAnim}}>
            <TextInput
              style={styles.textInput}
              onChangeText={(usernameText) => this.setState({usernameText})}
              value={this.state.usernameText}
              autoCapitalize={'none'}
              autoCorrect={false}
              editable={this.state.formIsEditable}
              placeholder={this.state.usernamePlaceholder}
              onFocus={() => this.setState({usernamePlaceholder: ''})}
              onEndEditing={() => this.setState({usernamePlaceholder: 'Username'})}
              placeholderTextColor={'#ffffff'}
              underlineColorAndroid={'rgba(0,0,0,0)'}/>

           <TextInput
              style={styles.textInput}
              onChangeText={(passwordText) => this.setState({passwordText})}
              value={this.state.passwordText}
              placeholder={this.state.passwordPlaceholder}
              onFocus={() => this.setState({passwordPlaceholder: ''})}
              onEndEditing={() => this.setState({passwordPlaceholder: 'Password'})}
              secureTextEntry={true}
              editable={this.state.formIsEditable}
              placeholderTextColor={'#ffffff'}
              underlineColorAndroid={'rgba(0,0,0,0)'}/>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    )
  }

  render() {
    return (
      this.renderLoginForm()
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  appianLogo: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  addAccountButtonWrapper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: 500,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  addAccountButton: {
    height: 40,
    width: 250,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addAccountForm: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0
  },
  serverInputBox: {
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
  },
  serverInputText: {
    marginLeft: 25,
    height: 40,
    width: 250,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
    textAlign: 'center',
    color: '#ffffff'
  },
  textInput: {
    height: 40,
    width: 250,
    color: '#ffffff',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
    textAlign: 'center'
  },
  submitButton: {
    marginTop: 25,
    width: 100,
    height: 40,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  submitText: {
    color: '#999',
    alignSelf: 'center'
  },
  indicator: {
    marginLeft: 10
  }
});

LoginForm.propTypes = {
  onForward: PropTypes.func.isRequired,
}
