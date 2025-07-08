# CART CHECKOUT BUG FIX

## Masalah yang Diperbaiki:
Sebelumnya, ketika user melakukan checkout dari halaman cart (misalnya total Rp 300.000), harga di halaman checkout tidak sesuai karena data cart tidak di-pass dengan benar.

## Solusi yang Diimplementasikan:

### 1. Update cart.tsx - Kirim Data Cart Lengkap
**Lokasi**: `app/cart.tsx` - bagian checkout button

**Perubahan**:
```tsx
// SEBELUM: Hanya navigasi sederhana
onPress={() => router.push('/checkout')}

// SESUDAH: Kirim data cart lengkap
onPress={() => {
  const cartData = {
    items: cartItems,
    subtotal: totalPrice,
    shipping: 15000,
    service: 2000,
    total: totalPrice + 15000 + 2000,
    itemCount: totalItems
  };
  
  router.push({
    pathname: '/checkout',
    params: {
      type: 'cart',
      cartData: JSON.stringify(cartData),
      name: `${totalItems} Item Keranjang`,
      price: (totalPrice + 15000 + 2000).toString(),
      description: `Checkout ${totalItems} item dari keranjang belanja`
    }
  });
}}
```

### 2. Update checkout.tsx - Handle Data Cart
**Lokasi**: `app/checkout.tsx`

**Perubahan**:

#### A. Parse Data Cart
```tsx
// Parse cart data jika ada
const cartData = params.cartData ? JSON.parse(params.cartData as string) : null;
const isCartCheckout = params.type === 'cart' && cartData;
```

#### B. Perhitungan Harga yang Benar
```tsx
// Perhitungan harga berdasarkan tipe checkout
let subtotal, shippingCost, serviceCost, total;

if (isCartCheckout) {
  // Untuk checkout dari cart, gunakan data cart
  subtotal = cartData.subtotal;
  shippingCost = cartData.shipping;
  serviceCost = cartData.service;
  total = cartData.total;
} else {
  // Untuk checkout produk individual
  subtotal = productData.price * quantity;
  shippingCost = 15000;
  serviceCost = 0;
  total = subtotal + shippingCost + serviceCost;
}
```

#### C. Tampilan Item Cart
```tsx
{isCartCheckout ? (
  // Tampilkan semua item dari cart
  <View>
    {cartData.items.map((item: any) => (
      <View key={item.id} style={styles.cartItemCard}>
        <Image source={getImageSource(item.image)} style={styles.cartItemImage} />
        <View style={styles.cartItemInfo}>
          <ThemedText style={styles.cartItemName}>{item.name}</ThemedText>
          <ThemedText style={styles.cartItemVariant}>{item.variant}</ThemedText>
          <ThemedText style={styles.cartItemPrice}>
            Rp {item.price.toLocaleString('id-ID')} x {item.quantity}
          </ThemedText>
        </View>
        <ThemedText style={styles.cartItemTotal}>
          Rp {(item.price * item.quantity).toLocaleString('id-ID')}
        </ThemedText>
      </View>
    ))}
  </View>
) : (
  // Tampilkan produk individual seperti biasa
  ...
)}
```

#### D. Rincian Pembayaran yang Akurat
```tsx
<View style={styles.summaryRow}>
  <ThemedText style={styles.summaryLabel}>
    Subtotal ({isCartCheckout ? cartData.itemCount : quantity} item)
  </ThemedText>
  <ThemedText style={styles.summaryValue}>
    Rp {subtotal.toLocaleString('id-ID')}
  </ThemedText>
</View>

// Tampilkan biaya layanan hanya untuk cart checkout
{isCartCheckout && serviceCost > 0 && (
  <View style={styles.summaryRow}>
    <ThemedText style={styles.summaryLabel}>Biaya Layanan</ThemedText>
    <ThemedText style={styles.summaryValue}>
      Rp {serviceCost.toLocaleString('id-ID')}
    </ThemedText>
  </View>
)}
```

#### E. Style Baru untuk Cart Items
```tsx
cartItemCard: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#f8f9fa',
  borderRadius: 12,
  padding: 12,
  marginBottom: 10,
  borderLeftWidth: 3,
  borderLeftColor: '#DE8389',
},
cartItemImage: {
  width: 50,
  height: 50,
  borderRadius: 8,
  marginRight: 12,
},
// ... dan style lainnya untuk cart items
```

## Hasil:
✅ **Total harga di halaman checkout sekarang sesuai dengan total di halaman cart**
✅ **Menampilkan semua item yang ada di cart dengan detail (nama, variant, harga, quantity)**
✅ **Perhitungan subtotal, ongkir, biaya layanan, dan total yang akurat**
✅ **Quantity selector hanya muncul untuk checkout produk individual (bukan cart)**
✅ **Mendukung dual mode: checkout cart dan checkout produk individual**

## Testing:
1. Tambahkan beberapa produk ke cart
2. Lihat total di halaman cart (misal: Rp 300.000)
3. Klik "Checkout"
4. Verifikasi total di halaman checkout sama dengan cart (Rp 300.000)
5. Lihat semua item cart ditampilkan dengan benar

## Files Modified:
- `app/cart.tsx` - Update checkout navigation dengan data lengkap
- `app/checkout.tsx` - Handle cart data dan tampilan item cart

Bug checkout dari cart telah berhasil diperbaiki! 🎉
