import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

type PaymentMethod = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

const paymentMethods: PaymentMethod[] = [
  {
    id: 'bank_transfer',
    name: 'Transfer Bank',
    description: 'BCA, Mandiri, BNI, BRI',
    icon: '🏦'
  },
  {
    id: 'gopay',
    name: 'GoPay',
    description: 'Bayar dengan GoPay',
    icon: '💚'
  },
  {
    id: 'ovo',
    name: 'OVO',
    description: 'Bayar dengan OVO',
    icon: '💜'
  },
  {
    id: 'dana',
    name: 'DANA',
    description: 'Bayar dengan DANA',
    icon: '💙'
  },
  {
    id: 'shopeepay',
    name: 'ShopeePay',
    description: 'Bayar dengan ShopeePay',
    icon: '🧡'
  },
];

export default function PaymentMethodScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const orderData = {
    orderId: params.orderId as string || 'LBS' + Date.now(),
    productName: params.productName as string || 'Produk',
    quantity: parseInt(params.quantity as string) || 1,
    total: parseInt(params.total as string) || 299000,
  };

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  const handleProceedToPayment = () => {
    if (!selectedMethod) {
      alert('Silakan pilih metode pembayaran terlebih dahulu');
      return;
    }

    const selectedPayment = paymentMethods.find(method => method.id === selectedMethod);
    
    router.push({
      pathname: '/payment-process',
      params: {
        ...orderData,
        paymentMethod: selectedPayment?.name || 'Transfer Bank',
        paymentIcon: selectedPayment?.icon || '🏦'
      }
    });
  };

  return (
    <View style={[styles.container, styles.gradientBackground]}>
      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <ThemedText style={styles.backText}>← Kembali</ThemedText>
            </Pressable>
            <ThemedText type="title" style={styles.title}>
              Metode Pembayaran
            </ThemedText>
            <View style={styles.headerSpacer} />
          </View>

          {/* Order Summary */}
          <View style={styles.summarySection}>
            <ThemedText style={styles.sectionTitle}>Ringkasan Pesanan</ThemedText>
            <View style={styles.summaryRow}>
              <ThemedText style={styles.summaryLabel}>Order ID:</ThemedText>
              <ThemedText style={styles.summaryValue}>{orderData.orderId}</ThemedText>
            </View>
            <View style={styles.summaryRow}>
              <ThemedText style={styles.summaryLabel}>Produk:</ThemedText>
              <ThemedText style={styles.summaryValue}>{orderData.productName}</ThemedText>
            </View>
            <View style={styles.summaryRow}>
              <ThemedText style={styles.summaryLabel}>Jumlah:</ThemedText>
              <ThemedText style={styles.summaryValue}>{orderData.quantity} item</ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <ThemedText style={styles.totalLabel}>Total Pembayaran:</ThemedText>
              <ThemedText style={styles.totalValue}>
                Rp {orderData.total.toLocaleString('id-ID')}
              </ThemedText>
            </View>
          </View>

          {/* Payment Methods */}
          <View style={styles.paymentSection}>
            <ThemedText style={styles.sectionTitle}>Pilih Metode Pembayaran</ThemedText>
            
            {paymentMethods.map((method) => (
              <Pressable
                key={method.id}
                style={[
                  styles.paymentMethod,
                  selectedMethod === method.id && styles.selectedMethod
                ]}
                onPress={() => handleMethodSelect(method.id)}
              >
                <View style={styles.methodContent}>
                  <View style={styles.methodLeft}>
                    <ThemedText style={styles.methodIcon}>{method.icon}</ThemedText>
                    <View style={styles.methodInfo}>
                      <ThemedText style={styles.methodName}>{method.name}</ThemedText>
                      <ThemedText style={styles.methodDesc}>{method.description}</ThemedText>
                    </View>
                  </View>
                  <View style={[
                    styles.radioButton,
                    selectedMethod === method.id && styles.radioButtonSelected
                  ]} />
                </View>
              </Pressable>
            ))}
          </View>

          {/* Payment Button */}
          <Pressable 
            style={[
              styles.paymentButton,
              !selectedMethod && styles.paymentButtonDisabled
            ]}
            onPress={handleProceedToPayment}
            disabled={!selectedMethod}
          >
            <ThemedText style={styles.paymentButtonText}>
              Lanjutkan Pembayaran
            </ThemedText>
          </Pressable>

          {/* Security Info */}
          <View style={styles.securityInfo}>
            <ThemedText style={styles.securityText}>
              🔒 Transaksi Anda aman dan terlindungi
            </ThemedText>
          </View>
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
  content: {
    padding: 20,
    backgroundColor: 'transparent',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerSpacer: {
    width: 80, // Same width as back button area for centering
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  summarySection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
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
  paymentSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  paymentMethod: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  selectedMethod: {
    borderColor: '#DE8389',
    backgroundColor: '#fff5f5',
  },
  methodContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  methodIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  methodDesc: {
    fontSize: 14,
    color: '#666',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  radioButtonSelected: {
    borderColor: '#DE8389',
    backgroundColor: '#DE8389',
  },
  paymentButton: {
    backgroundColor: '#DE8389',
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  paymentButtonDisabled: {
    backgroundColor: '#ccc',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  securityInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  securityText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});
