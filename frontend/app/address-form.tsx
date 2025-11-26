import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { useProfile } from '@/app/ProfileContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function AddressFormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addresses, addAddress, updateAddress } = useProfile();
  
  const addressId = params.id as string;
  const isEditing = !!addressId;
  const existingAddress = addresses.find(addr => addr.id === addressId);

  const [formData, setFormData] = useState({
    label: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEditing && existingAddress) {
      setFormData({
        label: existingAddress.label,
        name: existingAddress.name,
        phone: existingAddress.phone,
        address: existingAddress.address,
        city: existingAddress.city,
        postalCode: existingAddress.postalCode,
      });
    }
  }, [isEditing, existingAddress]);

  const handleSave = async () => {
    // Validation
    if (!formData.label.trim() || !formData.name.trim() || !formData.phone.trim() || 
        !formData.address.trim() || !formData.city.trim() || !formData.postalCode.trim()) {
      Alert.alert('Error', 'Semua field wajib diisi');
      return;
    }

    setIsLoading(true);
    try {
      if (isEditing) {
        await updateAddress(addressId, formData);
        Alert.alert('Berhasil', 'Alamat berhasil diperbarui', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      } else {
        await addAddress({
          ...formData,
          isDefault: false,
        });
        Alert.alert('Berhasil', 'Alamat berhasil ditambahkan', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal menyimpan alamat');
    } finally {
      setIsLoading(false);
    }
  };

  const simulateGoogleMaps = () => {
    Alert.alert(
      'Pilih Lokasi di Maps',
      'Fitur ini akan mengintegrasikan dengan Google Maps untuk memilih lokasi secara akurat.',
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Simulasi Pilih Lokasi', 
          onPress: () => {
            // Simulate location selection
            setFormData(prev => ({
              ...prev,
              address: 'Jl. Sudirman No. 123, RT.001/RW.002',
              city: 'Jakarta Selatan',
              postalCode: '12190'
            }));
            Alert.alert('Lokasi Dipilih', 'Alamat telah diisi berdasarkan lokasi yang dipilih');
          }
        }
      ]
    );
  };

  const addressLabels = ['Rumah', 'Kantor', 'Apartemen', 'Kos', 'Lainnya'];

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="arrow.left" size={24} color="#fff" />
        </Pressable>
        <ThemedText style={styles.headerTitle}>
          {isEditing ? 'Edit Alamat' : 'Tambah Alamat'}
        </ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Google Maps Integration */}
        <View style={styles.mapSection}>
          <ThemedText style={styles.sectionTitle}>📍 Pilih Lokasi</ThemedText>
          <View style={styles.mapContainer}>
            <View style={styles.mapPlaceholder}>
              <IconSymbol name="map" size={60} color="#ccc" />
              <ThemedText style={styles.mapText}>Tap untuk pilih lokasi di Maps</ThemedText>
            </View>
            <Pressable style={styles.mapButton} onPress={simulateGoogleMaps}>
              <IconSymbol name="location.fill" size={20} color="#fff" />
              <ThemedText style={styles.mapButtonText}>Pilih di Google Maps</ThemedText>
            </Pressable>
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <ThemedText style={styles.sectionTitle}>📋 Detail Alamat</ThemedText>
          
          {/* Address Label */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Label Alamat</ThemedText>
            <View style={styles.labelContainer}>
              {addressLabels.map((label) => (
                <Pressable
                  key={label}
                  style={[
                    styles.labelChip,
                    formData.label === label && styles.labelChipSelected
                  ]}
                  onPress={() => setFormData({...formData, label})}
                >
                  <ThemedText style={[
                    styles.labelChipText,
                    formData.label === label && styles.labelChipTextSelected
                  ]}>
                    {label}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
            {formData.label === 'Lainnya' && (
              <TextInput
                style={styles.textInput}
                placeholder="Masukkan label alamat"
                placeholderTextColor="#999"
                value={formData.label === 'Lainnya' ? '' : formData.label}
                onChangeText={(text) => setFormData({...formData, label: text})}
              />
            )}
          </View>

          {/* Name */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Nama Penerima *</ThemedText>
            <View style={styles.inputContainer}>
              <IconSymbol name="person.fill" size={20} color="#DE8389" />
              <TextInput
                style={styles.textInput}
                value={formData.name}
                onChangeText={(text) => setFormData({...formData, name: text})}
                placeholder="Nama lengkap penerima"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Phone */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Nomor Telepon *</ThemedText>
            <View style={styles.inputContainer}>
              <IconSymbol name="phone.fill" size={20} color="#DE8389" />
              <TextInput
                style={styles.textInput}
                value={formData.phone}
                onChangeText={(text) => setFormData({...formData, phone: text})}
                placeholder="+62 812-3456-7890"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Address */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Alamat Lengkap *</ThemedText>
            <View style={styles.inputContainer}>
              <IconSymbol name="location.fill" size={20} color="#DE8389" />
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={formData.address}
                onChangeText={(text) => setFormData({...formData, address: text})}
                placeholder="Jl. Nama Jalan No. XX, RT/RW, Kelurahan"
                placeholderTextColor="#999"
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

          {/* City */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Kota *</ThemedText>
            <View style={styles.inputContainer}>
              <IconSymbol name="building.2.fill" size={20} color="#DE8389" />
              <TextInput
                style={styles.textInput}
                value={formData.city}
                onChangeText={(text) => setFormData({...formData, city: text})}
                placeholder="Jakarta Selatan"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Postal Code */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Kode Pos *</ThemedText>
            <View style={styles.inputContainer}>
              <IconSymbol name="envelope.fill" size={20} color="#DE8389" />
              <TextInput
                style={styles.textInput}
                value={formData.postalCode}
                onChangeText={(text) => setFormData({...formData, postalCode: text})}
                placeholder="12345"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Save Button Section */}
        <View style={styles.saveButtonSection}>
          <View style={styles.saveButtonContainer}>
            <Pressable 
              style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={isLoading}
            >
              <IconSymbol name="checkmark.circle.fill" size={24} color="#fff" />
              <ThemedText style={styles.saveButtonText}>
                {isLoading 
                  ? '💾 Menyimpan...' 
                  : isEditing 
                    ? '💾 Perbarui Alamat' 
                    : '💾 Simpan Alamat'
                }
              </ThemedText>
            </Pressable>
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
        paddingBottom: 100,
    },
    mapSection: {
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    mapContainer: {
        gap: 10,
    },
    mapPlaceholder: {
        backgroundColor: '#f8f9fa',
        height: 150,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ddd',
        borderStyle: 'dashed',
    },
    mapText: {
        fontSize: 14,
        color: '#999',
        marginTop: 10,
        textAlign: 'center',
    },
    mapButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4285F4',
        paddingVertical: 12,
        borderRadius: 10,
        gap: 8,
    },
    mapButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    formSection: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    labelContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 10,
    },
    labelChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#f8f9fa',
    },
    labelChipSelected: {
        backgroundColor: '#DE8389',
        borderColor: '#DE8389',
    },
    labelChipText: {
        fontSize: 14,
        color: '#666',
    },
    labelChipTextSelected: {
        color: '#fff',
        fontWeight: '600',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: '#f8f9fa',
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
    },
    textArea: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    saveButtonSection: {
        paddingTop: 20,
        paddingBottom: 120,
    },
    saveButtonContainer: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 15,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    saveButton: {
        backgroundColor: '#DE8389',
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    saveButtonDisabled: {
        backgroundColor: '#ccc',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});