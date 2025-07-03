import { ScrollView, Image, StyleSheet, Platform, Pressable, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';


import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

// Import komponen Card dari folder components
import ProductCard from '@/components/Card';

export default function TabTwoScreen() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/');
  };

  return (
    
    <LinearGradient
        colors={['#DE8389', '#B488BF']} // pink ke ungu
        style={styles.container}
      >
      <ScrollView style={styles.container}>
        <ThemedText type="title">Lyana Bottle Studio</ThemedText>


        {/* Produk E-Commerce */}
        <Text style={styles.productHeading}>Temani Harimu, Setiap Tegukan Penuh Cerita</Text>
        <Text style={styles.productHeading}>PRODUCT</Text>
        <View style={styles.productSection}>

        <ProductCard
          image={require('@/assets/images/tumbler oren.jpg')}
          judul="Blush Aura"
          desc="Sentuhan manis warna blush yang memancarkan kehangatan dan keceriaan, cocok untuk hari penuh energi."
          harga={299000}
        />

        <ProductCard
          image={require('@/assets/images/tumbler ungu.jpg')}
          judul="Luna Frost"
          desc="Tumbler deangan warna lilac lembut dengan aksen ungu pastel, memberi kesan tenang dan elegan. Ccock untuk gaya hidup simple"
          harga={249000}
        />
        <ProductCard
          image={require('@/assets/images/tumbler pink1.jpg')}
          judul="Pink Reverie"
          desc="paduan warna pastel yang menggambarkan impian dan kelembutan, Teman setia momen manis harimu dan jauh lebih berwarna."
          harga={299000}
        />

        <ProductCard
          image={require('@/assets/images/tumbler hijau2.jpg')}
          judul="Sage Calm"
          desc="Desain simple dan bernuansa alami, cocok untuk kamu yang menyukai kesegaran dan ketenangan dalam setiap aktivitas"
          harga={279000}
        />
        <ProductCard
          image={require('@/assets/images/tumbler khaki.jpg')}
          judul="Dusk Mocha"
          desc="Hangat dan netral, dusk mocha hadir dengan warna kopi susu yang elegan. Teman sempurna untuk hari-hari produktifmu"
          harga={279000}
        />
        </View>
        <Text style={styles.productHeading}>PRODUCTS</Text>
        <View style={styles.productSection}>

        <ProductCard
          image={require('@/assets/images/gantungan1.jpg')}
          judul="Rose Glow"
          desc="Ganteng, manis, cocok untuk cemilan sehari-hari."
          harga={299000}
        />

        <ProductCard
          image={require('@/assets/images/gantungan2.jpg')}
          judul="Amber Pop"
          desc="Enak dan manis"
          harga={299000}
        />
        <ProductCard
          image={require('@/assets/images/gantungan3.jpg')}
          judul="Mist Blue"
          desc="Ganteng, manis, cocok untuk cemilan sehari-hari."
          harga={299000}
        />

        <ProductCard
          image={require('@/assets/images/gantungan4.jpg')}
          judul="Cotton Pink"
          desc="Enak dan manis"
          harga={299000}
        />
        <ProductCard
          image={require('@/assets/images/gantungan5.jpg')}
          judul="Milky Cloud"
          desc="Enak dan manis"
          harga={299000}
        />
        </View>
    

        {/* Collapsible sections */}

        <Collapsible title="Product Description">
          <ThemedText>
            Efek animasi diatur lewat <ThemedText type="defaultSemiBold">HelloWave.tsx</ThemedText>.
          </ThemedText>
          {Platform.select({
            ios: (
              <ThemedText>
                Komponen <ThemedText type="defaultSemiBold">ParallaxScrollView.tsx</ThemedText>{' '}
                memberikan efek parallax.
              </ThemedText>
            ),
          })}
        </Collapsible>

        <br />

        {/* Logout Button */}
          <Pressable onPress={handleLogout} style={styles.logoutButton}>
            <ThemedText style={styles.logoutText}>Logout</ThemedText>
          </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    // Ganti background jadi satu warna saja:
    // backgroundColor: '#fff',
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

  productHeading: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    paddingTop:12,
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
