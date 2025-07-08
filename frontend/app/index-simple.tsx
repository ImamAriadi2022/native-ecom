import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function IndexSimpleScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Index Simple</ThemedText>
      <ThemedText>This is the simple index screen.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
