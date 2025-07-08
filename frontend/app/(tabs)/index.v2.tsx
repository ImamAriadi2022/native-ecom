import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    TextInput,
    View
} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Prevent memory leaks
  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Login Gagal', 'Email dan password wajib diisi.');
      return;
    }

    setIsLoading(true);

    try {
      // Autentikasi dummy
      if (email === 'devi@gmail.com' && password === '123456') {
        // Delay untuk mencegah race condition di production build
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Gunakan replace agar user tidak bisa kembali ke halaman login
        router.replace('/(tabs)/explore');
      } else {
        Alert.alert('Login Gagal', 'Email atau password salah.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Error', 
        'Terjadi kesalahan saat login. Silakan coba lagi.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#FFFFFF', dark: '#1B1B1B' }}
        headerImage={
          <Image 
            source={require('@/assets/images/kupu.png')} 
            style={styles.headerImage}
            defaultSource={require('@/assets/images/kupu.png')}
          />
        }
      >
        <ThemedView style={styles.container}>
          <View style={styles.formContainer}>
            <ThemedText type="title" style={styles.title}>
              Selamat Datang
            </ThemedText>
            
            <ThemedText style={styles.subtitle}>
              Masuk ke akunmu untuk melanjutkan
            </ThemedText>

            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              editable={!isLoading}
              placeholderTextColor="#999"
            />

            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              editable={!isLoading}
              placeholderTextColor="#999"
            />

            <Pressable 
              onPress={handleLogin}
              style={({ pressed }) => [
                styles.loginButton,
                isLoading && styles.disabledButton,
                pressed && styles.pressedButton
              ]}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText type="defaultSemiBold" style={styles.loginText}>
                  Login
                </ThemedText>
              )}
            </Pressable>
          </View>
        </ThemedView>
      </ParallaxScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    gap: 15,
    marginTop: 20,
  },
  headerImage: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#000',
  },
  loginButton: {
    backgroundColor: '#DE8389',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 54,
    marginTop: 10,
  },
  disabledButton: {
    opacity: 0.7,
  },
  pressedButton: {
    opacity: 0.9,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
  },
});
