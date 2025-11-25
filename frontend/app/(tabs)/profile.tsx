import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const [userInfo] = useState({
    name: 'Juliana Permata Devi',
    email: 'devi@gmail.com',
    phone: '+62 812-3456-7890',
    joinDate: 'November 2024',
    totalOrders: 12,
    points: 2450
  });

  const handleLogout = () => {
    Alert.alert(
      'Logout', 
      'Apakah Anda yakin ingin keluar?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => {
          logout();
          router.replace('/(tabs)/');
        }}
      ]
    );
  };

  const accountMenuItems = [
    { id: 1, title: 'Edit Profile', icon: 'person.circle.fill', route: '/profile-edit' },
    { id: 2, title: 'Riwayat Pesanan', icon: 'clock.fill', route: '/order-history' },
    { id: 3, title: 'Alamat Pengiriman', icon: 'location.fill', route: '/addresses' },
    { id: 4, title: 'Metode Pembayaran', icon: 'creditcard.fill', route: '/payment-methods' },
    { id: 5, title: 'Notifikasi', icon: 'bell.fill', route: '/notifications' },
  ];

  const serviceMenuItems = [
    { id: 1, title: 'Bantuan & Support', icon: 'questionmark.circle.fill', route: '/support' },
    { id: 2, title: 'Pengiriman', icon: 'location.fill', route: '/shipping' },
    { id: 3, title: 'Return & Refund', icon: 'arrow.uturn.left.circle.fill', route: '/return' },
  ];

  const infoMenuItems = [
    { id: 1, title: 'Tentang Brand', icon: 'building.2.fill', route: '/brand' },
    { id: 2, title: 'Blog & Tips', icon: 'doc.text.fill', route: '/blog' },
    { id: 3, title: 'Kontak Kami', icon: 'phone.fill', route: '/contact' },
    { id: 4, title: 'Syarat & Ketentuan', icon: 'doc.plaintext.fill', route: '/terms' },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Profile */}
        <View style={styles.headerSection}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={require('@/assets/images/meong.png')} 
              style={styles.profileImage}
            />
            <View style={styles.editIconContainer}>
              <IconSymbol name="camera.fill" size={16} color="#fff" />
            </View>
          </View>
          
          <ThemedText style={styles.userName}>{userInfo.name}</ThemedText>
          <ThemedText style={styles.userEmail}>{userInfo.email}</ThemedText>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <ThemedText style={styles.statNumber}>{userInfo.totalOrders}</ThemedText>
              <ThemedText style={styles.statLabel}>Pesanan</ThemedText>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <ThemedText style={styles.statNumber}>{userInfo.points}</ThemedText>
              <ThemedText style={styles.statLabel}>Poin</ThemedText>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <ThemedText style={styles.statNumber}>⭐ 4.9</ThemedText>
              <ThemedText style={styles.statLabel}>Rating</ThemedText>
            </View>
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Akun Saya</ThemedText>
          <View style={styles.menuSection}>
            {accountMenuItems.map((item) => (
              <Pressable 
                key={item.id} 
                style={styles.menuItem}
                onPress={() => router.push(item.route)}
              >
                <View style={styles.menuItemLeft}>
                  <View style={styles.iconContainer}>
                    <IconSymbol name={item.icon} size={20} color="#DE8389" />
                  </View>
                  <ThemedText style={styles.menuItemText}>{item.title}</ThemedText>
                </View>
                <IconSymbol name="chevron.right" size={16} color="#ccc" />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Customer Service */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Layanan Pelanggan</ThemedText>
          <View style={styles.menuSection}>
            {serviceMenuItems.map((item) => (
              <Pressable 
                key={item.id} 
                style={styles.menuItem}
                onPress={() => router.push(item.route)}
              >
                <View style={styles.menuItemLeft}>
                  <View style={styles.iconContainer}>
                    <IconSymbol name={item.icon} size={20} color="#4ECDC4" />
                  </View>
                  <ThemedText style={styles.menuItemText}>{item.title}</ThemedText>
                </View>
                <IconSymbol name="chevron.right" size={16} color="#ccc" />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Information & About */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Informasi</ThemedText>
          <View style={styles.menuSection}>
            {infoMenuItems.map((item) => (
              <Pressable 
                key={item.id} 
                style={styles.menuItem}
                onPress={() => router.push(item.route)}
              >
                <View style={styles.menuItemLeft}>
                  <View style={styles.iconContainer}>
                    <IconSymbol name={item.icon} size={20} color="#45B7D1" />
                  </View>
                  <ThemedText style={styles.menuItemText}>{item.title}</ThemedText>
                </View>
                <IconSymbol name="chevron.right" size={16} color="#ccc" />
              </Pressable>
            ))}
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfoSection}>
          <ThemedText style={styles.appInfoTitle}>Lyana Bottle Studio</ThemedText>
          <ThemedText style={styles.appVersion}>Versi 1.0.0</ThemedText>
          <ThemedText style={styles.joinDate}>Bergabung sejak {userInfo.joinDate}</ThemedText>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <Pressable onPress={handleLogout} style={styles.logoutButton}>
            <IconSymbol name="arrow.right.square.fill" size={20} color="#fff" />
            <ThemedText style={styles.logoutText}>Keluar</ThemedText>
          </Pressable>
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
  headerSection: {
    backgroundColor: '#DE8389',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#fff',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#DE8389',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 10,
  },
  sectionContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    paddingLeft: 5,
  },
  menuSection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(222, 131, 137, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 1,
    borderColor: 'rgba(222, 131, 137, 0.2)',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
  appInfoSection: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  appInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DE8389',
    marginBottom: 5,
  },
  appVersion: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  joinDate: {
    fontSize: 14,
    color: '#666',
  },
  logoutSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#ff4757',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
