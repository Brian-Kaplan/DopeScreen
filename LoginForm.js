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
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';

import Account from './AccountComponent'

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
      backgroundColorAnim: new Animated.Value(0),
      accountsListFadeAnim: new Animated.Value(0),
      workingIndicatorAnim: new Animated.Value(0),
      addAcountFormTransAnim: new Animated.ValueXY(),
      bulkDeleteSpinYAnim: new Animated.Value(0),
      addAccountButtonFadeAnim: new Animated.Value(0),
      spinnerIsIndicating: false,
      formIsEditable: false,
      serverIsEditable: false,
      usernameIsEditable: false,
      passwordIsEditable: false,
      isAddAccountDisabled: false,
      isBulkDeleteMode: false,
      isAddAccountFormShowing: false,
      bottomButtonText: 'ADD ACCOUNT'
    };
  }

  // Looping animation of the background color
  cycleColorAnimation() {
    Animated.timing(
    this.state.backgroundColorAnim, {
      toValue: 1150,
      duration: 60000
    }).start(() => {
      this.setState({backgroundColorAnim: new Animated.Value(0)});
      this.cycleColorAnimation();
      });
  }

  // TODO do something here with the auth
  validateServer() {
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
    //Start the background color animation cycle
    this.cycleColorAnimation();

    // Animation sequence for fading the logo, button, and accounts list
    Animated.sequence([
      // Fade in the logo
      Animated.timing(this.state.logoFadeAnim, {
          toValue: 1
        }
      ),
      Animated.parallel([
        // transalte the logo vertically
        Animated.spring(this.state.logoTransAnim, {
            friction: 4,
            toValue: {x: 0, y: -200}
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
      ]
    )
    ]).start();
  }

  slideInAccountsList() {
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
          friction: 4,
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

  slideInAddAccountForm() {
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
          friction: 6,
          toValue: {x: 0, y: -250}
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
    const staticStrings = {
        serverPlaceholder: 'example.com',
        usernamePlaceholder: 'Username',
        passwordPlaceholder: 'Password'
      };

    var interpolatedColorAnimation = this.state.backgroundColorAnim.interpolate({
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

    var spinCancelButtonInterpolation = this.state.buttonIconSpinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '315deg']
    });

    var bulkDeleteSpinInterpolation = this.state.bulkDeleteSpinYAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    });

    let spinner = (this.state.spinnerIsIndicating) ? (
      <ActivityIndicator
        color={'white'}
        style={styles.indicator}
        animating={this.state.spinnerIsIndicating}
        />
      ) : (
        null
      );

    const { width } = Dimensions.get('window');
    const outerScrollRefCallback = (node) => this.outerScrollRef = node;
    const innerVerticalScrollRef = (node) => this.innerVerticalRef = node;

    return (
      <Animated.View style={[styles.container, {backgroundColor: interpolatedColorAnimation}]}>
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
            <ScrollView
              ref={innerVerticalScrollRef}
              scrollEnabled={!this.state.isAddAccountFormShowing}
              contentContainerStyle={{margin: 10}}>
              <Account
                domain={"https://home.appian.com/suite/tempo/tasks/assignedtome"}
                style={{marginBottom: 5}}
                isBulkDeleteMode={this.state.isBulkDeleteMode}
                spinAnimTransform={{transform: [{rotateY: bulkDeleteSpinInterpolation}]}}/>
              <Account
                domain={"https://daily.appianci.net/suite/sites/aw17-integration-demos"}
                style={{marginBottom: 5}}
                isBulkDeleteMode={this.state.isBulkDeleteMode}
                spinAnimTransform={{transform: [{rotateY: bulkDeleteSpinInterpolation}]}}/>
              <Account
                domain={"https://daily.appianci.net/suite/sites/buttoncolumns"}
                style={{marginBottom: 5}}
                isBulkDeleteMode={this.state.isBulkDeleteMode}
                spinAnimTransform={{transform: [{rotateY: bulkDeleteSpinInterpolation}]}}/>
              <Account
                domain={"https://daily.appianci.net/suite/sites/buttoncolumns"}
                style={{marginBottom: 5}}
                isBulkDeleteMode={this.state.isBulkDeleteMode}
                spinAnimTransform={{transform: [{rotateY: bulkDeleteSpinInterpolation}]}}/>
              <Account
                domain={"https://daily.appianci.net/suite/sites/buttoncolumns"}
                style={{marginBottom: 5}}
                isBulkDeleteMode={this.state.isBulkDeleteMode}
                spinAnimTransform={{transform: [{rotateY: bulkDeleteSpinInterpolation}]}}/>
            </ScrollView>
          </Animated.View>

          {/* Add Account Form */}
            <Animated.View
              style={[ styles.addAccountForm, {
                opacity: this.state.addAccountFormFadeAnim,
                transform: this.state.addAcountFormTransAnim.getTranslateTransform()
              }]}>
                <View style={styles.serverRow}>
                  <View style={styles.serverInputBox}>
                    <Text style={styles.httpText}>https://</Text>
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

                  this.slideInAccountsList();
                  this.setState({
                    serverIsEditable: false,
                    usernameIsEditable: false,
                    passwordIsEditable: false}
                  );
                } else {
                  this.slideInAddAccountForm();
                  this.setState({
                    serverIsEditable: true,
                    usernameIsEditable: true,
                    passwordIsEditable: true}
                  );
                }}}>

                <Animated.View
                  style={[styles.addAccountButton, {opacity: this.state.addAccountButtonFadeAnim}]}>
                  <Animated.Image
                    style={{height: 20, width: 20, transform: [{rotate: spinCancelButtonInterpolation}] }}
                    source={require('./iconmonstr-plus-6-240.png')} />
                    <Animated.Text
                      style={[styles.addAccountButtonText, {opacity: this.state.buttonTextFadeAnim}]}>
                        {this.state.bottomButtonText}
                    </Animated.Text>
                </Animated.View>
            </TouchableHighlight>
          </View>

          {/* Edit Accounts Button */}
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            activeOpacity={.6}
            onPress={() => {
              Animated.timing(this.state.bulkDeleteSpinYAnim, {
                  toValue: .5,
                  duration: 250
              }).start(() => {
                this.setState({isBulkDeleteMode: !this.state.isBulkDeleteMode});
                Animated.timing(this.state.bulkDeleteSpinYAnim, {
                    toValue: this.state.isBulkDeleteMode ? 1 : 0,
                    duration: 250
                }).start();
              })
            }}>
            <Animated.Text style={{color: 'white', opacity: this.state.accountsListFadeAnim}}>Edit Accounts</Animated.Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
    ...StyleSheet.absoluteFillObject
  },
  logo: {
    height: 169,
    width: 300,
    resizeMode: 'contain',
  },
  addAccountButtonWrapper: {
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
  addAccountButtonText: {
    width: 150,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
    color: 'white'
  },
  addAccountForm: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0
  },
  accountsList: {
    borderColor: 'white',
    borderRadius: 5,
    borderWidth: 2,
    height: 250,
    alignSelf: 'center',
    width: 300,
    marginTop: 200,
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
  },
  httpText: {
    paddingLeft: 10,
    paddingRight: 1,
    color: 'white',
    fontStyle: 'italic'
  }
});

LoginForm.propTypes = {
  onForward: PropTypes.func.isRequired,
}
