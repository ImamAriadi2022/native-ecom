import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#EFE4D2', dark: '#954C2E' }}
      headerImage={
        <Image
          source={require('@/assets/images/jerapah.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hello Jerapah!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Nama Lengkap</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">Giraffa camelopardalis</ThemedText> to see changes.
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
        <ThemedText type="subtitle">Deskripsi</ThemedText>
        <ThemedText>
          Jerapah dikenal sebagai hewan tertinggi di dunia, dengan leher yang sangat panjang dan kaki jenjang. Lehernya bisa mencapai 2 meter, meskipun hanya memiliki tujuh ruas tulang leher jumlah yang sama dengan manusia. Jerapah adalah hewan pemakan tumbuhan dan cenderung hidup berkelompok dalam kawanan kecil.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Ciri ciri Jerapah</ThemedText>
        <ThemedText>
          Tinggi dan Bercorak unik{' '}
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
    height: 240,
    width: 250,
    bottom: 5,
    left: 500,
    position: 'absolute',
  },
});
