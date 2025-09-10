import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HelloBoxProps {
  title?: string;
  subtitle?: string;
}

export const HelloBox: React.FC<HelloBoxProps> = ({ title = 'Welcome', subtitle = 'Start building your app' }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#eef2ff',
    borderWidth: 1,
    borderColor: '#c7d2fe',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#4b5563',
  },
}); 