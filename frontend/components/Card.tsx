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
      <Text style={styles.desc}>{desc}</Text>
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
    width: 180,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#eca8bb',
    paddingVertical: 6,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff5e4',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default ProductCard;
