import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PromoScreen() {
  const promos = [
    {
      id: '1',
      title: 'Flash Sale Weekend',
      description: 'Diskon hingga 50% untuk semua tumbler premium!',
      discount: '50%',
      validUntil: '31 Desember 2024',
      code: 'WEEKEND50',
      image: 'tumbler cream.jpg',
      terms: ['Berlaku untuk semua produk tumbler', 'Minimal pembelian Rp 100.000', 'Tidak dapat digabung dengan promo lain']
    },
    {
      id: '2',
      title: 'Buy 2 Get 1 Free',
      description: 'Beli 2 gantungan kunci, gratis 1 gantungan kunci pilihan!',
      discount: 'B2G1',
      validUntil: '15 Januari 2025',
      code: 'BUY2GET1',
      image: 'jerapah.png',
      terms: ['Berlaku untuk semua gantungan kunci', 'Produk gratis sesuai stok tersedia', 'Promo terbatas']
    },
    {
      id: '3',
      title: 'Bundling Hemat',
      description: 'Paket 3 tumbler + 2 gantungan kunci cuma Rp 199.000!',
      discount: 'Rp 199K',
      validUntil: '28 Februari 2025',
      code: 'BUNDLE199',
      image: 'tumbler hijau2.jpg',
      terms: ['Hemat hingga Rp 50.000', 'Warna dan motif sesuai ketersediaan', 'Gratis ongkir Jabodetabek']
    },
    {
      id: '4',
      title: 'New Member Special',
      description: 'Diskon 30% untuk pembelian pertama member baru!',
      discount: '30%',
      validUntil: '31 Maret 2025',
      code: 'NEWBIE30',
      image: 'tumbler pink1.jpg',
      terms: ['Khusus member baru', 'Berlaku untuk semua produk', 'Maksimal diskon Rp 75.000']
    },
    {
      id: '5',
      title: 'Custom Tumbler Promo',
      description: 'Gratis custom nama untuk pembelian tumbler premium!',
      discount: 'GRATIS',
      validUntil: '30 April 2025',
      code: 'CUSTOMFREE',
      image: 'tumbler ungu.jpg',
      terms: ['Berlaku untuk tumbler premium', 'Maksimal 10 karakter', 'Design sesuai template tersedia']
    }
  ];

  const upcomingPromos = [
    {
      title: 'Valentine Special',
      description: 'Tumbler couple dengan desain romantis',
      startDate: '10 Februari 2025',
      teaser: 'Coming Soon! 💕'
    },
    {
      title: 'Ramadan Sale',
      description: 'Diskon spesial selama bulan suci',
      startDate: 'Maret 2025',
      teaser: 'Stay Tuned! 🌙'
    }
  ];

  return (
    <LinearGradient
      colors={['#DE8389', '#B488BF']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Kembali</Text>
        </TouchableOpacity>
        <ThemedText style={styles.title}>Promo & Penawaran</ThemedText>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.heroSection}>
          <Text style={styles.heroEmoji}>🎉</Text>
          <ThemedText style={styles.heroTitle}>Promo Menarik Hari Ini!</ThemedText>
          <Text style={styles.heroDesc}>Jangan sampai terlewat penawaran terbaik dari Lyana Bottle Studio</Text>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Promo Aktif</ThemedText>
          {promos.map((promo) => (
            <View key={promo.id} style={styles.promoCard}>
              <View style={styles.promoHeader}>
                <Image 
                  source={{ uri: `../assets/images/${promo.image}` }} 
                  style={styles.promoImage}
                  defaultSource={require('../assets/images/react-logo.png')}
                />
                <View style={styles.promoInfo}>
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{promo.discount}</Text>
                  </View>
                  <ThemedText style={styles.promoTitle}>{promo.title}</ThemedText>
                  <Text style={styles.promoDesc}>{promo.description}</Text>
                  <Text style={styles.validUntil}>Berlaku hingga: {promo.validUntil}</Text>
                </View>
              </View>
              
              <View style={styles.promoCode}>
                <Text style={styles.codeLabel}>Kode Promo:</Text>
                <View style={styles.codeBox}>
                  <Text style={styles.codeText}>{promo.code}</Text>
                  <TouchableOpacity style={styles.copyButton}>
                    <Text style={styles.copyText}>Salin</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.termsSection}>
                <Text style={styles.termsTitle}>Syarat & Ketentuan:</Text>
                {promo.terms.map((term, index) => (
                  <Text key={index} style={styles.termItem}>• {term}</Text>
                ))}
              </View>

              <TouchableOpacity 
                style={styles.usePromoButton}
                onPress={() => router.push('/explore')}
              >
                <Text style={styles.usePromoText}>Gunakan Promo</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Promo Mendatang</ThemedText>
          {upcomingPromos.map((promo, index) => (
            <View key={index} style={styles.upcomingCard}>
              <View style={styles.upcomingInfo}>
                <ThemedText style={styles.upcomingTitle}>{promo.title}</ThemedText>
                <Text style={styles.upcomingDesc}>{promo.description}</Text>
                <Text style={styles.upcomingDate}>Mulai: {promo.startDate}</Text>
              </View>
              <Text style={styles.upcomingTeaser}>{promo.teaser}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Tips Hemat Belanja</ThemedText>
          <View style={styles.tipsCard}>
            <Text style={styles.tipsEmoji}>💡</Text>
            <View style={styles.tipsContent}>
              <ThemedText style={styles.tipsTitle}>Cara Maksimalkan Promo</ThemedText>
              <View style={styles.tipsList}>
                <Text style={styles.tipItem}>• Follow Instagram @lyanabottlestudio untuk update promo terbaru</Text>
                <Text style={styles.tipItem}>• Gabung member untuk dapat notifikasi promo eksklusif</Text>
                <Text style={styles.tipItem}>• Belanja di atas Rp 150.000 untuk gratis ongkir</Text>
                <Text style={styles.tipItem}>• Combine promo untuk hemat maksimal</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Loyalty Program</ThemedText>
          <View style={styles.loyaltyCard}>
            <Text style={styles.loyaltyEmoji}>🏆</Text>
            <View style={styles.loyaltyContent}>
              <ThemedText style={styles.loyaltyTitle}>Lyana VIP Member</ThemedText>
              <Text style={styles.loyaltyDesc}>
                Dapatkan poin setiap pembelian dan tukar dengan diskon menarik!
              </Text>
              <View style={styles.loyaltyBenefits}>
                <Text style={styles.benefitItem}>✨ Diskon eksklusif member</Text>
                <Text style={styles.benefitItem}>🎁 Birthday special offer</Text>
                <Text style={styles.benefitItem}>📦 Priority shipping</Text>
                <Text style={styles.benefitItem}>🔔 Early access promo</Text>
              </View>
              <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinButtonText}>Join Sekarang</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 15,
  },
  backText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  content: {
    flex: 1,
  },
  heroSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 25,
  },
  heroEmoji: {
    fontSize: 48,
    marginBottom: 15,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  heroDesc: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#fff',
  },
  promoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  promoHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  promoImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  promoInfo: {
    flex: 1,
  },
  discountBadge: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  promoDesc: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  validUntil: {
    fontSize: 12,
    color: '#dc3545',
    fontWeight: '500',
  },
  promoCode: {
    marginBottom: 15,
  },
  codeLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  codeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderStyle: 'dashed',
  },
  codeText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'monospace',
    color: '#333',
  },
  copyButton: {
    backgroundColor: '#DE8389',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  copyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  termsSection: {
    marginBottom: 15,
  },
  termsTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  termItem: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 3,
    lineHeight: 16,
  },
  usePromoButton: {
    backgroundColor: '#DE8389',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  usePromoText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  upcomingCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#DE8389',
  },
  upcomingInfo: {
    flex: 1,
  },
  upcomingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  upcomingDesc: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  upcomingDate: {
    fontSize: 12,
    color: '#ffc107',
    fontWeight: '500',
  },
  upcomingTeaser: {
    fontSize: 24,
  },
  tipsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
  },
  tipsEmoji: {
    fontSize: 32,
    marginRight: 15,
  },
  tipsContent: {
    flex: 1,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  tipsList: {
    marginTop: 5,
  },
  tipItem: {
    fontSize: 13,
    color: '#555',
    marginBottom: 5,
    lineHeight: 18,
  },
  loyaltyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
  },
  loyaltyEmoji: {
    fontSize: 32,
    marginRight: 15,
  },
  loyaltyContent: {
    flex: 1,
  },
  loyaltyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  loyaltyDesc: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
    lineHeight: 20,
  },
  loyaltyBenefits: {
    marginBottom: 15,
  },
  benefitItem: {
    fontSize: 13,
    color: '#28a745',
    marginBottom: 5,
    lineHeight: 18,
  },
  joinButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
