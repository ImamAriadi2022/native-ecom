import { useCart } from '@/app/CartContext';
import { useProfile } from '@/app/ProfileContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

export default function PaymentResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { clearCart } = useCart();
  const { addOrderHistory, addNotification } = useProfile();
  const [hasProcessed, setHasProcessed] = useState(false);

  const isSuccess = params.isSuccess === 'true';
  
  const orderData = useMemo(() => ({
    orderId: params.orderId as string || 'LBS' + Date.now(),
    productName: params.productName as string || 'Produk',
    quantity: parseInt(params.quantity as string) || 1,
    total: parseInt(params.total as string) || 299000,
    paymentMethod: params.paymentMethod as string || 'Transfer Bank',
    paymentIcon: params.paymentIcon as string || 'BANK',
    transactionTime: params.transactionTime as string || new Date().toLocaleString('id-ID')
  }), [params.orderId, params.productName, params.quantity, params.total, params.paymentMethod, params.paymentIcon, params.transactionTime]);

  // Clear cart and save order when payment is successful (ONLY ONCE)
  useEffect(() => {
    console.log('PaymentResult useEffect triggered:', { isSuccess, hasProcessed });
    if (isSuccess && !hasProcessed) {
      console.log('Processing successful payment for order:', orderData.orderId);
      setHasProcessed(true);
      clearCart();
      
      // Get proper image name based on product name
      const getProductImage = (productName: string) => {
        if (productName.includes('Cream') || productName.includes('Premium')) return 'tumbler cream.jpg';
        if (productName.includes('Pink')) return 'tumbler pink1.jpg';
        if (productName.includes('Hijau') || productName.includes('Green')) return 'tumbler hijau2.jpg';
        if (productName.includes('Ungu') || productName.includes('Purple')) return 'tumbler ungu.jpg';
        if (productName.includes('Orange') || productName.includes('Oren')) return 'tumbler oren.jpg';
        if (productName.includes('Khaki')) return 'tumbler khaki.jpg';
        if (productName.includes('Masseto')) return 'masseto.jpg';
        if (productName.includes('Gantungan')) return 'gantungan1.jpg';
        if (productName.includes('Bundle') || productName.includes('Bundling')) return 'bundling1.jpg';
        return 'tumbler cream.jpg'; // default
      };

      // Save order to history (ONLY ONCE)
      const newOrder = {
        orderId: orderData.orderId,
        date: orderData.transactionTime,
        items: [{
          id: 1,
          name: orderData.productName,
          image: getProductImage(orderData.productName),
          price: Math.floor(orderData.total / orderData.quantity),
          quantity: orderData.quantity,
        }],
        total: orderData.total,
        status: 'paid' as const,
        paymentMethod: orderData.paymentMethod,
        shippingAddress: {
          id: 'temp',
          label: 'Alamat Utama',
          name: 'User',
          phone: '081234567890',
          address: 'Jakarta, Indonesia',
          city: 'Jakarta',
          postalCode: '12345',
          isDefault: true,
        },
        trackingNumber: `TRK${Date.now()}`,
      };
      addOrderHistory(newOrder);
      
      // Add only one notification for successful payment
      addNotification({
        title: 'Pembayaran Berhasil! 🎉',
        message: `Pesanan ${orderData.orderId} telah berhasil dibayar dan sedang diproses.`,
        type: 'payment',
        date: new Date().toISOString(),
        isRead: false,
        orderId: orderData.orderId,
      });
    }
  }, [isSuccess, hasProcessed]); // Removed orderData from dependencies

  const handleBackToHome = () => {
    router.replace('/(tabs)/explore');
  };

  const handleViewOrder = () => {
    router.push('/order-history');
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <ThemedText style={styles.headerTitle}>
          Hasil Pembayaran
        </ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
        {/* Result Icon & Status */}
        <View style={styles.resultSection}>
          <View style={[
            styles.resultIconContainer,
            isSuccess ? styles.successIcon : styles.failureIcon
          ]}>
            <ThemedText style={styles.resultIconText}>
              {isSuccess ? '✔' : '✖'}
            </ThemedText>
          </View>
          <ThemedText style={styles.resultTitle}>
            {isSuccess ? 'Pembayaran Berhasil!' : 'Pembayaran Gagal!'}
          </ThemedText>
          <ThemedText style={styles.resultSubtitle}>
            {isSuccess 
              ? 'Terima kasih atas pembelian Anda' 
              : 'Mohon maaf, pembayaran tidak dapat diproses'
            }
          </ThemedText>
        </View>

        {/* Transaction Details */}
        <View style={styles.detailsSection}>
          <ThemedText style={styles.sectionTitle}>📄 Detail Transaksi</ThemedText>
          
          <View style={styles.detailCard}>
            <View style={styles.detailRow}>
              <ThemedText style={styles.detailLabel}>Order ID:</ThemedText>
              <ThemedText style={styles.detailValue}>{orderData.orderId}</ThemedText>
            </View>
            
            <View style={styles.detailRow}>
              <ThemedText style={styles.detailLabel}>Produk:</ThemedText>
              <ThemedText style={styles.detailValue}>{orderData.productName}</ThemedText>
            </View>
            
            <View style={styles.detailRow}>
              <ThemedText style={styles.detailLabel}>Jumlah:</ThemedText>
              <ThemedText style={styles.detailValue}>{orderData.quantity} item</ThemedText>
            </View>
            
            <View style={styles.detailRow}>
              <ThemedText style={styles.detailLabel}>Metode Pembayaran:</ThemedText>
              <View style={styles.paymentMethodContainer}>
                <ThemedText style={[
                  styles.paymentMethodIcon,
                  orderData.paymentIcon === 'BANK' && { backgroundColor: '#4f46e5' },
                  orderData.paymentIcon === 'GOPAY' && { backgroundColor: '#00aa13' },
                  orderData.paymentIcon === 'OVO' && { backgroundColor: '#4c3d9f' },
                  orderData.paymentIcon === 'DANA' && { backgroundColor: '#118ed8' },
                  orderData.paymentIcon === 'SPAY' && { backgroundColor: '#ff5722' }
                ]}>{orderData.paymentIcon}</ThemedText>
                <ThemedText style={styles.paymentMethodText}>{orderData.paymentMethod}</ThemedText>
              </View>
            </View>
            
            <View style={styles.detailRow}>
              <ThemedText style={styles.detailLabel}>Waktu Transaksi:</ThemedText>
              <ThemedText style={styles.detailValue}>{orderData.transactionTime}</ThemedText>
            </View>
            
            <View style={styles.detailRow}>
              <ThemedText style={styles.detailLabel}>Status:</ThemedText>
              <ThemedText style={[
                styles.detailValue, 
                { color: isSuccess ? '#4CAF50' : '#f44336', fontWeight: 'bold' }
              ]}>
                {isSuccess ? 'BERHASIL' : 'GAGAL'}
              </ThemedText>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.detailRow}>
              <ThemedText style={styles.totalLabel}>Total Pembayaran:</ThemedText>
              <ThemedText style={styles.totalValue}>
                Rp {orderData.total.toLocaleString('id-ID')}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Success Message */}
        {isSuccess && (
          <View style={styles.messageSection}>
            <ThemedText style={styles.messageTitle}>
              🎉 Selamat!
            </ThemedText>
            <ThemedText style={styles.messageText}>
              Pesanan Anda sedang diproses. Kami akan mengirimkan notifikasi update status pesanan melalui email dan WhatsApp yang terdaftar.
            </ThemedText>
            <ThemedText style={styles.estimateText}>
              📦 Estimasi pengiriman: 2-3 hari kerja
            </ThemedText>
          </View>
        )}

        {/* Failure Message */}
        {!isSuccess && (
          <View style={styles.messageSection}>
            <ThemedText style={styles.messageTitle}>
              😔 Ups!
            </ThemedText>
            <ThemedText style={styles.messageText}>
              Pembayaran tidak dapat diproses. Silakan coba lagi dengan metode pembayaran yang berbeda atau hubungi customer service kami.
            </ThemedText>
            <ThemedText style={styles.estimateText}>
              📞 CS: +62 812-3456-7890
            </ThemedText>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.buttonSection}>
          {isSuccess && (
            <Pressable 
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={handleViewOrder}
            >
              <ThemedText style={styles.secondaryButtonText}>
                Lihat Pesanan Saya
              </ThemedText>
            </Pressable>
          )}

          <Pressable 
            style={[styles.actionButton, styles.primaryButton]}
            onPress={handleBackToHome}
          >
            <ThemedText style={styles.primaryButtonText}>
              {isSuccess ? 'Kembali ke Beranda' : 'Coba Lagi'}
            </ThemedText>
          </Pressable>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>
            Lyana Bottle Studio
          </ThemedText>
          <ThemedText style={styles.footerSubtext}>
            Temani Harimu, Setiap Tegukan Penuh Cerita
          </ThemedText>
        </View>
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
  gradientBackground: {
    backgroundColor: '#DE8389',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  content: {
    padding: 20,
    backgroundColor: 'transparent',
    paddingTop: 20,
    minHeight: '100%',
  },
  resultSection: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 30,
    paddingVertical: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    marginHorizontal: 10,
  },
  resultIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  successIcon: {
    backgroundColor: '#4CAF50',
  },
  failureIcon: {
    backgroundColor: '#f44336',
  },
  resultIconText: {
    fontSize: 52,
    fontWeight: '900',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    lineHeight: 52,
    letterSpacing: -1,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 8,
    paddingTop: 5,
  },
  resultSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  detailsSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
  },
  detailCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
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
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  paymentMethodIcon: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#DE8389',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    minWidth: 40,
    textAlign: 'center',
  },
  paymentMethodText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  messageSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  messageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  messageText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 10,
  },
  estimateText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  buttonSection: {
    gap: 15,
    marginBottom: 30,
  },
  actionButton: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#fff',
  },
  secondaryButton: {
    backgroundColor: 'rgba(222, 131, 137, 0.1)',
    borderWidth: 2,
    borderColor: '#DE8389',
  },
  primaryButtonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#DE8389',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginTop: 'auto',
    backgroundColor: '#DE8389',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footerSubtext: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    fontStyle: 'italic',
  },
});
