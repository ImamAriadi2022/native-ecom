import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function CartScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>Keranjang Belanja</ThemedText>
        </View>

        {/* Empty Cart State */}
        <View style={styles.emptyState}>
          <IconSymbol name="cart" size={80} color="#ccc" />
          <ThemedText style={styles.emptyTitle}>Keranjang Kosong</ThemedText>
          <ThemedText style={styles.emptySubtitle}>
            Belum ada produk yang ditambahkan ke keranjang
          </ThemedText>
          
          <Pressable 
            style={styles.shopButton}
            onPress={() => router.push('/(tabs)/explore')}
          >
            <ThemedText style={styles.shopButtonText}>Mulai Belanja</ThemedText>
          </Pressable>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <View style={styles.featureItem}>
            <IconSymbol name="shield.checkmark" size={24} color="#DE8389" />
            <ThemedText style={styles.featureText}>Pembayaran Aman</ThemedText>
          </View>
          
          <View style={styles.featureItem}>
            <IconSymbol name="truck.box" size={24} color="#DE8389" />
            <ThemedText style={styles.featureText}>Pengiriman Cepat</ThemedText>
          </View>
          
          <View style={styles.featureItem}>
            <IconSymbol name="return" size={24} color="#DE8389" />
            <ThemedText style={styles.featureText}>Garansi Return</ThemedText>
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
  },
  header: {
    backgroundColor: '#DE8389',
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  shopButton: {
    backgroundColor: '#DE8389',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  featuresSection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  featureText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
});