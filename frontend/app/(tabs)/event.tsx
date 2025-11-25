import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function EventScreen() {
  const router = useRouter();
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;

  const events = [
    {
      id: 1,
      title: 'Flash Sale Weekend',
      date: '25-27 November 2024',
      description: 'Diskon hingga 70% untuk semua produk tumbler favorit',
      status: 'Berlangsung',
      color: '#FF6B6B',
      icon: '🎉'
    },
    {
      id: 2,
      title: 'Custom Design Contest',
      date: '1-15 Desember 2024', 
      description: 'Menangkan tumbler custom gratis dengan desain terbaik',
      status: 'Segera',
      color: '#4ECDC4',
      icon: '🏆'
    },
    {
      id: 3,
      title: 'Holiday Bundle Special',
      date: '20-31 Desember 2024',
      description: 'Paket bundling spesial untuk hadiah liburan',
      status: 'Segera', 
      color: '#45B7D1',
      icon: '🎁'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % events.length);
    }, 4000); // Auto slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>Event & Promo</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Jangan lewatkan kesempatan emas!</ThemedText>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Featured Event Hero */}
        <View style={styles.heroSection}>
          <View style={[styles.heroCard, { backgroundColor: events[currentEventIndex].color }]}>
            <View style={styles.heroContent}>
              <ThemedText style={styles.heroIcon}>{events[currentEventIndex].icon}</ThemedText>
              <ThemedText style={styles.heroTitle}>{events[currentEventIndex].title}</ThemedText>
              <ThemedText style={styles.heroDate}>📅 {events[currentEventIndex].date}</ThemedText>
              <ThemedText style={styles.heroDescription}>{events[currentEventIndex].description}</ThemedText>
              
              <Pressable style={styles.heroButton}>
                <ThemedText style={styles.heroButtonText}>Lihat Detail</ThemedText>
                <IconSymbol name="chevron.right" size={16} color="#fff" />
              </Pressable>
            </View>
            
            <View style={[styles.heroStatus, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}>
              <ThemedText style={styles.heroStatusText}>{events[currentEventIndex].status}</ThemedText>
            </View>
          </View>
          
          {/* Event Indicators */}
          <View style={styles.eventIndicators}>
            {events.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.eventIndicator,
                  currentEventIndex === index && styles.eventIndicatorActive
                ]}
              />
            ))}
          </View>
        </View>

        {/* All Events List */}
        <View style={styles.eventsSection}>
          <ThemedText style={styles.sectionTitle}>Semua Event</ThemedText>
          {events.map((event) => (
            <View key={event.id} style={styles.eventCard}>
              <View style={styles.eventHeader}>
                <View style={[styles.eventIconContainer, { backgroundColor: event.color }]}>
                  <ThemedText style={styles.eventCardIcon}>{event.icon}</ThemedText>
                </View>
                <View style={styles.eventInfo}>
                  <ThemedText style={styles.eventTitle}>{event.title}</ThemedText>
                  <ThemedText style={styles.eventDate}>{event.date}</ThemedText>
                </View>
                <View style={[styles.eventStatusBadge, { backgroundColor: event.color }]}>
                  <ThemedText style={styles.eventStatusText}>{event.status}</ThemedText>
                </View>
              </View>
              
              <ThemedText style={styles.eventDescription}>{event.description}</ThemedText>
              
              <Pressable style={[styles.eventButton, { borderColor: event.color }]}>
                <ThemedText style={[styles.eventButtonText, { color: event.color }]}>
                  Lihat Detail
                </ThemedText>
              </Pressable>
            </View>
          ))}
        </View>

        {/* Newsletter Signup */}
        <View style={styles.newsletterSection}>
          <ThemedText style={styles.newsletterTitle}>📬 Dapatkan Update Event</ThemedText>
          <ThemedText style={styles.newsletterSubtitle}>
            Jadilah yang pertama tahu tentang event dan promo terbaru dari Lyana Bottle Studio
          </ThemedText>
          <Pressable style={styles.newsletterButton}>
            <ThemedText style={styles.newsletterButtonText}>Daftar Newsletter</ThemedText>
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
  header: {
    backgroundColor: '#DE8389',
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },
  scrollContainer: {
    flex: 1,
  },
  heroSection: {
    padding: 20,
    paddingTop: 0,
  },
  heroCard: {
    borderRadius: 20,
    padding: 25,
    marginTop: -30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    position: 'relative',
  },
  heroContent: {
    alignItems: 'center',
  },
  heroIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroDate: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 10,
  },
  heroDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    gap: 8,
  },
  heroButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  heroStatus: {
    position: 'absolute',
    top: 15,
    right: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  heroStatusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  eventIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    gap: 8,
  },
  eventIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
  },
  eventIndicatorActive: {
    backgroundColor: '#DE8389',
    width: 24,
  },
  eventsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  eventCardIcon: {
    fontSize: 24,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 12,
    color: '#666',
  },
  eventStatusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  eventStatusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  eventDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 15,
  },
  eventButton: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  eventButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  newsletterSection: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  newsletterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  newsletterSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  newsletterButton: {
    backgroundColor: '#DE8389',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  newsletterButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});