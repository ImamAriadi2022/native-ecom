import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function PaymentTestScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Test Navigation</Text>
      
      <Pressable 
        style={styles.button}
        onPress={() => router.push({
          pathname: '/payment-method',
          params: {
            orderId: 'TEST001',
            productName: 'Test Product',
            quantity: '1',
            total: '299000',
          }
        })}
      >
        <Text style={styles.buttonText}>Test Payment Method</Text>
      </Pressable>

      <Pressable 
        style={styles.button}
        onPress={() => router.push({
          pathname: '/payment-process',
          params: {
            orderId: 'TEST001',
            productName: 'Test Product',
            quantity: '1',
            total: '299000',
            paymentMethod: 'Transfer Bank',
            paymentIcon: '🏦'
          }
        })}
      >
        <Text style={styles.buttonText}>Test Payment Process</Text>
      </Pressable>

      <Pressable 
        style={styles.button}
        onPress={() => router.push({
          pathname: '/payment-result',
          params: {
            orderId: 'TEST001',
            productName: 'Test Product',
            quantity: '1',
            total: '299000',
            paymentMethod: 'Transfer Bank',
            isSuccess: 'true',
            transactionTime: new Date().toLocaleString('id-ID')
          }
        })}
      >
        <Text style={styles.buttonText}>Test Payment Result (Success)</Text>
      </Pressable>

      <Pressable 
        style={styles.button}
        onPress={() => router.push({
          pathname: '/payment-result',
          params: {
            orderId: 'TEST001',
            productName: 'Test Product',
            quantity: '1',
            total: '299000',
            paymentMethod: 'Transfer Bank',
            isSuccess: 'false',
            transactionTime: new Date().toLocaleString('id-ID')
          }
        })}
      >
        <Text style={styles.buttonText}>Test Payment Result (Failed)</Text>
      </Pressable>

      <Pressable 
        style={[styles.button, styles.backButton]}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  button: {
    backgroundColor: '#DE8389',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#666',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
