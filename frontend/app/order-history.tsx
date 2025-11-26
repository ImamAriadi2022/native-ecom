import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { useProfile } from '@/app/ProfileContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function OrderHistoryScreen() {
  const router = useRouter();
  const { orderHistory, clearOrderHistory, updateOrderStatus, restartSimulation, addOrderHistory } = useProfile();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'>('all');
  const [countdownTimers, setCountdownTimers] = useState<{[orderId: string]: number}>({});

  // Simulasi otomatis perubahan status pesanan
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    orderHistory.forEach((order) => {
      // Parse date dengan benar - coba berbagai format
      let orderTime;
      try {
        // Coba parse langsung
        orderTime = new Date(order.date).getTime();
        
        // Jika hasilnya NaN, coba format lain
        if (isNaN(orderTime)) {
          // Coba parse format Indonesia: "26 November 2024, 10:30"
          const dateStr = order.date.replace(/,/g, '');
          orderTime = new Date(dateStr).getTime();
        }
        
        if (isNaN(orderTime)) {
          console.error(`Invalid date format: ${order.date}`);
          return; // Skip order dengan format tanggal tidak valid
        }
      } catch (error) {
        console.error(`Error parsing date: ${order.date}`, error);
        return;
      }
      
      const currentTime = Date.now();
      const elapsedSeconds = (currentTime - orderTime) / 1000;
      const elapsedMinutes = elapsedSeconds / 60;

      console.log(`Order ${order.orderId}: Status=${order.status}`);
      console.log(`  Order Date: ${order.date}`);
      console.log(`  Order Time: ${new Date(orderTime).toISOString()}`);
      console.log(`  Current Time: ${new Date(currentTime).toISOString()}`);
      console.log(`  Elapsed: ${elapsedMinutes.toFixed(2)} minutes (${elapsedSeconds.toFixed(0)} seconds)`);

      // Quick test logic - untuk order yang dimulai dengan "QUICK"
      const isQuickTest = order.orderId.startsWith('QUICK');
      
      if (order.status === 'paid') {
        if (isQuickTest) {
          // Quick test: 30 detik ke shipped
          if (elapsedSeconds >= 30) {
            const timer1 = setTimeout(() => {
              console.log(`Updating ${order.orderId} to shipped (quick test)`);
              updateOrderStatus(order.orderId, 'shipped', `TRACK${order.orderId.slice(-5)}`);
            }, 500);
            timers.push(timer1);
          } else {
            const timeToShipped = (30 - elapsedSeconds) * 1000;
            console.log(`Quick test timer for ${order.orderId} to ship in ${timeToShipped/1000} seconds`);
            const timer2 = setTimeout(() => {
              console.log(`Updating ${order.orderId} to shipped (quick timer)`);
              updateOrderStatus(order.orderId, 'shipped', `TRACK${order.orderId.slice(-5)}`);
            }, timeToShipped);
            timers.push(timer2);
          }
        } else {
          // Normal timing: 1 menit ke shipped
          if (elapsedMinutes >= 1) {
            // Langsung ubah ke shipped jika sudah lebih dari 1 menit
            const timer3 = setTimeout(() => {
              console.log(`Updating ${order.orderId} to shipped (immediate)`);
              updateOrderStatus(order.orderId, 'shipped', `TRACK${order.orderId.slice(-6)}`);
            }, 500);
            timers.push(timer3);
          } else {
            // Set timer untuk ubah ke shipped setelah 1 menit
            const timeToShipped = (60 - elapsedSeconds) * 1000;
            console.log(`Setting timer for ${order.orderId} to ship in ${timeToShipped/1000} seconds`);
            const timer4 = setTimeout(() => {
              console.log(`Updating ${order.orderId} to shipped (timer)`);
              updateOrderStatus(order.orderId, 'shipped', `TRACK${order.orderId.slice(-6)}`);
            }, timeToShipped);
            timers.push(timer4);
          }
        }
      } else if (order.status === 'shipped') {
        // Untuk shipped status, hitung waktu dari 1 menit (ketika berubah jadi shipped)
        const shippedElapsedMinutes = Math.max(0, elapsedMinutes - 1);
        
        if (shippedElapsedMinutes >= 2) {
          // Langsung ubah ke delivered jika sudah lebih dari 2 menit setelah shipped
          const timer5 = setTimeout(() => {
            console.log(`Updating ${order.orderId} to delivered (immediate)`);
            updateOrderStatus(order.orderId, 'delivered');
          }, 500);
          timers.push(timer5);
        } else {
          // Set timer untuk ubah ke delivered setelah 2 menit dari shipped
          const timeToDelivered = (2 * 60 - shippedElapsedMinutes * 60) * 1000;
          console.log(`Setting timer for ${order.orderId} to deliver in ${timeToDelivered/1000} seconds (shipped elapsed: ${shippedElapsedMinutes.toFixed(2)} min)`);
          const timer6 = setTimeout(() => {
            console.log(`Updating ${order.orderId} to delivered (timer)`);
            updateOrderStatus(order.orderId, 'delivered');
          }, timeToDelivered);
          timers.push(timer6);
        }
      }
    });

    // Cleanup function untuk membersihkan semua timer
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [orderHistory, updateOrderStatus]);

  // Update countdown timer setiap detik
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers: {[orderId: string]: number} = {};
      
      orderHistory.forEach((order) => {
        let orderTime;
        try {
          orderTime = new Date(order.date).getTime();
          if (isNaN(orderTime)) {
            const dateStr = order.date.replace(/,/g, '');
            orderTime = new Date(dateStr).getTime();
          }
          if (isNaN(orderTime)) return;
        } catch (error) {
          return;
        }
        
        const currentTime = Date.now();
        const elapsedSeconds = (currentTime - orderTime) / 1000;
        const isQuickTest = order.orderId.startsWith('QUICK');
        
        if (order.status === 'paid') {
          if (isQuickTest) {
            // Quick test: 30 detik countdown
            const remainingSeconds = Math.max(0, 30 - elapsedSeconds);
            newTimers[order.orderId] = Math.ceil(remainingSeconds);
          } else {
            // Normal: 1 menit countdown
            const remainingSeconds = Math.max(0, 60 - elapsedSeconds);
            newTimers[order.orderId] = Math.ceil(remainingSeconds);
          }
        } else if (order.status === 'shipped') {
          // Untuk shipped, hitung sisa waktu 2 menit dari waktu shipped (setelah 1 menit pertama)
          const shippedElapsedSeconds = Math.max(0, elapsedSeconds - 60);
          const remainingSeconds = Math.max(0, 120 - shippedElapsedSeconds);
          newTimers[order.orderId] = Math.ceil(remainingSeconds);
        }
      });
      
      setCountdownTimers(newTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [orderHistory]);

  // Function to format countdown time
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Function to format date for human reading
  const formatOrderDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString; // Return original if parsing fails
      }
      
      return date.toLocaleString('id-ID', {
        day: 'numeric',
        month: 'long', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Jakarta'
      });
    } catch (error) {
      return dateString;
    }
  };

  // Function to handle tracking popup
  const handleTrackOrder = (trackingNumber: string, orderId: string) => {
    Alert.alert(
      'Lacak Pesanan',
      `Nomor Resi: ${trackingNumber}\n\nStatus Pengiriman:\n✅ Pesanan dikemas\n🚚 Dalam perjalanan\n📍 Tiba di kota tujuan\n⏳ Dalam proses pengantaran\n\nEstimasi tiba: Hari ini, 16:00 - 18:00`,
      [
        { text: 'Salin Resi', onPress: () => Alert.alert('Berhasil', 'Nomor resi telah disalin') },
        { text: 'Tutup', style: 'cancel' }
      ]
    );
  };

  // Function to handle review popup
  const handleReviewOrder = (orderId: string, orderItems: any[]) => {
    Alert.alert(
      'Beri Rating & Review',
      `Bagaimana pengalaman Anda dengan pesanan ${orderId}?\n\nProduk: ${orderItems[0]?.name}\n\nBerikan rating Anda:`,
      [
        { text: '⭐⭐⭐⭐⭐ (5)', onPress: () => Alert.alert('Terima kasih!', 'Rating 5 bintang telah tersimpan') },
        { text: '⭐⭐⭐⭐ (4)', onPress: () => Alert.alert('Terima kasih!', 'Rating 4 bintang telah tersimpan') },
        { text: '⭐⭐⭐ (3)', onPress: () => Alert.alert('Terima kasih!', 'Rating 3 bintang telah tersimpan') },
        { text: 'Batal', style: 'cancel' }
      ]
    );
  };

  // Function to handle order detail navigation
  const handleViewOrderDetail = (order: any) => {
    router.push({
      pathname: '/order-detail',
      params: {
        orderId: order.orderId,
        orderData: JSON.stringify(order)
      }
    });
  };

  const filterOptions = [
    { value: 'all', label: 'Semua' },
    { value: 'pending', label: 'Pending' },
    { value: 'paid', label: 'Dibayar' },
    { value: 'shipped', label: 'Dikirim' },
    { value: 'delivered', label: 'Selesai' },
    { value: 'cancelled', label: 'Dibatalkan' },
  ];

  const getFilteredOrders = () => {
    if (selectedFilter === 'all') return orderHistory;
    return orderHistory.filter(order => order.status === selectedFilter);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#f39c12';
      case 'paid': return '#3498db';
      case 'shipped': return '#9b59b6';
      case 'delivered': return '#27ae60';
      case 'cancelled': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Menunggu Pembayaran';
      case 'paid': return 'Dibayar';
      case 'shipped': return 'Sedang Dikirim';
      case 'delivered': return 'Pesanan Selesai';
      case 'cancelled': return 'Dibatalkan';
      default: return status;
    }
  };

  const getImageSource = (imageName: string) => {
    const imageMap: { [key: string]: any } = {
      'tumbler cream.jpg': require('@/assets/images/tumbler cream.jpg'),
      'tumbler pink1.jpg': require('@/assets/images/tumbler pink1.jpg'),
      'tumbler hijau2.jpg': require('@/assets/images/tumbler hijau2.jpg'),
      'tumbler ungu.jpg': require('@/assets/images/tumbler ungu.jpg'),
      'tumbler oren.jpg': require('@/assets/images/tumbler oren.jpg'),
      'tumbler khaki.jpg': require('@/assets/images/tumbler khaki.jpg'),
      'masseto.jpg': require('@/assets/images/masseto.jpg'),
      'gantungan1.jpg': require('@/assets/images/gantungan1.jpg'),
      'bundling1.jpg': require('@/assets/images/bundling1.jpg'),
      // Map common names to proper images
      'Lyana Bottle Premium': require('@/assets/images/tumbler cream.jpg'),
      'Custom Tumbler': require('@/assets/images/tumbler pink1.jpg'),
      'Eco Tumbler': require('@/assets/images/tumbler hijau2.jpg'),
      'product.jpg': require('@/assets/images/tumbler cream.jpg'), // Default fallback
    };
    return imageMap[imageName] || require('@/assets/images/tumbler cream.jpg');
  };

  const filteredOrders = getFilteredOrders();

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="arrow.left" size={24} color="#fff" />
        </Pressable>
        <ThemedText style={styles.headerTitle}>Riwayat Pesanan</ThemedText>
        {orderHistory.length > 1 && (
          <Pressable 
            onPress={() => {
              Alert.alert(
                'Reset Data Pesanan',
                `Anda memiliki ${orderHistory.length} pesanan. Hapus semua data duplikasi? Ini akan menghapus semua riwayat pesanan.`,
                [
                  { text: 'Batal', style: 'cancel' },
                  { text: 'Reset', style: 'destructive', onPress: () => {
                    clearOrderHistory();
                    Alert.alert('Berhasil', 'Semua data pesanan telah dihapus. Data akan kembali normal saat checkout berikutnya.');
                  }}
                ]
              );
            }}
            style={styles.clearButton}
          >
            <IconSymbol name="arrow.clockwise" size={18} color="#fff" />
          </Pressable>
        )}
        {orderHistory.length <= 3 && <View style={styles.headerSpacer} />}
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          {filterOptions.map((option) => (
            <Pressable
              key={option.value}
              style={[
                styles.filterTab,
                selectedFilter === option.value && styles.filterTabActive
              ]}
              onPress={() => setSelectedFilter(option.value as any)}
            >
              <ThemedText style={[
                styles.filterTabText,
                selectedFilter === option.value && styles.filterTabTextActive
              ]}>
                {option.label}
              </ThemedText>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Simulasi Banner */}
      <View style={styles.simulationBanner}>
        <IconSymbol name="clock.fill" size={16} color="#FF6B35" />
        <ThemedText style={styles.simulationText}>
          Mode Simulasi: Pesanan otomatis berubah status (Dibayar → 1 menit → Dikirim → +2 menit → Selesai)
        </ThemedText>
        <View style={styles.buttonContainer}>
          <Pressable 
            style={styles.restartButton}
            onPress={() => {
              Alert.alert(
                'Restart Simulasi',
                'Reset semua pesanan ke status "Dibayar" dan mulai simulasi dari awal?',
                [
                  { text: 'Batal', style: 'cancel' },
                  { 
                    text: 'Restart', 
                    onPress: () => {
                      restartSimulation();
                      Alert.alert('Berhasil', 'Simulasi dimulai ulang! Tunggu 1 menit untuk melihat perubahan status.');
                    }
                  }
                ]
              );
            }}
          >
            <IconSymbol name="arrow.clockwise" size={14} color="#E65100" />
          </Pressable>
          
          <Pressable 
            style={styles.addTestButton}
            onPress={async () => {
              // Buat pesanan test baru
              const now = new Date();
              const testOrder = {
                orderId: `LB${Date.now()}`,
                date: now.toISOString(), // Gunakan format ISO untuk akurasi
                items: [{
                  id: 1,
                  name: 'Test Tumbler Simulasi',
                  image: 'tumbler cream.jpg',
                  price: 125000,
                  quantity: 1
                }],
                total: 125000,
                status: 'paid' as const,
                paymentMethod: 'Test Payment',
                shippingAddress: {
                  id: 'test-addr',
                  label: 'Test Address',
                  name: 'Test User',
                  phone: '+62812345678',
                  address: 'Test Address',
                  city: 'Test City',
                  postalCode: '12345',
                  isDefault: true
                }
              };
              
              await addOrderHistory(testOrder);
              Alert.alert('Berhasil', 'Pesanan test dibuat! Simulasi akan dimulai sekarang.');
            }}
          >
            <IconSymbol name="plus.circle.fill" size={14} color="#E65100" />
          </Pressable>
          
          <Pressable 
            style={styles.quickTestButton}
            onPress={async () => {
              // Buat pesanan test dengan timing cepat (30 detik)
              const testOrder = {
                orderId: `QUICK${Date.now()}`,
                date: new Date().toISOString(),
                items: [{
                  id: 1,
                  name: 'Quick Test (30s)',
                  image: 'tumbler cream.jpg',
                  price: 50000,
                  quantity: 1
                }],
                total: 50000,
                status: 'paid' as const,
                paymentMethod: 'Quick Test',
                shippingAddress: {
                  id: 'test-addr',
                  label: 'Test Address',
                  name: 'Test User',
                  phone: '+62812345678',
                  address: 'Test Address',
                  city: 'Test City',
                  postalCode: '12345',
                  isDefault: true
                }
              };
              
              await addOrderHistory(testOrder);
              Alert.alert('Quick Test', 'Pesanan test 30 detik dibuat! Akan berubah ke shipped dalam 30 detik.');
            }}
          >
            <ThemedText style={styles.quickTestText}>30s</ThemedText>
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {filteredOrders.length === 0 ? (
          /* Empty State */
          <View style={styles.emptyState}>
            <IconSymbol name="bag" size={80} color="#ccc" />
            <ThemedText style={styles.emptyTitle}>Belum Ada Pesanan</ThemedText>
            <ThemedText style={styles.emptySubtitle}>
              {selectedFilter === 'all' 
                ? 'Anda belum memiliki riwayat pesanan'
                : `Tidak ada pesanan dengan status ${filterOptions.find(f => f.value === selectedFilter)?.label.toLowerCase()}`
              }
            </ThemedText>
            <Pressable 
              style={styles.shopButton}
              onPress={() => router.push('/(tabs)/explore')}
            >
              <ThemedText style={styles.shopButtonText}>Mulai Belanja</ThemedText>
            </Pressable>
          </View>
        ) : (
          /* Order List */
          <View style={styles.orderList}>
            {filteredOrders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                {/* Order Header */}
                <View style={styles.orderHeader}>
                  <View style={styles.orderHeaderLeft}>
                    <ThemedText style={styles.orderId}>{order.orderId}</ThemedText>
                    <ThemedText style={styles.orderDate}>{formatOrderDate(order.date)}</ThemedText>
                  </View>
                  <View style={styles.statusContainer}>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(order.status) }
                    ]}>
                      <ThemedText style={styles.statusText}>
                        {getStatusLabel(order.status)}
                      </ThemedText>
                    </View>
                    
                    {/* Countdown Timer untuk Simulasi */}
                    {countdownTimers[order.orderId] > 0 && (
                      <View style={styles.countdownContainer}>
                        <ThemedText style={styles.countdownLabel}>
                          {order.status === 'paid' ? '🚚 Dikirim dalam' : '📦 Selesai dalam'}
                        </ThemedText>
                        <ThemedText style={styles.countdownTime}>
                          {formatCountdown(countdownTimers[order.orderId])}
                        </ThemedText>
                      </View>
                    )}
                  </View>
                </View>

                {/* Order Items */}
                <View style={styles.orderItems}>
                  {order.items.map((item, index) => (
                    <View key={index} style={styles.orderItem}>
                      <Image 
                        source={getImageSource(item.image)}
                        style={styles.itemImage} 
                      />
                      <View style={styles.itemDetails}>
                        <ThemedText style={styles.itemName}>{item.name}</ThemedText>
                        <ThemedText style={styles.itemPrice}>
                          Rp {item.price.toLocaleString('id-ID')} x {item.quantity}
                        </ThemedText>
                      </View>
                      <ThemedText style={styles.itemTotal}>
                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                      </ThemedText>
                    </View>
                  ))}
                </View>

                {/* Order Footer */}
                <View style={styles.orderFooter}>
                  <View style={styles.orderTotal}>
                    <ThemedText style={styles.totalLabel}>Total Pembayaran:</ThemedText>
                    <ThemedText style={styles.totalAmount}>
                      Rp {order.total.toLocaleString('id-ID')}
                    </ThemedText>
                  </View>
                  
                  {/* Action Buttons */}
                  <View style={styles.actionButtons}>
                    {order.status === 'shipped' && order.trackingNumber && (
                      <Pressable 
                        style={styles.trackButton}
                        onPress={() => handleTrackOrder(order.trackingNumber!, order.orderId)}
                      >
                        <IconSymbol name="location.fill" size={16} color="#fff" />
                        <ThemedText style={styles.trackButtonText}>
                          Lacak: {order.trackingNumber}
                        </ThemedText>
                      </Pressable>
                    )}
                    
                    {order.status === 'delivered' && (
                      <Pressable 
                        style={styles.reviewButton}
                        onPress={() => handleReviewOrder(order.orderId, order.items)}
                      >
                        <IconSymbol name="star.fill" size={16} color="#fff" />
                        <ThemedText style={styles.reviewButtonText}>Beri Review</ThemedText>
                      </Pressable>
                    )}
                    
                    <Pressable 
                      style={styles.detailButton}
                      onPress={() => handleViewOrderDetail(order)}
                    >
                      <ThemedText style={styles.detailButtonText}>Detail Pesanan</ThemedText>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
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
  clearButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
  },
  filterContainer: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterScrollContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterTabActive: {
    backgroundColor: '#DE8389',
    borderColor: '#DE8389',
  },
  filterTabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterTabTextActive: {
    color: '#fff',
    fontWeight: '600',
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
  shopButton: {
    backgroundColor: '#DE8389',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  orderList: {
    padding: 20,
    gap: 15,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  orderHeaderLeft: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  orderItems: {
    marginBottom: 15,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 12,
    color: '#666',
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DE8389',
  },
  orderFooter: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  orderTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 16,
    color: '#333',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DE8389',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9b59b6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  reviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f39c12',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  reviewButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  detailButton: {
    flex: 1,
    backgroundColor: '#DE8389',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  countdownContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  countdownLabel: {
    fontSize: 10,
    color: '#333',
    fontWeight: '500',
  },
  countdownTime: {
    fontSize: 12,
    color: '#DE8389',
    fontWeight: 'bold',
    marginTop: 2,
  },
  simulationBanner: {
    backgroundColor: '#FFF3E0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFB74D',
    gap: 10,
  },
  simulationText: {
    fontSize: 12,
    color: '#E65100',
    fontWeight: '600',
    flex: 1,
    lineHeight: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  restartButton: {
    backgroundColor: 'rgba(230, 81, 0, 0.1)',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E65100',
  },
  addTestButton: {
    backgroundColor: 'rgba(46, 125, 50, 0.1)',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2E7D32',
  },
  quickTestButton: {
    backgroundColor: 'rgba(255, 87, 34, 0.1)',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF5722',
    minWidth: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickTestText: {
    fontSize: 10,
    color: '#FF5722',
    fontWeight: '600',
  },
});