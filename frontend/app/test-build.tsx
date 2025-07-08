import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SimpleTestScreen() {
  const router = useRouter();

  const handleTest = () => {
    Alert.alert('Test', 'Build working!');
  };

  const handleNavigate = () => {
    router.push('/explore');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Build Test Screen</Text>
      <Text style={styles.subtitle}>If you see this, the build is working!</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleTest}>
        <Text style={styles.buttonText}>Test Alert</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={handleNavigate}>
        <Text style={styles.buttonText}>Go to Main App</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    minWidth: 200,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
