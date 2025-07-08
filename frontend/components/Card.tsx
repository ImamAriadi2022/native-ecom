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
    router.push({
      pathname: '/checkout',
      params: {
        name: judul,
        price: harga.toString(),
        description: desc,
        image: typeof image === 'string' ? image : 'local_image'
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
