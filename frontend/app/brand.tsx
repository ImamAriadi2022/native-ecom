import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

export default function BrandScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#DE8389', '#B488BF']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Image 
              source={require('@/assets/images/react-logo.png')} 
              style={styles.logo}
            />
            <ThemedText type="title" style={styles.brandTitle}>
              Lyana Bottle Studio
            </ThemedText>
            <ThemedText style={styles.tagline}>
              Temani Harimu, Setiap Tegukan Penuh Cerita
            </ThemedText>
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Tentang Kami
            </ThemedText>
            <ThemedText style={styles.description}>
              Lyana Bottle Studio adalah brand tumbler premium yang hadir untuk menemani setiap momen berharga dalam hidup Anda. 
              Kami percaya bahwa setiap tegukan minuman favorit Anda adalah cerita kecil yang layak dikenang.
            </ThemedText>
          </View>

          {/* Mission Section */}
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Misi Kami
            </ThemedText>
            <ThemedText style={styles.description}>
              Menyediakan tumbler berkualitas tinggi dengan desain yang elegan dan fungsional, 
              yang tidak hanya menjaga suhu minuman Anda tetap optimal, tetapi juga menjadi 
              statement style yang mencerminkan kepribadian unik Anda.
            </ThemedText>
          </View>

          {/* Values Section */}
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Nilai-Nilai Kami
            </ThemedText>
            <View style={styles.valuesList}>
              <ThemedText style={styles.valueItem}>
                🌿 <ThemedText style={styles.valueBold}>Sustainability</ThemedText> - Ramah lingkungan dengan material berkualitas
              </ThemedText>
              <ThemedText style={styles.valueItem}>
                ✨ <ThemedText style={styles.valueBold}>Quality</ThemedText> - Kualitas terbaik dalam setiap produk
              </ThemedText>
              <ThemedText style={styles.valueItem}>
                💎 <ThemedText style={styles.valueBold}>Style</ThemedText> - Desain yang indah dan fungsional
              </ThemedText>
              <ThemedText style={styles.valueItem}>
                🤝 <ThemedText style={styles.valueBold}>Community</ThemedText> - Membangun komunitas pecinta minuman sehat
              </ThemedText>
            </View>
          </View>

          {/* Product Gallery */}
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Koleksi Unggulan
            </ThemedText>
            <ScrollView horizontal style={styles.gallery} showsHorizontalScrollIndicator={false}>
              <Image source={require('@/assets/images/tumbler oren.jpg')} style={styles.galleryImage} />
              <Image source={require('@/assets/images/tumbler ungu.jpg')} style={styles.galleryImage} />
              <Image source={require('@/assets/images/tumbler pink1.jpg')} style={styles.galleryImage} />
              <Image source={require('@/assets/images/tumbler hijau2.jpg')} style={styles.galleryImage} />
            </ScrollView>
          </View>

          {/* Contact Section */}
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Hubungi Kami
            </ThemedText>
            <ThemedText style={styles.description}>
              📧 Email: hello@lyanabottle.com{'\n'}
              📱 WhatsApp: +62 812-3456-7890{'\n'}
              📍 Jakarta, Indonesia
            </ThemedText>
          </View>

          {/* Back Button */}
          <Pressable 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <ThemedText style={styles.backButtonText}>
              Kembali ke Katalog
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    padding: 20,
    backgroundColor: 'transparent',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 15,
    borderRadius: 40,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#f0f0f0',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    textAlign: 'justify',
  },
  valuesList: {
    gap: 10,
  },
  valueItem: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  valueBold: {
    fontWeight: 'bold',
    color: '#333',
  },
  gallery: {
    marginTop: 10,
  },
  galleryImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 15,
  },
  backButton: {
    backgroundColor: '#DE8389',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
