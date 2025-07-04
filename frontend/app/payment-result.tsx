import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

export default function PaymentResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const isSuccess = params.isSuccess === 'true';
  const orderData = {
    orderId: params.orderId as string || 'LBS' + Date.now(),
    productName: params.productName as string || 'Produk',
    quantity: parseInt(params.quantity as string) || 1,
    total: parseInt(params.total as string) || 299000,
    paymentMethod: params.paymentMethod as string || 'Transfer Bank',
    transactionTime: params.transactionTime as string || new Date().toLocaleString('id-ID')
  };

  const handleBackToHome = () => {
    router.replace('/(tabs)/explore');
  };

  const handleViewOrder = () => {
    // Simulasi halaman pesanan
    alert('Fitur riwayat pesanan akan segera hadir!');
  };

  return (
    <LinearGradient
      colors={isSuccess ? ['#4CAF50', '#45a049'] : ['#f44336', '#d32f2f']}
      style={styles.container}
    >
      <ThemedView style={styles.content}>
        {/* Result Icon & Status */}
        <View style={styles.resultSection}>
          <ThemedText style={styles.resultIcon}>
            {isSuccess ? '✅' : '❌'}
          </ThemedText>
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
          <ThemedText style={styles.sectionTitle}>Detail Transaksi</ThemedText>
          
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
              <ThemedText style={styles.detailValue}>{orderData.paymentMethod}</ThemedText>
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
      </ThemedView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
    paddingTop: 60,
  },
  resultSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  resultIcon: {
    fontSize: 64,
    marginBottom: 15,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  resultSubtitle: {
    fontSize: 16,
    color: '#f0f0f0',
    textAlign: 'center',
  },
  detailsSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
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
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#fff',
  },
  primaryButtonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footerSubtext: {
    color: '#f0f0f0',
    fontSize: 12,
    fontStyle: 'italic',
  },
});
