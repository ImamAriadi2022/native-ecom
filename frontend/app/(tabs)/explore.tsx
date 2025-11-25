import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';

// Import komponen Card dari folder components
import ProductCard from '@/components/Card';

export default function TabTwoScreen() {
  const router = useRouter();
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('Semua');
  const [isFloatingExpanded, setIsFloatingExpanded] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const expandAnimation = useRef(new Animated.Value(0)).current;

  const filterOptions = ['Semua', 'Tumbler', 'Bottle', 'Aksesoris'];

  const productData = [
    {
      id: 1,
      image: require('@/assets/images/tumbler oren.jpg'),
      judul: 'Blush Aura',
      desc: 'Sentuhan manis warna blush yang memancarkan kehangatan dan keceriaan, cocok untuk hari penuh energi.',
      harga: 299000,
      kategori: 'Tumbler'
    },
    {
      id: 2,
      image: require('@/assets/images/tumbler ungu.jpg'),
      judul: 'Luna Frost',
      desc: 'Tumbler dengan warna lilac lembut dengan aksen ungu pastel, memberi kesan tenang dan elegan.',
      harga: 249000,
      kategori: 'Tumbler'
    },
    {
      id: 3,
      image: require('@/assets/images/tumbler pink1.jpg'),
      judul: 'Pink Reverie',
      desc: 'Paduan warna pastel yang menggambarkan impian dan kelembutan, teman setia momen manis harimu.',
      harga: 299000,
      kategori: 'Tumbler'
    },
    {
      id: 4,
      image: require('@/assets/images/tumbler hijau2.jpg'),
      judul: 'Sage Calm',
      desc: 'Desain simple dan bernuansa alami, cocok untuk kamu yang menyukai kesegaran dan ketenangan.',
      harga: 279000,
      kategori: 'Tumbler'
    },
    {
      id: 5,
      image: require('@/assets/images/tumbler khaki.jpg'),
      judul: 'Dusk Mocha',
      desc: 'Hangat dan netral, dusk mocha hadir dengan warna kopi susu yang elegan.',
      harga: 279000,
      kategori: 'Tumbler'
    },
    {
      id: 6,
      image: require('@/assets/images/gantungan1.jpg'),
      judul: 'Rose Glow',
      desc: 'Aksesoris gantungan tumbler yang cantik dan fungsional.',
      harga: 89000,
      kategori: 'Aksesoris'
    }
  ];

  const promoData = [
    {
      id: 1,
      title: "Flash Sale 70%",
      subtitle: "Semua Tumbler Favorit",
      gradient: ['#FF6B6B', '#FF8E8E'],
      icon: "🎉"
    },
    {
      id: 2, 
      title: "Buy 2 Get 1",
      subtitle: "Koleksi Terbaru",
      gradient: ['#4ECDC4', '#6DD5D5'], 
      icon: "🎁"
    },
    {
      id: 3,
      title: "Free Shipping",
      subtitle: "Min. Pembelian 500K",
      gradient: ['#45B7D1', '#67C2E0'],
      icon: "🚚"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromoIndex((prev) => (prev + 1) % promoData.length);
    }, 3000); // Auto slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    router.replace('/');
  };

  const navigateTo = (path: any) => {
    router.push(path);
  };

  const handleFilterPress = (filter: string) => {
    setSelectedFilter(filter);
  };

  const getFilteredProducts = () => {
    if (selectedFilter === 'Semua') {
      return productData;
    }
    return productData.filter(product => product.kategori === selectedFilter);
  };

  const filteredProducts = getFilteredProducts();

  const toggleFloatingButtons = () => {
    const toValue = isFloatingExpanded ? 0 : 1;
    setIsFloatingExpanded(!isFloatingExpanded);
    
    Animated.spring(expandAnimation, {
      toValue,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Fixed Header Section */}
      <View style={styles.headerSection}>
        <ThemedText type="title" style={styles.brandTitle}>Lyana Bottle Studio</ThemedText>
        <ThemedText style={styles.brandSubtitle}>Temani Harimu, Setiap Tegukan Penuh Cerita</ThemedText>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Content Wrapper */}
        <View style={styles.contentWrapper}>
          {/* Hero Promo Section */}
          <View style={styles.heroPromoSection}>
            <LinearGradient
              colors={promoData[currentPromoIndex].gradient as [string, string]}
              style={styles.promoSlide}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.promoIcon}>{promoData[currentPromoIndex].icon}</Text>
              <ThemedText style={styles.promoTitle}>{promoData[currentPromoIndex].title}</ThemedText>
              <ThemedText style={styles.promoSubtitle}>{promoData[currentPromoIndex].subtitle}</ThemedText>
              <Pressable 
                style={styles.promoButton}
                onPress={() => navigateTo('/promo')}
              >
                <Text style={styles.promoButtonText}>Lihat Promo</Text>
              </Pressable>
            </LinearGradient>
            
            {/* Promo Indicators */}
            <View style={styles.promoIndicators}>
              {promoData.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.promoIndicator,
                    currentPromoIndex === index && styles.promoIndicatorActive
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Combined Product Section with Filter */}
          <View style={styles.productContainer}>
            <ThemedText style={styles.productHeading}>PRODUK TERBARU</ThemedText>
            
            {/* Product Filter */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {filterOptions.map((filter) => (
                <Pressable 
                  key={filter}
                  style={[styles.filterChip, selectedFilter === filter && styles.filterChipActive]}
                  onPress={() => handleFilterPress(filter)}
                >
                  <ThemedText style={[styles.filterText, selectedFilter === filter && styles.filterTextActive]}>
                    {filter}
                  </ThemedText>
                </Pressable>
              ))}
            </ScrollView>
            
            {/* Filtered Products Grid */}
            <View style={styles.productsGrid}>
            {filteredProducts.map((product, index) => {
              if (index % 2 === 0) {
                return (
                  <View key={`row-${index}`} style={styles.productRow}>
                    <View style={styles.cardWrapper}>
                      <ProductCard
                        id={product.id}
                        image={product.image}
                        judul={product.judul}
                        desc={product.desc}
                        harga={product.harga}
                        kategori={product.kategori}
                      />
                    </View>
                    {filteredProducts[index + 1] && (
                      <View style={styles.cardWrapper}>
                        <ProductCard
                          id={filteredProducts[index + 1].id}
                          image={filteredProducts[index + 1].image}
                          judul={filteredProducts[index + 1].judul}
                          desc={filteredProducts[index + 1].desc}
                          harga={filteredProducts[index + 1].harga}
                          kategori={filteredProducts[index + 1].kategori}
                        />
                      </View>
                    )}
                  </View>
                );
              }
              return null;
            })}
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
        </View>

      </ScrollView>

      {/* Floating Action Buttons */}
      <View style={styles.floatingButtons}>
        {/* Expanded Buttons - Animated */}
        <Animated.View
          style={[
            styles.expandedButtonsContainer,
            {
              opacity: expandAnimation,
              transform: [
                {
                  translateY: expandAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
                {
                  scale: expandAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
            },
          ]}
          pointerEvents={isFloatingExpanded ? 'auto' : 'none'}
        >
          <Pressable 
            style={[styles.floatingButton, styles.bundlingButton]}
            onPress={() => {
              navigateTo('/bundling');
              toggleFloatingButtons();
            }}
          >
            <Text style={styles.floatingButtonIcon}>📦</Text>
            <Text style={styles.floatingButtonText}>Bundle</Text>
          </Pressable>

          <Pressable 
            style={[styles.floatingButton, styles.customButton]}
            onPress={() => {
              navigateTo('/custom-tumbler');
              toggleFloatingButtons();
            }}
          >
            <Text style={styles.floatingButtonIcon}>🎨</Text>
            <Text style={styles.floatingButtonText}>Custom</Text>
          </Pressable>
        </Animated.View>

        {/* Main More Button */}
        <Animated.View
          style={{
            transform: [
              {
                rotate: expandAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '45deg'],
                }),
              },
            ],
          }}
        >
          <Pressable 
            style={[styles.floatingButton, styles.moreButton]}
            onPress={toggleFloatingButtons}
          >
            <Text style={styles.floatingButtonIcon}>
              {isFloatingExpanded ? '✕' : '⋯'}
            </Text>
            <Text style={styles.floatingButtonText}>
              {isFloatingExpanded ? 'Close' : 'More'}
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerSection: {
    backgroundColor: '#DE8389',
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1000,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentWrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 120, // Space for floating buttons
  },
  brandTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  brandSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  productsGrid: {
    marginTop: 20,
  },
  quickActionsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  quickActionIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  quickActionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  quickActionSubtext: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterChip: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterChipActive: {
    backgroundColor: '#DE8389',
    borderColor: '#DE8389',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  categorySection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  categoryItem: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryIcon: {
    fontSize: 28,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  serviceSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  serviceList: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  serviceIcon: {
    fontSize: 24,
    marginRight: 15,
    width: 30,
  },
  serviceContent: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  serviceSubtitle: {
    fontSize: 12,
    color: '#666',
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
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
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
  
  // Hero Promo Section
  heroPromoSection: {
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 25,
  },
  promoSlide: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  promoSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 15,
  },
  promoButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  promoButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  promoIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    gap: 6,
  },
  promoIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  promoIndicatorActive: {
    backgroundColor: '#fff',
    width: 20,
  },



  // Floating Action Buttons
  floatingButtons: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    zIndex: 1000,
    alignItems: 'center',
  },
  expandedButtonsContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  floatingButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    marginBottom: 15,
  },
  moreButton: {
    backgroundColor: '#DE8389',
  },
  bundlingButton: {
    backgroundColor: '#4ECDC4',
  },
  customButton: {
    backgroundColor: '#45B7D1',
  },
  floatingButtonIcon: {
    fontSize: 24,
    marginBottom: 2,
    color: '#fff',
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});
