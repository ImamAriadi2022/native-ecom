import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

export default function CartScreen() {
  // Image mapping untuk static imports
  const getImageSource = (imageName: string) => {
    const imageMap: { [key: string]: any } = {
      'tumbler cream.jpg': require('../assets/images/tumbler cream.jpg'),
      'tumbler pink1.jpg': require('../assets/images/tumbler pink1.jpg'),
      'tumbler hijau2.jpg': require('../assets/images/tumbler hijau2.jpg'),
      'tumbler ungu.jpg': require('../assets/images/tumbler ungu.jpg'),
      'tumbler oren.jpg': require('../assets/images/tumbler oren.jpg'),
      'tumbler khaki.jpg': require('../assets/images/tumbler khaki.jpg'),
      'tumbler biru tua.jpeg': require('../assets/images/tumbler biru tua.jpeg'),
      'tumbler ungu pink.jpeg': require('../assets/images/tumbler ungu pink.jpeg'),
      'gantungan1.jpg': require('../assets/images/gantungan1.jpg'),
      'gantungan2.jpg': require('../assets/images/gantungan2.jpg'),
      'gantungan3.jpg': require('../assets/images/gantungan3.jpg'),
      'gantungan4.jpg': require('../assets/images/gantungan4.jpg'),
      'gantungan5.jpg': require('../assets/images/gantungan5.jpg'),
      'bundling1.jpg': require('../assets/images/bundling1.jpg'),
      'bundling2.jpg': require('../assets/images/bundling2.jpg'),
      'bundling3.jpg': require('../assets/images/bundling3.jpg'),
      'custom1.jpeg': require('../assets/images/custom1.jpeg'),
      'custom2.jpeg': require('../assets/images/custom2.jpeg'),
      'custom3.jpeg': require('../assets/images/custom3.jpeg'),
      'disney1.jpeg': require('../assets/images/disney1.jpeg'),
      'disney2.jpeg': require('../assets/images/disney2.jpeg'),
      'disney3.jpeg': require('../assets/images/disney3.jpeg'),
      'disney4.jpeg': require('../assets/images/disney4.jpeg'),
      'disney5.jpeg': require('../assets/images/disney5.jpeg'),
      'disney6.jpeg': require('../assets/images/disney6.jpeg'),
      'jerapah.png': require('../assets/images/jerapah.png'),
      'kupu.png': require('../assets/images/kupu.png'),
      'monyet.png': require('../assets/images/monyet.png'),
      'meong.png': require('../assets/images/meong.png'),
      'masseto.jpg': require('../assets/images/masseto.jpg'),
      'react-logo.png': require('../assets/images/react-logo.png'),
    };
    return imageMap[imageName] || imageMap['react-logo.png'];
  };

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Tumbler Cream Premium',
      price: 75000,
      quantity: 1,
      image: 'tumbler cream.jpg',
      variant: 'Cream - 500ml'
    },
    {
      id: '2',
      name: 'Tumbler Pink Aesthetic',
      price: 75000,
      quantity: 2,
      image: 'tumbler pink1.jpg',
      variant: 'Pink - 500ml'
    },
    {
      id: '3',
      name: 'Gantungan Kunci Jerapah',
      price: 25000,
      quantity: 1,
      image: 'jerapah.png',
      variant: 'Default'
    }
  ]);

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items => 
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change);
          return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (id: string) => {
    Alert.alert(
      'Hapus Item',
      'Yakin ingin menghapus item ini dari keranjang?',
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Hapus', 
          style: 'destructive',
          onPress: () => setCartItems(items => items.filter(item => item.id !== id))
        }
      ]
    );
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <LinearGradient
      colors={['#DE8389', '#B488BF']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Kembali</Text>
        </TouchableOpacity>
        <ThemedText style={styles.title}>Keranjang Belanja</ThemedText>
        <Text style={styles.itemCount}>{totalItems} item</Text>
      </View>

      <ScrollView style={styles.content}>
        {cartItems.length === 0 ? (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyText}>🛍️</Text>
            <ThemedText style={styles.emptyTitle}>Keranjang Kosong</ThemedText>
            <ThemedText style={styles.emptyDesc}>Yuk mulai belanja produk favorit kamu!</ThemedText>
            <TouchableOpacity 
              style={styles.shopButton}
              onPress={() => router.push('/explore')}
            >
              <Text style={styles.shopButtonText}>Mulai Belanja</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <Image 
                  source={getImageSource(item.image)} 
                  style={styles.itemImage}
                />
                <View style={styles.itemInfo}>
                  <ThemedText style={styles.itemName}>{item.name}</ThemedText>
                  <Text style={styles.itemVariant}>{item.variant}</Text>
                  <ThemedText style={styles.itemPrice}>
                    Rp {item.price.toLocaleString('id-ID')}
                  </ThemedText>
                </View>
                <View style={styles.quantityControls}>
                  <TouchableOpacity 
                    onPress={() => updateQuantity(item.id, -1)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity 
                    onPress={() => updateQuantity(item.id, 1)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity 
                  onPress={() => removeItem(item.id)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.promoSection}>
              <ThemedText style={styles.promoTitle}>Kode Promo</ThemedText>
              <View style={styles.promoInput}>
                <Text style={styles.promoPlaceholder}>Masukkan kode promo</Text>
                <TouchableOpacity style={styles.promoButton}>
                  <Text style={styles.promoButtonText}>Gunakan</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.summary}>
              <ThemedText style={styles.summaryTitle}>Ringkasan Pesanan</ThemedText>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal ({totalItems} item)</Text>
                <Text style={styles.summaryValue}>Rp {totalPrice.toLocaleString('id-ID')}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Ongkos Kirim</Text>
                <Text style={styles.summaryValue}>Rp 15.000</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Biaya Layanan</Text>
                <Text style={styles.summaryValue}>Rp 2.000</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <ThemedText style={styles.totalLabel}>Total</ThemedText>
                <ThemedText style={styles.totalValue}>
                  Rp {(totalPrice + 15000 + 2000).toLocaleString('id-ID')}
                </ThemedText>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.footerInfo}>
            <ThemedText style={styles.footerTotal}>
              Rp {(totalPrice + 15000 + 2000).toLocaleString('id-ID')}
            </ThemedText>
            <Text style={styles.footerItems}>{totalItems} item</Text>
          </View>
          <TouchableOpacity 
            style={styles.checkoutButton}
            onPress={() => {
              // Kirim data cart lengkap ke checkout
              const cartData = {
                items: cartItems,
                subtotal: totalPrice,
                shipping: 15000,
                service: 2000,
                total: totalPrice + 15000 + 2000,
                itemCount: totalItems
              };
              
              router.push({
                pathname: '/checkout',
                params: {
                  type: 'cart',
                  cartData: JSON.stringify(cartData),
                  name: `${totalItems} Item Keranjang`,
                  price: (totalPrice + 15000 + 2000).toString(),
                  description: `Checkout ${totalItems} item dari keranjang belanja`
                }
              });
            }}
          >
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
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
    marginRight: 80,
  },
  itemCount: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  emptyCart: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 40,
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptyDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  shopButton: {
    backgroundColor: '#DE8389',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cartItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#DE8389',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  itemVariant: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#DE8389',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DE8389',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#DE8389',
  },
  quantity: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  removeButton: {
    padding: 8,
  },
  removeText: {
    fontSize: 16,
    color: '#ff6b6b',
  },
  promoSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  promoInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoPlaceholder: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    color: '#666',
  },
  promoButton: {
    backgroundColor: '#DE8389',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  promoButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  summary: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 100,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#555',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DE8389',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  footerInfo: {
    flex: 1,
  },
  footerTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DE8389',
  },
  footerItems: {
    fontSize: 12,
    color: '#666',
  },
  checkoutButton: {
    backgroundColor: '#DE8389',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
