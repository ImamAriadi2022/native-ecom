import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

const productData: any = {
  'blush-aura': {
    name: "Blush Aura",
    price: 299000,
    originalPrice: 349000,
    images: [
      require('@/assets/images/tumbler oren.jpg'),
      require('@/assets/images/tumbler oren.jpg'),
      require('@/assets/images/tumbler oren.jpg')
    ],
    rating: 4.8,
    reviewCount: 127,
    description: "Sentuhan manis warna blush yang memancarkan kehangatan dan keceriaan, cocok untuk hari penuh energi. Tumbler premium dengan teknologi double wall yang dapat mempertahankan suhu minuman hingga 12 jam.",
    specifications: {
      "Material": "Stainless Steel 316L",
      "Kapasitas": "500ml",
      "Dimensi": "20cm x 7cm",
      "Berat": "350gr",
      "Garansi": "1 Tahun"
    },
    features: [
      "Double wall insulation",
      "Anti-slip bottom",
      "BPA Free",
      "Leak-proof design",
      "Easy to clean"
    ],
    inStock: true,
    stockCount: 15
  }
};

export default function ProductDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');

  const productId = params.id as string || 'blush-aura';
  const product = productData[productId] || productData['blush-aura'];

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    router.push({
      pathname: '/cart' as any,
      params: {
        productName: product.name,
        price: product.price.toString(),
        quantity: quantity.toString()
      }
    });
  };

  const handleBuyNow = () => {
    router.push({
      pathname: '/checkout',
      params: {
        name: product.name,
        price: product.price.toString(),
        description: product.description,
        quantity: quantity.toString()
      }
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
            <View style={styles.headerActions}>
              <Pressable style={styles.iconButton}>
                <ThemedText style={styles.iconText}>🤍</ThemedText>
              </Pressable>
              <Pressable style={styles.iconButton}>
                <ThemedText style={styles.iconText}>📤</ThemedText>
              </Pressable>
            </View>
          </View>

          {/* Product Images */}
          <View style={styles.imageSection}>
            <View style={styles.mainImageContainer}>
              <Image source={product.images[selectedImageIndex]} style={styles.mainImage} />
              {!product.inStock && (
                <View style={styles.outOfStockOverlay}>
                  <ThemedText style={styles.outOfStockText}>Stok Habis</ThemedText>
                </View>
              )}
            </View>
            <ScrollView horizontal style={styles.thumbnailContainer} showsHorizontalScrollIndicator={false}>
              {product.images.map((image: any, index: number) => (
                <Pressable
                  key={index}
                  style={[
                    styles.thumbnail,
                    selectedImageIndex === index && styles.thumbnailActive
                  ]}
                  onPress={() => setSelectedImageIndex(index)}
                >
                  <Image source={image} style={styles.thumbnailImage} />
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Product Info */}
          <View style={styles.productInfo}>
            <View style={styles.ratingSection}>
              <ThemedText style={styles.rating}>⭐ {product.rating}</ThemedText>
              <ThemedText style={styles.reviewCount}>({product.reviewCount} ulasan)</ThemedText>
              <ThemedText style={styles.stockInfo}>📦 Stok: {product.stockCount}</ThemedText>
            </View>
            
            <ThemedText style={styles.productName}>{product.name}</ThemedText>
            
            <View style={styles.priceSection}>
              <ThemedText style={styles.currentPrice}>
                Rp {product.price.toLocaleString('id-ID')}
              </ThemedText>
              {product.originalPrice && (
                <ThemedText style={styles.originalPrice}>
                  Rp {product.originalPrice.toLocaleString('id-ID')}
                </ThemedText>
              )}
              {product.originalPrice && (
                <View style={styles.discountBadge}>
                  <ThemedText style={styles.discountText}>
                    -{Math.round((1 - product.price/product.originalPrice) * 100)}%
                  </ThemedText>
                </View>
              )}
            </View>

            {/* Quantity Selector */}
            <View style={styles.quantitySection}>
              <ThemedText style={styles.quantityLabel}>Jumlah:</ThemedText>
              <View style={styles.quantityControls}>
                <Pressable 
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(-1)}
                >
                  <ThemedText style={styles.quantityButtonText}>−</ThemedText>
                </Pressable>
                <ThemedText style={styles.quantityText}>{quantity}</ThemedText>
                <Pressable 
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(1)}
                >
                  <ThemedText style={styles.quantityButtonText}>+</ThemedText>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabsSection}>
            <View style={styles.tabsContainer}>
              <Pressable
                style={[styles.tab, selectedTab === 'description' && styles.tabActive]}
                onPress={() => setSelectedTab('description')}
              >
                <ThemedText style={[
                  styles.tabText,
                  selectedTab === 'description' && styles.tabTextActive
                ]}>
                  Deskripsi
                </ThemedText>
              </Pressable>
              <Pressable
                style={[styles.tab, selectedTab === 'specs' && styles.tabActive]}
                onPress={() => setSelectedTab('specs')}
              >
                <ThemedText style={[
                  styles.tabText,
                  selectedTab === 'specs' && styles.tabTextActive
                ]}>
                  Spesifikasi
                </ThemedText>
              </Pressable>
              <Pressable
                style={[styles.tab, selectedTab === 'reviews' && styles.tabActive]}
                onPress={() => setSelectedTab('reviews')}
              >
                <ThemedText style={[
                  styles.tabText,
                  selectedTab === 'reviews' && styles.tabTextActive
                ]}>
                  Ulasan
                </ThemedText>
              </Pressable>
            </View>

            <View style={styles.tabContent}>
              {selectedTab === 'description' && (
                <View>
                  <ThemedText style={styles.descriptionText}>{product.description}</ThemedText>
                  <View style={styles.featuresSection}>
                    <ThemedText style={styles.featuresTitle}>Fitur Unggulan:</ThemedText>
                    {product.features.map((feature: string, index: number) => (
                      <ThemedText key={index} style={styles.featureItem}>
                        ✅ {feature}
                      </ThemedText>
                    ))}
                  </View>
                </View>
              )}
              
              {selectedTab === 'specs' && (
                <View style={styles.specsContainer}>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <View key={key} style={styles.specRow}>
                      <ThemedText style={styles.specLabel}>{key}:</ThemedText>
                      <ThemedText style={styles.specValue}>{value as string}</ThemedText>
                    </View>
                  ))}
                </View>
              )}
              
              {selectedTab === 'reviews' && (
                <View style={styles.reviewsContainer}>
                  <View style={styles.reviewSummary}>
                    <ThemedText style={styles.reviewSummaryText}>
                      ⭐ {product.rating} dari 5 ({product.reviewCount} ulasan)
                    </ThemedText>
                  </View>
                  <View style={styles.reviewItem}>
                    <ThemedText style={styles.reviewAuthor}>Sarah K.</ThemedText>
                    <ThemedText style={styles.reviewRating}>⭐⭐⭐⭐⭐</ThemedText>
                    <ThemedText style={styles.reviewText}>
                      "Kualitas sangat bagus! Warna cantik dan benar-benar tahan panas/dingin seperti yang dijanjikan."
                    </ThemedText>
                  </View>
                  <View style={styles.reviewItem}>
                    <ThemedText style={styles.reviewAuthor}>Budi R.</ThemedText>
                    <ThemedText style={styles.reviewRating}>⭐⭐⭐⭐⭐</ThemedText>
                    <ThemedText style={styles.reviewText}>
                      "Desain elegan, cocok untuk dibawa kemana-mana. Recommended!"
                    </ThemedText>
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <Pressable 
              style={[styles.actionButton, styles.addToCartButton]}
              onPress={handleAddToCart}
              disabled={!product.inStock}
            >
              <ThemedText style={styles.addToCartText}>🛒 Keranjang</ThemedText>
            </Pressable>
            <Pressable 
              style={[styles.actionButton, styles.buyNowButton]}
              onPress={handleBuyNow}
              disabled={!product.inStock}
            >
              <ThemedText style={styles.buyNowText}>
                {product.inStock ? '💳 Beli Sekarang' : 'Stok Habis'}
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
    backgroundColor: 'transparent',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  iconText: {
    fontSize: 18,
  },
  imageSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  mainImageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 15,
  },
  mainImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  outOfStockText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  thumbnailContainer: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  thumbnail: {
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbnailActive: {
    borderColor: '#DE8389',
  },
  thumbnailImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  productInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  rating: {
    fontSize: 14,
    color: '#FF9800',
    fontWeight: '600',
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
  },
  stockInfo: {
    fontSize: 12,
    color: '#4CAF50',
    marginLeft: 'auto',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  currentPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#DE8389',
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  quantityButton: {
    backgroundColor: '#DE8389',
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 30,
    textAlign: 'center',
  },
  tabsSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#DE8389',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#DE8389',
    fontWeight: 'bold',
  },
  tabContent: {
    padding: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 20,
  },
  featuresSection: {
    gap: 8,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  featureItem: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  specsContainer: {
    gap: 12,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  specLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  specValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  reviewsContainer: {
    gap: 15,
  },
  reviewSummary: {
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  reviewSummaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  reviewAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  reviewRating: {
    fontSize: 12,
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  addToCartButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#DE8389',
  },
  buyNowButton: {
    backgroundColor: '#DE8389',
  },
  addToCartText: {
    color: '#DE8389',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyNowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
