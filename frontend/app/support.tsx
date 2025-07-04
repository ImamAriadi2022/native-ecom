import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

type FAQItem = {
  id: number;
  question: string;
  answer: string;
  category: string;
};

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "Bagaimana cara melakukan pemesanan?",
    answer: "Anda dapat melakukan pemesanan dengan memilih produk yang diinginkan, lalu klik tombol 'Checkout'. Ikuti langkah-langkah pembayaran hingga selesai.",
    category: "Pemesanan"
  },
  {
    id: 2,
    question: "Metode pembayaran apa saja yang tersedia?",
    answer: "Kami menerima pembayaran melalui Transfer Bank (BCA, Mandiri, BNI, BRI) dan e-Wallet (GoPay, OVO, DANA, ShopeePay).",
    category: "Pembayaran"
  },
  {
    id: 3,
    question: "Berapa lama estimasi pengiriman?",
    answer: "Estimasi pengiriman adalah 2-3 hari kerja untuk wilayah Jabodetabek dan 3-7 hari kerja untuk luar Jabodetabek.",
    category: "Pengiriman"
  },
  {
    id: 4,
    question: "Apakah bisa melakukan retur produk?",
    answer: "Ya, kami menerima retur dalam 7 hari setelah produk diterima dengan syarat produk masih dalam kondisi baik dan kemasan asli.",
    category: "Retur"
  },
  {
    id: 5,
    question: "Bagaimana cara merawat tumbler?",
    answer: "Cuci dengan air hangat dan sabun lembut. Hindari penggunaan detergen keras. Keringkan sepenuhnya sebelum disimpan.",
    category: "Produk"
  },
  {
    id: 6,
    question: "Apakah tumbler tahan untuk minuman panas?",
    answer: "Ya, semua produk tumbler kami dapat mempertahankan suhu minuman panas hingga 6 jam dan dingin hingga 12 jam.",
    category: "Produk"
  },
  {
    id: 7,
    question: "Bagaimana cara tracking pesanan?",
    answer: "Setelah pembayaran dikonfirmasi, Anda akan menerima nomor resi melalui WhatsApp yang dapat digunakan untuk tracking di website kurir.",
    category: "Pengiriman"
  },
  {
    id: 8,
    question: "Apakah ada garansi untuk produk?",
    answer: "Ya, kami memberikan garansi 1 tahun untuk kerusakan manufaktur. Garansi tidak berlaku untuk kerusakan akibat pemakaian yang tidak sesuai.",
    category: "Garansi"
  }
];

