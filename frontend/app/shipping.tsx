import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ShippingScreen() {
  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="arrow.left" size={24} color="#fff" />
        </Pressable>
        <ThemedText style={styles.headerTitle}>Kebijakan Pengiriman</ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.introSection}>
          <Text style={styles.introEmoji}>📦</Text>
          <ThemedText style={styles.introTitle}>Kebijakan Pengiriman</ThemedText>
          <Text style={styles.introText}>
            Kami berkomitmen untuk memberikan layanan pengiriman yang cepat, aman, dan terpercaya 
            untuk semua produk Lyana Bottle Studio.
          </Text>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Estimasi Waktu Pengiriman</ThemedText>
          
          <View style={styles.shippingZone}>
            <View style={styles.zoneHeader}>
              <Text style={styles.zoneIcon}>🏙️</Text>
              <ThemedText style={styles.zoneName}>Jabodetabek</ThemedText>
            </View>
            <View style={styles.zoneDetails}>
              <Text style={styles.zoneTime}>2-3 hari kerja</Text>
              <Text style={styles.zoneDesc}>Jakarta, Bogor, Depok, Tangerang, Bekasi</Text>
            </View>
          </View>

          <View style={styles.shippingZone}>
            <View style={styles.zoneHeader}>
              <Text style={styles.zoneIcon}>🏝️</Text>
              <ThemedText style={styles.zoneName}>Jawa & Bali</ThemedText>
            </View>
            <View style={styles.zoneDetails}>
              <Text style={styles.zoneTime}>3-5 hari kerja</Text>
              <Text style={styles.zoneDesc}>Bandung, Yogyakarta, Surabaya, Denpasar, dll</Text>
            </View>
          </View>

          <View style={styles.shippingZone}>
            <View style={styles.zoneHeader}>
              <Text style={styles.zoneIcon}>🌴</Text>
              <ThemedText style={styles.zoneName}>Sumatera & Kalimantan</ThemedText>
            </View>
            <View style={styles.zoneDetails}>
              <Text style={styles.zoneTime}>4-7 hari kerja</Text>
              <Text style={styles.zoneDesc}>Medan, Palembang, Balikpapan, Pontianak, dll</Text>
            </View>
          </View>

          <View style={styles.shippingZone}>
            <View style={styles.zoneHeader}>
              <Text style={styles.zoneIcon}>🏔️</Text>
              <ThemedText style={styles.zoneName}>Sulawesi, Maluku & Papua</ThemedText>
            </View>
            <View style={styles.zoneDetails}>
              <Text style={styles.zoneTime}>5-10 hari kerja</Text>
              <Text style={styles.zoneDesc}>Makassar, Manado, Ambon, Jayapura, dll</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Biaya Pengiriman</ThemedText>
          
          <View style={styles.freeShippingCard}>
            <Text style={styles.freeShippingIcon}>🚚</Text>
            <View style={styles.freeShippingInfo}>
              <ThemedText style={styles.freeShippingTitle}>GRATIS ONGKIR</ThemedText>
              <Text style={styles.freeShippingDesc}>
                Untuk pembelian minimal Rp 150.000 ke seluruh Indonesia
              </Text>
            </View>
          </View>

          <View style={styles.shippingRates}>
            <ThemedText style={styles.ratesTitle}>Tarif Reguler (untuk pembelian di bawah Rp 150.000)</ThemedText>
            <View style={styles.rateItem}>
              <Text style={styles.rateZone}>Jabodetabek</Text>
              <Text style={styles.ratePrice}>Rp 15.000</Text>
            </View>
            <View style={styles.rateItem}>
              <Text style={styles.rateZone}>Jawa & Bali</Text>
              <Text style={styles.ratePrice}>Rp 20.000</Text>
            </View>
            <View style={styles.rateItem}>
              <Text style={styles.rateZone}>Sumatera & Kalimantan</Text>
              <Text style={styles.ratePrice}>Rp 25.000</Text>
            </View>
            <View style={styles.rateItem}>
              <Text style={styles.rateZone}>Sulawesi, Maluku & Papua</Text>
              <Text style={styles.ratePrice}>Rp 35.000</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Kurir & Ekspedisi</ThemedText>
          
          <View style={styles.courierGrid}>
            <View style={styles.courierCard}>
              <ThemedText style={styles.courierName}>JNE</ThemedText>
              <Text style={styles.courierDesc}>Reguler & Express</Text>
            </View>
            <View style={styles.courierCard}>
              <ThemedText style={styles.courierName}>J&T</ThemedText>
              <Text style={styles.courierDesc}>Reguler & Express</Text>
            </View>
            <View style={styles.courierCard}>
              <ThemedText style={styles.courierName}>SiCepat</ThemedText>
              <Text style={styles.courierDesc}>Reguler & HALU</Text>
            </View>
            <View style={styles.courierCard}>
              <ThemedText style={styles.courierName}>AnterAja</ThemedText>
              <Text style={styles.courierDesc}>Reguler & Same Day</Text>
            </View>
          </View>

          <View style={styles.expressSection}>
            <ThemedText style={styles.expressTitle}>Layanan Express (Same Day/Next Day)</ThemedText>
            <Text style={styles.expressDesc}>
              Tersedia untuk area Jabodetabek dengan biaya tambahan Rp 25.000. 
              Pemesanan sebelum jam 12:00 WIB.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Proses Pengiriman</ThemedText>
          
          <View style={styles.processSteps}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <ThemedText style={styles.stepTitle}>Konfirmasi Pembayaran</ThemedText>
                <Text style={styles.stepDesc}>Verifikasi pembayaran dalam 1-2 jam kerja</Text>
              </View>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <ThemedText style={styles.stepTitle}>Persiapan Pesanan</ThemedText>
                <Text style={styles.stepDesc}>Packaging dan quality check produk</Text>
              </View>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <ThemedText style={styles.stepTitle}>Pengiriman</ThemedText>
                <Text style={styles.stepDesc}>Produk dikirim dengan kurir terpilih</Text>
              </View>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <View style={styles.stepContent}>
                <ThemedText style={styles.stepTitle}>Tracking</ThemedText>
                <Text style={styles.stepDesc}>Nomor resi dikirim via WhatsApp/email</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Ketentuan Khusus</ThemedText>
          
          <View style={styles.specialTerms}>
            <View style={styles.termItem}>
              <Text style={styles.termIcon}>🎨</Text>
              <View style={styles.termContent}>
                <ThemedText style={styles.termTitle}>Produk Custom</ThemedText>
                <Text style={styles.termDesc}>
                  Waktu produksi 3-5 hari kerja sebelum pengiriman. 
                  Tidak dapat dibatalkan setelah proses produksi dimulai.
                </Text>
              </View>
            </View>

            <View style={styles.termItem}>
              <Text style={styles.termIcon}>📦</Text>
              <View style={styles.termContent}>
                <ThemedText style={styles.termTitle}>Bundling Package</ThemedText>
                <Text style={styles.termDesc}>
                  Gratis upgrade ke packaging premium dan prioritas pengiriman. 
                  Estimasi waktu sama dengan produk reguler.
                </Text>
              </View>
            </View>

            <View style={styles.termItem}>
              <Text style={styles.termIcon}>🎁</Text>
              <View style={styles.termContent}>
                <ThemedText style={styles.termTitle}>Gift Wrapping</ThemedText>
                <Text style={styles.termDesc}>
                  Layanan gift wrapping gratis untuk semua pesanan. 
                  Tambahan waktu persiapan 1 hari kerja.
                </Text>
              </View>
            </View>

            <View style={styles.termItem}>
              <Text style={styles.termIcon}>🏝️</Text>
              <View style={styles.termContent}>
                <ThemedText style={styles.termTitle}>Area Terpencil</ThemedText>
                <Text style={styles.termDesc}>
                  Untuk area terpencil mungkin memerlukan waktu tambahan 1-3 hari. 
                  Konfirmasi akan diberikan saat checkout.
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Kebijakan Force Majeure</ThemedText>
          <Text style={styles.forceText}>
            Pengiriman dapat tertunda akibat faktor di luar kendali kami seperti:
          </Text>
          <View style={styles.forceList}>
            <Text style={styles.forceItem}>• Bencana alam (gempa, banjir, dll)</Text>
            <Text style={styles.forceItem}>• Cuaca ekstrem yang mengganggu transportasi</Text>
            <Text style={styles.forceItem}>• Kebijakan pemerintah (PSBB, lockdown, dll)</Text>
            <Text style={styles.forceItem}>• Gangguan teknis pada sistem kurir</Text>
            <Text style={styles.forceItem}>• Hari libur nasional dan cuti bersama</Text>
          </View>
          <Text style={styles.forceNote}>
            Dalam kondisi tersebut, kami akan memberikan update dan estimasi baru kepada pelanggan.
          </Text>
        </View>

        <View style={styles.trackingSection}>
          <ThemedText style={styles.trackingTitle}>Cara Tracking Pesanan</ThemedText>
          <View style={styles.trackingSteps}>
            <Text style={styles.trackingStep}>1. Tunggu nomor resi dari kami (maks 24 jam setelah pembayaran)</Text>
            <Text style={styles.trackingStep}>2. Kunjungi website kurir atau gunakan aplikasi mereka</Text>
            <Text style={styles.trackingStep}>3. Masukkan nomor resi untuk melihat status pengiriman</Text>
            <Text style={styles.trackingStep}>4. Hubungi kami jika ada kendala atau pertanyaan</Text>
          </View>
        </View>

        <View style={styles.contactSection}>
          <ThemedText style={styles.contactTitle}>Bantuan Pengiriman</ThemedText>
          <Text style={styles.contactDesc}>
            Ada kendala dengan pengiriman? Tim customer service kami siap membantu:
          </Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactItem}>📱 WhatsApp: +62 812-3456-7890</Text>
            <Text style={styles.contactItem}>📧 Email: shipping@lyanabottlestudio.com</Text>
            <Text style={styles.contactItem}>🕒 Senin-Sabtu: 09:00-17:00 WIB</Text>
          </View>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#DE8389',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  introSection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  introEmoji: {
    fontSize: 48,
    marginBottom: 15,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    color: '#333',
  },
  introText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  shippingZone: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  zoneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  zoneIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  zoneName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  zoneDetails: {
    marginLeft: 30,
  },
  zoneTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DE8389',
    marginBottom: 4,
  },
  zoneDesc: {
    fontSize: 12,
    color: '#555',
  },
  freeShippingCard: {
    backgroundColor: '#e8f5e8',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#c3e6c3',
  },
  freeShippingIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  freeShippingInfo: {
    flex: 1,
  },
  freeShippingTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#28a745',
    marginBottom: 5,
  },
  freeShippingDesc: {
    fontSize: 13,
    color: '#155724',
    lineHeight: 18,
  },
  shippingRates: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
  },
  ratesTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  rateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  rateZone: {
    fontSize: 13,
    color: '#333',
  },
  ratePrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#DE8389',
  },
  courierGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
  },
  courierCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  courierName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  courierDesc: {
    fontSize: 11,
    color: '#555',
    textAlign: 'center',
  },
  expressSection: {
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ffeaa7',
  },
  expressTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#856404',
    marginBottom: 8,
  },
  expressDesc: {
    fontSize: 12,
    color: '#856404',
    lineHeight: 18,
  },
  processSteps: {
    marginTop: 10,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  stepDesc: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
  },
  specialTerms: {
    marginTop: 10,
  },
  termItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  termIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  termContent: {
    flex: 1,
  },
  termTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  termDesc: {
    fontSize: 12,
    color: '#555',
    lineHeight: 16,
  },
  forceText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
    lineHeight: 20,
  },
  forceList: {
    marginBottom: 15,
  },
  forceItem: {
    fontSize: 12,
    color: '#555',
    marginBottom: 6,
    lineHeight: 18,
  },
  forceNote: {
    fontSize: 12,
    color: '#333',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  trackingSection: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#bbdefb',
  },
  trackingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  trackingSteps: {
    marginTop: 5,
  },
  trackingStep: {
    fontSize: 13,
    color: '#333',
    marginBottom: 8,
    lineHeight: 18,
  },
  contactSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  contactDesc: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
    lineHeight: 20,
  },
  contactInfo: {
    marginTop: 10,
  },
  contactItem: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8,
    lineHeight: 18,
  },
  bottomSpace: {
    height: 50,
  },
});
