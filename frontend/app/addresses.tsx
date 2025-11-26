import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { useProfile } from '@/app/ProfileContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function AddressesScreen() {
  const router = useRouter();
  const { addresses, deleteAddress, setDefaultAddress } = useProfile();

  const handleDeleteAddress = (id: string, label: string) => {
    Alert.alert(
      'Hapus Alamat',
      `Apakah Anda yakin ingin menghapus alamat "${label}"?`,
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Hapus', 
          style: 'destructive', 
          onPress: () => deleteAddress(id)
        }
      ]
    );
  };

  const handleSetDefault = async (id: string) => {
    await setDefaultAddress(id);
    Alert.alert('Berhasil', 'Alamat default telah diperbarui');
  };

  const handleAddAddress = () => {
    router.push('/address-form');
  };

  const handleEditAddress = (addressId: string) => {
    router.push(`/address-form?id=${addressId}`);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="arrow.left" size={24} color="#fff" />
        </Pressable>
        <ThemedText style={styles.headerTitle}>Alamat Pengiriman</ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {addresses.length === 0 ? (
          /* Empty State */
          <View style={styles.emptyState}>
            <IconSymbol name="location" size={80} color="#ccc" />
            <ThemedText style={styles.emptyTitle}>Belum Ada Alamat</ThemedText>
            <ThemedText style={styles.emptySubtitle}>
              Tambahkan alamat pengiriman untuk mempermudah proses checkout
            </ThemedText>
          </View>
        ) : (
          /* Address List */
          <View style={styles.addressList}>
            {addresses.map((address) => (
              <View key={address.id} style={styles.addressCard}>
                {/* Address Header */}
                <View style={styles.addressHeader}>
                  <View style={styles.addressLabelContainer}>
                    <IconSymbol name="location.fill" size={16} color="#DE8389" />
                    <ThemedText style={styles.addressLabel}>{address.label}</ThemedText>
                    {address.isDefault && (
                      <View style={styles.defaultBadge}>
                        <ThemedText style={styles.defaultBadgeText}>Default</ThemedText>
                      </View>
                    )}
                  </View>
                  
                  <View style={styles.addressActions}>
                    <Pressable 
                      style={styles.actionButton}
                      onPress={() => handleEditAddress(address.id)}
                    >
                      <IconSymbol name="pencil" size={16} color="#666" />
                    </Pressable>
                    <Pressable 
                      style={styles.actionButton}
                      onPress={() => handleDeleteAddress(address.id, address.label)}
                    >
                      <IconSymbol name="trash" size={16} color="#ff4444" />
                    </Pressable>
                  </View>
                </View>

                {/* Address Details */}
                <View style={styles.addressContent}>
                  <ThemedText style={styles.addressName}>{address.name}</ThemedText>
                  <ThemedText style={styles.addressPhone}>{address.phone}</ThemedText>
                  <ThemedText style={styles.addressText}>
                    {address.address}, {address.city} {address.postalCode}
                  </ThemedText>
                </View>

                {/* Address Actions */}
                {!address.isDefault && (
                  <View style={styles.addressFooter}>
                    <Pressable 
                      style={styles.setDefaultButton}
                      onPress={() => handleSetDefault(address.id)}
                    >
                      <ThemedText style={styles.setDefaultButtonText}>
                        Jadikan Alamat Utama
                      </ThemedText>
                    </Pressable>
                  </View>
                )}

                {/* Google Maps Integration Simulation */}
                <View style={styles.mapContainer}>
                  <View style={styles.mapPlaceholder}>
                    <IconSymbol name="map" size={40} color="#ccc" />
                    <ThemedText style={styles.mapText}>Pratinjau Lokasi</ThemedText>
                  </View>
                  <Pressable style={styles.mapButton}>
                    <IconSymbol name="location.fill" size={16} color="#fff" />
                    <ThemedText style={styles.mapButtonText}>Lihat di Maps</ThemedText>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Add Address Button */}
        <View style={styles.addButtonContainer}>
          <Pressable style={styles.addAddressButton} onPress={handleAddAddress}>
            <IconSymbol name="plus.circle.fill" size={24} color="#fff" />
            <ThemedText style={styles.addAddressButtonText}>Tambah Alamat Baru</ThemedText>
          </Pressable>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <ThemedText style={styles.tipsTitle}>💡 Tips Alamat Pengiriman</ThemedText>
          <View style={styles.tipsList}>
            <ThemedText style={styles.tipItem}>
              • Pastikan alamat lengkap dengan nama jalan dan nomor rumah
            </ThemedText>
            <ThemedText style={styles.tipItem}>
              • Sertakan patokan atau landmark terdekat
            </ThemedText>
            <ThemedText style={styles.tipItem}>
              • Nomor telepon aktif untuk koordinasi dengan kurir
            </ThemedText>
            <ThemedText style={styles.tipItem}>
              • Kode pos yang tepat untuk mempercepat pengiriman
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
  addressList: {
    padding: 20,
    gap: 15,
  },
  addressCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addressLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DE8389',
  },
  defaultBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  defaultBadgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  addressActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    padding: 8,
  },
  addressContent: {
    marginBottom: 15,
  },
  addressName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  addressPhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  addressFooter: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
    marginBottom: 15,
  },
  setDefaultButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  setDefaultButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  mapContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  mapPlaceholder: {
    backgroundColor: '#f8f9fa',
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  mapText: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4285F4',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  addButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DE8389',
    paddingVertical: 15,
    borderRadius: 12,
    gap: 10,
  },
  addAddressButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tipsSection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    marginTop: 10,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});