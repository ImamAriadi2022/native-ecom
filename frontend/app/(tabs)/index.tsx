import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Image, Pressable, Alert, Platform, View } from 'react-native';
import { useRouter } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  useEffect(() => {
    // Tarik data awal (tanpa login) jika mau
    fetchProfile("23040414", "1802084407030003"); // optional pre-load
  }, []);

  const fetchProfile = async (nim: string, kelas: string) => {
    try {
      const response = await fetch(
        `https://cloud-jalurlangitv2.ikraf.or.id/api/applms/tarik_data?password=${kelas}&nim=${nim}`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Basic ' + btoa('adminx:adminx123'),
          },
        }
      );

      const json = await response.json();
      console.log('API Response:', json);

      if (json.status && json.foto) {
        setAvatarUrl(json.foto);
      } else {
        console.warn('Tidak ada foto ditemukan');
      }
    } catch (error) {
      console.error('Gagal ambil foto:', error);
    }
  };


  const handleLogin = () => {
    if (!email || !password) {
      console.log('Email atau password kosong');
      if (Platform.OS === 'web') {
        window.alert('Login Gagal - Email dan password wajib diisi.');
      } else {
        Alert.alert('Login Gagal', 'Email dan password wajib diisi.');
      }
      return;
    }

    // Autentikasi dummy
    if (email === 'devi@gmail.com' && password === '123456') {
      if (Platform.OS === 'web') {
        window.alert('Login Berhasil - Selamat datang!');
      } else {
        Alert.alert('Login Berhasil', 'Selamat datang!');
      }
      router.replace('/(tabs)/explore'); // navigasi
    } else {
      if (Platform.OS === 'web') {
        window.alert('Login Gagal - Email atau password salah.');
      } else {
        Alert.alert('Login Gagal', 'Email atau password salah.');
      }
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFFF', dark: '#FFFFF' }}
      headerImage={
        avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.headerImage} />
        ) : (
          <Image source={require('@/assets/images/kupu.png')} style={styles.headerImage} />
        )
      }>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Selamat Datang</ThemedText>
        <ThemedText>Masuk ke akunmu untuk melanjutkan</ThemedText>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <View style={styles.buttonContainer}>
          <Pressable onPress={handleLogin} style={styles.loginButton}>
            <ThemedText type="defaultSemiBold" style={styles.loginText}>
              Login
            </ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  loginButton: {
    backgroundColor: '#FF9B45',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  loginText: {
    color: '#fff',
  },
  headerImage: {
    height: 170,
    width: 150,
    bottom: 20,
    left: 500,
    position: 'absolute',
  },
  buttonContainer: {
    marginTop: 8,
  },
});
