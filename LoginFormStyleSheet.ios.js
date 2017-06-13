import { StyleSheet } from 'react-native';
import LoginFormBaseStyleSheet from './LoginFormBaseStyleSheet'

const LoginFormStyleSheet = StyleSheet.create({
  ...LoginFormBaseStyleSheet,
  logo: {
    height: 130,
    width: 300,
    resizeMode: 'contain',
  },
  addAccountButtonWrapper: {
    marginTop: 600,
    height: 40,
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject
  },
  accountsList: {
    height: 350,
    alignSelf: 'center',
    width: 300,
    marginTop: 200,
  },
  textInput: {
    fontSize: 14,
    height: 20,
    width: 250,
    color: '#ffffff',
    textAlign: 'left',
    fontStyle: 'italic',
  },
  textInputContainer: {
    marginTop: 25,
    borderColor: 'white',
    borderBottomWidth: 1,
    height: 40,
    width: 250
  },
  serverInputText: {
    fontSize: 14,
    height: 20,
    width: 190,
    textAlign: 'left',
    fontStyle: 'italic',
    color: '#ffffff'
  },
  httpText: {
    paddingRight: 1,
    color: 'white',
    fontStyle: 'italic'
  }
});

export default LoginFormStyleSheet;
