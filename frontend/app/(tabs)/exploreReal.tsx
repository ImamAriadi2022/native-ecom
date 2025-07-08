import ProductCard from '@/components/Card';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function ExploreRealScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <ThemedText type="title" style={styles.title}>Explore Real Products</ThemedText>
        <ThemedText style={styles.subtitle}>Koleksi produk unggulan kami</ThemedText>
        
        {/* Product Grid - 2 cards per row */}
        <View style={styles.productContainer}>
          <View style={styles.productRow}>
            <View style={styles.cardWrapper}>
              <ProductCard
                image={require('@/assets/images/tumbler oren.jpg')}
                judul="Blush Aura"
                desc="Sentuhan manis warna blush yang memancarkan kehangatan dan keceriaan, cocok untuk hari penuh energi."
                harga={299000}
              />
            </View>
            <View style={styles.cardWrapper}>
              <ProductCard
                image={require('@/assets/images/tumbler ungu.jpg')}
                judul="Luna Frost"
                desc="Tumbler dengan warna lilac lembut dengan aksen ungu pastel, memberi kesan tenang dan elegan."
                harga={249000}
              />
            </View>
          </View>

          <View style={styles.productRow}>
            <View style={styles.cardWrapper}>
              <ProductCard
                image={require('@/assets/images/tumbler pink1.jpg')}
                judul="Pink Reverie"
                desc="Paduan warna pastel yang menggambarkan impian dan kelembutan, teman setia momen manis harimu."
                harga={299000}
              />
            </View>
            <View style={styles.cardWrapper}>
              <ProductCard
                image={require('@/assets/images/tumbler hijau2.jpg')}
                judul="Sage Calm"
                desc="Desain simple dan bernuansa alami, cocok untuk kamu yang menyukai kesegaran dan ketenangan."
                harga={279000}
              />
            </View>
          </View>

          <View style={styles.productRow}>
            <View style={styles.cardWrapper}>
              <ProductCard
                image={require('@/assets/images/tumbler khaki.jpg')}
                judul="Dusk Mocha"
                desc="Hangat dan netral, dusk mocha hadir dengan warna kopi susu yang elegan."
                harga={279000}
              />
            </View>
            <View style={styles.cardWrapper}>
              <ProductCard
                image={require('@/assets/images/gantungan1.jpg')}
                judul="Rose Glow"
                desc="Aksesoris cantik dengan warna rose yang memukau, cocok untuk pelengkap gaya harimu."
                harga={199000}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
  productContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 10,
  },
  cardWrapper: {
    flex: 1,
    maxWidth: '48%',
  },
});
