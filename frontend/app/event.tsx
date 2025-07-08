import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EventScreen() {
  const [selectedProducts, setSelectedProducts] = useState<{[eventId: string]: {[productId: string]: number}}>({});

  // Image mapping untuk static imports
  const getImageSource = (imageName: string) => {
    const imageMap: { [key: string]: any } = {
      'disney1.jpeg': require('../assets/images/disney1.jpeg'),
      'disney2.jpeg': require('../assets/images/disney2.jpeg'),
      'disney3.jpeg': require('../assets/images/disney3.jpeg'),
      'disney4.jpeg': require('../assets/images/disney4.jpeg'),
      'disney5.jpeg': require('../assets/images/disney5.jpeg'),
      'disney6.jpeg': require('../assets/images/disney6.jpeg'),
      'react-logo.png': require('../assets/images/react-logo.png'),
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
      endDate: '31 Maret 2025',
      status: 'active',
      discount: '25%',
      products: [
        { id: 'mickey', name: 'Tumbler Mickey Mouse', price: 89000, image: 'disney2.jpeg' },
        { id: 'princess', name: 'Tumbler Princess Collection', price: 95000, image: 'disney3.jpeg' },
        { id: 'toystory', name: 'Tumbler Toy Story', price: 85000, image: 'disney4.jpeg' },
        { id: 'frozen', name: 'Tumbler Frozen Special', price: 92000, image: 'disney5.jpeg' },
        { id: 'marvel', name: 'Tumbler Marvel Heroes', price: 98000, image: 'disney6.jpeg' }
      ],
      badge: 'TRENDING'
    },
    {
      id: '2',
      title: 'Disney Spring Festival',
      subtitle: 'Koleksi Musim Semi Disney',
      description: 'Rayakan musim semi dengan tumbler Disney bertema bunga dan alam! Koleksi terbatas dengan design eksklusif.',
      image: 'disney2.jpeg',
      startDate: '15 Maret 2025',
      endDate: '30 Juni 2025',
      status: 'active',
      discount: '20%',
      products: [
        { id: 'bambi', name: 'Tumbler Bambi Garden', price: 87000, image: 'disney1.jpeg' },
        { id: 'tinkerbell', name: 'Tumbler Tinker Bell', price: 91000, image: 'disney3.jpeg' },
        { id: 'moana', name: 'Tumbler Moana Ocean', price: 94000, image: 'disney5.jpeg' }
      ],
      badge: 'NEW'
    }
  ];

  const upcomingEvents = [
    {
      id: '3',
      title: 'Disney Summer Special',
      description: 'Koleksi musim panas dengan karakter Disney terbaru',
      startDate: '1 Juli 2025',
      teaser: 'Frozen, Moana, dan karakter summer lainnya!',
      image: 'disney4.jpeg'
    },
    {
      id: '4',
      title: 'Disney Halloween Magic',
      description: 'Tumbler Disney dengan tema Halloween yang magis',
      startDate: '15 Oktober 2025',
      teaser: 'Villains collection dan karakter spooky!',
      image: 'disney6.jpeg'
    }
  ];

  const pastEvents = [
    {
      id: '5',
      title: 'Disney Christmas 2024',
      description: 'Koleksi natal dengan karakter Disney dalam suasana winter',
      endDate: '25 Desember 2024',
      image: 'disney5.jpeg',
      status: 'completed'
    },
    {
      id: '6',
      title: 'Disney Valentine Special',
      description: 'Tumbler Disney bertema cinta dan valentine',
      endDate: '14 Februari 2025',
      image: 'disney3.jpeg',
      status: 'completed'
    }
  ];

  const updateProductQuantity = (eventId: string, productId: string, quantity: number) => {
    setSelectedProducts(prev => ({
      ...prev,
      [eventId]: {
        ...prev[eventId],
        [productId]: Math.max(0, quantity)
      }
    }));
  };

  const getSelectedProductsForEvent = (eventId: string) => {
    return selectedProducts[eventId] || {};
  };

  const getTotalSelectedForEvent = (eventId: string) => {
    const products = getSelectedProductsForEvent(eventId);
    return Object.values(products).reduce((sum, qty) => sum + qty, 0);
  };

  const proceedToCheckout = (event: any) => {
    const selected = getSelectedProductsForEvent(event.id);
    const selectedItems = Object.entries(selected)
      .filter(([_, qty]) => qty > 0)
      .map(([productId, qty]) => {
        const product = event.products.find((p: any) => p.id === productId);
        return { ...product, quantity: qty };
      });

    if (selectedItems.length === 0) {
      Alert.alert('Pilih Produk', 'Silakan pilih minimal 1 produk untuk checkout');
      return;
    }

    const totalPrice = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountedPrice = Math.round(totalPrice * (1 - parseInt(event.discount) / 100));
    const savings = totalPrice - discountedPrice;

    router.push({
      pathname: '/checkout',
      params: {
        name: `Event ${event.title}`,
        price: discountedPrice.toString(),
        image: event.image,
        description: `${selectedItems.length} produk dari event ${event.title} dengan diskon ${event.discount}`,
        type: 'event',
        originalPrice: totalPrice.toString(),
        savings: savings.toString(),
        items: JSON.stringify(selectedItems)
      }
    });
  };

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
          <ThemedText style={styles.heroTitle}>Event Koleksi Disney</ThemedText>
          <Text style={styles.heroDesc}>
            Dapatkan tumbler limited edition Disney dengan karakter favorit dan tema-tema eksklusif sepanjang tahun
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
                  <View key={product.id} style={styles.productItem}>
                    <Image 
                      source={getImageSource(product.image)} 
                      style={styles.productImage}
                    />
                    <View style={styles.productInfo}>
                      <Text style={styles.productName}>{product.name}</Text>
                      <Text style={styles.productPrice}>Rp {product.price.toLocaleString()}</Text>
                    </View>
                    <View style={styles.quantityControls}>
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => updateProductQuantity(event.id, product.id, (getSelectedProductsForEvent(event.id)[product.id] || 0) - 1)}
                      >
                        <Text style={styles.quantityButtonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>
                        {getSelectedProductsForEvent(event.id)[product.id] || 0}
                      </Text>
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => updateProductQuantity(event.id, product.id, (getSelectedProductsForEvent(event.id)[product.id] || 0) + 1)}
                      >
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
              
              <View style={styles.checkoutSection}>
                <Text style={styles.totalSelected}>
                  Total dipilih: {getTotalSelectedForEvent(event.id)} produk
                </Text>
                <TouchableOpacity 
                  style={[styles.shopButton, getTotalSelectedForEvent(event.id) === 0 && styles.shopButtonDisabled]}
                  onPress={() => proceedToCheckout(event)}
                >
                  <Text style={styles.shopButtonText}>
                    🛒 {getTotalSelectedForEvent(event.id) > 0 ? 'Checkout Sekarang' : 'Pilih Produk Dulu'}
                  </Text>
                </TouchableOpacity>
              </View>
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
  },
  productName: {
    fontSize: 12,
    color: '#555',
    marginBottom: 2,
  },
  productPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#DE8389',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  quantityButton: {
    backgroundColor: '#DE8389',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  checkoutSection: {
    backgroundColor: 'rgba(222, 131, 137, 0.1)',
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
  },
  totalSelected: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  shopButton: {
    backgroundColor: '#DE8389',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  shopButtonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.6,
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
