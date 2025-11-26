import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function EventDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const eventId = params.id as string;
  
  const [selectedProducts, setSelectedProducts] = useState<{[productId: string]: number}>({});

  // Image mapping untuk static imports
  const getImageSource = (imageName: string) => {
    const imageMap: { [key: string]: any } = {
      'disney1.jpeg': require('../assets/images/disney1.jpeg'),
      'disney2.jpeg': require('../assets/images/disney2.jpeg'),
      'disney3.jpeg': require('../assets/images/disney3.jpeg'),
      'disney4.jpeg': require('../assets/images/disney4.jpeg'),
      'disney5.jpeg': require('../assets/images/disney5.jpeg'),
      'disney6.jpeg': require('../assets/images/disney6.jpeg'),
      'tumbler-biru-tua.jpeg': require('../assets/images/tumbler biru tua.jpeg'),
      'tumbler-ungu.jpg': require('../assets/images/tumbler ungu.jpg'),
      'tumbler-oren.jpg': require('../assets/images/tumbler oren.jpg'),
      'tumbler-khaki.jpg': require('../assets/images/tumbler khaki.jpg'),
      'tumbler-pink.jpg': require('../assets/images/tumbler pink1.jpg'),
      'react-logo.png': require('../assets/images/react-logo.png'),
    };
    return imageMap[imageName] || imageMap['react-logo.png'];
  };

  // Data event detail berdasarkan ID
  const getEventData = (id: string) => {
    const events: { [key: string]: any } = {
      'disney': {
        id: 'disney',
        title: 'Disney Collection Launch',
        subtitle: 'Koleksi Tumbler Disney Eksklusif',
        description: 'Dapatkan tumbler dengan karakter Disney favorit kamu! Limited edition hanya untuk bulan ini dengan desain eksklusif yang tidak akan kamu temukan di tempat lain.',
        image: 'disney1.jpeg',
        startDate: '1 Januari 2025',
        endDate: '31 Maret 2025',
        status: 'Berlangsung',
        discount: '25%',
        color: '#DE8389',
        icon: '🏰',
        products: [
          { id: 'mickey', name: 'Tumbler Mickey Mouse', price: 89000, originalPrice: 119000, image: 'disney2.jpeg', description: 'Tumbler dengan desain Mickey Mouse klasik yang ikonik' },
          { id: 'princess', name: 'Tumbler Princess Collection', price: 95000, originalPrice: 127000, image: 'disney3.jpeg', description: 'Koleksi princess Disney dengan desain elegan dan mewah' },
          { id: 'toystory', name: 'Tumbler Toy Story', price: 85000, originalPrice: 113000, image: 'disney4.jpeg', description: 'Petualangan Woody dan Buzz Lightyear dalam tumbler eksklusif' },
          { id: 'frozen', name: 'Tumbler Frozen Special', price: 92000, originalPrice: 123000, image: 'disney5.jpeg', description: 'Elsa dan Anna hadir dalam desain winter yang memukau' },
          { id: 'marvel', name: 'Tumbler Marvel Heroes', price: 98000, originalPrice: 131000, image: 'disney6.jpeg', description: 'Superhero Marvel favorit dalam satu koleksi tumbler' }
        ]
      },
      'hotwheels': {
        id: 'hotwheels',
        title: 'Hot Wheels Racing Collection',
        subtitle: 'Koleksi Tumbler Hot Wheels Speed',
        description: 'Rasakan sensasi kecepatan dengan tumbler Hot Wheels! Desain eksklusif dengan tema mobil balap dan trek legendaris yang akan membuatmu merasakan adrenalin setiap hari.',
        image: 'tumbler-biru-tua.jpeg',
        startDate: '1 Februari 2025',
        endDate: '30 April 2025',
        status: 'Berlangsung',
        discount: '30%',
        color: '#FF6347',
        icon: '🏎️',
        products: [
          { id: 'flame', name: 'Tumbler Hot Wheels Flame', price: 92000, originalPrice: 131000, image: 'tumbler-oren.jpg', description: 'Desain flame racing dengan efek api yang memukau' },
          { id: 'speed', name: 'Tumbler Speed Racer', price: 89000, originalPrice: 127000, image: 'tumbler-biru-tua.jpeg', description: 'Tema balap dengan garis-garis speed yang dinamis' },
          { id: 'turbo', name: 'Tumbler Turbo Charge', price: 95000, originalPrice: 136000, image: 'tumbler-ungu.jpg', description: 'Turbo charge edition dengan aksen metalik' },
          { id: 'drift', name: 'Tumbler Drift King', price: 88000, originalPrice: 126000, image: 'tumbler-khaki.jpg', description: 'Drift king special dengan desain jalur drift' },
          { id: 'classic', name: 'Tumbler Classic Cars', price: 91000, originalPrice: 130000, image: 'tumbler-pink.jpg', description: 'Mobil klasik legendaris dalam desain vintage' }
        ]
      },
      'spring': {
        id: 'spring',
        title: 'Disney Spring Festival',
        subtitle: 'Koleksi Musim Semi Disney',
        description: 'Rayakan musim semi dengan tumbler Disney bertema bunga dan alam! Koleksi terbatas dengan design eksklusif yang memadukan karakter Disney dengan keindahan alam.',
        image: 'disney2.jpeg',
        startDate: '15 Maret 2025',
        endDate: '30 Juni 2025',
        status: 'Berlangsung',
        discount: '20%',
        color: '#4ECDC4',
        icon: '🌸',
        products: [
          { id: 'bambi', name: 'Tumbler Bambi Garden', price: 87000, originalPrice: 109000, image: 'disney1.jpeg', description: 'Bambi dalam taman bunga musim semi yang indah' },
          { id: 'tinkerbell', name: 'Tumbler Tinker Bell', price: 91000, originalPrice: 114000, image: 'disney3.jpeg', description: 'Tinker Bell dengan serbuk peri dan bunga-bunga' },
          { id: 'moana', name: 'Tumbler Moana Ocean', price: 94000, originalPrice: 118000, image: 'disney5.jpeg', description: 'Moana dan ocean vibes dengan elemen alam' }
        ]
      }
    };
    return events[id] || events['disney'];
  };

  const eventData = getEventData(eventId);

  const updateProductQuantity = (productId: string, quantity: number) => {
    setSelectedProducts(prev => ({
      ...prev,
      [productId]: Math.max(0, quantity)
    }));
  };

  const getTotalSelected = () => {
    return Object.values(selectedProducts).reduce((sum, qty) => sum + qty, 0);
  };

  const getTotalPrice = () => {
    let total = 0;
    Object.entries(selectedProducts).forEach(([productId, qty]) => {
      const product = eventData.products.find((p: any) => p.id === productId);
      if (product) {
        total += product.price * qty;
      }
    });
    return total;
  };

  const proceedToCheckout = () => {
    const selectedItems = Object.entries(selectedProducts)
      .filter(([_, qty]) => qty > 0)
      .map(([productId, qty]) => {
        const product = eventData.products.find((p: any) => p.id === productId);
        return { ...product, quantity: qty };
      });

    if (selectedItems.length === 0) {
      Alert.alert('Pilih Produk', 'Silakan pilih minimal 1 produk untuk checkout');
      return;
    }

    const totalPrice = getTotalPrice();

    router.push({
      pathname: '/checkout',
      params: {
        name: `Event ${eventData.title}`,
        price: totalPrice.toString(),
        image: eventData.image,
        description: `${selectedItems.length} produk dari ${eventData.title} dengan diskon ${eventData.discount}`,
        type: 'event',
        items: JSON.stringify(selectedItems)
      }
    });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ThemedView style={styles.container}>
        <StatusBar style="light" translucent={false} />
      {/* Header */}
      <View style={[styles.header, { backgroundColor: eventData.color }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="arrow.left" size={24} color="#fff" />
        </Pressable>
        <ThemedText style={styles.headerTitle}>{eventData.title}</ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>

        {/* Products Section */}
        <View style={styles.productsSection}>
          <ThemedText style={styles.sectionTitle}>🛍️ Produk Event ({eventData.products.length} item)</ThemedText>
          
          {eventData.products.map((product: any) => (
            <View key={product.id} style={styles.productCard}>
              <Image 
                source={getImageSource(product.image)} 
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <ThemedText style={styles.productName}>{product.name}</ThemedText>
                <ThemedText style={styles.productDescription}>{product.description}</ThemedText>
                
                <View style={styles.priceContainer}>
                  <ThemedText style={styles.originalPrice}>Rp {product.originalPrice.toLocaleString()}</ThemedText>
                  <ThemedText style={styles.discountPrice}>Rp {product.price.toLocaleString()}</ThemedText>
                  <View style={styles.discountBadge}>
                    <ThemedText style={styles.discountText}>{eventData.discount} OFF</ThemedText>
                  </View>
                </View>

                <View style={styles.quantitySection}>
                  <ThemedText style={styles.quantityLabel}>Jumlah:</ThemedText>
                  <View style={styles.quantityControls}>
                    <TouchableOpacity 
                      style={styles.quantityButton}
                      onPress={() => updateProductQuantity(product.id, (selectedProducts[product.id] || 0) - 1)}
                    >
                      <ThemedText style={styles.quantityButtonText}>-</ThemedText>
                    </TouchableOpacity>
                    <ThemedText style={styles.quantityValue}>
                      {selectedProducts[product.id] || 0}
                    </ThemedText>
                    <TouchableOpacity 
                      style={styles.quantityButton}
                      onPress={() => updateProductQuantity(product.id, (selectedProducts[product.id] || 0) + 1)}
                    >
                      <ThemedText style={styles.quantityButtonText}>+</ThemedText>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Summary Section */}
        {getTotalSelected() > 0 && (
          <View style={styles.summarySection}>
            <View style={styles.summaryCard}>
              <ThemedText style={styles.summaryTitle}>📋 Ringkasan Pesanan</ThemedText>
              <View style={styles.summaryRow}>
                <ThemedText style={styles.summaryLabel}>Total Item:</ThemedText>
                <ThemedText style={styles.summaryValue}>{getTotalSelected()} produk</ThemedText>
              </View>
              <View style={styles.summaryRow}>
                <ThemedText style={styles.summaryLabel}>Total Harga:</ThemedText>
                <ThemedText style={styles.summaryPrice}>Rp {getTotalPrice().toLocaleString()}</ThemedText>
              </View>
              
              <Pressable style={styles.checkoutButton} onPress={proceedToCheckout}>
                <IconSymbol name="cart.fill" size={20} color="#fff" />
                <ThemedText style={styles.checkoutButtonText}>Checkout Sekarang</ThemedText>
              </Pressable>
            </View>
          </View>
        )}

        {/* Event Terms */}
        <View style={styles.termsSection}>
          <ThemedText style={styles.termsTitle}>📝 Syarat & Ketentuan Event</ThemedText>
          <View style={styles.termsList}>
            <ThemedText style={styles.termItem}>• Event berlaku selama periode yang telah ditentukan</ThemedText>
            <ThemedText style={styles.termItem}>• Diskon tidak dapat digabung dengan promo lain</ThemedText>
            <ThemedText style={styles.termItem}>• Stok terbatas, selama persediaan masih ada</ThemedText>
            <ThemedText style={styles.termItem}>• Produk yang dibeli tidak dapat ditukar atau dikembalikan</ThemedText>
            <ThemedText style={styles.termItem}>• Harga sudah termasuk diskon event</ThemedText>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  scrollContainer: {
    flex: 1,
  },

  productsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discountPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DE8389',
    marginRight: 8,
  },
  discountBadge: {
    backgroundColor: '#ff4757',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 4,
  },
  quantityButton: {
    backgroundColor: '#DE8389',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  summarySection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  summaryPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DE8389',
  },
  checkoutButton: {
    backgroundColor: '#DE8389',
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  termsSection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    padding: 20,
  },
  termsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  termsList: {
    gap: 8,
  },
  termItem: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});