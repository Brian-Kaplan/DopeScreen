import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Animated,
  TouchableHighlight,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';

import Account from './AccountComponent'

export default class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      spinAnim: new Animated.Value(0),
      colorAnim: new Animated.Value(0),
      logoFadeAnim: new Animated.Value(0),
      formFadeAnim: new Animated.Value(0),
      indicatorAnim: new Animated.Value(0),
      bottomTextAnim: new Animated.Value(1),
      serverFadeAnim: new Animated.Value(0),
      logoTransAnim: new Animated.ValueXY(),
      addAccountFadeAnim: new Animated.Value(0),
      accountsListFadeAnim: new Animated.Value(0),
      addAcountFormTransAnim: new Animated.ValueXY(),
      indicating: false,
      formIsEditable: false,
      serverIsEditable: false,
      usernameIsEditable: false,
      passwordIsEditable: false,
      isAddAccountDisabled: false,
      isAddAccountFormShowing: false,
      bottomButtonText: 'ADD ACCOUNT'
    };
  }

  // Looping animation of the background color
  cycleColorAnimation() {
    Animated.timing(
    this.state.colorAnim, {
      toValue: 1150,
      duration: 60000
    }).start(() => {
      this.setState({colorAnim: new Animated.Value(0)});
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

  slideInAccountsList() {
    this.setState({isAddAccountFormShowing: false})
    Animated.parallel([
      Animated.timing(
        this.state.accountsListFadeAnim, {
          duration: 1000,
          toValue: 1
      }),
      Animated.timing(
        this.state.serverFadeAnim, {
          duration: 100,
          toValue: 0
      }),
      Animated.timing(
        this.state.formFadeAnim, {
          toValue: 0,
          duration: 100
      }),
      Animated.spring(
        this.state.addAcountFormTransAnim, {
          friction: 4,
          toValue: {x: 0, y: 0}
      }),
      Animated.timing(
        this.state.spinAnim, {
          toValue: 0,
          duration: 1000
      })
    ]).start();

    Animated.timing(
      this.state.bottomTextAnim, {
        toValue: 0,
        duration: 300
    }).start(() => {
      this.setState({bottomButtonText: 'ADD ACCOUNT'});
      Animated.timing(
        this.state.bottomTextAnim, {
          toValue: 1,
          duration: 300
        }).start()
    })
  }

  slideInAddAccountForm() {
    this.setState({isAddAccountFormShowing: true})
    Animated.parallel([
      Animated.timing(
        this.state.accountsListFadeAnim, {
          duration: 300,
          toValue: 0
      }),
      Animated.timing(
        this.state.serverFadeAnim, {
          duration: 1000,
          toValue: 1
      }),
      Animated.spring(
        this.state.addAcountFormTransAnim, {
          friction: 6,
          toValue: {x: 0, y: -250}
      }),
      Animated.timing(
        this.state.spinAnim, {
          toValue: 1,
          duration: 1000
      })
    ]).start();

    Animated.timing(
      this.state.bottomTextAnim, {
        toValue: 0,
        duration: 300
    }).start(() => {
      this.setState({bottomButtonText: 'CANCEL'});
      Animated.timing(
        this.state.bottomTextAnim, {
          toValue: 1,
          duration: 300
        }).start()
    })
  }

  renderLoginForm() {

    const staticStrings = {
        serverPlaceholder: 'example.com',
        usernamePlaceholder: 'Username',
        passwordPlaceholder: 'Password'
      };

    var interpolatedColorAnimation = this.state.colorAnim.interpolate({
        inputRange: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1150],
        outputRange: [
          'rgba(226, 32, 45, 1)', // Red
          'rgba(63, 167, 206, 1)', // Light Blue
          'rgba(76, 175, 80, 1)', // Green
          'rgba(28, 59, 99, 1)', // Less dark blue
          'rgba(15, 32, 58, 1)', //Dark Blue
          'rgba(158, 126, 202, 1)', // Purple
          'rgba(226, 32, 45, 1)', // Red
          'rgba(63, 167, 206, 1)', // Light Blue
          'rgba(76, 175, 80, 1)', // Green
          'rgba(28, 59, 99, 1)', // Less dark blue
          'rgba(15, 32, 58, 1)', //Dark Blue
          'rgba(158, 126, 202, 1)', // Purple
          'rgba(226, 32, 45, 1)'] // Red
    });

    var spinCancelButtonInterpolation = this.state.spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '315deg']
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

    const { width } = Dimensions.get('window');
    const refCallback = (node) => this.scrollRef = node;

    return (
      <Animated.View style={[styles.container, {backgroundColor: interpolatedColorAnimation}]}>
        <ScrollView
          ref={refCallback}
          centerContent={true}
          // scrollEnabled={this.state.isAddAccountFormShowing}
          contentContainerStyle={{height: 750, width: width }}
          showsVerticalScrollIndicator={false}>

          {/* Appian Logo */}
          <Animated.View style={[styles.appianLogo, { opacity: this.state.logoFadeAnim, transform: this.state.logoTransAnim.getTranslateTransform()}]}>
            <Image
              style={{height: 169, width: 300, resizeMode: 'contain', alignSelf: 'center'}}
              source={require('./Appian_white.png')} />
          </Animated.View>

          {/* Accounts List */}
          <Animated.View
            style={{
              borderColor: 'white',
              borderRadius: 5,
              borderWidth: 2,
              height: 250,
              alignSelf: 'center',
              width: 300,
              opacity: this.state.accountsListFadeAnim,
              marginTop: 200}}>
            <ScrollView
              horizontal={true}>
              <ScrollView
                contentContainerStyle={{margin: 10}}>
                <Account
                  domain={"https://home.appian.com/suite/tempo/tasks/assignedtome"}
                  style={{marginBottom: 5}}/>
                <Account
                  domain={"https://daily.appianci.net/suite/sites/aw17-integration-demos"}
                  style={{marginBottom: 5}}/>
                <Account
                  domain={"https://daily.appianci.net/suite/sites/buttoncolumns"}
                  style={{marginBottom: 5}}/>
                <Account
                  domain={"https://daily.appianci.net/suite/sites/buttoncolumns"}
                  style={{marginBottom: 5}}/>
                <Account
                  domain={"https://daily.appianci.net/suite/sites/buttoncolumns"}
                  style={{marginBottom: 5}}/>
              </ScrollView>
            </ScrollView>
          </Animated.View>

          {/* Add Account Form */}
            <Animated.View
              style={[ styles.addAccountForm, {transform: this.state.addAcountFormTransAnim.getTranslateTransform()}]}>
                <Animated.View
                  style={{opacity: this.state.serverFadeAnim}}>
                  <View style={styles.serverRow}>
                    <View style={styles.serverInputBox}>
                      <Text style={{paddingLeft: 10, paddingRight: 1, color: 'white', fontStyle: 'italic'}}>https://</Text>
                      <TextInput
                        style={styles.serverInputText}
                        onChangeText={(serverText) => this.setState({serverText: serverText})}
                        value={this.state.serverText}
                        editable={this.state.serverIsEditable}
                        placeholder={staticStrings.serverPlaceholder}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        placeholderTextColor={'#ffffff'}
                        underlineColorAndroid={'rgba(0,0,0,0)'}
                        onSubmitEditing={(event) => (
                          this.animateWorkingIndicator()
                        )}/>
                    </View>
                      {spinner}
                  </View>

                  <TextInput
                    style={styles.textInput }
                    onChangeText={(usernameText) => this.setState({usernameText})}
                    value={this.state.usernameText}
                    editable={this.state.usernameIsEditable}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    placeholder={staticStrings.usernamePlaceholder}
                    placeholderTextColor={'#ffffff'}
                    underlineColorAndroid={'rgba(0,0,0,0)'}/>

                   <TextInput
                      style={styles.textInput}
                      onChangeText={(passwordText) => this.setState({passwordText})}
                      value={this.state.passwordText}
                      editable={this.state.passwordIsEditable}
                      placeholder={staticStrings.passwordPlaceholder}
                      secureTextEntry={true}
                      placeholderTextColor={'#ffffff'}
                      underlineColorAndroid={'rgba(0,0,0,0)'}/>
                </Animated.View>
            </Animated.View>

          {/* Add Account Button */}
          <TouchableHighlight
            underlayColor={null}
            activeOpacity={.6}
            disabled={this.state.isAddAccountDisabled}
            style={styles.addAccountButtonWrapper}
            onPress={() => {
              if (this.state.isAddAccountFormShowing) {
                this.slideInAccountsList();
                this.setState({
                  serverIsEditable: false,
                  usernameIsEditable: false,
                  passwordIsEditable: false}
                );
                this.scrollRef.scrollTo({x: 0, y: 0, animated: true});
              } else {
                this.slideInAddAccountForm();
                this.setState({
                  serverIsEditable: true,
                  usernameIsEditable: true,
                  passwordIsEditable: true}
                );
              }}}>
              <Animated.View
                style={[styles.addAccountButton, {opacity: this.state.addAccountFadeAnim}]}>
                <Animated.Image
                  style={{height: 20, width: 20, transform: [{rotate: spinCancelButtonInterpolation}] }}
                  source={require('./iconmonstr-plus-6-240.png')} />
                  <View style={{width: 150, justifyContent: 'center', alignItems: 'center'}}>
                    <Animated.Text
                      style={{fontWeight: '600', fontSize: 14, color: 'white', opacity: this.state.bottomTextAnim}}>
                        {this.state.bottomButtonText}
                    </Animated.Text>
                  </View>
              </Animated.View>
          </TouchableHighlight>
        </ScrollView>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 0,
    marginBottom: 100,
    ...StyleSheet.absoluteFillObject
  },
  addAccountButtonWrapper: {
    zIndex: 1,
    marginTop: 500,
    height: 40,
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject
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
  serverRow: {
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
  },
  serverInputBox: {
    marginLeft: 25,
    flexDirection: 'row',
    height: 40,
    width: 250,
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1
  },
  serverInputText: {
    fontSize: 14,
    height: 40,
    width: 190,
    marginRight: 100,
    textAlign: 'left',
    fontStyle: 'italic',
    color: '#ffffff'
  },
  textInput: {
    height: 40,
    width: 250,
    color: '#ffffff',
    borderColor: 'white',
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 20,
    textAlign: 'left',
    fontStyle: 'italic',
    paddingLeft: 10,
    fontSize: 14
  },
  indicator: {
    marginLeft: 10
  }
});

LoginForm.propTypes = {
  onForward: PropTypes.func.isRequired,
}
