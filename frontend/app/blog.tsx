import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
};

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "5 Tips Merawat Tumbler Agar Awet dan Higienis",
    excerpt: "Tumbler yang terawat dengan baik akan lebih awet dan tetap higienis untuk digunakan sehari-hari.",
    content: "1. Cuci segera setelah digunakan\n2. Gunakan air hangat dan sabun lembut\n3. Hindari detergen keras\n4. Keringkan dengan sempurna\n5. Simpan dalam kondisi terbuka",
    image: "🧽",
    date: "5 Juli 2025",
    readTime: "3 menit"
  },
  {
    id: 2,
    title: "Cara Menghilangkan Bau pada Tumbler",
    excerpt: "Apakah tumbler Anda mulai berbau? Berikut cara mudah menghilangkan bau tidak sedap.",
    content: "1. Rendam dengan air hangat + baking soda\n2. Gunakan campuran air + cuka putih\n3. Bilas dengan air jeruk nipis\n4. Jemur di bawah sinar matahari\n5. Gunakan tablet pembersih khusus",
    image: "🍋",
    date: "3 Juli 2025",
    readTime: "4 menit"
  },
  {
    id: 3,
    title: "Manfaat Menggunakan Tumbler untuk Kesehatan",
    excerpt: "Selain ramah lingkungan, tumbler juga memberikan manfaat kesehatan yang luar biasa.",
    content: "1. Bebas dari BPA berbahaya\n2. Menjaga suhu minuman optimal\n3. Mendorong minum lebih banyak\n4. Mengurangi konsumsi gula\n5. Minuman tetap segar lebih lama",
    image: "💚",
    date: "1 Juli 2025",
    readTime: "5 menit"
  },
  {
    id: 4,
    title: "Tumbler Material Terbaik: Stainless Steel vs Kaca",
    excerpt: "Perbandingan material tumbler untuk membantu Anda memilih yang terbaik.",
    content: "Stainless Steel:\n✅ Tahan lama\n✅ Ringan\n✅ Tidak mudah pecah\n\nKaca:\n✅ Tidak mengubah rasa\n✅ Mudah dibersihkan\n❌ Mudah pecah",
    image: "⚖️",
    date: "28 Juni 2025",
    readTime: "6 menit"
  }
];

export default function BlogScreen() {
  const router = useRouter();

  const handleReadMore = (postId: number) => {
    router.push({
      pathname: '/blog-detail' as any,
      params: { id: postId.toString() }
    });
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
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <ThemedText style={styles.backText}>← Kembali</ThemedText>
            </Pressable>
            <ThemedText type="title" style={styles.title}>
              Blog & Tips
            </ThemedText>
            <View style={styles.headerSpacer} />
          </View>

          {/* Hero Section */}
          <View style={styles.heroSection}>
            <ThemedText style={styles.heroTitle}>
              📚 Tips & Panduan Tumbler
            </ThemedText>
            <ThemedText style={styles.heroSubtitle}>
              Pelajari cara merawat tumbler dengan benar dan maksimalkan pengalaman minum Anda
            </ThemedText>
          </View>

          {/* Blog Posts */}
          <View style={styles.postsContainer}>
            {blogPosts.map((post) => (
              <View key={post.id} style={styles.postCard}>
                <View style={styles.postHeader}>
                  <ThemedText style={styles.postIcon}>{post.image}</ThemedText>
                  <View style={styles.postMeta}>
                    <ThemedText style={styles.postDate}>{post.date}</ThemedText>
                    <ThemedText style={styles.readTime}>⏱️ {post.readTime}</ThemedText>
                  </View>
                </View>
                
                <ThemedText style={styles.postTitle}>{post.title}</ThemedText>
                <ThemedText style={styles.postExcerpt}>{post.excerpt}</ThemedText>
                
                <Pressable 
                  style={styles.readMoreButton}
                  onPress={() => handleReadMore(post.id)}
                >
                  <ThemedText style={styles.readMoreText}>Baca Selengkapnya →</ThemedText>
                </Pressable>
              </View>
            ))}
          </View>

          {/* Tips Quick Section */}
          <View style={styles.quickTipsSection}>
            <ThemedText style={styles.quickTipsTitle}>💡 Tips Cepat</ThemedText>
            <View style={styles.quickTipsList}>
              <View style={styles.quickTip}>
                <ThemedText style={styles.quickTipIcon}>🚿</ThemedText>
                <ThemedText style={styles.quickTipText}>Cuci tumbler setiap hari</ThemedText>
              </View>
              <View style={styles.quickTip}>
                <ThemedText style={styles.quickTipIcon}>🌡️</ThemedText>
                <ThemedText style={styles.quickTipText}>Hindari air terlalu panas</ThemedText>
              </View>
              <View style={styles.quickTip}>
                <ThemedText style={styles.quickTipIcon}>☀️</ThemedText>
                <ThemedText style={styles.quickTipText}>Keringkan dengan sempurna</ThemedText>
              </View>
            </View>
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
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerSpacer: {
    width: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  heroSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  postsContainer: {
    gap: 15,
    marginBottom: 20,
  },
  postCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  postIcon: {
    fontSize: 32,
  },
  postMeta: {
    alignItems: 'flex-end',
  },
  postDate: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  readTime: {
    fontSize: 12,
    color: '#DE8389',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    lineHeight: 24,
  },
  postExcerpt: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 15,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
  },
  readMoreText: {
    fontSize: 14,
    color: '#DE8389',
    fontWeight: '600',
  },
  quickTipsSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  quickTipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  quickTipsList: {
    gap: 12,
  },
  quickTip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 10,
  },
  quickTipIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  quickTipText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
});
