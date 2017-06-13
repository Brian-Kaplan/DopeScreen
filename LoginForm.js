import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  Text,
  TextInput,
  View,
  Image,
  Animated,
  Switch,
  TouchableHighlight,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import Account from './AccountComponent'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './LoginFormStyleSheet';
import animationConstants from './AnimationConstants'

export default class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logoFadeAnim: new Animated.Value(0),
      formFadeAnim: new Animated.Value(0),
      addAccountFormFadeAnim: new Animated.Value(0),
      logoTransAnim: new Animated.ValueXY(),
      buttonIconSpinAnim: new Animated.Value(0),
      buttonTextFadeAnim: new Animated.Value(1),
      accountsListFadeAnim: new Animated.Value(0),
      workingIndicatorAnim: new Animated.Value(0),
      addAcountFormTransAnim: new Animated.ValueXY(),
      addAccountButtonFadeAnim: new Animated.Value(0),
      spinnerIsIndicating: false,
      addAccountFormIsEditable: false,
      isAddAccountDisabled: false,
      isBulkDeleteMode: false,
      isAddAccountFormShowing: false,
      bottomButtonText: 'ADD ACCOUNT'
    };
  }

  validateServer() {
    if (true) {
      this.setState({serverValidationColor: 'red'});
    }
    this.setState({spinnerIsIndicating: false});
  }

  animateWorkingIndicator() {
    this.setState({spinnerIsIndicating: true})
    Animated.timing(
      this.state.workingIndicatorAnim, {
        toValue: 1,
        duration: 2000
      }).start(() => this.validateServer());
    }

  componentDidMount() {
    // Animation sequence for fading the logo, addAccountButton, and the accounts list
    Animated.sequence([
      // Fade in the logo
      Animated.timing(this.state.logoFadeAnim, {
          toValue: 1
        }
      ),
      Animated.parallel([
        // transalte the logo vertically
        Animated.spring(this.state.logoTransAnim, {
            friction: 6,
            toValue: {x: 0, y: -275}
        }),
        // fade in the accounts list
        Animated.timing(this.state.accountsListFadeAnim, {
            duration: 1000,
            toValue: 1
        }),
        // fade in the add account button
        Animated.timing(this.state.addAccountButtonFadeAnim, {
            duration: 1000,
            toValue: 1
        })
      ])
    ]).start();
  }

  showAccountsList() {
    this.setState({isAddAccountFormShowing: false})
    Animated.parallel([
      Animated.timing(this.state.accountsListFadeAnim, {
          duration: 1000,
          toValue: 1
      }),
      Animated.timing(this.state.addAccountFormFadeAnim, {
          duration: 100,
          toValue: 0
      }),
      Animated.spring(this.state.addAcountFormTransAnim, {
          friction: 5,
          toValue: {x: 0, y: 0}
      }),
      Animated.timing(this.state.buttonIconSpinAnim, {
          toValue: 0,
          duration: 1000
      })
    ]).start();

    Animated.timing(
      this.state.buttonTextFadeAnim, {
        toValue: 0,
        duration: 300
    }).start(() => {
      this.setState({bottomButtonText: 'ADD ACCOUNT'});
      Animated.timing(
        this.state.buttonTextFadeAnim, {
          toValue: 1,
          duration: 300
        }).start()
    })
  }

  showAddAccountForm() {
    this.setState({isAddAccountFormShowing: true})
    Animated.parallel([
      Animated.timing(
        this.state.accountsListFadeAnim, {
          duration: 300,
          toValue: 0
      }),
      Animated.timing(
        this.state.addAccountFormFadeAnim, {
          duration: 1000,
          toValue: 1
      }),
      Animated.spring(
        this.state.addAcountFormTransAnim, {
          friction: 5,
          toValue: {x: 0, y: animationConstants.addAccountFormTransPosition}
      }),
      Animated.timing(
        this.state.buttonIconSpinAnim, {
          toValue: 1,
          duration: 1000
      })
    ]).start();

    Animated.timing(
      this.state.buttonTextFadeAnim, {
        toValue: 0,
        duration: 300
    }).start(() => {
      this.setState({bottomButtonText: 'CANCEL'});
      Animated.timing(
        this.state.buttonTextFadeAnim, {
          toValue: 1,
          duration: 300
        }).start()
    })
  }

  render() {

    var spinCancelButtonInterpolation = this.state.buttonIconSpinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '225deg']
    });

    let spinner = this.state.spinnerIsIndicating ?
      <ActivityIndicator
        color={'white'}
        style={styles.indicator}
        animating={this.state.spinnerIsIndicating}
        /> : null;

    const { width } = Dimensions.get('window');
    const outerScrollRefCallback = (node) => this.outerScrollRef = node;
    const innerVerticalScrollRef = (node) => this.innerVerticalRef = node;

    return (
      <Image
        style={styles.background}
        source={require('./background.jpg')}>

          {/* Outer ScrollView is only scrollable when the addAccountForm is showing */}
          <ScrollView
            ref={outerScrollRefCallback}
            centerContent={true}
            scrollEnabled={this.state.isAddAccountFormShowing}
            contentContainerStyle={{height: 750, width: width }}
            showsVerticalScrollIndicator={false}>

            {/* Appian Logo */}
            <Animated.View style={[styles.logoContainer, {
              opacity: this.state.logoFadeAnim,
              transform: this.state.logoTransAnim.getTranslateTransform()
            }]}>
              <Image
                style={styles.logo}
                source={require('./Appian_white.png')} />
            </Animated.View>

            {/* Accounts List */}
            <Animated.View
              style={[styles.accountsList, {opacity: this.state.accountsListFadeAnim}]}>
              <TouchableOpacity style={styles.editAccountsButtonContainer} onPress={() => {
                this.setState({isBulkDeleteMode: !this.state.isBulkDeleteMode});
              }}>
                <Text style={styles.editAccountsButton}>EDIT</Text>
              </TouchableOpacity>
              <ScrollView
                ref={innerVerticalScrollRef}
                scrollEnabled={!this.state.isAddAccountFormShowing}>
                <View style={styles.accountsListDivider}/>
                <Account
                  domain={"home.appian.com"}
                  isBulkDeleteMode={this.state.isBulkDeleteMode}/>
                <View style={styles.accountsListDivider}/>
                <Account
                  domain={"daily.appianci.net"}
                  isBulkDeleteMode={this.state.isBulkDeleteMode}/>
                <View style={styles.accountsListDivider}/>
                <Account
                  domain={"daily.appianci.net"}
                  isBulkDeleteMode={this.state.isBulkDeleteMode}/>
                <View style={styles.accountsListDivider}/>
                <Account
                  domain={"daily.appianci.net"}
                  isBulkDeleteMode={this.state.isBulkDeleteMode}/>
                <View style={styles.accountsListDivider}/>
                <Account
                  domain={"daily.appianci.net"}
                  isBulkDeleteMode={this.state.isBulkDeleteMode}/>
                <View style={styles.accountsListDivider}/>
              </ScrollView>
            </Animated.View>

            {/* Add Account Form */}
              <Animated.View
                style={[ styles.addAccountForm, {
                  opacity: this.state.addAccountFormFadeAnim,
                  transform: this.state.addAcountFormTransAnim.getTranslateTransform()
                }]}>
                  <View style={styles.serverRowContainer}>
                  <View style={[styles.textInputContainer, {borderColor: this.state.serverValidationColor || 'white'}]}>
                    <Text style={styles.textInputLabel}>SERVER ADDRESS</Text>
                    <View style={styles.serverRow}>
                      <Text style={styles.httpText}>https://</Text>
                      <TextInput
                        style={styles.serverInputText}
                        onChangeText={(serverText) => this.setState({serverText: serverText})}
                        value={this.state.serverText}
                        editable={this.state.addAccountFormIsEditable}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        underlineColorAndroid={'rgba(0,0,0,0)'}
                        onSubmitEditing={(event) => (
                          this.animateWorkingIndicator()
                        )}/>
                    </View>
                  </View>
                  {spinner}
                  </View>

                  <View style={styles.textInputContainer}>
                    <Text style={styles.textInputLabel}>USERNAME</Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={(usernameText) => this.setState({usernameText})}
                      value={this.state.usernameText}
                      editable={this.state.addAccountFormIsEditable}
                      autoCapitalize={'none'}
                      autoCorrect={false}
                      underlineColorAndroid={'rgba(0,0,0,0)'}/>
                  </View>

                  <View style={styles.textInputContainer}>
                  <Text style={styles.textInputLabel}>PASSWORD</Text>
                   <TextInput
                      style={styles.textInput}
                      onChangeText={(passwordText) => this.setState({passwordText})}
                      value={this.state.passwordText}
                      editable={this.state.addAccountFormIsEditable}
                      secureTextEntry={true}
                      underlineColorAndroid={'rgba(0,0,0,0)'}/>
                </View>
                <View style={styles.rememberMeRowContainer}>
                  <Text style={styles.rememberMeButton}>Remember Me</Text>
                  <Switch
                    thumbTintColor={'white'}
                    onTintColor={'#2F95C5'}
                    value={this.state.rememberMe}
                    onValueChange={(value) => this.setState({rememberMe: value})}
                      />
                </View>
              </Animated.View>

            {/* Add Account Button */}
            <View style={styles.addAccountButtonWrapper}>
              <TouchableHighlight
                underlayColor={null}
                activeOpacity={.6}
                disabled={this.state.isAddAccountDisabled}
                onPress={() => {
                  //Switch the state to either the accounts list or the add account form
                  if (this.state.isAddAccountFormShowing) {
                    //Reset the position of the accounts list scrollviews
                    this.outerScrollRef.scrollTo({x: 0, y: 0, animated: true});
                    this.innerVerticalRef.scrollTo({x: 0, y: 0, animated: false});
                    this.showAccountsList();
                    this.setState({addAccountFormIsEditable: false});
                  } else {
                    this.showAddAccountForm();
                    this.setState({addAccountFormIsEditable: true});
                  }}}>

                  <Animated.View
                    style={[styles.addAccountButton, {opacity: this.state.addAccountButtonFadeAnim}]}>
                    <Animated.View
                      style={{transform: [{rotate: spinCancelButtonInterpolation}] }}>
                      <Icon name="plus" size={30} color='white' />
                    </Animated.View>
                      <Animated.Text
                        style={[styles.addAccountButtonText, {opacity: this.state.buttonTextFadeAnim}]}>
                          {this.state.bottomButtonText}
                      </Animated.Text>
                  </Animated.View>
              </TouchableHighlight>
            </View>
          </ScrollView>
      </Image>
    )
  }
}

LoginForm.propTypes = {
  onForward: PropTypes.func.isRequired,
}
