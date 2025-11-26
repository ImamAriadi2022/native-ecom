import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function OrderDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const orderData = params.orderData ? JSON.parse(params.orderData as string) : null;

  if (!orderData) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Order not found</ThemedText>
      </ThemedView>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#f39c12';
      case 'paid': return '#3498db';
      case 'shipped': return '#9b59b6';
      case 'delivered': return '#27ae60';
      case 'cancelled': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Menunggu Pembayaran';
      case 'paid': return 'Dibayar';
      case 'shipped': return 'Sedang Dikirim';
      case 'delivered': return 'Pesanan Selesai';
      case 'cancelled': return 'Dibatalkan';
      default: return status;
    }
  };

  const getImageSource = (imageName: string) => {
    const imageMap: { [key: string]: any } = {
      'tumbler cream.jpg': require('@/assets/images/tumbler cream.jpg'),
      'tumbler pink1.jpg': require('@/assets/images/tumbler pink1.jpg'),
      'tumbler hijau2.jpg': require('@/assets/images/tumbler hijau2.jpg'),
      'tumbler ungu.jpg': require('@/assets/images/tumbler ungu.jpg'),
      'tumbler oren.jpg': require('@/assets/images/tumbler oren.jpg'),
      'tumbler khaki.jpg': require('@/assets/images/tumbler khaki.jpg'),
      'masseto.jpg': require('@/assets/images/masseto.jpg'),
      'gantungan1.jpg': require('@/assets/images/gantungan1.jpg'),
      'bundling1.jpg': require('@/assets/images/bundling1.jpg'),
      'product.jpg': require('@/assets/images/tumbler cream.jpg'),
    };
    return imageMap[imageName] || require('@/assets/images/tumbler cream.jpg');
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="arrow.left" size={24} color="#fff" />
        </Pressable>
        <ThemedText style={styles.headerTitle}>Detail Pesanan</ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Order Status */}
        <View style={styles.statusSection}>
          <View style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(orderData.status) }
          ]}>
            <ThemedText style={styles.statusText}>
              {getStatusLabel(orderData.status)}
            </ThemedText>
          </View>
          <ThemedText style={styles.orderId}>Order ID: {orderData.orderId}</ThemedText>
          <ThemedText style={styles.orderDate}>{orderData.date}</ThemedText>
        </View>

        {/* Tracking Information */}
        {orderData.status === 'shipped' && orderData.trackingNumber && (
          <View style={styles.trackingSection}>
            <ThemedText style={styles.sectionTitle}>📍 Informasi Pengiriman</ThemedText>
            <View style={styles.trackingCard}>
              <View style={styles.trackingRow}>
                <IconSymbol name="location.fill" size={20} color="#9b59b6" />
                <View style={styles.trackingInfo}>
                  <ThemedText style={styles.trackingLabel}>Nomor Resi</ThemedText>
                  <ThemedText style={styles.trackingNumber}>{orderData.trackingNumber}</ThemedText>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Order Items */}
        <View style={styles.itemsSection}>
          <ThemedText style={styles.sectionTitle}>📦 Produk Pesanan</ThemedText>
          <View style={styles.itemsCard}>
            {orderData.items.map((item: any, index: number) => (
              <View key={index} style={styles.orderItem}>
                <Image 
                  source={getImageSource(item.image)}
                  style={styles.itemImage} 
                />
                <View style={styles.itemDetails}>
                  <ThemedText style={styles.itemName}>{item.name}</ThemedText>
                  <ThemedText style={styles.itemPrice}>
                    Rp {item.price.toLocaleString('id-ID')} x {item.quantity}
                  </ThemedText>
                </View>
                <ThemedText style={styles.itemTotal}>
                  Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* Shipping Address */}
        <View style={styles.addressSection}>
          <ThemedText style={styles.sectionTitle}>🏠 Alamat Pengiriman</ThemedText>
          <View style={styles.addressCard}>
            <ThemedText style={styles.addressName}>{orderData.shippingAddress.name}</ThemedText>
            <ThemedText style={styles.addressPhone}>{orderData.shippingAddress.phone}</ThemedText>
            <ThemedText style={styles.addressText}>
              {orderData.shippingAddress.address}, {orderData.shippingAddress.city} {orderData.shippingAddress.postalCode}
            </ThemedText>
          </View>
        </View>

        {/* Payment Information */}
        <View style={styles.paymentSection}>
          <ThemedText style={styles.sectionTitle}>💳 Informasi Pembayaran</ThemedText>
          <View style={styles.paymentCard}>
            <View style={styles.paymentRow}>
              <ThemedText style={styles.paymentLabel}>Metode Pembayaran</ThemedText>
              <ThemedText style={styles.paymentValue}>{orderData.paymentMethod}</ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.paymentRow}>
              <ThemedText style={styles.totalLabel}>Total Pembayaran</ThemedText>
              <ThemedText style={styles.totalAmount}>
                Rp {orderData.total.toLocaleString('id-ID')}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          {orderData.status === 'delivered' && (
            <Pressable style={styles.reviewButton}>
              <IconSymbol name="star.fill" size={20} color="#fff" />
              <ThemedText style={styles.reviewButtonText}>Beri Review</ThemedText>
            </Pressable>
          )}
          
          <Pressable 
            style={styles.helpButton}
            onPress={() => router.push('/support')}
          >
            <IconSymbol name="questionmark.circle.fill" size={20} color="#DE8389" />
            <ThemedText style={styles.helpButtonText}>Butuh Bantuan?</ThemedText>
          </Pressable>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#DE8389',
    paddingTop: 60,
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
    fontSize: 20,
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
  statusSection: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  statusBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  statusText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  trackingSection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 15,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  trackingCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
  },
  trackingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackingInfo: {
    marginLeft: 10,
  },
  trackingLabel: {
    fontSize: 14,
    color: '#666',
  },
  trackingNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemsSection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 15,
    padding: 20,
  },
  itemsCard: {
    gap: 15,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DE8389',
  },
  addressSection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 15,
    padding: 20,
  },
  addressCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
  },
  addressName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  addressPhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  paymentSection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 15,
    padding: 20,
  },
  paymentCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#666',
  },
  paymentValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DE8389',
  },
  actionSection: {
    padding: 20,
    gap: 15,
  },
  reviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f39c12',
    paddingVertical: 15,
    borderRadius: 12,
    gap: 10,
  },
  reviewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#DE8389',
    gap: 10,
  },
  helpButtonText: {
    color: '#DE8389',
    fontSize: 16,
    fontWeight: 'bold',
  },
});