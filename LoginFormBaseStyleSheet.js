import { StyleSheet } from 'react-native';

const LoginFormBaseStyleSheet = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  background: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject
  },
  addAccountButton: {
    height: 40,
    width: 250,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'transparent',
    backgroundColor: '#2F95C5',
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
  serverRow: {
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
  },
  serverRowContainer: {
    marginLeft: 50,
    width: 300,
    flexDirection: 'row'
  },
  textInputLabel: {
    fontSize: 14,
    height: 20,
    color: '#B9C3D0'
  },
  indicator: {
    marginTop: 35,
    marginLeft: 15
  },
  editAccountsButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F95C5'
  },
  editAccountsButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  rememberMeButton: {
    color: 'white',
    'fontWeight': 'bold'
  },
  rememberMeRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
    marginTop: 25
  },
  accountsListDivider: {
    borderColor: 'white',
    'borderWidth': 1,
    height: 1,
    width: 300,
    marginBottom: 10
  }
}

export default LoginFormBaseStyleSheet;
