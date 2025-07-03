import { Image, StyleSheet, Platform, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/'); // Ganti ke '/login' jika perlu
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#C7DB9C', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/monyet.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>

      <ThemedText>This app includes example code to help you get started.</ThemedText>

      <Collapsible title="Tentang Monyet">
        <ThemedText>
          This app has two screens:{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> dan{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          Layout-nya diatur melalui file{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Jenis Jenis Monyet">
        <ThemedText>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Siklus Hidup Monyet">
        <ThemedText>
          Gunakan suffix <ThemedText type="defaultSemiBold">@2x</ThemedText> dan{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> untuk dukungan density layar berbeda.
        </ThemedText>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Habitat dan Penyebaran Monyet">
        <ThemedText>
          Lihat <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> untuk custom font
          seperti ini:{' '}
          <ThemedText style={{ fontFamily: 'SpaceMono' }}>
            custom fonts such as this one.
          </ThemedText>
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Peran Ekologis Monyet">
        <ThemedText>
          Template ini mendukung mode terang dan gelap melalui hook{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText>.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Fakta Unik Monyet">
        <ThemedText>
          Animasi menggunakan komponen{' '}
          <ThemedText type="defaultSemiBold">HelloWave.tsx</ThemedText> dan library{' '}
          <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText>.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              Komponen{' '}
              <ThemedText type="defaultSemiBold">
                components/ParallaxScrollView.tsx
              </ThemedText>{' '}
              memberikan efek parallax.
            </ThemedText>
          ),
        })}
      </Collapsible>

      {/* Tombol Logout */}
      <ThemedView style={styles.logoutContainer}>
        <Pressable onPress={handleLogout} style={styles.logoutButton}>
          <ThemedText style={styles.logoutText}>Logout</ThemedText>
        </Pressable>
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
    height: 260,
    width: 250,
    bottom: -10,
    left: 500,
    position: 'absolute',
  },
  logoutContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#353636',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '80%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});
