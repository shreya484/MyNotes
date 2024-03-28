import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    safeAreaView: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  buttonView: {
    justifyContent: 'space-between',
    width: '40%',
    alignSelf: 'center',
  },
  textInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
  },
  textInputStyle: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    fontSize: 18,
    color: 'grey',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    margin: 20,
    marginTop: '10%',
  },
  addNoteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#33CCCC',
    padding: 10,
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: 20,
    color: 'white',
  },
  notesView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  contentContainerStyle: {
    marginTop: 10,
  },
  noteText: {
    fontSize: 15,
    marginTop: 15,
  },
  myNotesText: {
    fontSize: 20,
    textDecorationLine: 'underline',
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
  },
  icons: {
    height: 25,
    width: 25,
  },
});
export default styles;
