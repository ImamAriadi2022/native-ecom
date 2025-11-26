import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CustomTumblerScreen() {
  // Image mapping untuk static imports
  const getImageSource = (imageName: string) => {
    const imageMap: { [key: string]: any } = {
      'tumbler cream.jpg': require('../assets/images/tumbler cream.jpg'),
      'tumbler pink1.jpg': require('../assets/images/tumbler pink1.jpg'),
      'tumbler hijau2.jpg': require('../assets/images/tumbler hijau2.jpg'),
      'tumbler ungu.jpg': require('../assets/images/tumbler ungu.jpg'),
      'tumbler oren.jpg': require('../assets/images/tumbler oren.jpg'),
      'tumbler khaki.jpg': require('../assets/images/tumbler khaki.jpg'),
      'tumbler biru tua.jpeg': require('../assets/images/tumbler biru tua.jpeg'),
      'tumbler ungu pink.jpeg': require('../assets/images/tumbler ungu pink.jpeg'),
      'custom1.jpeg': require('../assets/images/custom1.jpeg'),
      'custom2.jpeg': require('../assets/images/custom2.jpeg'),
      'custom3.jpeg': require('../assets/images/custom3.jpeg'),
    };
    return imageMap[imageName] || imageMap['custom1.jpeg'];
  };

  const [selectedSize, setSelectedSize] = useState('500ml');
  const [selectedColor, setSelectedColor] = useState('custom1');
  const [selectedDesign, setSelectedDesign] = useState('plain');
  const [customText, setCustomText] = useState('');
  const [selectedFont, setSelectedFont] = useState('modern');

  const sizes = [
    { id: '500ml', name: '500ml', price: 0, description: 'Standard size' },
    { id: '750ml', name: '750ml', price: 15000, description: 'Large size' },
    { id: '1000ml', name: '1000ml', price: 25000, description: 'Extra large size' }
  ];

  const colors = [
    { id: 'custom1', name: 'Custom Design 1', hex: '#f5f5dc', image: 'custom1.jpeg' },
    { id: 'custom2', name: 'Custom Design 2', hex: '#ffc0cb', image: 'custom2.jpeg' },
    { id: 'custom3', name: 'Custom Design 3', hex: '#90ee90', image: 'custom3.jpeg' },
    { id: 'cream', name: 'Cream', hex: '#f5f5dc', image: 'tumbler cream.jpg' },
    { id: 'pink', name: 'Pink', hex: '#ffc0cb', image: 'tumbler pink1.jpg' },
    { id: 'green', name: 'Green', hex: '#90ee90', image: 'tumbler hijau2.jpg' },
    { id: 'purple', name: 'Purple', hex: '#dda0dd', image: 'tumbler ungu.jpg' },
    { id: 'orange', name: 'Orange', hex: '#ffa500', image: 'tumbler oren.jpg' }
  ];

  const designs = [
    { id: 'plain', name: 'Polos', price: 0, description: 'Tanpa motif tambahan' },
    { id: 'gradient', name: 'Gradient', price: 15000, description: 'Efek warna gradasi' },
    { id: 'pattern', name: 'Pattern', price: 20000, description: 'Motif geometris' },
    { id: 'marble', name: 'Marble', price: 25000, description: 'Efek marmer elegan' },
    { id: 'galaxy', name: 'Galaxy', price: 30000, description: 'Motif galaksi sparkling' }
  ];

  const fonts = [
    { id: 'modern', name: 'Modern Sans', preview: 'Aa', style: 'bold' },
    { id: 'script', name: 'Script Elegant', preview: 'Aa', style: 'italic' },
    { id: 'vintage', name: 'Vintage Serif', preview: 'Aa', style: 'serif' },
    { id: 'handwritten', name: 'Handwritten', preview: 'Aa', style: 'cursive' }
  ];

  const calculatePrice = () => {
    const basePrice = 65000;
    const sizePrice = sizes.find(s => s.id === selectedSize)?.price || 0;
    const designPrice = designs.find(d => d.id === selectedDesign)?.price || 0;
    const textPrice = customText ? 10000 : 0;
    
    return basePrice + sizePrice + designPrice + textPrice;
  };

  const getSelectedColor = () => colors.find(c => c.id === selectedColor);
  const getSelectedDesign = () => designs.find(d => d.id === selectedDesign);
  const getSelectedSize = () => sizes.find(s => s.id === selectedSize);

  return (
    <View style={[styles.container, styles.gradientBackground]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Kembali</Text>
        </TouchableOpacity>
        <ThemedText style={styles.title}>Custom Tumbler</ThemedText>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.previewSection}>
          <ThemedText style={styles.sectionTitle}>Preview</ThemedText>
          <View style={styles.previewContainer}>
            <Image 
              source={getImageSource(getSelectedColor()?.image || 'custom1.jpeg')} 
              style={styles.previewImage}
            />
            <View style={styles.previewOverlay}>
              <Text style={styles.previewText}>{customText || 'Your Text Here'}</Text>
            </View>
            <View style={styles.previewInfo}>
              <Text style={styles.previewSize}>{selectedSize}</Text>
              <Text style={styles.previewDesign}>{getSelectedDesign()?.name}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Pilih Ukuran</ThemedText>
          <View style={styles.optionsGrid}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size.id}
                style={[
                  styles.optionCard,
                  selectedSize === size.id && styles.selectedOption
                ]}
                onPress={() => setSelectedSize(size.id)}
              >
                <ThemedText style={selectedSize === size.id ? styles.selectedOptionName : styles.optionName}>{size.name}</ThemedText>
                <Text style={[styles.optionDesc, selectedSize === size.id && { color: '#fff', fontWeight: '600' }]}>{size.description}</Text>
                <Text style={[styles.optionPrice, selectedSize === size.id && { color: '#fff', fontWeight: 'bold' }]}>
                  {size.price === 0 ? 'Gratis' : `+Rp ${size.price.toLocaleString('id-ID')}`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Pilih Warna</ThemedText>
          <View style={styles.colorGrid}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color.id}
                style={[
                  styles.colorOption,
                  selectedColor === color.id && styles.selectedColor
                ]}
                onPress={() => setSelectedColor(color.id)}
              >
                <View 
                  style={[styles.colorCircle, { backgroundColor: color.hex }, selectedColor === color.id && { borderColor: '#fff', borderWidth: 3 }]}
                />
                <Text style={selectedColor === color.id ? styles.selectedColorName : styles.colorName}>{color.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Pilih Desain</ThemedText>
          <View style={styles.optionsGrid}>
            {designs.map((design) => (
              <TouchableOpacity
                key={design.id}
                style={[
                  styles.optionCard,
                  selectedDesign === design.id && styles.selectedOption
                ]}
                onPress={() => setSelectedDesign(design.id)}
              >
                <ThemedText style={selectedDesign === design.id ? styles.selectedOptionName : styles.optionName}>{design.name}</ThemedText>
                <Text style={[styles.optionDesc, selectedDesign === design.id && { color: '#fff', fontWeight: '600' }]}>{design.description}</Text>
                <Text style={[styles.optionPrice, selectedDesign === design.id && { color: '#fff', fontWeight: 'bold' }]}>
                  {design.price === 0 ? 'Gratis' : `+Rp ${design.price.toLocaleString('id-ID')}`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Custom Text (Opsional)</ThemedText>
          <Text style={styles.customTextDesc}>
            Tambahkan nama, tanggal, atau pesan spesial (maks 15 karakter)
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Masukkan text custom..."
            value={customText}
            onChangeText={setCustomText}
            maxLength={15}
          />
          <Text style={styles.charCount}>{customText.length}/15 karakter</Text>
          
          {customText && (
            <>
              <ThemedText style={styles.fontTitle}>Pilih Font</ThemedText>
              <View style={styles.fontGrid}>
                {fonts.map((font) => (
                  <TouchableOpacity
                    key={font.id}
                    style={[
                      styles.fontOption,
                      selectedFont === font.id && styles.selectedFont
                    ]}
                    onPress={() => setSelectedFont(font.id)}
                  >
                    <Text style={[
                      selectedFont === font.id ? styles.selectedFontPreview : styles.fontPreview, 
                      { fontWeight: font.style === 'bold' ? 'bold' : 'normal' }
                    ]}>
                      {font.preview}
                    </Text>
                    <Text style={selectedFont === font.id ? styles.selectedFontName : styles.fontName}>{font.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.customTextPrice}>+Rp 10.000 untuk custom text</Text>
            </>
          )}
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Informasi Tambahan</ThemedText>
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>⏱️</Text>
              <View style={styles.infoContent}>
                <ThemedText style={styles.infoTitle}>Waktu Produksi</ThemedText>
                <Text style={styles.infoDesc}>3-5 hari kerja setelah konfirmasi design</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>🎨</Text>
              <View style={styles.infoContent}>
                <ThemedText style={styles.infoTitle}>Design Approval</ThemedText>
                <Text style={styles.infoDesc}>Preview design akan dikirim sebelum produksi</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>📦</Text>
              <View style={styles.infoContent}>
                <ThemedText style={styles.infoTitle}>Packaging</ThemedText>
                <Text style={styles.infoDesc}>Gift box premium untuk custom tumbler</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Ringkasan Pesanan</ThemedText>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Base Price (Tumbler)</Text>
              <Text style={styles.summaryValue}>Rp 65.000</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Ukuran ({getSelectedSize()?.name})</Text>
              <Text style={styles.summaryValue}>
                {getSelectedSize()?.price === 0 ? 'Gratis' : `Rp ${getSelectedSize()?.price.toLocaleString('id-ID')}`}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Design ({getSelectedDesign()?.name})</Text>
              <Text style={styles.summaryValue}>
                {getSelectedDesign()?.price === 0 ? 'Gratis' : `Rp ${getSelectedDesign()?.price.toLocaleString('id-ID')}`}
              </Text>
            </View>
            {customText && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Custom Text</Text>
                <Text style={styles.summaryValue}>Rp 10.000</Text>
              </View>
            )}
            <View style={[styles.summaryRow, styles.totalRow]}>
              <ThemedText style={styles.totalLabel}>Total</ThemedText>
              <ThemedText style={styles.totalValue}>
                Rp {calculatePrice().toLocaleString('id-ID')}
              </ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerInfo}>
          <ThemedText style={styles.footerPrice}>
            Rp {calculatePrice().toLocaleString('id-ID')}
          </ThemedText>
          <Text style={styles.footerNote}>Design approval diperlukan</Text>
        </View>
        <TouchableOpacity 
          style={styles.orderButton}
          onPress={() => router.push({
            pathname: '/checkout',
            params: {
              name: `Custom Tumbler ${getSelectedColor()?.name} ${selectedSize}`,
              price: calculatePrice().toString(),
              image: getSelectedColor()?.image || 'custom1.jpeg',
              description: `Custom tumbler warna ${getSelectedColor()?.name}, ukuran ${selectedSize}, design ${getSelectedDesign()?.name}${customText ? `, text: "${customText}"` : ''}`,
              type: 'custom'
            }
          })}
        >
          <Text style={styles.orderText}>Pesan Custom</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  gradientBackground: {
    backgroundColor: '#DE8389',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 15,
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
  },
  content: {
    flex: 1,
  },
  previewSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  previewContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    position: 'relative',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(222, 131, 137, 0.2)',
  },
  previewImage: {
    width: 120,
    height: 160,
    borderRadius: 10,
  },
  previewOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -10 }],
  },
  previewText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  previewInfo: {
    marginTop: 15,
    alignItems: 'center',
  },
  previewSize: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DE8389',
  },
  previewDesign: {
    fontSize: 12,
    color: '#555',
  },
  section: {
    marginBottom: 20,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },
  optionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 15,
    flex: 1,
    minWidth: '30%',
    maxWidth: '32%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
    transform: [{ scale: 1.05 }],
    elevation: 4,
    shadowOpacity: 0.3,
    shadowColor: '#4CAF50',
  },
  optionName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  selectedOptionName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  optionDesc: {
    fontSize: 11,
    color: '#555',
    textAlign: 'center',
    marginBottom: 5,
  },
  optionPrice: {
    fontSize: 12,
    color: '#DE8389',
    fontWeight: '600',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  colorOption: {
    alignItems: 'center',
    padding: 6,
    minWidth: 65,
  },
  selectedColor: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#fff',
    transform: [{ scale: 1.15 }],
    elevation: 4,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#dee2e6',
  },
  colorName: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
  },
  selectedColorName: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 4,
  },
  customTextDesc: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
    lineHeight: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 5,
  },
  charCount: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'right',
    marginBottom: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-end',
  },
  fontTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  fontGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
  },
  fontOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    minWidth: 80,
  },
  selectedFont: {
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
    transform: [{ scale: 1.08 }],
    elevation: 3,
    shadowColor: '#4CAF50',
    shadowOpacity: 0.3,
  },
  fontPreview: {
    fontSize: 20,
    marginBottom: 5,
    color: '#333',
  },
  selectedFontPreview: {
    fontSize: 22,
    marginBottom: 5,
    color: '#fff',
    fontWeight: 'bold',
  },
  fontName: {
    fontSize: 10,
    color: '#555',
    textAlign: 'center',
  },
  selectedFontName: {
    fontSize: 11,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  customTextPrice: {
    fontSize: 12,
    color: '#DE8389',
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
    color: '#333',
  },
  infoDesc: {
    fontSize: 12,
    color: '#555',
    lineHeight: 16,
  },
  summaryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#555',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DE8389',
  },
  bottomSpace: {
    height: 20,
  },
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footerInfo: {
    flex: 1,
  },
  footerPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#DE8389',
  },
  footerNote: {
    fontSize: 11,
    color: '#555',
  },
  orderButton: {
    backgroundColor: '#DE8389',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 25,
  },
  orderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
