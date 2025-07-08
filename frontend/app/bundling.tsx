import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BundlingScreen() {
  // Image mapping untuk static imports
  const getImageSource = (imageName: string) => {
    const imageMap: { [key: string]: any } = {
      'tumbler cream.jpg': require('../assets/images/tumbler cream.jpg'),
      'tumbler pink1.jpg': require('../assets/images/tumbler pink1.jpg'),
      'tumbler hijau2.jpg': require('../assets/images/tumbler hijau2.jpg'),
      'tumbler ungu.jpg': require('../assets/images/tumbler ungu.jpg'),
      'tumbler oren.jpg': require('../assets/images/tumbler oren.jpg'),
      'tumbler khaki.jpg': require('../assets/images/tumbler khaki.jpg'),
      'masseto.jpg': require('../assets/images/masseto.jpg'),
      'gantungan1.jpg': require('../assets/images/gantungan1.jpg'),
      'gantungan2.jpg': require('../assets/images/gantungan2.jpg'),
      'gantungan3.jpg': require('../assets/images/gantungan3.jpg'),
      'gantungan4.jpg': require('../assets/images/gantungan4.jpg'),
      'gantungan5.jpg': require('../assets/images/gantungan5.jpg'),
      'bundling1.jpg': require('../assets/images/masseto.jpg'), // fallback
      'bundling2.jpg': require('../assets/images/gantungan2.jpg'), // fallback
      'bundling3.jpg': require('../assets/images/gantungan3.jpg'), // fallback
      'react-logo.png': require('../assets/images/react-logo.png'),
    };
    return imageMap[imageName] || imageMap['react-logo.png'];
  };

  const bundlePackages = [
    {
      id: '1',
      name: 'Starter Pack',
      description: 'Cocok untuk pemula yang ingin mulai koleksi tumbler',
      originalPrice: 150000,
      bundlePrice: 99000,
      savings: 51000,
      items: [
        { name: 'Tumbler 500ml', image: 'bundling1.jpg', quantity: 1 },
        { name: 'Gantungan Kunci', image: 'gantungan1.jpg', quantity: 1 }
      ],
      badge: 'HEMAT 34%',
      popular: false
    },
    {
      id: '2',
      name: 'Family Pack',
      description: 'Paket hemat untuk keluarga kecil',
      originalPrice: 300000,
      bundlePrice: 199000,
      savings: 101000,
      items: [
        { name: 'Tumbler 500ml', image: 'bundling2.jpg', quantity: 2 },
        { name: 'Tumbler 350ml', image: 'tumbler pink1.jpg', quantity: 1 },
        { name: 'Gantungan Kunci', image: 'gantungan2.jpg', quantity: 2 }
      ],
      badge: 'HEMAT 34%',
      popular: true
    },
    {
      id: '3',
      name: 'Office Pack',
      description: 'Paket lengkap untuk kebutuhan kantor',
      originalPrice: 375000,
      bundlePrice: 249000,
      savings: 126000,
      items: [
        { name: 'Tumbler Premium 500ml', image: 'bundling3.jpg', quantity: 3 },
        { name: 'Tumbler Premium 350ml', image: 'tumbler khaki.jpg', quantity: 2 },
        { name: 'Gantungan Kunci Set', image: 'gantungan3.jpg', quantity: 1 }
      ],
      badge: 'HEMAT 34%',
      popular: false
    },
    {
      id: '4',
      name: 'Ultimate Collection',
      description: 'Koleksi lengkap untuk pecinta tumbler sejati',
      originalPrice: 500000,
      bundlePrice: 329000,
      savings: 171000,
      items: [
        { name: 'Tumbler Premium 500ml', image: 'tumbler cream.jpg', quantity: 3 },
        { name: 'Tumbler Premium 350ml', image: 'tumbler oren.jpg', quantity: 2 },
        { name: 'Custom Tumbler', image: 'custom1.jpeg', quantity: 1 },
        { name: 'Gantungan Kunci Premium Set', image: 'gantungan4.jpg', quantity: 3 }
      ],
      badge: 'HEMAT 34%',
      popular: false
    }
  ];

  const themePackages = [
    {
      id: 'disney',
      name: 'Disney Collection',
      description: 'Tumbler dengan karakter Disney favorit',
      price: 179000,
      items: ['Tumbler Disney 500ml', 'Gantungan Mickey', 'Sticker Set'],
      image: 'disney1.jpeg',
      theme: 'Disney'
    },
    {
      id: 'hotwheels',
      name: 'Hot Wheels Pack',
      description: 'Koleksi tumbler dengan tema otomotif',
      price: 189000,
      items: ['Tumbler Hot Wheels 500ml', 'Gantungan Mobil', 'Miniatur'],
      image: 'tumbler biru tua.jpeg',
      theme: 'Hot Wheels'
    }
  ];

  const customizablePackages = [
    {
      id: 'custom1',
      name: 'Custom Couple Pack',
      description: 'Paket tumbler couple dengan nama dan tanggal spesial',
      basePrice: 149000,
      customOptions: ['Nama Custom', 'Tanggal Spesial', 'Warna Pilihan'],
      image: 'custom2.jpeg'
    },
    {
      id: 'custom2',
      name: 'Corporate Pack',
      description: 'Paket khusus untuk perusahaan dengan logo custom',
      basePrice: 199000,
      customOptions: ['Logo Perusahaan', 'Warna Corporate', 'Packaging Khusus'],
      image: 'tumbler ungu.jpg'
    }
  ];

  return (
    <LinearGradient
      colors={['#DE8389', '#B488BF']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Kembali</Text>
        </TouchableOpacity>
        <ThemedText style={styles.title}>Paket Bundling</ThemedText>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.heroSection}>
          <Text style={styles.heroEmoji}>📦</Text>
          <ThemedText style={styles.heroTitle}>Hemat Lebih Banyak!</ThemedText>
          <Text style={styles.heroDesc}>
            Dapatkan produk favorit dengan harga spesial dalam paket bundling
          </Text>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Paket Bundling Populer</ThemedText>
          {bundlePackages.map((bundle) => (
            <View key={bundle.id} style={styles.bundleCard}>
              {bundle.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>PALING POPULER</Text>
                </View>
              )}
              
              <View style={styles.bundleHeader}>
                <ThemedText style={styles.bundleName}>{bundle.name}</ThemedText>
                <View style={styles.savingsBadge}>
                  <Text style={styles.savingsText}>{bundle.badge}</Text>
                </View>
              </View>

              <Text style={styles.bundleDesc}>{bundle.description}</Text>

              <View style={styles.itemsList}>
                {bundle.items.map((item, index) => (
                  <View key={index} style={styles.itemRow}>
                    <Image 
                      source={getImageSource(item.image)} 
                      style={styles.itemImage}
                    />
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemQuantity}>x{item.quantity}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.priceSection}>
                <View style={styles.priceRow}>
                  <Text style={styles.originalPrice}>
                    Rp {bundle.originalPrice.toLocaleString('id-ID')}
                  </Text>
                  <ThemedText style={styles.bundlePrice}>
                    Rp {bundle.bundlePrice.toLocaleString('id-ID')}
                  </ThemedText>
                </View>
                <Text style={styles.savingsAmount}>
                  Hemat Rp {bundle.savings.toLocaleString('id-ID')}
                </Text>
              </View>

              <TouchableOpacity 
                style={[styles.buyButton, bundle.popular && styles.popularButton]}
                onPress={() => router.push({
                  pathname: '/checkout',
                  params: {
                    name: bundle.name,
                    price: bundle.bundlePrice.toString(),
                    image: bundle.items[0]?.image || 'bundling1.jpg',
                    description: bundle.description,
                    type: 'bundle',
                    originalPrice: bundle.originalPrice.toString(),
                    savings: bundle.savings.toString()
                  }
                })}
              >
                <Text style={styles.buyButtonText}>Beli Paket Ini</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Paket Tema Spesial</ThemedText>
          {themePackages.map((theme) => (
            <View key={theme.id} style={styles.themeCard}>
              <Image 
                source={getImageSource(theme.image)} 
                style={styles.themeImage}
              />
              <View style={styles.themeInfo}>
                <View style={styles.themeBadge}>
                  <Text style={styles.themeLabel}>{theme.theme}</Text>
                </View>
                <ThemedText style={styles.themeName}>{theme.name}</ThemedText>
                <Text style={styles.themeDesc}>{theme.description}</Text>
                <View style={styles.themeItems}>
                  {theme.items.map((item, index) => (
                    <Text key={index} style={styles.themeItem}>• {item}</Text>
                  ))}
                </View>
                <ThemedText style={styles.themePrice}>
                  Rp {theme.price.toLocaleString('id-ID')}
                </ThemedText>
                <TouchableOpacity 
                  style={styles.themeButton}
                  onPress={() => router.push('/checkout')}
                >
                  <Text style={styles.themeButtonText}>Pesan Sekarang</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Paket Custom</ThemedText>
          {customizablePackages.map((custom) => (
            <View key={custom.id} style={styles.customCard}>
              <Image 
                source={getImageSource(custom.image)} 
                style={styles.customImage}
              />
              <View style={styles.customInfo}>
                <ThemedText style={styles.customName}>{custom.name}</ThemedText>
                <Text style={styles.customDesc}>{custom.description}</Text>
                <View style={styles.customOptions}>
                  <Text style={styles.optionsTitle}>Include:</Text>
                  {custom.customOptions.map((option, index) => (
                    <Text key={index} style={styles.optionItem}>✓ {option}</Text>
                  ))}
                </View>
                <View style={styles.customPricing}>
                  <Text style={styles.startingPrice}>Mulai dari</Text>
                  <ThemedText style={styles.customPrice}>
                    Rp {custom.basePrice.toLocaleString('id-ID')}
                  </ThemedText>
                </View>
                <TouchableOpacity 
                  style={styles.customButton}
                  onPress={() => router.push('/custom-tumbler' as any)}
                >
                  <Text style={styles.customButtonText}>Buat Custom</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Keuntungan Paket Bundling</ThemedText>
          <View style={styles.benefitsCard}>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>💰</Text>
              <View style={styles.benefitContent}>
                <ThemedText style={styles.benefitTitle}>Hemat Hingga 34%</ThemedText>
                <Text style={styles.benefitDesc}>Dapatkan harga spesial dibanding beli satuan</Text>
              </View>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>📦</Text>
              <View style={styles.benefitContent}>
                <ThemedText style={styles.benefitTitle}>Gratis Ongkir</ThemedText>
                <Text style={styles.benefitDesc}>Semua paket bundling gratis ongkos kirim</Text>
              </View>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>🎁</Text>
              <View style={styles.benefitContent}>
                <ThemedText style={styles.benefitTitle}>Packaging Premium</ThemedText>
                <Text style={styles.benefitDesc}>Kemasan eksklusif siap untuk hadiah</Text>
              </View>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>⚡</Text>
              <View style={styles.benefitContent}>
                <ThemedText style={styles.benefitTitle}>Fast Delivery</ThemedText>
                <Text style={styles.benefitDesc}>Pengiriman prioritas untuk paket bundling</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#fff',
  },
  bundleCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    left: 20,
    backgroundColor: '#ff6b35',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  popularText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  bundleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  bundleName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  savingsBadge: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  savingsText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  bundleDesc: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
    lineHeight: 20,
  },
  itemsList: {
    marginBottom: 15,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
  },
  itemImage: {
    width: 30,
    height: 30,
    borderRadius: 4,
    marginRight: 12,
  },
  itemName: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  itemQuantity: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DE8389',
  },
  priceSection: {
    marginBottom: 15,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  originalPrice: {
    fontSize: 14,
    color: '#6c757d',
    textDecorationLine: 'line-through',
  },
  bundlePrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#DE8389',
  },
  savingsAmount: {
    fontSize: 12,
    color: '#dc3545',
    fontWeight: '600',
  },
  buyButton: {
    backgroundColor: '#DE8389',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  popularButton: {
    backgroundColor: '#ff6b35',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  themeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
  },
  themeImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  themeInfo: {
    flex: 1,
  },
  themeBadge: {
    backgroundColor: '#ffc107',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  themeLabel: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  themeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  themeDesc: {
    fontSize: 12,
    color: '#555',
    marginBottom: 8,
  },
  themeItems: {
    marginBottom: 10,
  },
  themeItem: {
    fontSize: 11,
    color: '#333',
    marginBottom: 2,
  },
  themePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DE8389',
    marginBottom: 10,
  },
  themeButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  themeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  customCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
  },
  customImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  customInfo: {
    flex: 1,
  },
  customName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  customDesc: {
    fontSize: 12,
    color: '#555',
    marginBottom: 10,
  },
  customOptions: {
    marginBottom: 10,
  },
  optionsTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  optionItem: {
    fontSize: 11,
    color: '#28a745',
    marginBottom: 2,
  },
  customPricing: {
    marginBottom: 10,
  },
  startingPrice: {
    fontSize: 11,
    color: '#6c757d',
  },
  customPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DE8389',
  },
  customButton: {
    backgroundColor: '#6f42c1',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  customButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  benefitsCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  benefitIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  benefitDesc: {
    fontSize: 12,
    color: '#6c757d',
    lineHeight: 16,
  },
});
