import { useCart } from '@/app/CartContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';

type ProductCardProps = {
  id?: number;
  image: ImageSourcePropType; // bisa string (URL) atau require()
  judul: string;
  desc: string;
  harga: number;
  kategori?: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ id, image, judul, desc, harga, kategori = 'Tumbler' }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    // Generate unique ID if not provided
    const productId = id || Date.now() + Math.random();
    
    const product = {
      id: productId,
      image,
      judul,
      desc,
      harga,
      kategori
    };
    addToCart(product);
    Alert.alert(
      'Berhasil!', 
      `${judul} telah ditambahkan ke keranjang`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  const handleBuyNow = () => {
    // Create mapping of require() IDs to filenames
    let imageName = 'react-logo.png';
    
    if (typeof image === 'string') {
      imageName = image;
    } else {
      // Create a mapping object to get the ID of each image
      const imageIdMap: { [key: number]: string } = {};
      
      // Map numeric IDs to filenames
      imageIdMap[require('@/assets/images/tumbler oren.jpg')] = 'tumbler oren.jpg';
      imageIdMap[require('@/assets/images/tumbler ungu.jpg')] = 'tumbler ungu.jpg';
      imageIdMap[require('@/assets/images/tumbler pink1.jpg')] = 'tumbler pink1.jpg';
      imageIdMap[require('@/assets/images/tumbler hijau2.jpg')] = 'tumbler hijau2.jpg';
      imageIdMap[require('@/assets/images/tumbler khaki.jpg')] = 'tumbler khaki.jpg';
      imageIdMap[require('@/assets/images/tumbler cream.jpg')] = 'tumbler cream.jpg';
      imageIdMap[require('@/assets/images/tumbler biru tua.jpeg')] = 'tumbler biru tua.jpeg';
      imageIdMap[require('@/assets/images/tumbler ungu pink.jpeg')] = 'tumbler ungu pink.jpeg';
      imageIdMap[require('@/assets/images/gantungan1.jpg')] = 'gantungan1.jpg';
      imageIdMap[require('@/assets/images/gantungan2.jpg')] = 'gantungan2.jpg';
      imageIdMap[require('@/assets/images/gantungan3.jpg')] = 'gantungan3.jpg';
      imageIdMap[require('@/assets/images/gantungan4.jpg')] = 'gantungan4.jpg';
      imageIdMap[require('@/assets/images/gantungan5.jpg')] = 'gantungan5.jpg';
      imageIdMap[require('@/assets/images/bundling1.jpg')] = 'bundling1.jpg';
      imageIdMap[require('@/assets/images/bundling2.jpg')] = 'bundling2.jpg';
      imageIdMap[require('@/assets/images/bundling3.jpg')] = 'bundling3.jpg';
      imageIdMap[require('@/assets/images/custom1.jpeg')] = 'custom1.jpeg';
      imageIdMap[require('@/assets/images/custom2.jpeg')] = 'custom2.jpeg';
      imageIdMap[require('@/assets/images/custom3.jpeg')] = 'custom3.jpeg';
      imageIdMap[require('@/assets/images/disney1.jpeg')] = 'disney1.jpeg';
      imageIdMap[require('@/assets/images/disney2.jpeg')] = 'disney2.jpeg';
      imageIdMap[require('@/assets/images/disney3.jpeg')] = 'disney3.jpeg';
      imageIdMap[require('@/assets/images/disney4.jpeg')] = 'disney4.jpeg';
      imageIdMap[require('@/assets/images/disney5.jpeg')] = 'disney5.jpeg';
      imageIdMap[require('@/assets/images/disney6.jpeg')] = 'disney6.jpeg';
      imageIdMap[require('@/assets/images/masseto.jpg')] = 'masseto.jpg';
      
      const imageId = Number(image);
      console.log('Processing image ID:', imageId); // Debug log
      
      imageName = imageIdMap[imageId] || 'react-logo.png';
    }
    
    console.log('Final image name:', imageName); // Debug log

    router.push({
      pathname: '/checkout',
      params: {
        name: judul,
        price: harga.toString(),
        description: desc,
        image: imageName
      }
    });
  };

  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{judul}</Text>
      <Text style={styles.desc} numberOfLines={2} ellipsizeMode="tail">{desc}</Text>
      <Text style={styles.price}>Rp {harga.toLocaleString('id-ID')}</Text>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartButtonText}>+ Keranjang</Text>
        </Pressable>
        <Pressable style={styles.buyNowButton} onPress={handleBuyNow}>
          <Text style={styles.buyNowButtonText}>Beli Sekarang</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  desc: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#e74c3c',
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  addToCartButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DE8389',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#DE8389',
    fontSize: 11,
    fontWeight: '600',
  },
  buyNowButton: {
    backgroundColor: '#DE8389',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyNowButtonText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
});

export default ProductCard;
