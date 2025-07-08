import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function ExploreSimpleScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Explore Simple</ThemedText>
      <ThemedText>This is the simple explore screen.</ThemedText>
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
