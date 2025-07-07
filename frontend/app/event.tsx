import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EventScreen() {
  const currentEvents = [
    {
      id: '1',
      title: 'Disney Collection Launch',
      subtitle: 'Koleksi Tumbler Disney Eksklusif',
      description: 'Dapatkan tumbler dengan karakter Disney favorit kamu! Limited edition hanya untuk bulan ini.',
      image: 'tumbler pink1.jpg',
      startDate: '1 Januari 2025',
      endDate: '31 Januari 2025',
      status: 'active',
      discount: '25%',
      products: [
        { name: 'Tumbler Mickey Mouse', price: 89000 },
        { name: 'Tumbler Princess Collection', price: 95000 },
        { name: 'Tumbler Toy Story', price: 85000 }
      ],
      badge: 'TRENDING'
    },
    {
      id: '2',
      title: 'Hot Wheels Speed Collection',
      subtitle: 'Tumbler untuk Para Pecinta Otomotif',
      description: 'Koleksi spesial untuk fans Hot Wheels! Design eksklusif dengan tema racing.',
      image: 'tumbler hijau2.jpg',
      startDate: '15 Januari 2025',
      endDate: '28 Februari 2025',
      status: 'active',
      discount: '30%',
      products: [
        { name: 'Tumbler Racing Edition', price: 92000 },
        { name: 'Tumbler Classic Cars', price: 88000 },
        { name: 'Tumbler Speed Demon', price: 96000 }
      ],
      badge: 'NEW'
    }
  ];

  const upcomingEvents = [
    {
      id: '3',
      title: 'Disney Summer Special',
      description: 'Koleksi musim panas dengan karakter Disney terbaru',
      startDate: '1 Juni 2025',
      teaser: 'Frozen, Moana, dan karakter summer lainnya!',
      image: 'tumbler ungu.jpg'
    },
    {
      id: '4',
      title: 'Hot Wheels Vintage Series',
      description: 'Tumbler dengan design retro Hot Wheels klasik',
      startDate: '15 Juli 2025',
      teaser: 'Classic cars dari era 70-80an!',
      image: 'tumbler khaki.jpg'
    }
  ];

  const pastEvents = [
    {
      id: '5',
      title: 'Disney Christmas 2024',
      description: 'Koleksi natal dengan karakter Disney dalam suasana winter',
      endDate: '25 Desember 2024',
      image: 'tumbler cream.jpg',
      status: 'completed'
    },
    {
      id: '6',
      title: 'Hot Wheels Halloween Edition',
      description: 'Tumbler dengan tema mobil-mobil spooky Hot Wheels',
      endDate: '31 Oktober 2024',
      image: 'tumbler oren.jpg',
      status: 'completed'
    }
  ];

  return (
    <LinearGradient
      colors={['#DE8389', '#B488BF']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Kembali</Text>
        </TouchableOpacity>
        <ThemedText style={styles.title}>Event Collection</ThemedText>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.heroSection}>
          <Text style={styles.heroEmoji}>🎉</Text>
          <ThemedText style={styles.heroTitle}>Event Koleksi Spesial</ThemedText>
          <Text style={styles.heroDesc}>
            Dapatkan tumbler limited edition Disney & Hot Wheels dengan tema-tema eksklusif
          </Text>
        </View>

        {/* Current Events */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>🔥 Event Berlangsung</ThemedText>
          {currentEvents.map((event) => (
            <View key={event.id} style={styles.eventCard}>
              <View style={styles.eventHeader}>
                <Image
                  source={require('@/assets/images/tumbler pink1.jpg')}
                  style={styles.eventImage}
                />
                <View style={styles.eventInfo}>
                  <View style={styles.badgeContainer}>
                    <View style={[styles.badge, event.badge === 'TRENDING' ? styles.trendingBadge : styles.newBadge]}>
                      <Text style={styles.badgeText}>{event.badge}</Text>
                    </View>
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>{event.discount} OFF</Text>
                    </View>
                  </View>
                  <ThemedText style={styles.eventTitle}>{event.title}</ThemedText>
                  <Text style={styles.eventSubtitle}>{event.subtitle}</Text>
                </View>
              </View>
              
              <Text style={styles.eventDescription}>{event.description}</Text>
              
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>📅 {event.startDate} - {event.endDate}</Text>
              </View>
              
              <View style={styles.productsContainer}>
                <Text style={styles.productsTitle}>🛍️ Produk Tersedia:</Text>
                {event.products.map((product, index) => (
                  <View key={index} style={styles.productItem}>
                    <Text style={styles.productName}>• {product.name}</Text>
                    <Text style={styles.productPrice}>Rp {product.price.toLocaleString()}</Text>
                  </View>
                ))}
              </View>
              
              <TouchableOpacity style={styles.shopButton}>
                <Text style={styles.shopButtonText}>🛒 Belanja Sekarang</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>⏰ Event Mendatang</ThemedText>
          {upcomingEvents.map((event) => (
            <View key={event.id} style={styles.upcomingCard}>
              <Image
                source={require('@/assets/images/tumbler ungu.jpg')}
                style={styles.upcomingImage}
              />
              <View style={styles.upcomingInfo}>
                <ThemedText style={styles.upcomingTitle}>{event.title}</ThemedText>
                <Text style={styles.upcomingDescription}>{event.description}</Text>
                <Text style={styles.upcomingTeaser}>{event.teaser}</Text>
                <Text style={styles.upcomingDate}>🗓️ Mulai: {event.startDate}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Past Events */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>📚 Event Sebelumnya</ThemedText>
          {pastEvents.map((event) => (
            <View key={event.id} style={styles.pastEventCard}>
              <Image
                source={require('@/assets/images/tumbler cream.jpg')}
                style={styles.pastEventImage}
              />
              <View style={styles.pastEventInfo}>
                <ThemedText style={styles.pastEventTitle}>{event.title}</ThemedText>
                <Text style={styles.pastEventDescription}>{event.description}</Text>
                <Text style={styles.pastEventDate}>✅ Selesai: {event.endDate}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  backText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
    marginRight: 80,
  },
  content: {
    flex: 1,
  },
  heroSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  heroEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  heroDesc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  eventCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#DE8389',
  },
  eventHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 15,
  },
  eventInfo: {
    flex: 1,
  },
  badgeContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 8,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  trendingBadge: {
    backgroundColor: '#ff6b6b',
  },
  newBadge: {
    backgroundColor: '#4ecdc4',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  discountBadge: {
    backgroundColor: '#ff9800',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  eventSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  eventDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 15,
  },
  dateContainer: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  productsContainer: {
    marginBottom: 15,
  },
  productsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  productName: {
    fontSize: 12,
    color: '#555',
    flex: 1,
  },
  productPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#DE8389',
  },
  shopButton: {
    backgroundColor: '#DE8389',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  upcomingCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    borderLeftWidth: 4,
    borderLeftColor: '#4ecdc4',
  },
  upcomingImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  upcomingInfo: {
    flex: 1,
  },
  upcomingTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  upcomingDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  upcomingTeaser: {
    fontSize: 11,
    color: '#4ecdc4',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  upcomingDate: {
    fontSize: 11,
    color: '#888',
  },
  pastEventCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    opacity: 0.8,
  },
  pastEventImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  pastEventInfo: {
    flex: 1,
  },
  pastEventTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 4,
  },
  pastEventDescription: {
    fontSize: 11,
    color: '#777',
    marginBottom: 4,
  },
  pastEventDate: {
    fontSize: 10,
    color: '#999',
  },
});
