import { StyleSheet } from 'react-native';

const AccountComponentStyleSheet = StyleSheet.create({
  icon: {
     height: 50,
     width: 50,
     borderRadius: 25,
     borderColor: 'white',
     borderWidth: 1,
     overflow: 'hidden'
  },
  editButton: {
    borderRadius: 25,
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: 'white',
    marginRight: 10
  },
  modal: {
    marginTop: 150,
    alignSelf: 'center',
    position: 'absolute',
    height: 300,
    width: 300
  }
})

export default AccountComponentStyleSheet
