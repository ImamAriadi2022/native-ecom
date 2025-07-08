import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';

// Import komponen Card dari folder components
import ProductCard from '@/components/Card';

export default function TabTwoScreen() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/');
  };

  const navigateTo = (path: any) => {
    router.push(path);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <ThemedText type="title" style={styles.brandTitle}>Lyana Bottle Studio</ThemedText>
          
          {/* Navigation Menu */}
          <View style={styles.menuSection}>
            <Pressable 
              style={styles.menuButton}
              onPress={() => navigateTo('/categories')}
            >
              <Text style={styles.menuButtonText}>📂 Kategori</Text>
            </Pressable>
            
            <Pressable 
              style={styles.menuButton}
              onPress={() => navigateTo('/cart')}
            >
              <Text style={styles.menuButtonText}>🛒 Keranjang</Text>
            </Pressable>
            
            <Pressable 
              style={styles.menuButton}
              onPress={() => navigateTo('/promo')}
            >
              <Text style={styles.menuButtonText}>🎉 Promo</Text>
            </Pressable>
            
            <Pressable 
              style={styles.menuButton}
              onPress={() => navigateTo('/bundling')}
            >
              <Text style={styles.menuButtonText}>📦 Bundling</Text>
            </Pressable>
            
            <Pressable 
              style={styles.menuButton}
              onPress={() => navigateTo('/custom-tumbler')}
            >
              <Text style={styles.menuButtonText}>🎨 Custom</Text>
            </Pressable>
            
            <Pressable 
              style={styles.menuButton}
              onPress={() => navigateTo('/event')}
            >
              <Text style={styles.menuButtonText}>🌟 Event</Text>
            </Pressable>
            
            <Pressable 
              style={styles.menuButton}
              onPress={() => navigateTo('/brand')}
            >
              <Text style={styles.menuButtonText}>🏢 Tentang Brand</Text>
            </Pressable>
            
            <Pressable 
              style={styles.menuButton}
              onPress={() => navigateTo('/about')}
            >
              <Text style={styles.menuButtonText}>📱 Tentang App</Text>
            </Pressable>
            
            <Pressable 
              style={styles.menuButton}
              onPress={() => navigateTo('/support')}
            >
              <Text style={styles.menuButtonText}>🎧 Support</Text>
            </Pressable>
            
            <Pressable 
              style={styles.menuButton}
              onPress={() => navigateTo('/blog')}
            >
              <Text style={styles.menuButtonText}>📝 Blog</Text>
            </Pressable>
            
            <Pressable 
              style={styles.menuButton}
              onPress={() => navigateTo('/contact')}
            >
              <Text style={styles.menuButtonText}>📞 Kontak</Text>
            </Pressable>
            
            <Pressable 
              style={styles.menuButton}
              onPress={() => navigateTo('/shipping')}
            >
              <Text style={styles.menuButtonText}>🚚 Pengiriman</Text>
            </Pressable>
            
            <Pressable 
              style={styles.menuButton}
              onPress={() => navigateTo('/return')}
            >
              <Text style={styles.menuButtonText}>↩️ Return</Text>
            </Pressable>
            
            <Pressable 
              style={styles.menuButton}
              onPress={() => navigateTo('/terms')}
            >
              <Text style={styles.menuButtonText}>📋 S&K</Text>
            </Pressable>
          </View>
        </View>


        {/* Produk E-Commerce */}
        <Text style={styles.productHeading}>Temani Harimu, Setiap Tegukan Penuh Cerita</Text>
        <Text style={styles.productHeading}>PRODUCT</Text>
        <View style={styles.productContainer}>
          <View style={styles.productRow}>
            <View style={styles.cardWrapper}>
              <ProductCard
                image={require('@/assets/images/tumbler oren.jpg')}
                judul="Blush Aura"
                desc="Sentuhan manis warna blush yang memancarkan kehangatan dan keceriaan, cocok untuk hari penuh energi."
                harga={299000}
              />
            </View>
            <View style={styles.cardWrapper}>
              <ProductCard
                image={require('@/assets/images/tumbler oren.jpg')}
                judul="Blush Aura"
                desc="Sentuhan manis warna blush yang memancarkan kehangatan dan keceriaan, cocok untuk hari penuh energi."
                harga={299000}
              />
            </View>
          </View>

          <View style={styles.productRow}>
            <View style={styles.cardWrapper}>
              <ProductCard
                image={require('@/assets/images/tumbler ungu.jpg')}
                judul="Luna Frost"
                desc="Tumbler deangan warna lilac lembut dengan aksen ungu pastel, memberi kesan tenang dan elegan. Ccock untuk gaya hidup simple"
                harga={249000}
              />
            </View>
            <View style={styles.cardWrapper}>
              <ProductCard
                image={require('@/assets/images/tumbler pink1.jpg')}
                judul="Pink Reverie"
                desc="paduan warna pastel yang menggambarkan impian dan kelembutan, Teman setia momen manis harimu dan jauh lebih berwarna."
                harga={299000}
              />
            </View>
          </View>

          <View style={styles.productRow}>
            <View style={styles.cardWrapper}>
              <ProductCard
                image={require('@/assets/images/tumbler hijau2.jpg')}
                judul="Sage Calm"
                desc="Desain simple dan bernuansa alami, cocok untuk kamu yang menyukai kesegaran dan ketenangan dalam setiap aktivitas"
                harga={279000}
              />
            </View>
            <View style={styles.cardWrapper}>
              <ProductCard
                image={require('@/assets/images/tumbler khaki.jpg')}
                judul="Dusk Mocha"
                desc="Hangat dan netral, dusk mocha hadir dengan warna kopi susu yang elegan. Teman sempurna untuk hari-hari produktifmu"
                harga={279000}
              />
            </View>
          </View>
        </View>
        <View style={styles.productContainer}>
          <View style={styles.productRow}>
            <View style={styles.cardWrapper}>
              <ProductCard
                image={require('@/assets/images/gantungan1.jpg')}
                judul="Rose Glow"
                desc="Ganteng, manis, cocok untuk cemilan sehari-hari."
                harga={299000}
              />
            </View>
            <View style={styles.cardWrapper}>
              <ProductCard
                image={require('@/assets/images/gantungan1.jpg')}
                judul="Rose Glow"
                desc="Ganteng, manis, cocok untuk cemilan sehari-hari."
                harga={299000}
              />
            </View>
          </View>

          <View style={styles.productRow}>
            <View style={styles.cardWrapper}>
              <ProductCard
                image={require('@/assets/images/gantungan2.jpg')}
                judul="Amber Pop"
                desc="Enak dan manis"
                harga={299000}
              />
            </View>
            <View style={styles.cardWrapper}>
              <ProductCard
                image={require('@/assets/images/gantungan3.jpg')}
                judul="Mist Blue"
                desc="Ganteng, manis, cocok untuk cemilan sehari-hari."
                harga={299000}
              />
            </View>
          </View>

          <View style={styles.productRow}>
            <View style={styles.cardWrapper}>
              <ProductCard
                image={require('@/assets/images/gantungan4.jpg')}
                judul="Cotton Pink"
                desc="Enak dan manis"
                harga={299000}
              />
            </View>
            <View style={styles.cardWrapper}>
              <ProductCard
                image={require('@/assets/images/gantungan5.jpg')}
                judul="Milky Cloud"
                desc="Enak dan manis"
                harga={299000}
              />
            </View>
          </View>
        </View>
    

        {/* Store Information Section */}
        <View style={styles.storeInfoSection}>
          <ThemedText style={styles.storeInfoTitle}>✨ Mengapa Memilih Lyana Bottle Studio?</ThemedText>
          
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <ThemedText style={styles.featureIcon}>🌟</ThemedText>
              <ThemedText style={styles.featureText}>
                Material Premium - Stainless steel berkualitas tinggi
              </ThemedText>
            </View>
            
            <View style={styles.featureItem}>
              <ThemedText style={styles.featureIcon}>🌡️</ThemedText>
              <ThemedText style={styles.featureText}>
                Tahan suhu hingga 12 jam dingin, 6 jam panas
              </ThemedText>
            </View>
            
            <View style={styles.featureItem}>
              <ThemedText style={styles.featureIcon}>🎨</ThemedText>
              <ThemedText style={styles.featureText}>
                Desain eksklusif yang aesthetic dan instagramable
              </ThemedText>
            </View>
            
            <View style={styles.featureItem}>
              <ThemedText style={styles.featureIcon}>♻️</ThemedText>
              <ThemedText style={styles.featureText}>
                Ramah lingkungan - Kurangi sampah plastik
              </ThemedText>
            </View>
            
            <View style={styles.featureItem}>
              <ThemedText style={styles.featureIcon}>🚚</ThemedText>
              <ThemedText style={styles.featureText}>
                Free ongkir untuk pembelian di atas Rp 500.000
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Customer Reviews Section */}
        <View style={styles.reviewSection}>
          <ThemedText style={styles.reviewTitle}>💬 Kata Pelanggan Kami</ThemedText>
          
          <View style={styles.reviewCard}>
            <ThemedText style={styles.reviewText}>
              "Tumbler Luna Frost sangat cantik! Warnanya soft banget dan beneran awet dinginnya. Recommended!"
            </ThemedText>
            <ThemedText style={styles.reviewAuthor}>- Sarah K. ⭐⭐⭐⭐⭐</ThemedText>
          </View>
          
          <View style={styles.reviewCard}>
            <ThemedText style={styles.reviewText}>
              "Packaging rapih, kualitas premium. Pink Reverie jadi tumbler favorit aku sekarang 💕"
            </ThemedText>
            <ThemedText style={styles.reviewAuthor}>- Mia R. ⭐⭐⭐⭐⭐</ThemedText>
          </View>
        </View>

        {/* Logout Button */}
          <Pressable onPress={handleLogout} style={styles.logoutButton}>
            <ThemedText style={styles.logoutText}>Logout</ThemedText>
          </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DE8389', // Solid color instead of gradient
  },
  scrollContainer: {
    flex: 1,
    padding: 30,
  },
  headerSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  menuSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  menuButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  menuButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reactLogo: {
    height: 260,
    width: 250,
    bottom: -10,
    left: 500,
    position: 'absolute',
  },
  productSection: {
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
    flexDirection: 'row',
    gap: 10, // untuk React Native >= 0.71
  },
  productContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 10,
  },
  cardWrapper: {
    flex: 1,
    maxWidth: '48%',
  },

  productHeading: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    paddingTop:12,
  },
  storeInfoSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 20,
  },
  storeInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 30,
  },
  featureText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
    lineHeight: 20,
  },
  reviewSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 10,
    marginBottom: 30,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  reviewCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#DE8389',
  },
  reviewText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  reviewAuthor: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
    fontWeight: '600',
  },
  logoutContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#353636',
    paddingTop:14,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '80%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});
