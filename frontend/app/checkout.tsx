import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

export default function CheckoutScreen() {
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
      'kupu.png': require('../assets/images/kupu.png'),
      'monyet.png': require('../assets/images/monyet.png'),
      'meong.png': require('../assets/images/meong.png'),
      'jerapah.png': require('../assets/images/jerapah.png'),
      'react-logo.png': require('../assets/images/react-logo.png'),
      'disney1.jpeg': require('../assets/images/kupu.png'), // fallback
      'disney2.jpeg': require('../assets/images/monyet.png'), // fallback
      'disney3.jpeg': require('../assets/images/meong.png'), // fallback
      'disney4.jpeg': require('../assets/images/jerapah.png'), // fallback
      'tumbler biru tua.jpeg': require('../assets/images/tumbler cream.jpg'), // fallback
      'tumbler ungu pink.jpeg': require('../assets/images/tumbler ungu.jpg'), // fallback
    };
    return imageMap[imageName] || imageMap['react-logo.png'];
  };

  const router = useRouter();
  const params = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);

  // Data produk dari params atau default
  const productData = {
    name: params.name as string || 'Produk',
    price: parseInt(params.price as string) || 299000,
    image: params.image as string || 'react-logo.png',
    description: params.description as string || 'Deskripsi produk',
    type: params.type as string || 'regular',
    originalPrice: params.originalPrice ? parseInt(params.originalPrice as string) : null,
    savings: params.savings ? parseInt(params.savings as string) : null
  };

  const subtotal = productData.price * quantity;
  const shippingCost = 15000;
  const total = subtotal + shippingCost;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleProceedToPayment = () => {
    router.push({
      pathname: '/payment-method',
      params: {
        orderId: 'LBS' + Date.now(),
        productName: productData.name,
        quantity: quantity.toString(),
        total: total.toString(),
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
            <ThemedText type="title" style={styles.title}>
              Checkout
            </ThemedText>
            <Pressable onPress={() => router.back()}>
              <ThemedText style={styles.backText}>← Kembali</ThemedText>
            </Pressable>
          </View>

          {/* Product Summary */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Ringkasan Pesanan</ThemedText>
            
            <View style={styles.productCard}>
              {productData.image && (
                <Image 
                  source={getImageSource(productData.image)} 
                  style={styles.productImage}
                />
              )}
              <View style={styles.productInfo}>
                <ThemedText style={styles.productName}>{productData.name}</ThemedText>
                <ThemedText style={styles.productDesc}>{productData.description}</ThemedText>
                
                {productData.originalPrice && productData.savings && (
                  <View style={styles.priceContainer}>
                    <ThemedText style={styles.originalPrice}>
                      Rp {productData.originalPrice.toLocaleString('id-ID')}
                    </ThemedText>
                    <ThemedText style={styles.savingsText}>
                      Hemat Rp {productData.savings.toLocaleString('id-ID')}
                    </ThemedText>
                  </View>
                )}
                
                <ThemedText style={styles.productPrice}>
                  Rp {productData.price.toLocaleString('id-ID')}
                </ThemedText>
              </View>
            </View>

            {/* Quantity Selector */}
            <View style={styles.quantitySection}>
              <ThemedText style={styles.quantityLabel}>Jumlah:</ThemedText>
              <View style={styles.quantityControls}>
                <Pressable 
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(-1)}
                >
                  <ThemedText style={styles.quantityButtonText}>-</ThemedText>
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

          {/* Order Summary */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Rincian Pembayaran</ThemedText>
            
            <View style={styles.summaryRow}>
              <ThemedText style={styles.summaryLabel}>
                Subtotal ({quantity} item)
              </ThemedText>
              <ThemedText style={styles.summaryValue}>
                Rp {subtotal.toLocaleString('id-ID')}
              </ThemedText>
            </View>

            <View style={styles.summaryRow}>
              <ThemedText style={styles.summaryLabel}>Ongkos Kirim</ThemedText>
              <ThemedText style={styles.summaryValue}>
                Rp {shippingCost.toLocaleString('id-ID')}
              </ThemedText>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <ThemedText style={styles.totalLabel}>Total</ThemedText>
              <ThemedText style={styles.totalValue}>
                Rp {total.toLocaleString('id-ID')}
              </ThemedText>
            </View>
          </View>

          {/* Delivery Info */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Informasi Pengiriman</ThemedText>
            <ThemedText style={styles.deliveryInfo}>
              📍 Alamat: Jakarta, Indonesia{'\n'}
              📦 Estimasi: 2-3 hari kerja{'\n'}
              🚚 Kurir: JNE Regular
            </ThemedText>
          </View>

          {/* Checkout Button */}
          <Pressable 
            style={styles.checkoutButton}
            onPress={handleProceedToPayment}
          >
            <ThemedText style={styles.checkoutButtonText}>
              Bayar Sekarang - Rp {total.toLocaleString('id-ID')}
            </ThemedText>
          </Pressable>
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
    padding: 16,
    backgroundColor: 'transparent',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  backText: {
    color: '#fff',
    fontSize: 16,
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  productDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    gap: 10,
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  savingsText: {
    fontSize: 12,
    color: '#28a745',
    fontWeight: '600',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DE8389',
  },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
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
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DE8389',
  },
  deliveryInfo: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  checkoutButton: {
    backgroundColor: '#DE8389',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
