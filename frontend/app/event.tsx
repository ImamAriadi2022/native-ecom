import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EventScreen() {
  // Image mapping untuk static imports
  const getImageSource = (imageName: string) => {
    const imageMap: { [key: string]: any } = {
      'tumbler cream.jpg': require('../assets/images/tumbler cream.jpg'),
      'tumbler pink1.jpg': require('../assets/images/tumbler pink1.jpg'),
      'tumbler hijau2.jpg': require('../assets/images/tumbler hijau2.jpg'),
      'tumbler ungu.jpg': require('../assets/images/tumbler ungu.jpg'),
      'tumbler oren.jpg': require('../assets/images/tumbler oren.jpg'),
      'tumbler khaki.jpg': require('../assets/images/tumbler khaki.jpg'),
      'kupu.png': require('../assets/images/kupu.png'),
      'monyet.png': require('../assets/images/monyet.png'),
      'meong.png': require('../assets/images/meong.png'),
      'jerapah.png': require('../assets/images/jerapah.png'),
      'react-logo.png': require('../assets/images/react-logo.png'),
      // Fallback untuk Disney images
      'disney1.jpeg': require('../assets/images/kupu.png'),
      'disney2.jpeg': require('../assets/images/monyet.png'),
      'disney3.jpeg': require('../assets/images/meong.png'),
      'disney4.jpeg': require('../assets/images/jerapah.png'),
      'disney5.jpeg': require('../assets/images/kupu.png'),
      'disney6.jpeg': require('../assets/images/monyet.png'),
      'tumbler biru tua.jpeg': require('../assets/images/tumbler cream.jpg'),
      'tumbler ungu pink.jpeg': require('../assets/images/tumbler ungu.jpg'),
    };
    return imageMap[imageName] || imageMap['react-logo.png'];
  };

  const currentEvents = [
    {
      id: '1',
      title: 'Disney Collection Launch',
      subtitle: 'Koleksi Tumbler Disney Eksklusif',
      description: 'Dapatkan tumbler dengan karakter Disney favorit kamu! Limited edition hanya untuk bulan ini.',
      image: 'disney1.jpeg',
      startDate: '1 Januari 2025',
      endDate: '31 Januari 2025',
      status: 'active',
      discount: '25%',
      products: [
        { name: 'Tumbler Mickey Mouse', price: 89000, image: 'disney2.jpeg' },
        { name: 'Tumbler Princess Collection', price: 95000, image: 'disney3.jpeg' },
        { name: 'Tumbler Toy Story', price: 85000, image: 'disney4.jpeg' }
      ],
      badge: 'TRENDING'
    },
    {
      id: '2',
      title: 'Hot Wheels Speed Collection',
      subtitle: 'Tumbler untuk Para Pecinta Otomotif',
      description: 'Koleksi spesial untuk fans Hot Wheels! Design eksklusif dengan tema racing.',
      image: 'tumbler biru tua.jpeg',
      startDate: '15 Januari 2025',
      endDate: '28 Februari 2025',
      status: 'active',
      discount: '30%',
      products: [
        { name: 'Tumbler Racing Edition', price: 92000, image: 'tumbler oren.jpg' },
        { name: 'Tumbler Classic Cars', price: 88000, image: 'tumbler khaki.jpg' },
        { name: 'Tumbler Speed Demon', price: 96000, image: 'tumbler ungu pink.jpeg' }
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
      image: 'disney5.jpeg'
    },
    {
      id: '4',
      title: 'Hot Wheels Vintage Series',
      description: 'Tumbler dengan design retro Hot Wheels klasik',
      startDate: '15 Juli 2025',
      teaser: 'Classic cars dari era 70-80an!',
      image: 'tumbler ungu pink.jpeg'
    }
  ];

  const pastEvents = [
    {
      id: '5',
      title: 'Disney Christmas 2024',
      description: 'Koleksi natal dengan karakter Disney dalam suasana winter',
      endDate: '25 Desember 2024',
      image: 'disney6.jpeg',
      status: 'completed'
    },
    {
      id: '6',
      title: 'Hot Wheels Halloween Edition',
      description: 'Tumbler dengan tema mobil-mobil spooky Hot Wheels',
      endDate: '31 Oktober 2024',
      image: 'tumbler biru tua.jpeg',
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
                  source={getImageSource(event.image)}
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
                    <Image 
                      source={getImageSource(product.image)} 
                      style={styles.productImage}
                    />
                    <View style={styles.productInfo}>
                      <Text style={styles.productName}>• {product.name}</Text>
                      <Text style={styles.productPrice}>Rp {product.price.toLocaleString()}</Text>
                    </View>
                  </View>
                ))}
              </View>
              
              <TouchableOpacity 
                style={styles.shopButton}
                onPress={() => router.push({
                  pathname: '/checkout',
                  params: {
                    name: `Event ${event.title}`,
                    price: event.products[0].price.toString(),
                    image: event.products[0].image,
                    description: `Produk special dari event ${event.title} dengan diskon ${event.discount}`,
                    type: 'event',
                    originalPrice: Math.round(event.products[0].price / (1 - parseInt(event.discount) / 100)).toString(),
                    savings: (Math.round(event.products[0].price / (1 - parseInt(event.discount) / 100)) - event.products[0].price).toString()
                  }
                })}
              >
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
                source={getImageSource(event.image)}
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
                source={getImageSource(event.image)}
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
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
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
    padding: 16,
    marginBottom: 16,
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
    marginBottom: 20,
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
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#DE8389',
  },
  eventHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  eventImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 12,
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
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 8,
  },
  productImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    padding: 12,
    marginBottom: 10,
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
    padding: 12,
    marginBottom: 10,
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
