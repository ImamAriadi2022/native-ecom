import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

const blogData: any = {
  1: {
    title: "5 Tips Merawat Tumbler Agar Awet dan Higienis",
    image: "🧽",
    date: "5 Juli 2025",
    readTime: "3 menit",
    content: `Tumbler yang terawat dengan baik tidak hanya akan lebih awet, tetapi juga menjamin kebersihan dan kesehatan penggunanya. Berikut adalah 5 tips penting untuk merawat tumbler Anda:

1. Cuci Segera Setelah Digunakan
Jangan biarkan tumbler kotor terlalu lama. Sisa minuman yang mengendap dapat menyebabkan bau dan pertumbuhan bakteri. Bilas dengan air bersih segera setelah digunakan.

2. Gunakan Air Hangat dan Sabun Lembut
Cuci tumbler dengan air hangat dan sabun cuci piring yang lembut. Air hangat membantu melarutkan minyak dan sisa minuman yang menempel.

3. Hindari Detergen Keras
Jangan gunakan detergen yang mengandung bahan kimia keras atau abrasif karena dapat merusak lapisan tumbler dan menimbulkan goresan.

4. Keringkan dengan Sempurna
Pastikan tumbler benar-benar kering sebelum disimpan. Kelembaban yang tersisa dapat menyebabkan jamur dan bau tidak sedap.

5. Simpan dalam Kondisi Terbuka
Jangan tutup rapat tumbler saat menyimpan. Biarkan udara bersirkulasi untuk mencegah kelembaban dan bau.

Tips Tambahan:
- Lakukan deep cleaning seminggu sekali dengan baking soda
- Hindari merendam terlalu lama
- Ganti gasket atau seal secara berkala`
  },
  2: {
    title: "Cara Menghilangkan Bau pada Tumbler",
    image: "🍋",
    date: "3 Juli 2025",
    readTime: "4 menit",
    content: `Bau tidak sedap pada tumbler adalah masalah umum yang sering dialami. Berikut cara efektif untuk menghilangkannya:

1. Metode Baking Soda
Campurkan 2 sendok makan baking soda dengan air hangat. Rendam tumbler selama 2-3 jam, lalu sikat dan bilas hingga bersih.

2. Larutan Cuka Putih
Isi tumbler dengan campuran air dan cuka putih (1:1). Diamkan semalaman, kemudian cuci dengan sabun dan bilas hingga bersih.

3. Air Jeruk Nipis
Potong jeruk nipis dan gosokkan pada bagian dalam tumbler. Biarkan selama 30 menit, lalu bilas dengan air bersih.

4. Sinar Matahari
Setelah dicuci, jemur tumbler di bawah sinar matahari langsung. UV dapat membantu membunuh bakteri penyebab bau.

5. Tablet Pembersih Khusus
Gunakan tablet pembersih yang dirancang khusus untuk botol minum. Ikuti petunjuk penggunaan pada kemasan.

Pencegahan:
- Jangan menyimpan minuman terlalu lama
- Hindari minuman berwarna pekat
- Bersihkan segera setelah digunakan`
  }
};

export default function BlogDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const postId = params.id as string;
  
  const post = blogData[postId] || blogData[1];

  return (
    <LinearGradient
      colors={['#DE8389', '#B488BF']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <ThemedText style={styles.backText}>← Kembali ke Blog</ThemedText>
            </Pressable>
          </View>

          {/* Article Header */}
          <View style={styles.articleHeader}>
            <ThemedText style={styles.articleIcon}>{post.image}</ThemedText>
            <ThemedText style={styles.articleTitle}>{post.title}</ThemedText>
            <View style={styles.articleMeta}>
              <ThemedText style={styles.metaText}>📅 {post.date}</ThemedText>
              <ThemedText style={styles.metaText}>⏱️ {post.readTime}</ThemedText>
            </View>
          </View>

          {/* Article Content */}
          <View style={styles.articleContent}>
            <ThemedText style={styles.contentText}>{post.content}</ThemedText>
          </View>

          {/* Share Section */}
          <View style={styles.shareSection}>
            <ThemedText style={styles.shareTitle}>Bagikan Artikel Ini</ThemedText>
            <View style={styles.shareButtons}>
              <Pressable style={styles.shareButton}>
                <ThemedText style={styles.shareButtonText}>📱 WhatsApp</ThemedText>
              </Pressable>
              <Pressable style={styles.shareButton}>
                <ThemedText style={styles.shareButtonText}>📧 Email</ThemedText>
              </Pressable>
            </View>
          </View>

          {/* Related Tips */}
          <View style={styles.relatedSection}>
            <ThemedText style={styles.relatedTitle}>Tips Lainnya</ThemedText>
            <Pressable 
              style={styles.relatedItem}
              onPress={() => router.push('/blog' as any)}
            >
              <ThemedText style={styles.relatedText}>
                📚 Lihat Semua Tips & Panduan
              </ThemedText>
            </Pressable>
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
    marginBottom: 30,
  },
  backButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'flex-start',
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  articleHeader: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  articleIcon: {
    fontSize: 48,
    marginBottom: 15,
  },
  articleTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 28,
  },
  articleMeta: {
    flexDirection: 'row',
    gap: 20,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
  },
  articleContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
  },
  contentText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 26,
    textAlign: 'justify',
  },
  shareSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  shareTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  shareButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  shareButton: {
    backgroundColor: '#DE8389',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  relatedSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  relatedItem: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  relatedText: {
    fontSize: 16,
    color: '#DE8389',
    fontWeight: '600',
  },
});
