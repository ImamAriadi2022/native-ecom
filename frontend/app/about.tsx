import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';

export default function AboutScreen() {
  const router = useRouter();

  const handleContactSupport = () => {
    router.push('/support');
  };

  const handleOpenURL = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={[styles.container, styles.gradientBackground]}>
      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Pressable onPress={() => router.back()}>
              <ThemedText style={styles.backText}>← Kembali</ThemedText>
            </Pressable>
            <ThemedText type="title" style={styles.title}>
              Tentang Aplikasi
            </ThemedText>
          </View>

          {/* App Info */}
          <View style={styles.section}>
            <View style={styles.appInfo}>
              <ThemedText style={styles.appIcon}>📱</ThemedText>
              <ThemedText style={styles.appName}>Lyana Bottle Studio</ThemedText>
              <ThemedText style={styles.appVersion}>Versi 1.0.0</ThemedText>
            </View>
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Tentang Aplikasi</ThemedText>
            <ThemedText style={styles.description}>
              Aplikasi Lyana Bottle Studio adalah platform e-commerce mobile yang memungkinkan Anda untuk menjelajahi dan membeli koleksi tumbler premium kami dengan mudah dan nyaman.
            </ThemedText>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Fitur Unggulan</ThemedText>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <ThemedText style={styles.featureIcon}>🛍️</ThemedText>
                <View style={styles.featureContent}>
                  <ThemedText style={styles.featureTitle}>Katalog Produk</ThemedText>
                  <ThemedText style={styles.featureDesc}>
                    Jelajahi berbagai koleksi tumbler dengan desain eksklusif
                  </ThemedText>
                </View>
              </View>

              <View style={styles.featureItem}>
                <ThemedText style={styles.featureIcon}>💳</ThemedText>
                <View style={styles.featureContent}>
                  <ThemedText style={styles.featureTitle}>Pembayaran Mudah</ThemedText>
                  <ThemedText style={styles.featureDesc}>
                    Berbagai metode pembayaran: Transfer Bank, e-Wallet
                  </ThemedText>
                </View>
              </View>

              <View style={styles.featureItem}>
                <ThemedText style={styles.featureIcon}>🚚</ThemedText>
                <View style={styles.featureContent}>
                  <ThemedText style={styles.featureTitle}>Pengiriman Cepat</ThemedText>
                  <ThemedText style={styles.featureDesc}>
                    Pengiriman ke seluruh Indonesia dengan estimasi 2-3 hari
                  </ThemedText>
                </View>
              </View>

              <View style={styles.featureItem}>
                <ThemedText style={styles.featureIcon}>🔒</ThemedText>
                <View style={styles.featureContent}>
                  <ThemedText style={styles.featureTitle}>Transaksi Aman</ThemedText>
                  <ThemedText style={styles.featureDesc}>
                    Sistem keamanan berlapis untuk melindungi data Anda
                  </ThemedText>
                </View>
              </View>

              <View style={styles.featureItem}>
                <ThemedText style={styles.featureIcon}>🎨</ThemedText>
                <View style={styles.featureContent}>
                  <ThemedText style={styles.featureTitle}>Desain Eksklusif</ThemedText>
                  <ThemedText style={styles.featureDesc}>
                    Produk dengan desain unik dan kualitas premium
                  </ThemedText>
                </View>
              </View>
            </View>
          </View>

          {/* Technology */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Teknologi</ThemedText>
            <ThemedText style={styles.description}>
              Aplikasi ini dibangun menggunakan teknologi modern:
            </ThemedText>
            <View style={styles.techList}>
              <ThemedText style={styles.techItem}>⚛️ React Native</ThemedText>
              <ThemedText style={styles.techItem}>📱 Expo Framework</ThemedText>
              <ThemedText style={styles.techItem}>🎯 TypeScript</ThemedText>
              <ThemedText style={styles.techItem}>🗺️ Expo Router</ThemedText>
            </View>
          </View>

          {/* Developer Info */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Developer</ThemedText>
            <ThemedText style={styles.description}>
              Dikembangkan dengan ❤️ oleh tim Lyana Bottle Studio untuk memberikan pengalaman berbelanja tumbler terbaik.
            </ThemedText>
          </View>

          {/* Contact & Support */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Dukungan & Bantuan</ThemedText>
            <View style={styles.supportButtons}>
              <Pressable 
                style={styles.supportButton}
                onPress={handleContactSupport}
              >
                <ThemedText style={styles.supportButtonText}>
                  🎧 Contact Support
                </ThemedText>
              </Pressable>

              <Pressable 
                style={styles.supportButton}
                onPress={() => handleOpenURL('https://wa.me/6285838206183')}
              >
                <ThemedText style={styles.supportButtonText}>
                  💬 WhatsApp
                </ThemedText>
              </Pressable>
            </View>
          </View>

          {/* Legal */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Legal</ThemedText>
            <View style={styles.legalLinks}>
              <Pressable onPress={() => alert('Kebijakan Privasi')}>
                <ThemedText style={styles.linkText}>📄 Kebijakan Privasi</ThemedText>
              </Pressable>
              <Pressable onPress={() => alert('Syarat & Ketentuan')}>
                <ThemedText style={styles.linkText}>📋 Syarat & Ketentuan</ThemedText>
              </Pressable>
              <Pressable onPress={() => alert('Kebijakan Return')}>
                <ThemedText style={styles.linkText}>🔄 Kebijakan Return</ThemedText>
              </Pressable>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <ThemedText style={styles.footerText}>
              © 2025 Lyana Bottle Studio
            </ThemedText>
            <ThemedText style={styles.footerSubtext}>
              All rights reserved
            </ThemedText>
          </View>
        </ThemedView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    backgroundColor: '#DE8389',
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    padding: 20,
    backgroundColor: 'transparent',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    gap: 20,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  appInfo: {
    alignItems: 'center',
  },
  appIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  appVersion: {
    fontSize: 16,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    textAlign: 'justify',
  },
  featuresList: {
    gap: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 15,
    marginTop: 2,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  techList: {
    marginTop: 10,
    gap: 8,
  },
  techItem: {
    fontSize: 16,
    color: '#555',
  },
  supportButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  supportButton: {
    flex: 1,
    backgroundColor: '#DE8389',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  supportButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  legalLinks: {
    gap: 12,
  },
  linkText: {
    fontSize: 16,
    color: '#DE8389',
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#f0f0f0',
  },
});
