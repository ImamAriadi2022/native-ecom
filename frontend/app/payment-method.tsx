import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
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
    icon: 'BANK'
  },
  {
    id: 'gopay',
    name: 'GoPay',
    description: 'Bayar dengan GoPay',
    icon: 'GOPAY'
  },
  {
    id: 'ovo',
    name: 'OVO',
    description: 'Bayar dengan OVO',
    icon: 'OVO'
  },
  {
    id: 'dana',
    name: 'DANA',
    description: 'Bayar dengan DANA',
    icon: 'DANA'
  },
  {
    id: 'shopeepay',
    name: 'ShopeePay',
    description: 'Bayar dengan ShopeePay',
    icon: 'SPAY'
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
        paymentIcon: selectedPayment?.icon || 'BANK'
      }
    });
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="arrow.left" size={24} color="#fff" />
        </Pressable>
        <ThemedText style={styles.headerTitle}>
          Metode Pembayaran
        </ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>

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
                    <ThemedText style={[
                      styles.methodIcon,
                      method.id === 'bank_transfer' && { backgroundColor: '#4f46e5' },
                      method.id === 'gopay' && { backgroundColor: '#00aa13' },
                      method.id === 'ovo' && { backgroundColor: '#4c3d9f' },
                      method.id === 'dana' && { backgroundColor: '#118ed8' },
                      method.id === 'shopeepay' && { backgroundColor: '#ff5722' }
                    ]}>{method.icon}</ThemedText>
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
  scrollContainer: {
    flex: 1,
  },
  content: {
    padding: 20,
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
  backButton: {
    padding: 8,
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
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#DE8389',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 15,
    minWidth: 50,
    textAlign: 'center',
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
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  securityText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: 'rgba(222, 131, 137, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
});
