import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ContactScreen() {
  const handleWhatsApp = () => {
    const phoneNumber = '+6281234567890';
    const message = 'Halo Lyana Bottle Studio, saya ingin bertanya tentang produk...';
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      // Fallback to web WhatsApp
      Linking.openURL(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`);
    });
  };

  const handleEmail = () => {
    const email = 'info@lyanabottlestudio.com';
    const subject = 'Pertanyaan Produk';
    const body = 'Halo Tim Lyana Bottle Studio,\n\nSaya ingin bertanya tentang...\n\nTerima kasih.';
    Linking.openURL(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const handleCall = () => {
    const phoneNumber = 'tel:+6281234567890';
    Linking.openURL(phoneNumber);
  };

  const handleInstagram = () => {
    Linking.openURL('https://instagram.com/lyanabottlestudio');
  };

  const handleTikTok = () => {
    Linking.openURL('https://tiktok.com/@lyanabottlestudio');
  };

  return (
    <LinearGradient
      colors={['#DE8389', '#B488BF']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Kembali</Text>
        </TouchableOpacity>
        <ThemedText style={styles.title}>Kontak Kami</ThemedText>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.heroSection}>
          <Text style={styles.heroEmoji}>📞</Text>
          <ThemedText style={styles.heroTitle}>Hubungi Kami</ThemedText>
          <Text style={styles.heroDesc}>
            Tim customer service kami siap membantu Anda dengan pertanyaan, 
            pesanan, atau masalah apapun terkait produk kami.
          </Text>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Kontak Utama</ThemedText>
          
          <TouchableOpacity style={styles.contactCard} onPress={handleWhatsApp}>
            <View style={styles.contactIcon}>
              <Text style={styles.contactEmoji}>💬</Text>
            </View>
            <View style={styles.contactInfo}>
              <ThemedText style={styles.contactTitle}>WhatsApp</ThemedText>
              <Text style={styles.contactDetail}>+62 812-3456-7890</Text>
              <Text style={styles.contactDesc}>Chat langsung dengan tim CS kami</Text>
              <Text style={styles.contactStatus}>🟢 Online: 09:00-17:00 WIB</Text>
            </View>
            <Text style={styles.contactArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard} onPress={handleCall}>
            <View style={styles.contactIcon}>
              <Text style={styles.contactEmoji}>📞</Text>
            </View>
            <View style={styles.contactInfo}>
              <ThemedText style={styles.contactTitle}>Telepon</ThemedText>
              <Text style={styles.contactDetail}>+62 812-3456-7890</Text>
              <Text style={styles.contactDesc}>Hubungi langsung untuk konsultasi</Text>
              <Text style={styles.contactStatus}>📅 Senin-Sabtu: 09:00-17:00 WIB</Text>
            </View>
            <Text style={styles.contactArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard} onPress={handleEmail}>
            <View style={styles.contactIcon}>
              <Text style={styles.contactEmoji}>📧</Text>
            </View>
            <View style={styles.contactInfo}>
              <ThemedText style={styles.contactTitle}>Email</ThemedText>
              <Text style={styles.contactDetail}>info@lyanabottlestudio.com</Text>
              <Text style={styles.contactDesc}>Kirim pertanyaan detail via email</Text>
              <Text style={styles.contactStatus}>⏱️ Response: 2-4 jam kerja</Text>
            </View>
            <Text style={styles.contactArrow}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Media Sosial</ThemedText>
          
          <TouchableOpacity style={styles.socialCard} onPress={handleInstagram}>
            <View style={styles.socialIcon}>
              <Text style={styles.socialEmoji}>📷</Text>
            </View>
            <View style={styles.socialInfo}>
              <ThemedText style={styles.socialTitle}>Instagram</ThemedText>
              <Text style={styles.socialHandle}>@lyanabottlestudio</Text>
              <Text style={styles.socialDesc}>Follow untuk update produk terbaru & behind the scenes</Text>
            </View>
            <Text style={styles.socialArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialCard} onPress={handleTikTok}>
            <View style={styles.socialIcon}>
              <Text style={styles.socialEmoji}>🎵</Text>
            </View>
            <View style={styles.socialInfo}>
              <ThemedText style={styles.socialTitle}>TikTok</ThemedText>
              <Text style={styles.socialHandle}>@lyanabottlestudio</Text>
              <Text style={styles.socialDesc}>Video tips, review produk & konten menarik lainnya</Text>
            </View>
            <Text style={styles.socialArrow}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Alamat Kantor</ThemedText>
          
          <View style={styles.addressCard}>
            <Text style={styles.addressIcon}>📍</Text>
            <View style={styles.addressInfo}>
              <ThemedText style={styles.addressTitle}>Lyana Bottle Studio</ThemedText>
              <Text style={styles.addressDetail}>
                Jl. Merdeka Raya No. 123{'\n'}
                Kelurahan Kemang{'\n'}
                Kecamatan Kemang{'\n'}
                Jakarta Selatan 12560{'\n'}
                DKI Jakarta, Indonesia
              </Text>
              <View style={styles.addressNote}>
                <Text style={styles.noteTitle}>📝 Catatan Penting:</Text>
                <Text style={styles.noteText}>
                  • Buka untuk kunjungan: Senin-Jumat 10:00-16:00 WIB{'\n'}
                  • Harap buat janji temu terlebih dahulu{'\n'}
                  • Tersedia tempat parkir terbatas
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Kontak Khusus</ThemedText>
          
          <View style={styles.specialContactCard}>
            <Text style={styles.specialIcon}>🛒</Text>
            <View style={styles.specialInfo}>
              <ThemedText style={styles.specialTitle}>Customer Service</ThemedText>
              <Text style={styles.specialDesc}>Untuk pertanyaan umum, pesanan, dan bantuan</Text>
              <Text style={styles.specialDetail}>cs@lyanabottlestudio.com</Text>
            </View>
          </View>

          <View style={styles.specialContactCard}>
            <Text style={styles.specialIcon}>📦</Text>
            <View style={styles.specialInfo}>
              <ThemedText style={styles.specialTitle}>Pengiriman & Return</ThemedText>
              <Text style={styles.specialDesc}>Untuk masalah pengiriman dan pengembalian</Text>
              <Text style={styles.specialDetail}>shipping@lyanabottlestudio.com</Text>
            </View>
          </View>

          <View style={styles.specialContactCard}>
            <Text style={styles.specialIcon}>🎨</Text>
            <View style={styles.specialInfo}>
              <ThemedText style={styles.specialTitle}>Custom Design</ThemedText>
              <Text style={styles.specialDesc}>Untuk konsultasi design custom tumbler</Text>
              <Text style={styles.specialDetail}>custom@lyanabottlestudio.com</Text>
            </View>
          </View>

          <View style={styles.specialContactCard}>
            <Text style={styles.specialIcon}>🏢</Text>
            <View style={styles.specialInfo}>
              <ThemedText style={styles.specialTitle}>Kerjasama & Partnership</ThemedText>
              <Text style={styles.specialDesc}>Untuk proposal bisnis dan kerjasama</Text>
              <Text style={styles.specialDetail}>partnership@lyanabottlestudio.com</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Jam Operasional</ThemedText>
          
          <View style={styles.scheduleCard}>
            <View style={styles.scheduleHeader}>
              <Text style={styles.scheduleIcon}>🕒</Text>
              <ThemedText style={styles.scheduleTitle}>Jadwal Layanan Customer Service</ThemedText>
            </View>
            <View style={styles.scheduleList}>
              <View style={styles.scheduleItem}>
                <Text style={styles.scheduleDay}>Senin - Jumat</Text>
                <Text style={styles.scheduleTime}>09:00 - 17:00 WIB</Text>
              </View>
              <View style={styles.scheduleItem}>
                <Text style={styles.scheduleDay}>Sabtu</Text>
                <Text style={styles.scheduleTime}>09:00 - 15:00 WIB</Text>
              </View>
              <View style={styles.scheduleItem}>
                <Text style={styles.scheduleDay}>Minggu & Libur</Text>
                <Text style={styles.scheduleTime}>Tutup</Text>
              </View>
            </View>
            <Text style={styles.scheduleNote}>
              ⚡ Fast response WhatsApp dalam 15-30 menit saat jam operasional
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>FAQ Kontak</ThemedText>
          
          <View style={styles.faqCard}>
            <View style={styles.faqItem}>
              <ThemedText style={styles.faqQuestion}>Q: Berapa lama response time customer service?</ThemedText>
              <Text style={styles.faqAnswer}>
                A: WhatsApp 15-30 menit, Email 2-4 jam, Telepon langsung tersambung saat jam operasional.
              </Text>
            </View>

            <View style={styles.faqItem}>
              <ThemedText style={styles.faqQuestion}>Q: Apakah bisa berkunjung langsung ke kantor?</ThemedText>
              <Text style={styles.faqAnswer}>
                A: Ya, tapi harap buat janji temu terlebih dahulu via WhatsApp untuk memastikan tim tersedia.
              </Text>
            </View>

            <View style={styles.faqItem}>
              <ThemedText style={styles.faqQuestion}>Q: Bahasa apa saja yang didukung?</ThemedText>
              <Text style={styles.faqAnswer}>
                A: Tim kami melayani dalam Bahasa Indonesia dan English untuk customer internasional.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.quickActionSection}>
          <ThemedText style={styles.quickActionTitle}>Aksi Cepat</ThemedText>
          <View style={styles.quickActionGrid}>
            <TouchableOpacity style={styles.quickActionButton} onPress={handleWhatsApp}>
              <Text style={styles.quickActionEmoji}>💬</Text>
              <Text style={styles.quickActionText}>Chat WA</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton} onPress={handleCall}>
              <Text style={styles.quickActionEmoji}>📞</Text>
              <Text style={styles.quickActionText}>Telepon</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton} onPress={handleEmail}>
              <Text style={styles.quickActionEmoji}>📧</Text>
              <Text style={styles.quickActionText}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton} onPress={() => router.push('/support')}>
              <Text style={styles.quickActionEmoji}>❓</Text>
              <Text style={styles.quickActionText}>FAQ</Text>
            </TouchableOpacity>
          </View>
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
  heroSection: {
    backgroundColor: '#007bff',
    borderRadius: 15,
    padding: 30,
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
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  heroDesc: {
    fontSize: 14,
    color: '#e3f2fd',
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  contactCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  contactIcon: {
    marginRight: 15,
  },
  contactEmoji: {
    fontSize: 24,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactDetail: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: '500',
    marginBottom: 4,
  },
  contactDesc: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 4,
  },
  contactStatus: {
    fontSize: 11,
    color: '#28a745',
  },
  contactArrow: {
    fontSize: 18,
    color: '#6c757d',
  },
  socialCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  socialIcon: {
    marginRight: 12,
  },
  socialEmoji: {
    fontSize: 20,
  },
  socialInfo: {
    flex: 1,
  },
  socialTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  socialHandle: {
    fontSize: 13,
    color: '#007bff',
    fontWeight: '500',
    marginBottom: 4,
  },
  socialDesc: {
    fontSize: 11,
    color: '#6c757d',
  },
  socialArrow: {
    fontSize: 16,
    color: '#6c757d',
  },
  addressCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  addressIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  addressInfo: {
    flex: 1,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  addressDetail: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 22,
    marginBottom: 15,
  },
  addressNote: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
  },
  noteTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  noteText: {
    fontSize: 11,
    color: '#6c757d',
    lineHeight: 16,
  },
  specialContactCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  specialIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  specialInfo: {
    flex: 1,
  },
  specialTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  specialDesc: {
    fontSize: 11,
    color: '#6c757d',
    marginBottom: 4,
  },
  specialDetail: {
    fontSize: 12,
    color: '#007bff',
    fontWeight: '500',
  },
  scheduleCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  scheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  scheduleIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  scheduleList: {
    marginBottom: 15,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  scheduleDay: {
    fontSize: 14,
    color: '#495057',
  },
  scheduleTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007bff',
  },
  scheduleNote: {
    fontSize: 12,
    color: '#28a745',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  faqCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  faqItem: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  faqQuestion: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
    color: '#007bff',
  },
  faqAnswer: {
    fontSize: 12,
    color: '#495057',
    lineHeight: 18,
  },
  quickActionSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  quickActionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickActionButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
    minWidth: 70,
  },
  quickActionEmoji: {
    fontSize: 20,
    marginBottom: 5,
  },
  quickActionText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#495057',
  },
  bottomSpace: {
    height: 50,
  },
});
