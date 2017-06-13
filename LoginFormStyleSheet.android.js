import { StyleSheet } from 'react-native';
import LoginFormBaseStyleSheet from './LoginFormBaseStyleSheet'

const LoginFormStyleSheet = StyleSheet.create({
  ...LoginFormBaseStyleSheet,
  logo: {
    height: 100,
    width: 200,
    resizeMode: 'contain',
  },
  addAccountButtonWrapper: {
    marginTop: 500,
    height: 40,
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject
  },
  accountsList: {
    height: 300,
    alignSelf: 'center',
    width: 300,
    marginTop: 150,
  },
  textInput: {
    fontSize: 18,
    height: 40,
    width: 250,
    color: '#ffffff',
    textAlign: 'left',
    fontStyle: 'italic',
  },
  textInputContainer: {
    marginTop: 25,
    borderColor: 'white',
    borderBottomWidth: 1,
    height: 50,
    width: 250
  },
  serverInputText: {
    fontSize: 18,
    height: 40,
    width: 190,
    textAlign: 'left',
    fontStyle: 'italic',
    color: '#ffffff'
  },
  httpText: {
    paddingRight: 1,
    paddingBottom: 7,
    color: 'white',
    fontStyle: 'italic',
    fontSize: 18
  }
});

export default LoginFormStyleSheet;
