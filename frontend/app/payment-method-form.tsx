import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { PaymentMethod, useProfile } from '@/app/ProfileContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';

export default function PaymentMethodFormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { paymentMethods, addPaymentMethod, updatePaymentMethod } = useProfile();
  
  const methodId = params.id as string;
  const isEditing = !!methodId;
  const existingMethod = paymentMethods.find(method => method.id === methodId);

  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState({
    holderName: '',
    number: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    bankName: '',
    accountNumber: '',
    phoneNumber: '',
    provider: '', // For card providers and e-wallet types
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const [showProviderDropdown, setShowProviderDropdown] = useState(false);

  const bankOptions = [
    { id: 'bca', name: 'BCA (Bank Central Asia)', code: 'BCA' },
    { id: 'bni', name: 'BNI (Bank Negara Indonesia)', code: 'BNI' },
    { id: 'bri', name: 'BRI (Bank Rakyat Indonesia)', code: 'BRI' },
    { id: 'mandiri', name: 'Bank Mandiri', code: 'Mandiri' },
    { id: 'bsi', name: 'BSI (Bank Syariah Indonesia)', code: 'BSI' },
    { id: 'cimb', name: 'CIMB Niaga', code: 'CIMB' },
    { id: 'danamon', name: 'Bank Danamon', code: 'Danamon' },
    { id: 'permata', name: 'Bank Permata', code: 'Permata' },
  ];

  const cardProviders = [
    { id: 'visa', name: 'Visa', code: 'Visa' },
    { id: 'mastercard', name: 'Mastercard', code: 'Mastercard' },
    { id: 'jcb', name: 'JCB', code: 'JCB' },
    { id: 'amex', name: 'American Express', code: 'Amex' },
  ];

  const ewalletProviders = [
    { id: 'gopay', name: 'GoPay', code: 'GoPay' },
    { id: 'ovo', name: 'OVO', code: 'OVO' },
    { id: 'dana', name: 'DANA', code: 'DANA' },
    { id: 'shopeepay', name: 'ShopeePay', code: 'ShopeePay' },
    { id: 'linkaja', name: 'LinkAja', code: 'LinkAja' },
    { id: 'jenius', name: 'Jenius Pay', code: 'Jenius' },
  ];

  useEffect(() => {
    if (isEditing && existingMethod) {
      setSelectedType(existingMethod.type);
      // For security, we don't pre-fill sensitive data when editing
      setFormData({
        holderName: existingMethod.holderName || '',
        number: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        bankName: existingMethod.type === 'bank_transfer' ? (existingMethod.maskedNumber?.split(' - ')[0] || '') : '',
        accountNumber: '',
        phoneNumber: '',
        provider: '',
      });
    }
  }, [isEditing, existingMethod]);

  const paymentTypes: Array<{
    id: string;
    name: string;
    icon: IconSymbolName;
    color: string;
    description: string;
    emoji: string;
  }> = [
    {
      id: 'Credit Card',
      name: 'Kartu Kredit',
      icon: 'creditcard.fill',
      color: '#4169E1',
      description: 'Visa, MasterCard, JCB',
      emoji: '💳'
    },
    {
      id: 'Debit Card',
      name: 'Kartu Debit',
      icon: 'creditcard.fill',
      color: '#32CD32',
      description: 'ATM/Debit Bank',
      emoji: '🏧'
    },
    {
      id: 'Bank Transfer',
      name: 'Transfer Bank',
      icon: 'building.columns.fill',
      color: '#FF6347',
      description: 'BCA, BNI, BRI, Mandiri',
      emoji: '🏦'
    },
    {
      id: 'E-Wallet',
      name: 'E-Wallet',
      icon: 'wallet.pass.fill',
      color: '#FF8C00',
      description: 'GoPay, OVO, Dana, ShopeePay',
      emoji: '📱'
    }
  ];

  const maskCardNumber = (number: string) => {
    const cleaned = number.replace(/\D/g, '');
    const masked = '**** **** **** ' + cleaned.slice(-4);
    return masked;
  };

  const maskAccountNumber = (number: string, bankName: string) => {
    const cleaned = number.replace(/\D/g, '');
    const masked = bankName + ' - *****' + cleaned.slice(-3);
    return masked;
  };

  const maskPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    const masked = '****' + cleaned.slice(-4);
    return masked;
  };

  const handleSave = async () => {
    // Validation based on payment type
    if (!selectedType) {
      Alert.alert('Error', 'Pilih jenis metode pembayaran');
      return;
    }

    if (!formData.holderName.trim()) {
      Alert.alert('Error', 'Nama pemegang wajib diisi');
      return;
    }

    let maskedNumber = '';
    
    if (selectedType === 'Credit Card' || selectedType === 'Debit Card') {
      if (!formData.provider || !formData.number || !formData.expiryMonth || !formData.expiryYear || !formData.cvv) {
        Alert.alert('Error', 'Semua field kartu wajib diisi');
        return;
      }
      if (formData.number.replace(/\D/g, '').length < 16) {
        Alert.alert('Error', 'Nomor kartu harus 16 digit');
        return;
      }
      maskedNumber = maskCardNumber(formData.number);
    } else if (selectedType === 'Bank Transfer') {
      if (!formData.bankName || !formData.accountNumber) {
        Alert.alert('Error', 'Nama bank dan nomor rekening wajib diisi');
        return;
      }
      maskedNumber = maskAccountNumber(formData.accountNumber, formData.bankName);
    } else if (selectedType === 'E-Wallet') {
      if (!formData.provider || !formData.phoneNumber) {
        Alert.alert('Error', 'Jenis e-wallet dan nomor telepon wajib diisi');
        return;
      }
      maskedNumber = maskPhoneNumber(formData.phoneNumber);
    }

    setIsLoading(true);
    try {
      const getPaymentMethodName = () => {
        const typeMap: Record<string, string> = {
          'bank_transfer': 'Transfer Bank',
          'gopay': 'GoPay',
          'ovo': 'OVO', 
          'dana': 'DANA',
          'shopeepay': 'ShopeePay',
        };
        return typeMap[selectedType] || selectedType;
      };

      const paymentData = {
        type: selectedType as PaymentMethod['type'],
        name: getPaymentMethodName(),
        holderName: formData.holderName,
        maskedNumber: maskedNumber,
        accountNumber: formData.accountNumber,
        isDefault: false,
      };

      if (isEditing) {
        await updatePaymentMethod(methodId, paymentData);
        Alert.alert('Berhasil', 'Metode pembayaran berhasil diperbarui', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      } else {
        await addPaymentMethod(paymentData);
        Alert.alert('Berhasil', 'Metode pembayaran berhasil ditambahkan', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal menyimpan metode pembayaran');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
    return formatted.substring(0, 19); // Max 16 digits + 3 spaces
  };

  const formatExpiryDate = (text: string, isMonth: boolean) => {
    const cleaned = text.replace(/\D/g, '');
    if (isMonth) {
      return cleaned.substring(0, 2);
    } else {
      return cleaned.substring(0, 4);
    }
  };

  const formatCVV = (text: string) => {
    return text.replace(/\D/g, '').substring(0, 4);
  };

  const formatPhoneNumber = (text: string) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
      cleaned = '62' + cleaned.substring(1);
    } else if (!cleaned.startsWith('62')) {
      cleaned = '62' + cleaned;
    }
    return '+' + cleaned.substring(0, 13);
  };

  const renderPaymentTypeSelector = () => (
    <View style={styles.typeSection}>
      <ThemedText style={styles.sectionTitle}>💳 Pilih Jenis Pembayaran</ThemedText>
      <View style={styles.typeGrid}>
        {paymentTypes.map((type) => (
          <Pressable
            key={type.id}
            style={[
              styles.typeCard,
              selectedType === type.id && styles.typeCardSelected
            ]}
            onPress={() => {
              setSelectedType(type.id);
              setFormData({...formData, provider: ''}); // Reset provider when changing type
            }}
          >
            <View style={[styles.typeIconContainer, { backgroundColor: type.color }]}>
              <IconSymbol name={type.icon} size={24} color="#fff" />
            </View>
            <View style={styles.typeContent}>
              <View style={styles.typeHeader}>
                <ThemedText style={styles.typeEmoji}>{type.emoji}</ThemedText>
                <ThemedText style={styles.typeName}>{type.name}</ThemedText>
              </View>
              <ThemedText style={styles.typeDescription}>{type.description}</ThemedText>
            </View>
            {selectedType === type.id && (
              <View style={styles.selectedIndicator}>
                <IconSymbol name="checkmark.circle.fill" size={20} color="#DE8389" />
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );

  const renderCardForm = () => (
    <View style={styles.formSection}>
      <ThemedText style={styles.sectionTitle}>
        {selectedType === 'Credit Card' ? '💳 Info Kartu Kredit' : '💳 Info Kartu Debit'}
      </ThemedText>
      
      <View style={styles.inputGroup}>
        <ThemedText style={styles.inputLabel}>Jenis Kartu *</ThemedText>
        <Pressable 
          style={[styles.inputContainer, styles.dropdownContainer]}
          onPress={() => setShowProviderDropdown(!showProviderDropdown)}
        >
          <IconSymbol name="creditcard.fill" size={20} color="#DE8389" />
          <ThemedText style={[styles.dropdownText, !formData.provider && styles.placeholderText]}>
            {formData.provider || 'Pilih Jenis Kartu'}
          </ThemedText>
          <IconSymbol 
            name={showProviderDropdown ? "chevron.up" : "chevron.down"} 
            size={16} 
            color="#666" 
          />
        </Pressable>
        
        {showProviderDropdown && (
          <View style={styles.dropdownList}>
            {cardProviders.map((provider) => (
              <Pressable
                key={provider.id}
                style={styles.dropdownItem}
                onPress={() => {
                  setFormData({...formData, provider: provider.code});
                  setShowProviderDropdown(false);
                }}
              >
                <ThemedText style={styles.dropdownItemText}>{provider.name}</ThemedText>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      <View style={styles.inputGroup}>
        <ThemedText style={styles.inputLabel}>Nama pada Kartu *</ThemedText>
        <View style={styles.inputContainer}>
          <IconSymbol name="person.fill" size={20} color="#DE8389" />
          <TextInput
            style={styles.textInput}
            value={formData.holderName}
            onChangeText={(text) => setFormData({...formData, holderName: text})}
            placeholder="John Doe"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <ThemedText style={styles.inputLabel}>Nomor Kartu *</ThemedText>
        <View style={styles.inputContainer}>
          <IconSymbol name="creditcard.fill" size={20} color="#DE8389" />
          <TextInput
            style={styles.textInput}
            value={formData.number}
            onChangeText={(text) => setFormData({...formData, number: formatCardNumber(text)})}
            placeholder="1234 5678 9012 3456"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.rowInputs}>
        <View style={[styles.inputGroup, { flex: 1 }]}>
          <ThemedText style={styles.inputLabel}>Bulan Exp *</ThemedText>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={formData.expiryMonth}
              onChangeText={(text) => setFormData({...formData, expiryMonth: formatExpiryDate(text, true)})}
              placeholder="MM"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
          <ThemedText style={styles.inputLabel}>Tahun Exp *</ThemedText>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={formData.expiryYear}
              onChangeText={(text) => setFormData({...formData, expiryYear: formatExpiryDate(text, false)})}
              placeholder="YYYY"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
          <ThemedText style={styles.inputLabel}>CVV *</ThemedText>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={formData.cvv}
              onChangeText={(text) => setFormData({...formData, cvv: formatCVV(text)})}
              placeholder="123"
              placeholderTextColor="#999"
              keyboardType="numeric"
              secureTextEntry
            />
          </View>
        </View>
      </View>
    </View>
  );

  const renderBankTransferForm = () => (
    <View style={styles.formSection}>
      <ThemedText style={styles.sectionTitle}>🏦 Info Bank Transfer</ThemedText>
      
      <View style={styles.inputGroup}>
        <ThemedText style={styles.inputLabel}>Nama Pemegang Rekening *</ThemedText>
        <View style={styles.inputContainer}>
          <IconSymbol name="person.fill" size={20} color="#DE8389" />
          <TextInput
            style={styles.textInput}
            value={formData.holderName}
            onChangeText={(text) => setFormData({...formData, holderName: text})}
            placeholder="John Doe"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <ThemedText style={styles.inputLabel}>Nama Bank *</ThemedText>
        <Pressable 
          style={[styles.inputContainer, styles.dropdownContainer]}
          onPress={() => setShowBankDropdown(!showBankDropdown)}
        >
          <IconSymbol name="building.columns.fill" size={20} color="#DE8389" />
          <ThemedText style={[styles.dropdownText, !formData.bankName && styles.placeholderText]}>
            {formData.bankName || 'Pilih Bank'}
          </ThemedText>
          <IconSymbol 
            name={showBankDropdown ? "chevron.up" : "chevron.down"} 
            size={16} 
            color="#666" 
          />
        </Pressable>
        
        {showBankDropdown && (
          <View style={styles.dropdownList}>
            {bankOptions.map((bank) => (
              <Pressable
                key={bank.id}
                style={styles.dropdownItem}
                onPress={() => {
                  setFormData({...formData, bankName: bank.code});
                  setShowBankDropdown(false);
                }}
              >
                <ThemedText style={styles.dropdownItemText}>{bank.name}</ThemedText>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      <View style={styles.inputGroup}>
        <ThemedText style={styles.inputLabel}>Nomor Rekening *</ThemedText>
        <View style={styles.inputContainer}>
          <IconSymbol name="number" size={20} color="#DE8389" />
          <TextInput
            style={styles.textInput}
            value={formData.accountNumber}
            onChangeText={(text) => setFormData({...formData, accountNumber: text.replace(/\D/g, '')})}
            placeholder="1234567890"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>
      </View>
    </View>
  );

  const renderEWalletForm = () => (
    <View style={styles.formSection}>
      <ThemedText style={styles.sectionTitle}>📱 Info E-Wallet</ThemedText>
      
      <View style={styles.inputGroup}>
        <ThemedText style={styles.inputLabel}>Jenis E-Wallet *</ThemedText>
        <Pressable 
          style={[styles.inputContainer, styles.dropdownContainer]}
          onPress={() => setShowProviderDropdown(!showProviderDropdown)}
        >
          <IconSymbol name="wallet.pass.fill" size={20} color="#DE8389" />
          <ThemedText style={[styles.dropdownText, !formData.provider && styles.placeholderText]}>
            {formData.provider || 'Pilih E-Wallet'}
          </ThemedText>
          <IconSymbol 
            name={showProviderDropdown ? "chevron.up" : "chevron.down"} 
            size={16} 
            color="#666" 
          />
        </Pressable>
        
        {showProviderDropdown && (
          <View style={styles.dropdownList}>
            {ewalletProviders.map((provider) => (
              <Pressable
                key={provider.id}
                style={styles.dropdownItem}
                onPress={() => {
                  setFormData({...formData, provider: provider.code});
                  setShowProviderDropdown(false);
                }}
              >
                <ThemedText style={styles.dropdownItemText}>{provider.name}</ThemedText>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      <View style={styles.inputGroup}>
        <ThemedText style={styles.inputLabel}>Nama Pemilik *</ThemedText>
        <View style={styles.inputContainer}>
          <IconSymbol name="person.fill" size={20} color="#DE8389" />
          <TextInput
            style={styles.textInput}
            value={formData.holderName}
            onChangeText={(text) => setFormData({...formData, holderName: text})}
            placeholder="John Doe"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <ThemedText style={styles.inputLabel}>Nomor Telepon *</ThemedText>
        <View style={styles.inputContainer}>
          <IconSymbol name="phone.fill" size={20} color="#DE8389" />
          <TextInput
            style={styles.textInput}
            value={formData.phoneNumber}
            onChangeText={(text) => setFormData({...formData, phoneNumber: formatPhoneNumber(text)})}
            placeholder="+62812345678"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />
        </View>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="arrow.left" size={24} color="#fff" />
        </Pressable>
        <ThemedText style={styles.headerTitle}>
          {isEditing ? 'Edit Metode Pembayaran' : 'Tambah Metode Pembayaran'}
        </ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        onTouchStart={() => {
          setShowBankDropdown(false);
          setShowProviderDropdown(false);
        }}
      >
        {/* Payment Type Selector */}
        {renderPaymentTypeSelector()}

        {/* Form based on selected type */}
        {selectedType === 'Credit Card' && renderCardForm()}
        {selectedType === 'Debit Card' && renderCardForm()}
        {selectedType === 'Bank Transfer' && renderBankTransferForm()}
        {selectedType === 'E-Wallet' && renderEWalletForm()}

        {/* Security Info */}
        {selectedType && (
          <View style={styles.securitySection}>
            <View style={styles.securityCard}>
              <IconSymbol name="lock.shield" size={24} color="#28A745" />
              <View style={styles.securityText}>
                <ThemedText style={styles.securityTitle}>Keamanan Data</ThemedText>
                <ThemedText style={styles.securitySubtitle}>
                  Informasi pembayaran Anda akan dienkripsi dan disimpan dengan aman
                </ThemedText>
              </View>
            </View>
          </View>
        )}

        {/* Extra spacing for fixed button */}
        {selectedType && <View style={styles.bottomSpacer} />}
      </ScrollView>

      {/* Fixed Save Button */}
      {selectedType && (
        <View style={styles.fixedButtonContainer}>
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
                  ? '💾 Perbarui Metode' 
                  : '💾 Simpan Metode'
              }
            </ThemedText>
          </Pressable>
        </View>
      )}
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 0,
  },
  scrollContainer: {
    flex: 1,
  },
  typeSection: {
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
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  typeCard: {
    width: '100%',
    minHeight: 120,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    position: 'relative',
  },
  typeCardSelected: {
    borderColor: '#DE8389',
    backgroundColor: '#FFF8F8',
    elevation: 4,
    shadowOpacity: 0.15,
    transform: [{ scale: 1.02 }],
  },
  typeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  typeContent: {
    flex: 1,
  },
  typeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  typeEmoji: {
    fontSize: 16,
    marginRight: 8,
  },
  typeName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  typeDescription: {
    fontSize: 11,
    color: '#666',
    lineHeight: 16,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  formSection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  rowInputs: {
    flexDirection: 'row',
  },
  securitySection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  securityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#28A745',
  },
  securityText: {
    marginLeft: 15,
    flex: 1,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28A745',
    marginBottom: 4,
  },
  securitySubtitle: {
    fontSize: 14,
    color: '#666',
  },
  dropdownContainer: {
    justifyContent: 'space-between',
  },
  dropdownText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  placeholderText: {
    color: '#999',
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  bottomSpacer: {
    height: 100,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
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