import { Image, StyleSheet, Platform, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const router = useRouter();

  const handleLogout = () => {
    // Navigasi kembali ke halaman login
    router.replace('/'); // Ganti '/' dengan '/login' jika login ada di rute tersebut
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FF90BB', dark: '#641B2E' }}
      headerImage={
        <Image
          source={require('@/assets/images/meong.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">23040414 Juliana Permata Devi</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.logoutContainer}>
        <Pressable onPress={handleLogout} style={styles.logoutButton}>
          <ThemedText style={styles.logoutText}>Logout</ThemedText>
        </Pressable>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Tentang Devi</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">Halo, aku Devi.
Aku adalah seseorang yang percaya bahwa setiap langkah kecil bisa membawa perubahan besar baik dalam hidup pribadi, pekerjaan, maupun hubungan dengan orang lain.</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Prinsip Hidup</ThemedText>
        <ThemedText>
          Aku percaya bahwa Kebaikan tidak pernah sia-sia. Tumbuh itu tidak selalu terlihat, tapi pasti terjadi. Menjadi versi terbaik dari diri sendiri adalah perjalanan, bukan tujuan akhir
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Fakta Unik Devi</ThemedText>
        <ThemedText>
          Devi adalah sosok yang suka berpetualang, jatuh cinta pada senja dan laut, dan selalu mencari sambal di setiap hidangan. Hidup baginya adalah tentang mencoba hal baru, menikmati momen kecil, dan menemukan rasa di setiap perjalanan.{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 220,
    width: 290,
    bottom: 0,
    left: 500,
    position: 'absolute',
  },
  logoutContainer: {
    marginTop: 10,
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  logoutButton: {
    backgroundColor: '#641B2E',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
});
