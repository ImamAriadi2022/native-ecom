import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { useProfile } from '@/app/ProfileContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function ProfileEditScreen() {
  const router = useRouter();
  const { userProfile, updateProfile } = useProfile();
  
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    email: userProfile?.email || '',
    phone: userProfile?.phone || '',
    dateOfBirth: userProfile?.dateOfBirth || '',
    gender: userProfile?.gender || 'female' as 'male' | 'female' | 'other',
  });

  const [profileImageUri, setProfileImageUri] = useState<string | null>(userProfile?.avatar || null);
  const [isLoading, setIsLoading] = useState(false);

  // Update profile image URI when userProfile changes
  useEffect(() => {
    setProfileImageUri(userProfile?.avatar || null);
  }, [userProfile?.avatar]);

  const pickImage = async () => {
    try {
      // Request permission
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert(
          'Permission Required',
          'Aplikasi memerlukan izin untuk mengakses galeri foto.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Settings', onPress: () => ImagePicker.requestMediaLibraryPermissionsAsync() }
          ]
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setProfileImageUri(result.assets[0].uri);
        Alert.alert('Berhasil', 'Foto profil berhasil dipilih!');
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal memilih foto dari galeri');
    }
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      Alert.alert('Error', 'Nama, email, dan nomor telepon wajib diisi');
      return;
    }

    setIsLoading(true);
    try {
      await updateProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        avatar: profileImageUri || userProfile?.avatar || '', // Save profile image
      });
      
      Alert.alert('Berhasil', 'Profile berhasil diperbarui', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Gagal memperbarui profile');
    } finally {
      setIsLoading(false);
    }
  };

  const genderOptions = [
    { value: 'female', label: 'Perempuan' },
    { value: 'male', label: 'Laki-laki' },
    { value: 'other', label: 'Lainnya' },
  ];

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="arrow.left" size={24} color="#fff" />
        </Pressable>
        <ThemedText style={styles.headerTitle}>Edit Profile</ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Image Section */}
        <View style={styles.imageSection}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={
                profileImageUri 
                  ? { uri: profileImageUri } 
                  : userProfile?.avatar 
                    ? { uri: userProfile.avatar }
                    : require('@/assets/images/meong.png')
              } 
              style={styles.profileImage}
            />
            <Pressable style={styles.editImageButton} onPress={pickImage}>
              <IconSymbol name="camera.fill" size={20} color="#fff" />
            </Pressable>
          </View>
          <Pressable onPress={pickImage} style={styles.imageLabelContainer}>
            <IconSymbol name="photo" size={18} color="#DE8389" />
            <ThemedText style={styles.imageLabel}>Ubah Foto Profile</ThemedText>
          </Pressable>
          {profileImageUri && (
            <Pressable 
              style={styles.removeImageButton}
              onPress={() => {
                Alert.alert(
                  'Hapus Foto',
                  'Apakah Anda yakin ingin menghapus foto profil?',
                  [
                    { text: 'Batal', style: 'cancel' },
                    { text: 'Hapus', style: 'destructive', onPress: () => setProfileImageUri(null) }
                  ]
                );
              }}
            >
              <IconSymbol name="trash" size={16} color="#ff4444" />
              <ThemedText style={styles.removeImageText}>Hapus Foto</ThemedText>
            </Pressable>
          )}
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Name */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Nama Lengkap</ThemedText>
            <View style={styles.inputContainer}>
              <IconSymbol name="person.fill" size={20} color="#DE8389" />
              <TextInput
                style={styles.textInput}
                value={formData.name}
                onChangeText={(text) => setFormData({...formData, name: text})}
                placeholder="Masukkan nama lengkap"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Email</ThemedText>
            <View style={styles.inputContainer}>
              <IconSymbol name="envelope.fill" size={20} color="#DE8389" />
              <TextInput
                style={styles.textInput}
                value={formData.email}
                onChangeText={(text) => setFormData({...formData, email: text})}
                placeholder="Masukkan email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Phone */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Nomor Telepon</ThemedText>
            <View style={styles.inputContainer}>
              <IconSymbol name="phone.fill" size={20} color="#DE8389" />
              <TextInput
                style={styles.textInput}
                value={formData.phone}
                onChangeText={(text) => setFormData({...formData, phone: text})}
                placeholder="Masukkan nomor telepon"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Date of Birth */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Tanggal Lahir</ThemedText>
            <View style={styles.inputContainer}>
              <IconSymbol name="calendar" size={20} color="#DE8389" />
              <TextInput
                style={styles.textInput}
                value={formData.dateOfBirth}
                onChangeText={(text) => setFormData({...formData, dateOfBirth: text})}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Gender */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Jenis Kelamin</ThemedText>
            <View style={styles.genderContainer}>
              {genderOptions.map((option) => (
                <Pressable
                  key={option.value}
                  style={[
                    styles.genderOption,
                    formData.gender === option.value && styles.genderOptionSelected
                  ]}
                  onPress={() => setFormData({...formData, gender: option.value as any})}
                >
                  <View style={[
                    styles.genderRadio,
                    formData.gender === option.value && styles.genderRadioSelected
                  ]} />
                  <ThemedText style={[
                    styles.genderLabel,
                    formData.gender === option.value && styles.genderLabelSelected
                  ]}>
                    {option.label}
                  </ThemedText>
                </Pressable>
              ))}
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
                {isLoading ? '💾 Menyimpan...' : '💾 Simpan Perubahan'}
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
  },
  imageSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#DE8389',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#DE8389',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  imageLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff5f5',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DE8389',
    marginBottom: 10,
  },
  imageLabel: {
    fontSize: 16,
    color: '#DE8389',
    fontWeight: '600',
  },
  removeImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fff5f5',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ffdddd',
  },
  removeImageText: {
    fontSize: 14,
    color: '#ff4444',
    fontWeight: '500',
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
  genderContainer: {
    gap: 12,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
  },
  genderOptionSelected: {
    borderColor: '#DE8389',
    backgroundColor: '#fff5f5',
  },
  genderRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 12,
  },
  genderRadioSelected: {
    borderColor: '#DE8389',
    backgroundColor: '#DE8389',
  },
  genderLabel: {
    fontSize: 16,
    color: '#333',
  },
  genderLabelSelected: {
    color: '#DE8389',
    fontWeight: '600',
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