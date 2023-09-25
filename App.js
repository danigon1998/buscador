import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import Home from './src/Home/home';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[{ key: 'home' }]}
        renderItem={({ item }) => <Home />}
        contentContainerStyle={styles.flatListContent}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7E9DF',
    paddingTop:50
  },
  flatListContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
