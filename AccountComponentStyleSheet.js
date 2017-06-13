import { StyleSheet } from 'react-native';

const AccountComponentStyleSheet = StyleSheet.create({
  accountImage: {
     height: 70,
     width: 70,
     borderRadius: 35,
     overflow: 'hidden'
  },
  accountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  accountTextContainer: {
    marginLeft: 20,
    flexDirection: 'column'
  },
  domainText: {
    color: 'white',
    fontSize: 14
  },
  icon: {
    paddingLeft: 50
  },
  editButton: {
    borderRadius: 25,
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: 'white',
    marginRight: 10
  },
  usernameText: {
    color: 'white',
    fontSize: 18,
    fontWeight:'bold'
  }
})

export default AccountComponentStyleSheet
