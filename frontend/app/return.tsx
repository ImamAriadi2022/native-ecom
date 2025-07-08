import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ReturnScreen() {
  return (
    <View style={[styles.container, styles.gradientBackground]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Kembali</Text>
        </TouchableOpacity>
        <ThemedText style={styles.title}>Kebijakan Pengembalian</ThemedText>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.introSection}>
          <Text style={styles.introEmoji}>↩️</Text>
          <ThemedText style={styles.introTitle}>Kebijakan Pengembalian & Penukaran</ThemedText>
          <Text style={styles.introText}>
            Kepuasan Anda adalah prioritas kami. Jika produk tidak sesuai harapan, 
            kami siap membantu dengan kebijakan pengembalian yang fair dan mudah.
          </Text>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Kondisi Pengembalian</ThemedText>
          
          <View style={styles.conditionCard}>
            <Text style={styles.conditionIcon}>✅</Text>
            <View style={styles.conditionContent}>
              <ThemedText style={styles.conditionTitle}>Yang Dapat Dikembalikan</ThemedText>
              <View style={styles.conditionList}>
                <Text style={styles.conditionItem}>• Produk cacat atau rusak saat diterima</Text>
                <Text style={styles.conditionItem}>• Produk tidak sesuai dengan deskripsi</Text>
                <Text style={styles.conditionItem}>• Salah pengiriman produk</Text>
                <Text style={styles.conditionItem}>• Produk hilang atau rusak saat pengiriman</Text>
              </View>
            </View>
          </View>

          <View style={styles.conditionCard}>
            <Text style={styles.conditionIcon}>❌</Text>
            <View style={styles.conditionContent}>
              <ThemedText style={styles.conditionTitle}>Yang Tidak Dapat Dikembalikan</ThemedText>
              <View style={styles.conditionList}>
                <Text style={styles.conditionItem}>• Produk custom dengan nama/design personal</Text>
                <Text style={styles.conditionItem}>• Produk sudah digunakan atau kotor</Text>
                <Text style={styles.conditionItem}>• Kemasan rusak karena kelalaian pembeli</Text>
                <Text style={styles.conditionItem}>• Produk dibeli dengan diskon khusus (clearance sale)</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Periode Pengembalian</ThemedText>
          
          <View style={styles.periodCard}>
            <View style={styles.periodItem}>
              <Text style={styles.periodIcon}>📅</Text>
              <View style={styles.periodContent}>
                <ThemedText style={styles.periodTitle}>7 Hari Sejak Produk Diterima</ThemedText>
                <Text style={styles.periodDesc}>
                  Untuk produk reguler (tumbler, gantungan kunci) yang memenuhi syarat pengembalian
                </Text>
              </View>
            </View>

            <View style={styles.periodItem}>
              <Text style={styles.periodIcon}>⚡</Text>
              <View style={styles.periodContent}>
                <ThemedText style={styles.periodTitle}>24 Jam Sejak Produk Diterima</ThemedText>
                <Text style={styles.periodDesc}>
                  Untuk klaim produk rusak/cacat. Mohon foto dan video unboxing sebagai bukti
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Cara Mengajukan Pengembalian</ThemedText>
          
          <View style={styles.processSteps}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <ThemedText style={styles.stepTitle}>Hubungi Customer Service</ThemedText>
                <Text style={styles.stepDesc}>
                  Hubungi kami via WhatsApp atau email dengan nomor pesanan dan alasan pengembalian
                </Text>
              </View>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <ThemedText style={styles.stepTitle}>Kirim Bukti Pendukung</ThemedText>
                <Text style={styles.stepDesc}>
                  Foto/video produk yang bermasalah, kemasan, dan nota pembelian
                </Text>
              </View>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <ThemedText style={styles.stepTitle}>Verifikasi Tim Kami</ThemedText>
                <Text style={styles.stepDesc}>
                  Tim akan memverifikasi keluhan dan memberikan solusi dalam 1-2 hari kerja
                </Text>
              </View>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <View style={styles.stepContent}>
                <ThemedText style={styles.stepTitle}>Proses Pengembalian</ThemedText>
                <Text style={styles.stepDesc}>
                  Jika disetujui, kami akan memberikan label return gratis untuk pengiriman kembali
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Opsi Penyelesaian</ThemedText>
          
          <View style={styles.solutionCard}>
            <Text style={styles.solutionIcon}>🔄</Text>
            <View style={styles.solutionContent}>
              <ThemedText style={styles.solutionTitle}>Penukaran Produk</ThemedText>
              <Text style={styles.solutionDesc}>
                Tukar dengan produk serupa atau warna/ukuran berbeda. Gratis ongkir bolak-balik.
              </Text>
            </View>
          </View>

          <View style={styles.solutionCard}>
            <Text style={styles.solutionIcon}>💰</Text>
            <View style={styles.solutionContent}>
              <ThemedText style={styles.solutionTitle}>Refund Penuh</ThemedText>
              <Text style={styles.solutionDesc}>
                Dana dikembalikan 100% ke rekening/e-wallet dalam 3-7 hari kerja setelah produk kami terima.
              </Text>
            </View>
          </View>

          <View style={styles.solutionCard}>
            <Text style={styles.solutionIcon}>🎁</Text>
            <View style={styles.solutionContent}>
              <ThemedText style={styles.solutionTitle}>Store Credit</ThemedText>
              <Text style={styles.solutionDesc}>
                Dapat store credit + bonus 10% untuk pembelian berikutnya. Berlaku 6 bulan.
              </Text>
            </View>
          </View>

          <View style={styles.solutionCard}>
            <Text style={styles.solutionIcon}>🔧</Text>
            <View style={styles.solutionContent}>
              <ThemedText style={styles.solutionTitle}>Perbaikan Gratis</ThemedText>
              <Text style={styles.solutionDesc}>
                Untuk kerusakan minor yang masih bisa diperbaiki di workshop kami.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Waktu Proses</ThemedText>
          
          <View style={styles.timelineCard}>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot}></View>
              <View style={styles.timelineContent}>
                <ThemedText style={styles.timelineTitle}>Pengajuan</ThemedText>
                <Text style={styles.timelineDesc}>Keluhan diajukan via CS</Text>
                <Text style={styles.timelineTime}>Hari ke-0</Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={styles.timelineDot}></View>
              <View style={styles.timelineContent}>
                <ThemedText style={styles.timelineTitle}>Verifikasi</ThemedText>
                <Text style={styles.timelineDesc}>Tim mereview keluhan & bukti</Text>
                <Text style={styles.timelineTime}>1-2 hari kerja</Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={styles.timelineDot}></View>
              <View style={styles.timelineContent}>
                <ThemedText style={styles.timelineTitle}>Pengiriman Return</ThemedText>
                <Text style={styles.timelineDesc}>Produk dikirim kembali ke kami</Text>
                <Text style={styles.timelineTime}>2-5 hari kerja</Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={styles.timelineDot}></View>
              <View style={styles.timelineContent}>
                <ThemedText style={styles.timelineTitle}>Penyelesaian</ThemedText>
                <Text style={styles.timelineDesc}>Refund/penukaran diproses</Text>
                <Text style={styles.timelineTime}>1-3 hari kerja</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Biaya Pengembalian</ThemedText>
          
          <View style={styles.feeCard}>
            <View style={styles.feeItem}>
              <Text style={styles.feeIcon}>🆓</Text>
              <View style={styles.feeContent}>
                <ThemedText style={styles.feeTitle}>Gratis Ongkir Return</ThemedText>
                <Text style={styles.feeDesc}>
                  Jika kesalahan dari kami (produk cacat, salah kirim, dll)
                </Text>
              </View>
            </View>

            <View style={styles.feeItem}>
              <Text style={styles.feeIcon}>💸</Text>
              <View style={styles.feeContent}>
                <ThemedText style={styles.feeTitle}>Biaya Ditanggung Pembeli</ThemedText>
                <Text style={styles.feeDesc}>
                  Jika alasan pribadi (tidak suka, salah pilih ukuran/warna, dll). 
                  Sekitar Rp 15.000-25.000 tergantung lokasi.
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Ketentuan Khusus</ThemedText>
          
          <View style={styles.specialTerms}>
            <View style={styles.specialItem}>
              <Text style={styles.specialIcon}>🎨</Text>
              <View style={styles.specialContent}>
                <ThemedText style={styles.specialTitle}>Produk Custom</ThemedText>
                <Text style={styles.specialDesc}>
                  Hanya dapat dikembalikan jika ada kesalahan produksi atau kerusakan. 
                  Tidak dapat dikembalikan karena alasan design tidak sesuai selera.
                </Text>
              </View>
            </View>

            <View style={styles.specialItem}>
              <Text style={styles.specialIcon}>📦</Text>
              <View style={styles.specialContent}>
                <ThemedText style={styles.specialTitle}>Bundling Package</ThemedText>
                <Text style={styles.specialDesc}>
                  Harus dikembalikan secara utuh (semua item dalam bundle). 
                  Tidak bisa return sebagian item saja.
                </Text>
              </View>
            </View>

            <View style={styles.specialItem}>
              <Text style={styles.specialIcon}>🏷️</Text>
              <View style={styles.specialContent}>
                <ThemedText style={styles.specialTitle}>Produk Sale/Clearance</ThemedText>
                <Text style={styles.specialDesc}>
                  Final sale, tidak dapat dikembalikan kecuali ada cacat produksi 
                  atau kerusakan saat pengiriman.
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.tipsSection}>
          <ThemedText style={styles.tipsTitle}>Tips Menghindari Pengembalian</ThemedText>
          <View style={styles.tipsCard}>
            <Text style={styles.tipsIcon}>💡</Text>
            <View style={styles.tipsContent}>
              <View style={styles.tipsList}>
                <Text style={styles.tipItem}>• Baca deskripsi produk dengan teliti sebelum membeli</Text>
                <Text style={styles.tipItem}>• Perhatikan ukuran, warna, dan material yang tertera</Text>
                <Text style={styles.tipItem}>• Hubungi CS jika ada pertanyaan sebelum checkout</Text>
                <Text style={styles.tipItem}>• Pastikan alamat pengiriman sudah benar dan lengkap</Text>
                <Text style={styles.tipItem}>• Lakukan video unboxing untuk antisipasi klaim</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.contactSection}>
          <ThemedText style={styles.contactTitle}>Bantuan Pengembalian</ThemedText>
          <Text style={styles.contactDesc}>
            Punya pertanyaan tentang pengembalian produk? Tim kami siap membantu:
          </Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactItem}>📱 WhatsApp: +62 812-3456-7890</Text>
            <Text style={styles.contactItem}>📧 Email: return@lyanabottlestudio.com</Text>
            <Text style={styles.contactItem}>🕒 Senin-Sabtu: 09:00-17:00 WIB</Text>
            <Text style={styles.contactItem}>⚡ Fast response dalam 2-4 jam</Text>
          </View>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  gradientBackground: {
    backgroundColor: '#DE8389',
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
    color: '#007bff',
    textAlign: 'center',
  },
  introText: {
    fontSize: 14,
    color: '#6c757d',
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
    color: '#007bff',
  },
  conditionCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  conditionIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  conditionContent: {
    flex: 1,
  },
  conditionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  conditionList: {
    marginTop: 5,
  },
  conditionItem: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 6,
    lineHeight: 18,
  },
  periodCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
  },
  periodItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  periodIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  periodContent: {
    flex: 1,
  },
  periodTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  periodDesc: {
    fontSize: 12,
    color: '#6c757d',
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
  },
  stepDesc: {
    fontSize: 12,
    color: '#6c757d',
    lineHeight: 18,
  },
  solutionCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  solutionIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  solutionContent: {
    flex: 1,
  },
  solutionTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  solutionDesc: {
    fontSize: 12,
    color: '#6c757d',
    lineHeight: 16,
  },
  timelineCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007bff',
    marginRight: 15,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  timelineDesc: {
    fontSize: 11,
    color: '#6c757d',
    marginBottom: 2,
  },
  timelineTime: {
    fontSize: 10,
    color: '#007bff',
    fontWeight: '600',
  },
  feeCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
  },
  feeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  feeIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  feeContent: {
    flex: 1,
  },
  feeTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  feeDesc: {
    fontSize: 12,
    color: '#6c757d',
    lineHeight: 16,
  },
  specialTerms: {
    marginTop: 10,
  },
  specialItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  specialIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  specialContent: {
    flex: 1,
  },
  specialTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  specialDesc: {
    fontSize: 11,
    color: '#6c757d',
    lineHeight: 16,
  },
  tipsSection: {
    backgroundColor: '#fff3cd',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ffeaa7',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#856404',
    marginBottom: 15,
  },
  tipsCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipsIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  tipsContent: {
    flex: 1,
  },
  tipsList: {
    marginTop: 5,
  },
  tipItem: {
    fontSize: 12,
    color: '#856404',
    marginBottom: 6,
    lineHeight: 18,
  },
  contactSection: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#bbdefb',
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007bff',
    marginBottom: 10,
  },
  contactDesc: {
    fontSize: 14,
    color: '#0d47a1',
    marginBottom: 15,
    lineHeight: 20,
  },
  contactInfo: {
    marginTop: 10,
  },
  contactItem: {
    fontSize: 13,
    color: '#0d47a1',
    marginBottom: 8,
    lineHeight: 18,
  },
  bottomSpace: {
    height: 50,
  },
});
