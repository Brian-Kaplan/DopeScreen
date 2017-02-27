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

export default class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logoFadeAnim: new Animated.Value(0),
      serverFadeAnim: new Animated.Value(0),
      serverBounceAnim: new Animated.ValueXY(),
      formFadeAnim: new Animated.Value(0),
      transAnim: new Animated.ValueXY(),
      colorAnim: new Animated.Value(0),
      indicatorAnim: new Animated.Value(0),
      indicating: false,
      serverPlaceholder: 'Server',
      usernamePlaceholder: 'Username',
      passwordPlaceholder: 'Password',
      formIsEditable: false,
      navigator: null
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

  animateServerInputBox() {
    Animated.sequence([
      Animated.spring(this.state.serverBounceAnim,
      {
        friction: 10,
        toValue: {x: -5, y: 0}
      }),
      Animated.spring(this.state.serverBounceAnim,
      {
        friction: 10,
        toValue: {x: 5, y: 0}
      }),
      Animated.spring(this.state.serverBounceAnim,
      {
        friction: 10,
        toValue: {x: 0, y:0}
      })
    ]).start()
  }

  componentDidMount() {
    Animated.sequence([
      Animated.timing(
        this.state.logoFadeAnim,
        {toValue: 1}
      ),
      Animated.parallel([
        Animated.spring(this.state.transAnim,
          {
            friction: 4,
            toValue: {x: 0, y: -150}
          }
        ),
        Animated.timing(
          this.state.serverFadeAnim,
          {
            duration: 1000,
            toValue: 1
          }
        )
      ]
    )
    ]).start();
    this.cycleColorAnimation();
  }

  getStyle() {
    return(
     {
       position: 'absolute',
       justifyContent: 'center',
       alignItems: 'center',
       paddingBottom: 0,
       top: 0,
       left: 0,
       bottom: 0,
       right: 0,
       opacity: this.state.logoFadeAnim,
       transform: this.state.transAnim.getTranslateTransform(),
     }
   )
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
        <Animated.View style={this.getStyle()}>
          <Image
            style={{height: 169, width: 300, resizeMode: 'contain', alignSelf: 'center'}}
            source={require('./Appian_white.png')} />
        </Animated.View>

        <Animated.View style={{opacity: this.state.serverFadeAnim, transform: this.state.serverBounceAnim.getTranslateTransform()}}>
          <View style={styles.serverInputBox}>
            <TextInput
              style={styles.serverInputText}
              onChangeText={(serverText) => this.setState({serverText})}
              value={this.state.serverText}
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
    )
  }

  render() {
    return (
      this.renderLoginForm()
    );
  }
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  serverInputBox: {
    marginTop: 75,
    marginLeft: 50,
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
  },
  serverInputText: {
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
