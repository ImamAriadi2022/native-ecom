import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, View } from 'react-native';

import { PaymentMethod, useProfile } from '@/app/ProfileContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function PaymentMethodsScreen() {
  const router = useRouter();
  const { paymentMethods, deletePaymentMethod, setDefaultPaymentMethod } = useProfile();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDelete = (method: PaymentMethod) => {
    Alert.alert(
      'Hapus Metode Pembayaran',
      `Apakah Anda yakin ingin menghapus ${method.name}?`,
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Hapus', 
          style: 'destructive',
          onPress: () => deletePaymentMethod(method.id)
        }
      ]
    );
  };

  const handleSetDefault = (method: PaymentMethod) => {
    if (!method.isDefault) {
      setDefaultPaymentMethod(method.id);
    }
  };

  const getPaymentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'credit card':
      case 'debit card':
        return 'creditcard.fill';
      case 'bank transfer':
        return 'building.columns.fill';
      case 'e-wallet':
        return 'wallet.pass.fill';
      default:
        return 'creditcard';
    }
  };

  const getPaymentColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'credit card':
        return '#4169E1';
      case 'debit card':
        return '#32CD32';
      case 'bank transfer':
        return '#FF6347';
      case 'e-wallet':
        return '#FF8C00';
      default:
        return '#666';
    }
  };

  const renderPaymentMethod = ({ item }: { item: PaymentMethod }) => (
    <Pressable
      style={[
        styles.paymentCard,
        item.isDefault && styles.defaultCard,
        selectedId === item.id && styles.selectedCard
      ]}
      onPress={() => setSelectedId(selectedId === item.id ? null : item.id)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardInfo}>
          <View style={[styles.iconContainer, { backgroundColor: getPaymentColor(item.type) }]}>
            <IconSymbol name={getPaymentIcon(item.type)} size={24} color="#fff" />
          </View>
          <View style={styles.cardDetails}>
            <ThemedText style={styles.cardType}>{item.type}</ThemedText>
            <ThemedText style={styles.cardNumber}>{item.maskedNumber || item.accountNumber || 'No Number'}</ThemedText>
            <ThemedText style={styles.cardName}>{item.holderName || item.name}</ThemedText>
          </View>
        </View>
        
        {item.isDefault && (
          <View style={styles.defaultBadge}>
            <ThemedText style={styles.defaultBadgeText}>Default</ThemedText>
          </View>
        )}
      </View>

      {selectedId === item.id && (
        <View style={styles.cardActions}>
          <Pressable
            style={[styles.actionButton, styles.editButton]}
            onPress={() => router.push(`/payment-method-form?id=${item.id}`)}
          >
            <IconSymbol name="pencil" size={16} color="#4169E1" />
            <ThemedText style={[styles.actionButtonText, { color: '#4169E1' }]}>
              Edit
            </ThemedText>
          </Pressable>

          {!item.isDefault && (
            <Pressable
              style={[styles.actionButton, styles.defaultButton]}
              onPress={() => handleSetDefault(item)}
            >
              <IconSymbol name="star" size={16} color="#FF8C00" />
              <ThemedText style={[styles.actionButtonText, { color: '#FF8C00' }]}>
                Jadikan Default
              </ThemedText>
            </Pressable>
          )}

          <Pressable
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDelete(item)}
          >
            <IconSymbol name="trash" size={16} color="#DC3545" />
            <ThemedText style={[styles.actionButtonText, { color: '#DC3545' }]}>
              Hapus
            </ThemedText>
          </Pressable>
        </View>
      )}
    </Pressable>
  );

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <IconSymbol name="creditcard" size={80} color="#ccc" />
      <ThemedText style={styles.emptyTitle}>Belum Ada Metode Pembayaran</ThemedText>
      <ThemedText style={styles.emptySubtitle}>
        Tambahkan metode pembayaran untuk kemudahan berbelanja
      </ThemedText>
      <Pressable
        style={styles.addFirstButton}
        onPress={() => router.push('/payment-method-form')}
      >
        <ThemedText style={styles.addFirstButtonText}>Tambah Metode Pembayaran</ThemedText>
      </Pressable>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="arrow.left" size={24} color="#fff" />
        </Pressable>
        <ThemedText style={styles.headerTitle}>Metode Pembayaran</ThemedText>
        <Pressable 
          onPress={() => router.push('/payment-method-form')}
          style={styles.addButton}
        >
          <IconSymbol name="plus" size={24} color="#fff" />
        </Pressable>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {paymentMethods.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Info Section */}
            <View style={styles.infoSection}>
              <View style={styles.infoCard}>
                <IconSymbol name="shield.lefthalf.filled" size={24} color="#28A745" />
                <View style={styles.infoText}>
                  <ThemedText style={styles.infoTitle}>Keamanan Terjamin</ThemedText>
                  <ThemedText style={styles.infoSubtitle}>
                    Data pembayaran Anda dienkripsi dengan standar keamanan tinggi
                  </ThemedText>
                </View>
              </View>
            </View>

            {/* Payment Methods List */}
            <FlatList
              data={paymentMethods}
              renderItem={renderPaymentMethod}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
            />

            {/* Tips Section */}
            <View style={styles.tipsSection}>
              <ThemedText style={styles.tipsTitle}>💡 Tips:</ThemedText>
              <ThemedText style={styles.tipsText}>
                • Pilih satu metode sebagai default untuk checkout yang lebih cepat
              </ThemedText>
              <ThemedText style={styles.tipsText}>
                • Pastikan informasi pembayaran selalu up-to-date
              </ThemedText>
              <ThemedText style={styles.tipsText}>
                • Gunakan metode pembayaran yang berbeda untuk keamanan ekstra
              </ThemedText>
            </View>
          </>
        )}
      </View>
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
  addButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  addFirstButton: {
    backgroundColor: '#DE8389',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  addFirstButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoSection: {
    padding: 20,
    paddingBottom: 10,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#28A745',
  },
  infoText: {
    marginLeft: 15,
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28A745',
    marginBottom: 4,
  },
  infoSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  paymentCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#f0f0f0',
  },
  defaultCard: {
    borderColor: '#DE8389',
    backgroundColor: '#FFF8F8',
  },
  selectedCard: {
    borderColor: '#4169E1',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDetails: {
    marginLeft: 15,
    flex: 1,
  },
  cardType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardNumber: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  cardName: {
    fontSize: 14,
    color: '#666',
  },
  defaultBadge: {
    backgroundColor: '#DE8389',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  editButton: {
    borderColor: '#4169E1',
    backgroundColor: '#F0F4FF',
  },
  defaultButton: {
    borderColor: '#FF8C00',
    backgroundColor: '#FFF8F0',
  },
  deleteButton: {
    borderColor: '#DC3545',
    backgroundColor: '#FFF0F0',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tipsSection: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    marginTop: 10,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  tipsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
});