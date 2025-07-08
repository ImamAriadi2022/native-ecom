import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, TextInput, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Auto fetch profile saat component mount
    fetchProfile("23040414", "1802084407030003");
    return () => {
      // Cleanup
      setIsLoading(false);
      setImageError(false);
    };
  }, []);

  const fetchProfile = async (nim: string, kelas: string) => {
    try {
      console.log('Fetching profile for NIM:', nim, 'Kelas:', kelas);
      setImageError(false); // Reset error state

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(
        `https://cloud-jalurlangitv2.ikraf.or.id/api/applms/tarik_data?password=${kelas}&nim=${nim}`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Basic ' + btoa('adminx:adminx123'),
          },
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log('API Response:', json);

      if (json.status && json.foto) {
        console.log('Foto URL ditemukan:', json.foto);
        setAvatarUrl(json.foto);
      } else {
        console.warn('Tidak ada foto ditemukan dalam response');
        setAvatarUrl(null);
        setImageError(true);
      }
    } catch (error) {
      console.error('Gagal ambil foto:', error);
      setAvatarUrl(null);
      setImageError(true);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Login Gagal', 'Email dan password wajib diisi.');
      return;
    }

    setIsLoading(true);

    try {
      if (email === 'devi@gmail.com' && password === '123456') {
        // Tunggu sebentar sebelum navigasi
        await new Promise(resolve => setTimeout(resolve, 500));
        router.replace('/(tabs)/explore');
      } else {
        Alert.alert('Login Gagal', 'Email atau password salah.');
      }
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Error', 'Terjadi kesalahan saat navigasi');
    } finally {
      setIsLoading(false);
    }
  };

  const renderHeaderImage = () => {
    if (!avatarUrl || imageError) {
      return (
        <Image 
          source={require('@/assets/images/kupu.png')} 
          style={styles.headerImage}
          defaultSource={require('@/assets/images/kupu.png')}
        />
      );
    }

    return (
      <Image 
        source={{ uri: avatarUrl }} 
        style={styles.headerImage}
        defaultSource={require('@/assets/images/kupu.png')}
        onError={() => {
          console.log('Error loading profile image');
          setImageError(true);
        }}
      />
    );
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFFFF', dark: '#1B1B1B' }}
      headerImage={renderHeaderImage()}
    >
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

        <View style={styles.buttonContainer}>
          <Pressable 
            onPress={handleLogin} 
            style={[styles.loginButton, isLoading && styles.disabledButton]}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 15,
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    marginVertical: 5,
    fontSize: 16,
    color: '#000',
  },
  buttonContainer: {
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: '#DE8389',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  disabledButton: {
    opacity: 0.7,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
  },
});
