import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';

export default function PaymentProcessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);

  const orderData = {
    orderId: params.orderId as string || 'LBS' + Date.now(),
    productName: params.productName as string || 'Produk',
    quantity: parseInt(params.quantity as string) || 1,
    total: parseInt(params.total as string) || 299000,
    paymentMethod: params.paymentMethod as string || 'Transfer Bank',
    paymentIcon: params.paymentIcon as string || '🏦'
  };

  const currentTime = new Date().toLocaleString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handlePaymentResult = (isSuccess: boolean) => {
    setIsProcessing(true);
    
    // Simulasi delay 2-3 detik
    setTimeout(() => {
      setIsProcessing(false);
      router.push({
        pathname: '/payment-result',
        params: {
          ...orderData,
          isSuccess: isSuccess.toString(),
          transactionTime: currentTime
        }
      });
    }, 2500);
  };

  return (
    <View style={[styles.container, styles.gradientBackground]}>
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              Konfirmasi Pembayaran
            </ThemedText>
          </View>

          {/* Payment Info */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Detail Pembayaran</ThemedText>
            
            <View style={styles.paymentInfo}>
              <ThemedText style={styles.paymentIcon}>{orderData.paymentIcon}</ThemedText>
              <ThemedText style={styles.paymentMethod}>{orderData.paymentMethod}</ThemedText>
            </View>

            <View style={styles.orderDetails}>
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
                <ThemedText style={styles.detailLabel}>Waktu:</ThemedText>
                <ThemedText style={styles.detailValue}>{currentTime}</ThemedText>
              </View>
              <View style={styles.divider} />
              <View style={styles.detailRow}>
                <ThemedText style={styles.totalLabel}>Total:</ThemedText>
                <ThemedText style={styles.totalValue}>
                  Rp {orderData.total.toLocaleString('id-ID')}
                </ThemedText>
              </View>
            </View>
          </View>

          {/* Status Section */}
          <View style={styles.statusSection}>
            <ThemedText style={styles.statusTitle}>
              ⏳ Menunggu Konfirmasi Pembayaran...
            </ThemedText>
            <ThemedText style={styles.statusDesc}>
              Silakan simulasikan hasil pembayaran dengan menekan tombol di bawah ini
            </ThemedText>
          </View>

          {/* Action Buttons - Moved up and made more prominent */}
          {!isProcessing ? (
            <View style={styles.actionButtons}>
              <ThemedText style={styles.buttonSectionTitle}>
                🎮 SIMULASI PEMBAYARAN
              </ThemedText>
              <Pressable 
                style={[styles.actionButton, styles.successButton]}
                onPress={() => handlePaymentResult(true)}
              >
                <ThemedText style={styles.actionButtonText}>
                  ✅ Pembayaran Sukses
                </ThemedText>
              </Pressable>

              <Pressable 
                style={[styles.actionButton, styles.failButton]}
                onPress={() => handlePaymentResult(false)}
              >
                <ThemedText style={styles.actionButtonText}>
                  ❌ Pembayaran Gagal
                </ThemedText>
              </Pressable>
            </View>
          ) : (
            <View style={styles.loadingSection}>
              <ActivityIndicator size="large" color="#fff" />
              <ThemedText style={styles.loadingText}>
                Memproses pembayaran...
              </ThemedText>
            </View>
          )}

          {/* Instructions - Made shorter */}
          <View style={styles.instructions}>
            <ThemedText style={styles.instructionTitle}>
              Instruksi Pembayaran:
            </ThemedText>
            <ThemedText style={styles.instructionText}>
              {orderData.paymentMethod === 'Transfer Bank' ? 
                `Transfer Rp ${orderData.total.toLocaleString('id-ID')} ke rekening dengan berita: ${orderData.orderId}` :
                `Bayar Rp ${orderData.total.toLocaleString('id-ID')} melalui ${orderData.paymentMethod}`
              }
            </ThemedText>
          </View>

          {/* Cancel Button */}
          <Pressable 
            style={styles.cancelButton}
            onPress={() => router.back()}
            disabled={isProcessing}
          >
            <ThemedText style={styles.cancelButtonText}>
              Batalkan Transaksi
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  paymentInfo: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  paymentIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  paymentMethod: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  orderDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
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
    marginVertical: 10,
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
  statusSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  statusDesc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  actionButtons: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  actionButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  successButton: {
    backgroundColor: '#4CAF50',
  },
  failButton: {
    backgroundColor: '#f44336',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    marginBottom: 15,
  },
  loadingText: {
    color: '#333',
    fontSize: 16,
    marginTop: 10,
  },
  instructions: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#fff',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
