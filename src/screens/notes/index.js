import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Button,
  FlatList,
  Alert,
  Pressable,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import styles from './styles';
import Images from '../../assets/images';

const Notes = () => {
  const [newNote, setNewNote] = useState('');
  const [notesData, setNotesData] = useState([]);
  const [editingNoteIndex, setEditingNoteIndex] = useState(null);

  useEffect(() => {
    loadNotes();
    networkCheck();
  }, []);

  const networkCheck = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        // to sync notes with server
        // syncServerNotes();
      }
    });
  };

  //   const syncServerNotes = async () => {
  //     // to sync the notes when device is online
  //     // dummy URL
  //     try {
  //       const response = await fetch('https://example.com/', {
  //         method: 'POST',
  //         body: JSON.stringify({notesData}),
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });
  //       setNotesData(response);
  //     } catch (error) {
  //       Alert.alert('Something went wrong. Please try again later.');
  //     }
  //   };

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes !== null) {
        setNotesData(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error('Error loading notes: ', error);
    }
  };

  const saveNotes = async updatedNotes => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNotesData(updatedNotes);
    } catch (error) {
      console.error('Error saving notes: ', error);
    }
  };

  const addNote = () => {
    if (newNote.trim() !== '') {
      const updatedNotes = [...notesData, newNote];
      saveNotes(updatedNotes);
      setNewNote('');
    }
  };

  const editNote = (index, editedNote) => {
    const updatedNotes = [...notesData];
    updatedNotes[index] = editedNote;
    saveNotes(updatedNotes);
    setEditingNoteIndex(null);
    setNewNote('');
  };

  const deleteNote = index => {
    const updatedNotes = [...notesData];
    updatedNotes.splice(index, 1);
    saveNotes(updatedNotes);
  };

  const handleEdit = index => {
    setEditingNoteIndex(index);
    setNewNote(notesData[index]);
  };

  const handleCancelEdit = () => {
    setEditingNoteIndex(null);
    setNewNote('');
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.notesView}>
        <Text style={styles.noteText}>{item}</Text>
        <View style={styles.flexRow}>
          <Pressable onPress={() => handleEdit(index)}>
            <Image
              style={[styles.icons, {right: 10}]}
              source={Images.editIcon}
            />
          </Pressable>
          <Pressable onPress={() => deleteNote(index)}>
            <Image style={styles.icons} source={Images.deleteIcon} />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TextInput
        placeholder="Enter your note"
        value={newNote}
        onChangeText={text => setNewNote(text)}
        style={styles.textInputStyle}
      />
      {editingNoteIndex !== null ? (
        <View style={[styles.flexRow, styles.buttonView]}>
          <Pressable
            style={styles.addNoteButton}
            onPress={() => editNote(editingNoteIndex, newNote)}>
            <Text style={styles.textStyle}>Save</Text>
          </Pressable>
          <Pressable style={styles.addNoteButton} onPress={handleCancelEdit}>
            <Text style={styles.textStyle}>Cancel</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable style={styles.addNoteButton} onPress={addNote}>
          <Text style={styles.textStyle}>Add Note</Text>
        </Pressable>
      )}
      {notesData.length !== 0 && (
        <Text style={styles.myNotesText}>My Notes</Text>
      )}

      <FlatList
        data={notesData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </SafeAreaView>
  );
};

export default Notes;
