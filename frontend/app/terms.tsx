import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TermsScreen() {
  return (
    <LinearGradient
      colors={['#DE8389', '#B488BF']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Kembali</Text>
        </TouchableOpacity>
        <ThemedText style={styles.title}>Syarat & Ketentuan</ThemedText>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.introSection}>
          <ThemedText style={styles.introTitle}>Syarat & Ketentuan Penggunaan</ThemedText>
          <Text style={styles.introText}>
            Selamat datang di Lyana Bottle Studio. Dengan menggunakan aplikasi dan layanan kami, 
            Anda menyetujui syarat dan ketentuan yang berlaku di bawah ini.
          </Text>
          <Text style={styles.lastUpdated}>Terakhir diperbarui: 1 Januari 2025</Text>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>1. Definisi</ThemedText>
          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>1.1 Definisi Umum</Text>
            <Text style={styles.text}>
              • "Kami", "Lyana Bottle Studio" merujuk pada penyedia layanan e-commerce tumbler dan aksesoris{'\n'}
              • "Anda", "Pengguna" merujuk pada individu yang menggunakan aplikasi atau website kami{'\n'}
              • "Produk" merujuk pada tumbler, gantungan kunci, dan produk lainnya yang dijual{'\n'}
              • "Layanan" merujuk pada platform e-commerce dan layanan terkait lainnya
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>2. Ketentuan Umum</ThemedText>
          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>2.1 Kelayakan Pengguna</Text>
            <Text style={styles.text}>
              • Anda harus berusia minimal 17 tahun atau memiliki izin dari orang tua/wali{'\n'}
              • Anda bertanggung jawab untuk memberikan informasi yang akurat dan lengkap{'\n'}
              • Satu akun per pengguna, dilarang membuat akun ganda
            </Text>
          </View>
          
          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>2.2 Penggunaan Platform</Text>
            <Text style={styles.text}>
              • Platform hanya boleh digunakan untuk tujuan yang sah dan legal{'\n'}
              • Dilarang melakukan aktivitas yang dapat merusak sistem atau merugikan pengguna lain{'\n'}
              • Kami berhak menangguhkan akun yang melanggar ketentuan
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>3. Pemesanan & Pembayaran</ThemedText>
          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>3.1 Proses Pemesanan</Text>
            <Text style={styles.text}>
              • Pesanan dianggap sah setelah pembayaran berhasil diverifikasi{'\n'}
              • Kami berhak menolak pesanan yang mencurigakan atau tidak sesuai{'\n'}
              • Konfirmasi pesanan akan dikirim melalui email/WhatsApp
            </Text>
          </View>
          
          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>3.2 Pembayaran</Text>
            <Text style={styles.text}>
              • Pembayaran dapat dilakukan melalui transfer bank, e-wallet, atau metode lain yang tersedia{'\n'}
              • Pembayaran harus dilakukan dalam waktu 24 jam setelah pemesanan{'\n'}
              • Pesanan akan dibatalkan otomatis jika pembayaran tidak diterima dalam batas waktu
            </Text>
          </View>
          
          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>3.3 Harga</Text>
            <Text style={styles.text}>
              • Harga dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya{'\n'}
              • Harga yang berlaku adalah harga pada saat pemesanan dikonfirmasi{'\n'}
              • Semua harga sudah termasuk pajak yang berlaku
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>4. Pengiriman</ThemedText>
          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>4.1 Waktu Pengiriman</Text>
            <Text style={styles.text}>
              • Estimasi pengiriman 2-5 hari kerja untuk area Jabodetabek{'\n'}
              • 3-7 hari kerja untuk area luar Jabodetabek{'\n'}
              • Pengiriman tidak dilakukan pada hari libur nasional
            </Text>
          </View>
          
          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>4.2 Biaya Pengiriman</Text>
            <Text style={styles.text}>
              • Gratis ongkir untuk pembelian di atas Rp 150.000{'\n'}
              • Biaya pengiriman dihitung berdasarkan jarak dan berat produk{'\n'}
              • Biaya pengiriman akan ditampilkan saat checkout
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>5. Pengembalian & Penukaran</ThemedText>
          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>5.1 Kebijakan Pengembalian</Text>
            <Text style={styles.text}>
              • Pengembalian dapat dilakukan dalam 7 hari setelah produk diterima{'\n'}
              • Produk harus dalam kondisi asli dan belum digunakan{'\n'}
              • Kemasan dan label masih utuh dan lengkap
            </Text>
          </View>
          
          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>5.2 Penukaran</Text>
            <Text style={styles.text}>
              • Penukaran hanya berlaku untuk produk cacat atau salah kirim{'\n'}
              • Biaya pengiriman penukaran ditanggung oleh kami{'\n'}
              • Proses penukaran maksimal 14 hari kerja
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>6. Hak Kekayaan Intelektual</ThemedText>
          <Text style={styles.text}>
            • Semua konten, design, dan merek dagang adalah milik Lyana Bottle Studio{'\n'}
            • Dilarang menggunakan konten kami tanpa izin tertulis{'\n'}
            • Pelanggaran hak cipta akan ditindak sesuai hukum yang berlaku
          </Text>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>7. Privasi & Data Pribadi</ThemedText>
          <Text style={styles.text}>
            • Data pribadi Anda akan dijaga kerahasiaannya sesuai kebijakan privasi{'\n'}
            • Data hanya digunakan untuk proses transaksi dan komunikasi{'\n'}
            • Kami tidak akan membagikan data Anda kepada pihak ketiga tanpa persetujuan
          </Text>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>8. Pembatasan Tanggung Jawab</ThemedText>
          <Text style={styles.text}>
            • Kami tidak bertanggung jawab atas kerugian tidak langsung{'\n'}
            • Tanggung jawab kami terbatas pada nilai produk yang dibeli{'\n'}
            • Force majeure dan hal di luar kendali kami dikecualikan dari tanggung jawab
          </Text>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>9. Perubahan Syarat & Ketentuan</ThemedText>
          <Text style={styles.text}>
            • Syarat dan ketentuan dapat berubah sewaktu-waktu{'\n'}
            • Perubahan akan diinformasikan melalui aplikasi atau email{'\n'}
            • Penggunaan berkelanjutan dianggap sebagai persetujuan terhadap perubahan
          </Text>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>10. Hukum yang Berlaku</ThemedText>
          <Text style={styles.text}>
            • Syarat dan ketentuan ini tunduk pada hukum Republik Indonesia{'\n'}
            • Setiap sengketa akan diselesaikan melalui musyawarah terlebih dahulu{'\n'}
            • Jika tidak tercapai kesepakatan, sengketa akan diselesaikan di Pengadilan Jakarta Selatan
          </Text>
        </View>

        <View style={styles.contactSection}>
          <ThemedText style={styles.contactTitle}>Kontak Kami</ThemedText>
          <Text style={styles.contactText}>
            Jika ada pertanyaan mengenai syarat dan ketentuan ini, silakan hubungi kami:
          </Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactItem}>📧 Email: info@lyanabottlestudio.com</Text>
            <Text style={styles.contactItem}>📱 WhatsApp: +62 812-3456-7890</Text>
            <Text style={styles.contactItem}>🕒 Jam Operasional: Senin-Sabtu 09:00-17:00 WIB</Text>
          </View>
        </View>

        <View style={styles.agreementSection}>
          <ThemedText style={styles.agreementTitle}>Persetujuan</ThemedText>
          <Text style={styles.agreementText}>
            Dengan menggunakan layanan Lyana Bottle Studio, Anda menyatakan telah membaca, 
            memahami, dan menyetujui seluruh syarat dan ketentuan yang berlaku.
          </Text>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    marginRight: 15,
    padding: 8,
  },
  backText: {
    fontSize: 16,
    color: '#007bff',
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
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  introTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    color: '#007bff',
  },
  introText: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 22,
    marginBottom: 15,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#6c757d',
    fontStyle: 'italic',
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
    color: '#007bff',
  },
  subsection: {
    marginBottom: 15,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#495057',
  },
  text: {
    fontSize: 13,
    color: '#495057',
    lineHeight: 20,
  },
  contactSection: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#bbdefb',
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#007bff',
  },
  contactText: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 15,
    lineHeight: 20,
  },
  contactInfo: {
    marginTop: 10,
  },
  contactItem: {
    fontSize: 13,
    color: '#495057',
    marginBottom: 8,
    lineHeight: 18,
  },
  agreementSection: {
    backgroundColor: '#fff3cd',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ffeaa7',
    marginBottom: 20,
  },
  agreementTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#856404',
  },
  agreementText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 22,
    fontWeight: '500',
  },
  bottomSpace: {
    height: 50,
  },
});
