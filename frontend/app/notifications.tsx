import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, View } from 'react-native';

import { Notification, useProfile } from '@/app/ProfileContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function NotificationsScreen() {
  const router = useRouter();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, clearAllNotifications } = useProfile();
  const [selectedTab, setSelectedTab] = useState<'all' | 'unread' | 'orders' | 'promos'>('all');

  const tabs = [
    { id: 'all', name: 'Semua', count: notifications.length },
    { id: 'unread', name: 'Belum Dibaca', count: notifications.filter(n => !n.isRead).length },
    { id: 'orders', name: 'Pesanan', count: notifications.filter(n => n.type === 'order').length },
    { id: 'promos', name: 'Promo', count: notifications.filter(n => n.type === 'promo').length },
  ];

  const getFilteredNotifications = () => {
    switch (selectedTab) {
      case 'unread':
        return notifications.filter(n => !n.isRead);
      case 'orders':
        return notifications.filter(n => n.type === 'order');
      case 'promos':
        return notifications.filter(n => n.type === 'promo');
      default:
        return notifications;
    }
  };

  const getNotificationIcon = (type: string, status?: string) => {
    switch (type) {
      case 'order':
        if (status === 'processing') return 'clock.fill';
        if (status === 'shipped') return 'truck.box.fill';
        if (status === 'delivered') return 'checkmark.circle.fill';
        return 'bag.fill';
      case 'promo':
        return 'percent';
      case 'system':
        return 'bell.fill';
      default:
        return 'bell';
    }
  };

  const getNotificationColor = (type: string, status?: string) => {
    switch (type) {
      case 'order':
        if (status === 'processing') return '#FF8C00';
        if (status === 'shipped') return '#4169E1';
        if (status === 'delivered') return '#28A745';
        return '#DE8389';
      case 'promo':
        return '#DC3545';
      case 'system':
        return '#6C757D';
      default:
        return '#666';
    }
  };

  const formatRelativeTime = (date: string) => {
    const now = new Date();
    const notifDate = new Date(date);
    const diffInMs = now.getTime() - notifDate.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes} menit yang lalu`;
    } else if (diffInHours < 24) {
      return `${diffInHours} jam yang lalu`;
    } else if (diffInDays < 7) {
      return `${diffInDays} hari yang lalu`;
    } else {
      return notifDate.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
  };

  const handleNotificationPress = async (notification: Notification) => {
    if (!notification.isRead) {
      await markNotificationAsRead(notification.id);
    }

    // Navigate based on notification type
    if (notification.type === 'order' && notification.orderId) {
      router.push('/order-history');
    } else if (notification.type === 'promo') {
      router.push('/promo');
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <Pressable
      style={[styles.notificationCard, !item.isRead && styles.unreadCard]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={styles.notificationContent}>
        <View style={[
          styles.iconContainer, 
          { backgroundColor: getNotificationColor(item.type, item.orderStatus) }
        ]}>
          <IconSymbol 
            name={getNotificationIcon(item.type, item.orderStatus)} 
            size={20} 
            color="#fff" 
          />
        </View>

        <View style={styles.textContainer}>
          <ThemedText style={[styles.notificationTitle, !item.isRead && styles.unreadText]}>
            {item.title}
          </ThemedText>
          <ThemedText style={styles.notificationMessage}>
            {item.message}
          </ThemedText>
          <ThemedText style={styles.notificationTime}>
            {formatRelativeTime(item.date)}
          </ThemedText>
        </View>

        {!item.isRead && (
          <View style={styles.unreadDot} />
        )}
      </View>

      {/* Order tracking info */}
      {item.type === 'order' && item.orderStatus && (
        <View style={styles.orderInfo}>
          <View style={styles.orderStatusContainer}>
            <ThemedText style={styles.orderStatusLabel}>Status:</ThemedText>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getNotificationColor(item.type, item.orderStatus) }
            ]}>
              <ThemedText style={styles.statusBadgeText}>
                {item.orderStatus === 'processing' && 'Diproses'}
                {item.orderStatus === 'shipped' && 'Dikirim'}
                {item.orderStatus === 'delivered' && 'Diterima'}
              </ThemedText>
            </View>
          </View>
          
          {item.orderId && (
            <ThemedText style={styles.orderIdText}>
              Order #{item.orderId}
            </ThemedText>
          )}
        </View>
      )}
    </Pressable>
  );

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <IconSymbol name="bell.slash" size={80} color="#ccc" />
      <ThemedText style={styles.emptyTitle}>
        {selectedTab === 'unread' 
          ? 'Tidak Ada Notifikasi Baru' 
          : 'Belum Ada Notifikasi'
        }
      </ThemedText>
      <ThemedText style={styles.emptySubtitle}>
        {selectedTab === 'unread'
          ? 'Semua notifikasi sudah dibaca'
          : 'Notifikasi akan muncul di sini ketika ada update pesanan atau promo menarik'
        }
      </ThemedText>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="arrow.left" size={24} color="#fff" />
        </Pressable>
        <ThemedText style={styles.headerTitle}>Notifikasi</ThemedText>
        <View style={styles.headerButtons}>
          {notifications.length > 5 && (
            <Pressable onPress={() => {
              Alert.alert(
                'Hapus Semua Notifikasi',
                'Hapus semua notifikasi? Data yang dihapus tidak dapat dikembalikan.',
                [
                  { text: 'Batal', style: 'cancel' },
                  { text: 'Hapus', style: 'destructive', onPress: clearAllNotifications }
                ]
              );
            }} style={styles.clearAllButton}>
              <IconSymbol name="trash" size={16} color="#fff" />
            </Pressable>
          )}
          <Pressable 
            onPress={() => markAllNotificationsAsRead()}
            style={styles.markAllButton}
          >
            <IconSymbol name="checkmark.circle" size={20} color="#fff" />
          </Pressable>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.id}
            style={[
              styles.tab,
              selectedTab === tab.id && styles.activeTab
            ]}
            onPress={() => setSelectedTab(tab.id as any)}
          >
            <ThemedText style={[
              styles.tabText,
              selectedTab === tab.id && styles.activeTabText
            ]}>
              {tab.name}
            </ThemedText>
            {tab.count > 0 && (
              <View style={[
                styles.tabBadge,
                selectedTab === tab.id && styles.activeTabBadge
              ]}>
                <ThemedText style={[
                  styles.tabBadgeText,
                  selectedTab === tab.id && styles.activeTabBadgeText
                ]}>
                  {tab.count}
                </ThemedText>
              </View>
            )}
          </Pressable>
        ))}
      </View>

      {/* Notifications List */}
      <View style={styles.content}>
        {getFilteredNotifications().length === 0 ? (
          <EmptyState />
        ) : (
          <FlatList
            data={getFilteredNotifications()}
            renderItem={renderNotification}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>

      {/* Delivery Simulation Info */}
      <View style={styles.infoSection}>
        <View style={styles.infoCard}>
          <IconSymbol name="truck.box.fill" size={24} color="#4169E1" />
          <View style={styles.infoText}>
            <ThemedText style={styles.infoTitle}>Tracking Real-time</ThemedText>
            <ThemedText style={styles.infoSubtitle}>
              Dapatkan update status pengiriman secara real-time dari kurir
            </ThemedText>
          </View>
        </View>
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
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  clearAllButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 6,
  },
  markAllButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f8f9fa',
  },
  activeTab: {
    backgroundColor: '#DE8389',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  tabBadge: {
    backgroundColor: '#DC3545',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  activeTabBadge: {
    backgroundColor: '#fff',
  },
  tabBadgeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  activeTabBadgeText: {
    color: '#DE8389',
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
    lineHeight: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#f0f0f0',
  },
  unreadCard: {
    borderLeftColor: '#DE8389',
    backgroundColor: '#FFF8F8',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  unreadText: {
    fontWeight: 'bold',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#DC3545',
    marginTop: 5,
  },
  orderInfo: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  orderStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderStatusLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  orderIdText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  infoSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F2FF',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4169E1',
  },
  infoText: {
    marginLeft: 15,
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4169E1',
    marginBottom: 4,
  },
  infoSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});