import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { HelloBox } from '../components/HelloBox';

export const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <HelloBox title="Hello React Native" subtitle="This is your Home screen" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
}); 