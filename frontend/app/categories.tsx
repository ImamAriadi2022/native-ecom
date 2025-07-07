import ProductCard from '@/components/Card';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

type Category = {
  id: string;
  name: string;
  icon: string;
  count: number;
};

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: any;
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
};

const categories: Category[] = [
  { id: 'all', name: 'Semua', icon: '🏪', count: 12 },
  { id: 'tumbler', name: 'Tumbler', icon: '🥤', count: 8 },
  { id: 'accessories', name: 'Aksesoris', icon: '🎪', count: 4 },
  { id: 'limited', name: 'Limited Edition', icon: '⭐', count: 3 },
  { id: 'bundle', name: 'Bundling', icon: '🎁', count: 2 },
];

const products: Product[] = [
  {
    id: 1,
    name: "Blush Aura",
    price: 299000,
    description: "Sentuhan manis warna blush yang memancarkan kehangatan dan keceriaan",
    image: require('@/assets/images/tumbler oren.jpg'),
    category: 'tumbler',
    isBestseller: true
  },
  {
    id: 2,
    name: "Luna Frost",
    price: 249000,
    description: "Tumbler dengan warna lilac lembut dengan aksen ungu pastel",
    image: require('@/assets/images/tumbler ungu.jpg'),
    category: 'tumbler'
  },
  {
    id: 3,
    name: "Pink Reverie",
    price: 299000,
    description: "Paduan warna pastel yang menggambarkan impian dan kelembutan",
    image: require('@/assets/images/tumbler pink1.jpg'),
    category: 'tumbler',
    isNew: true
  },
  {
    id: 4,
    name: "Sage Calm",
    price: 279000,
    description: "Desain simple dan bernuansa alami",
    image: require('@/assets/images/tumbler hijau2.jpg'),
    category: 'tumbler'
  },
  {
    id: 5,
    name: "Dusk Mocha",
    price: 279000,
    description: "Hangat dan netral dengan warna kopi susu yang elegan",
    image: require('@/assets/images/tumbler khaki.jpg'),
    category: 'tumbler'
  },
  {
    id: 6,
    name: "Rose Glow",
    price: 45000,
    description: "Gantungan tumbler dengan desain rose yang cantik",
    image: require('@/assets/images/gantungan1.jpg'),
    category: 'accessories'
  },
  {
    id: 7,
    name: "Amber Pop",
    price: 45000,
    description: "Gantungan tumbler warna amber yang eye-catching",
    image: require('@/assets/images/gantungan2.jpg'),
    category: 'accessories'
  },
  {
    id: 8,
    name: "Bundle Starter Pack",
    price: 350000,
    description: "Paket tumbler + 2 gantungan + pouch cantik",
    image: require('@/assets/images/tumbler oren.jpg'),
    category: 'bundle',
    isNew: true
  }
];

export default function CategoryScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const filteredProducts = products.filter(product => 
    selectedCategory === 'all' || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <LinearGradient
      colors={['#DE8389', '#B488BF']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <ThemedText style={styles.backText}>← Kembali</ThemedText>
            </Pressable>
            <ThemedText type="title" style={styles.title}>
              Kategori Produk
            </ThemedText>
            <View style={styles.headerSpacer} />
          </View>

          {/* Categories */}
          <View style={styles.categoriesSection}>
            <ThemedText style={styles.sectionTitle}>Pilih Kategori</ThemedText>
            <ScrollView 
              horizontal 
              style={styles.categoriesScroll}
              showsHorizontalScrollIndicator={false}
            >
              {categories.map((category) => (
                <Pressable
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category.id && styles.categoryButtonActive
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <ThemedText style={styles.categoryIcon}>{category.icon}</ThemedText>
                  <ThemedText style={[
                    styles.categoryName,
                    selectedCategory === category.id && styles.categoryNameActive
                  ]}>
                    {category.name}
                  </ThemedText>
                  <ThemedText style={[
                    styles.categoryCount,
                    selectedCategory === category.id && styles.categoryCountActive
                  ]}>
                    {category.count} produk
                  </ThemedText>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Sort & Filter */}
          <View style={styles.sortSection}>
            <ThemedText style={styles.sortLabel}>Urutkan:</ThemedText>
            <ScrollView 
              horizontal 
              style={styles.sortOptions}
              showsHorizontalScrollIndicator={false}
            >
              <Pressable
                style={[styles.sortButton, sortBy === 'default' && styles.sortButtonActive]}
                onPress={() => setSortBy('default')}
              >
                <ThemedText style={[
                  styles.sortButtonText,
                  sortBy === 'default' && styles.sortButtonTextActive
                ]}>
                  Default
                </ThemedText>
              </Pressable>
              <Pressable
                style={[styles.sortButton, sortBy === 'price-low' && styles.sortButtonActive]}
                onPress={() => setSortBy('price-low')}
              >
                <ThemedText style={[
                  styles.sortButtonText,
                  sortBy === 'price-low' && styles.sortButtonTextActive
                ]}>
                  Harga Terendah
                </ThemedText>
              </Pressable>
              <Pressable
                style={[styles.sortButton, sortBy === 'price-high' && styles.sortButtonActive]}
                onPress={() => setSortBy('price-high')}
              >
                <ThemedText style={[
                  styles.sortButtonText,
                  sortBy === 'price-high' && styles.sortButtonTextActive
                ]}>
                  Harga Tertinggi
                </ThemedText>
              </Pressable>
              <Pressable
                style={[styles.sortButton, sortBy === 'name' && styles.sortButtonActive]}
                onPress={() => setSortBy('name')}
              >
                <ThemedText style={[
                  styles.sortButtonText,
                  sortBy === 'name' && styles.sortButtonTextActive
                ]}>
                  Nama A-Z
                </ThemedText>
              </Pressable>
            </ScrollView>
          </View>

          {/* Products Grid */}
          <View style={styles.productsSection}>
            <ThemedText style={styles.sectionTitle}>
              {selectedCategory === 'all' ? 'Semua Produk' : categories.find(c => c.id === selectedCategory)?.name} 
              ({sortedProducts.length} produk)
            </ThemedText>
            
            <View style={styles.productsGrid}>
              {sortedProducts.map((product) => (
                <View key={product.id} style={styles.productContainer}>
                  {product.isNew && (
                    <View style={styles.newBadge}>
                      <ThemedText style={styles.badgeText}>NEW</ThemedText>
                    </View>
                  )}
                  {product.isBestseller && (
                    <View style={styles.bestsellerBadge}>
                      <ThemedText style={styles.badgeText}>BEST</ThemedText>
                    </View>
                  )}
                  <ProductCard
                    image={product.image}
                    judul={product.name}
                    desc={product.description}
                    harga={product.price}
                  />
                </View>
              ))}
            </View>
          </View>
        </ThemedView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    padding: 20,
    backgroundColor: 'transparent',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerSpacer: {
    width: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  categoriesSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  categoriesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  categoryButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 15,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 100,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryButtonActive: {
    backgroundColor: '#fff',
    borderColor: '#DE8389',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  categoryNameActive: {
    color: '#DE8389',
  },
  categoryCount: {
    fontSize: 12,
    color: '#666',
  },
  categoryCountActive: {
    color: '#DE8389',
  },
  sortSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  sortLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  sortOptions: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  sortButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  sortButtonActive: {
    backgroundColor: '#DE8389',
  },
  sortButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  sortButtonTextActive: {
    color: '#fff',
  },
  productsSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  productContainer: {
    position: 'relative',
    width: '48%',
  },
  newBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 1,
  },
  bestsellerBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF9800',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 1,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
});
