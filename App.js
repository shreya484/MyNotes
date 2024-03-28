import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Notes from './src/screens/notes';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Notes />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({container: {flex: 1}});
