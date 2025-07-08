import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';

type ProductCardProps = {
  image: ImageSourcePropType; // bisa string (URL) atau require()
  judul: string;
  desc: string;
  harga: number;
};

const ProductCard: React.FC<ProductCardProps> = ({ image, judul, desc, harga }) => {
  const router = useRouter();
  
  const handleCheckout = () => {
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
      <Pressable style={styles.button} onPress={handleCheckout}>
        <Text style={styles.buttonText}>Checkout</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    flex: 1,
    marginRight: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  desc: {
    fontSize: 11,
    color: '#666',
    marginBottom: 6,
    lineHeight: 16,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#e74c3c',
  },
  button: {
    backgroundColor: '#eca8bb',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff5e4',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 13,
  },
});

export default ProductCard;