export default function SupportScreen() {
  const router = useRouter();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', ...Array.from(new Set(faqData.map(item => item.category)))];

  const filteredFAQ = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleContactWhatsApp = () => {
    const message = "Halo, saya butuh bantuan mengenai aplikasi Lyana Bottle Studio";
    Linking.openURL(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`);
  };

  const handleContactEmail = () => {
    Linking.openURL('mailto:support@lyanabottle.com?subject=Bantuan Aplikasi');
  };

  return (
    <LinearGradient
      colors={['#DE8389', '#B488BF']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Pressable onPress={() => router.back()}>
              <ThemedText style={styles.backText}>← Kembali</ThemedText>
            </Pressable>
            <ThemedText type="title" style={styles.title}>
              Contact Support
            </ThemedText>
          </View>

          {/* Quick Contact */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Hubungi Kami</ThemedText>
            <View style={styles.contactButtons}>
              <Pressable 
                style={[styles.contactButton, styles.whatsappButton]}
                onPress={handleContactWhatsApp}
              >
                <ThemedText style={styles.contactIcon}>💬</ThemedText>
                <View style={styles.contactInfo}>
                  <ThemedText style={styles.contactTitle}>WhatsApp</ThemedText>
                  <ThemedText style={styles.contactDesc}>Respon cepat 24/7</ThemedText>
                </View>
              </Pressable>

              <Pressable 
                style={[styles.contactButton, styles.emailButton]}
                onPress={handleContactEmail}
              >
                <ThemedText style={styles.contactIcon}>📧</ThemedText>
                <View style={styles.contactInfo}>
                  <ThemedText style={styles.contactTitle}>Email</ThemedText>
                  <ThemedText style={styles.contactDesc}>support@lyanabottle.com</ThemedText>
                </View>
              </Pressable>
            </View>
          </View>

          {/* FAQ Section */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Frequently Asked Questions (FAQ)</ThemedText>
            
            {/* Search */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Cari pertanyaan..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#999"
              />
            </View>

            {/* Category Filter */}
            <ScrollView 
              horizontal 
              style={styles.categoryContainer}
              showsHorizontalScrollIndicator={false}
            >
              {categories.map((category) => (
                <Pressable
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && styles.categoryButtonActive
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <ThemedText style={[
                    styles.categoryText,
                    selectedCategory === category && styles.categoryTextActive
                  ]}>
                    {category}
                  </ThemedText>
                </Pressable>
              ))}
            </ScrollView>

            {/* FAQ List */}
            <View style={styles.faqList}>
              {filteredFAQ.length === 0 ? (
                <View style={styles.noResultsContainer}>
                  <ThemedText style={styles.noResultsText}>
                    Tidak ada pertanyaan yang ditemukan
                  </ThemedText>
                </View>
              ) : (
                filteredFAQ.map((item) => (
                  <View key={item.id} style={styles.faqItem}>
                    <Pressable
                      style={styles.faqQuestion}
                      onPress={() => toggleFAQ(item.id)}
                    >
                      <View style={styles.faqQuestionContent}>
                        <ThemedText style={styles.faqQuestionText}>
                          {item.question}
                        </ThemedText>
                        <ThemedText style={styles.faqCategory}>
                          {item.category}
                        </ThemedText>
                      </View>
                      <ThemedText style={styles.faqToggle}>
                        {expandedFAQ === item.id ? '−' : '+'}
                      </ThemedText>
                    </Pressable>
                    
                    {expandedFAQ === item.id && (
                      <View style={styles.faqAnswer}>
                        <ThemedText style={styles.faqAnswerText}>
                          {item.answer}
                        </ThemedText>
                      </View>
                    )}
                  </View>
                ))
              )}
            </View>
          </View>

          {/* Operating Hours */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Jam Operasional</ThemedText>
            <View style={styles.operatingHours}>
              <View style={styles.hourRow}>
                <ThemedText style={styles.dayText}>Senin - Jumat</ThemedText>
                <ThemedText style={styles.timeText}>09:00 - 18:00 WIB</ThemedText>
              </View>
              <View style={styles.hourRow}>
                <ThemedText style={styles.dayText}>Sabtu</ThemedText>
                <ThemedText style={styles.timeText}>09:00 - 15:00 WIB</ThemedText>
              </View>
              <View style={styles.hourRow}>
                <ThemedText style={styles.dayText}>Minggu</ThemedText>
                <ThemedText style={styles.timeText}>Tutup</ThemedText>
              </View>
            </View>
          </View>

          {/* Emergency Contact */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Kontak Darurat</ThemedText>
            <ThemedText style={styles.description}>
              Untuk masalah mendesak di luar jam operasional, Anda dapat mengirim pesan WhatsApp dan kami akan merespons secepatnya pada hari kerja berikutnya.
            </ThemedText>
            <Pressable 
              style={styles.emergencyButton}
              onPress={handleContactWhatsApp}
            >
              <ThemedText style={styles.emergencyButtonText}>
                📞 Kontak Darurat
              </ThemedText>
            </Pressable>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <ThemedText style={styles.footerText}>
              Tim support kami siap membantu Anda! 😊
            </ThemedText>
          </View>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  contactButtons: {
    gap: 10,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    gap: 15,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
  },
  emailButton: {
    backgroundColor: '#4285F4',
  },
  contactIcon: {
    fontSize: 24,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  contactDesc: {
    fontSize: 14,
    color: '#f0f0f0',
  },
  searchContainer: {
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  categoryButtonActive: {
    backgroundColor: '#DE8389',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
  faqList: {
    gap: 10,
  },
  faqItem: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    overflow: 'hidden',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f8f8',
  },
  faqQuestionContent: {
    flex: 1,
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  faqCategory: {
    fontSize: 12,
    color: '#DE8389',
    fontWeight: '500',
  },
  faqToggle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DE8389',
    marginLeft: 10,
  },
  faqAnswer: {
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  faqAnswerText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  operatingHours: {
    gap: 10,
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  timeText: {
    fontSize: 16,
    color: '#666',
  },
  description: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 15,
  },
  emergencyButton: {
    backgroundColor: '#f44336',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  emergencyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
  },
});
