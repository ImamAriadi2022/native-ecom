import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { useCart } from '@/app/CartContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function CartScreen() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, getTotalItems, clearCart } = useCart();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Keranjang Kosong', 'Silakan tambahkan produk terlebih dahulu');
      return;
    }

    // Helper function to get filename from require object
    const getImageFileName = (imageRequire: any): string => {
      // Map common require objects to filenames
      const imageMap = new Map([
        [require('@/assets/images/tumbler oren.jpg'), 'tumbler oren.jpg'],
        [require('@/assets/images/tumbler ungu.jpg'), 'tumbler ungu.jpg'],
        [require('@/assets/images/tumbler cream.jpg'), 'tumbler cream.jpg'],
        [require('@/assets/images/tumbler pink1.jpg'), 'tumbler pink1.jpg'],
        [require('@/assets/images/tumbler hijau2.jpg'), 'tumbler hijau2.jpg'],
        [require('@/assets/images/tumbler khaki.jpg'), 'tumbler khaki.jpg'],
        [require('@/assets/images/tumbler biru tua.jpeg'), 'tumbler biru tua.jpeg'],
        [require('@/assets/images/tumbler ungu pink.jpeg'), 'tumbler ungu pink.jpeg'],
        [require('@/assets/images/masseto.jpg'), 'masseto.jpg'],
        [require('@/assets/images/gantungan1.jpg'), 'gantungan1.jpg'],
        [require('@/assets/images/bundling1.jpg'), 'bundling1.jpg'],
        [require('@/assets/images/bundling2.jpg'), 'bundling2.jpg'],
        [require('@/assets/images/bundling3.jpg'), 'bundling3.jpg'],
        [require('@/assets/images/custom1.jpeg'), 'custom1.jpeg'],
        [require('@/assets/images/custom2.jpeg'), 'custom2.jpeg'],
        [require('@/assets/images/custom3.jpeg'), 'custom3.jpeg'],
      ]);
      
      return imageMap.get(imageRequire) || 'react-logo.png';
    };

    // Prepare cart data for checkout
    const cartData = {
      items: cartItems.map(item => ({
        id: item.id,
        name: item.judul,
        image: getImageFileName(item.image),
        price: item.harga,
        quantity: item.quantity,
        variant: item.kategori
      })),
      subtotal: getTotalPrice(),
      shipping: 15000,
      service: 0,
      total: getTotalPrice() + 15000,
      itemCount: getTotalItems()
    };

    router.push({
      pathname: '/checkout',
      params: {
        type: 'cart',
        cartData: JSON.stringify(cartData)
      }
    });
  };

  const handleClearCart = () => {
    Alert.alert(
      'Hapus Semua Item',
      'Apakah Anda yakin ingin mengosongkan keranjang?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Ya, Hapus', style: 'destructive', onPress: clearCart }
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>Keranjang Belanja</ThemedText>
          {cartItems.length > 0 && (
            <Pressable onPress={handleClearCart}>
              <ThemedText style={styles.clearButton}>Hapus Semua</ThemedText>
            </Pressable>
          )}
        </View>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <View style={styles.emptyState}>
            <IconSymbol name="cart" size={80} color="#ccc" />
            <ThemedText style={styles.emptyTitle}>Keranjang Kosong</ThemedText>
            <ThemedText style={styles.emptySubtitle}>
              Belum ada produk yang ditambahkan ke keranjang
            </ThemedText>
            
            <Pressable 
              style={styles.shopButton}
              onPress={() => router.push('/(tabs)/explore')}
            >
              <ThemedText style={styles.shopButtonText}>Mulai Belanja</ThemedText>
              <IconSymbol name="arrow.right" size={16} color="#fff" />
            </Pressable>
          </View>
        ) : (
          /* Cart Items */
          <View>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <Image source={item.image} style={styles.itemImage} />
                
                <View style={styles.itemDetails}>
                  <ThemedText style={styles.itemName}>{item.judul}</ThemedText>
                  <ThemedText style={styles.itemPrice}>Rp {item.harga.toLocaleString('id-ID')}</ThemedText>
                  <ThemedText style={styles.itemCategory}>{item.kategori}</ThemedText>
                </View>
                
                <View style={styles.quantityControls}>
                  <Pressable 
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <ThemedText style={styles.quantityButtonText}>-</ThemedText>
                  </Pressable>
                  
                  <ThemedText style={styles.quantity}>{item.quantity}</ThemedText>
                  
                  <Pressable 
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <ThemedText style={styles.quantityButtonText}>+</ThemedText>
                  </Pressable>
                  
                  <Pressable 
                    style={styles.removeButton}
                    onPress={() => removeFromCart(item.id)}
                  >
                    <IconSymbol name="trash" size={16} color="#ff4444" />
                  </Pressable>
                </View>
              </View>
            ))}
            
            {/* Total Section */}
            <View style={styles.totalSection}>
              <View style={styles.totalRow}>
                <ThemedText style={styles.totalLabel}>Total ({cartItems.length} item):</ThemedText>
                <ThemedText style={styles.totalPrice}>Rp {getTotalPrice().toLocaleString('id-ID')}</ThemedText>
              </View>
              
              <Pressable style={styles.checkoutButton} onPress={handleCheckout}>
                <ThemedText style={styles.checkoutButtonText}>Checkout</ThemedText>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    backgroundColor: '#DE8389',
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  clearButton: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  shopButton: {
    backgroundColor: '#DE8389',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  featuresSection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  featureText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  cartItem: {
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 20,
    marginBottom: 15,
    padding: 15,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#DE8389',
    fontWeight: '600',
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 12,
    color: '#666',
  },
  quantityControls: {
    alignItems: 'center',
    gap: 10,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 30,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
    marginTop: 8,
  },
  totalSection: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  totalLabel: {
    fontSize: 16,
    color: '#333',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DE8389',
  },
  checkoutButton: {
    backgroundColor: '#DE8389',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});