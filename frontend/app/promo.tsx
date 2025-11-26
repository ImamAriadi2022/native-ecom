import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PromoScreen() {
  console.log('PromoScreen loaded successfully');
  
  const handleCopyCode = (code: string) => {
    Alert.alert(
      'Kode Promo',
      `Kode: ${code}\n\nSalin kode ini untuk mendapatkan diskon!`,
      [
        { text: 'OK', style: 'default' }
      ]
    );
  };

  const handleJoinLoyalty = () => {
    Alert.alert(
      'Join Loyalty Program',
      'Bergabung dengan program loyalitas untuk mendapatkan benefit eksklusif?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Join Sekarang',
          onPress: () => {
            Alert.alert('Welcome!', 'Selamat! Anda sekarang adalah member loyalty Lyana Bottle Studio');
          }
        }
      ]
    );
  };

  // Image mapping untuk static imports
  const getImageSource = (imageName: string) => {
    const imageMap: { [key: string]: any } = {
      'tumbler cream.jpg': require('../assets/images/tumbler cream.jpg'),
      'tumbler pink1.jpg': require('../assets/images/tumbler pink1.jpg'),
      'tumbler hijau2.jpg': require('../assets/images/tumbler hijau2.jpg'),
      'tumbler ungu.jpg': require('../assets/images/tumbler ungu.jpg'),
      'tumbler oren.jpg': require('../assets/images/tumbler oren.jpg'),
      'tumbler khaki.jpg': require('../assets/images/tumbler khaki.jpg'),
      'jerapah.png': require('../assets/images/jerapah.png'),
      'kupu.png': require('../assets/images/kupu.png'),
      'monyet.png': require('../assets/images/monyet.png'),
      'meong.png': require('../assets/images/meong.png'),
      'gantungan1.jpg': require('../assets/images/gantungan1.jpg'),
      'gantungan2.jpg': require('../assets/images/gantungan2.jpg'),
      'gantungan3.jpg': require('../assets/images/gantungan3.jpg'),
      'gantungan4.jpg': require('../assets/images/gantungan4.jpg'),
      'gantungan5.jpg': require('../assets/images/gantungan5.jpg'),
      'bundling1.jpg': require('../assets/images/bundling1.jpg'),
      'bundling2.jpg': require('../assets/images/bundling2.jpg'),
      'bundling3.jpg': require('../assets/images/bundling3.jpg'),
      'masseto.jpg': require('../assets/images/masseto.jpg'),
      'react-logo.png': require('../assets/images/react-logo.png'),
    };
    return imageMap[imageName] || imageMap['react-logo.png'];
  };

  const promos = [
    {
      id: '1',
      title: 'Disney Collection 25% OFF',
      description: 'Diskon 25% untuk semua tumbler Disney Collection!',
      discount: '25%',
      validUntil: '31 Maret 2025',
      code: 'DISNEY25',
      image: 'tumbler pink1.jpg', // Tumbler Disney untuk promo
      terms: ['Berlaku untuk semua produk Disney', 'Minimal pembelian Rp 150.000', 'Tidak dapat digabung dengan promo lain']
    },
    {
      id: '2',
      title: 'Hot Wheels Super Promo',
      description: 'Diskon 30% untuk koleksi Hot Wheels Racing!',
      discount: '30%',
      validUntil: '30 April 2025',
      code: 'HOTWHEELS30',
      image: 'tumbler oren.jpg', // Tumbler Hot Wheels untuk promo
      terms: ['Berlaku untuk semua produk Hot Wheels', 'Produk limited edition', 'Stok terbatas']
    },
    {
      id: '3',
      title: 'Disney Spring Bundle',
      description: 'Paket 2 tumbler Disney Spring + 1 gantungan kunci cuma Rp 299.000!',
      discount: 'Rp 299K',
      validUntil: '30 Juni 2025',
      code: 'SPRINGBUNDLE',
      image: 'bundling1.jpg', // Gambar bundling Disney Spring
      terms: ['Hemat hingga Rp 80.000', 'Karakter Disney sesuai ketersediaan', 'Gratis ongkir seluruh Indonesia']
    },
    {
      id: '4',
      title: 'Collector Special Deal',
      description: 'Beli 3 tumbler karakter berbeda, gratis 1 tumbler pilihan!',
      discount: 'B3G1',
      validUntil: '31 Mei 2025',
      code: 'COLLECTOR4',
      image: 'tumbler ungu.jpg', // Tumbler collector edition
      terms: ['Berlaku untuk Disney & Hot Wheels', 'Karakter berbeda wajib', 'Gratis tumbler sesuai stok']
    },
    {
      id: '5',
      title: 'Character Custom FREE',
      description: 'Gratis custom nama karakter untuk tumbler premium!',
      discount: 'GRATIS',
      validUntil: '31 Juli 2025',
      code: 'CUSTOMCHAR',
      image: 'tumbler khaki.jpg', // Tumbler custom karakter
      terms: ['Berlaku untuk tumbler Disney & Hot Wheels', 'Maksimal 12 karakter', 'Design premium tersedia']
    }
  ];

  const upcomingPromos = [
    {
      title: 'Disney Summer Special',
      description: 'Koleksi musim panas dengan karakter Disney terbaru',
      startDate: '1 Juli 2025',
      teaser: 'Frozen, Moana coming! ❄️🌊'
    },
    {
      title: 'Hot Wheels Championship',
      description: 'Event balap Hot Wheels dengan tumbler edisi championship',
      startDate: '1 Agustus 2025',
      teaser: 'Formula 1 & NASCAR! 🏁'
    },
    {
      title: 'Disney Halloween Magic',
      description: 'Koleksi Halloween dengan tema Disney Villains',
      startDate: '15 Oktober 2025',
      teaser: 'Villains collection! 🎃'
    }
  ];

  return (
    <View style={[styles.container, styles.gradientBackground]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Kembali</Text>
        </TouchableOpacity>
        <ThemedText style={styles.title}>Promo & Penawaran</ThemedText>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.heroSection}>
          <Text style={styles.heroEmoji}>🎉</Text>
          <ThemedText style={styles.heroTitle}>Disney & Hot Wheels Promo!</ThemedText>
          <Text style={styles.heroDesc}>Koleksi eksklusif dengan penawaran terbaik untuk karakter favoritmu</Text>
          <View style={styles.heroTags}>
            <View style={styles.heroTag}>
              <Text style={styles.heroTagText}>🏰 Disney Magic</Text>
            </View>
            <View style={styles.heroTag}>
              <Text style={styles.heroTagText}>🏎️ Speed Racing</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Promo Aktif</ThemedText>
          {promos.map((promo) => (
            <View key={promo.id} style={styles.promoCard}>
              <View style={styles.promoHeader}>
                <Image 
                  source={getImageSource(promo.image)} 
                  style={styles.promoImage}
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
                  <TouchableOpacity 
                    style={styles.copyButton}
                    onPress={() => handleCopyCode(promo.code)}
                  >
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
              <View style={styles.upcomingHeader}>
                <ThemedText style={styles.upcomingTitle}>{promo.title}</ThemedText>
                <Text style={styles.upcomingDate}>Mulai: {promo.startDate}</Text>
              </View>
              <Text style={styles.upcomingDesc}>{promo.description}</Text>
              <View style={styles.upcomingFooter}>
                <Text style={styles.upcomingTeaser}>{promo.teaser}</Text>
              </View>
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
              <TouchableOpacity 
                style={styles.joinButton}
                onPress={handleJoinLoyalty}
              >
                <Text style={styles.joinButtonText}>Join Sekarang</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  gradientBackground: {
    backgroundColor: '#DE8389',
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
    marginTop: 20,
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
    marginBottom: 20,
  },
  heroTags: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  heroTag: {
    backgroundColor: '#DE8389',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  heroTagText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
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
    borderLeftWidth: 4,
    borderLeftColor: '#DE8389',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  upcomingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  upcomingFooter: {
    alignItems: 'center',
    marginTop: 15,
  },
  upcomingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  upcomingDesc: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 5,
  },
  upcomingDate: {
    fontSize: 12,
    color: '#DE8389',
    fontWeight: '600',
    backgroundColor: 'rgba(222, 131, 137, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    textAlign: 'center',
    minWidth: 80,
  },
  upcomingTeaser: {
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'rgba(222, 131, 137, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    color: '#DE8389',
    fontWeight: '600',
    overflow: 'hidden',
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
