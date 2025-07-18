import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
} from 'react-native';

// Tipe state setiap gambar (alt/main dan scale)
interface ImageState {
  isAlt: boolean;
  scale: number;
}

// Tipe pasangan gambar (main/alt)
interface ImagePair {
  main: string; // URL gambar utama
  alt: string;  // URL gambar alternatif
}

// 9 pasangan gambar dengan komentar inline pada URL
const imagePairs: ImagePair[] = [
  { main: 'https://picsum.photos/id/10/200', alt: 'https://picsum.photos/id/1010/200' }, // Gambar 1
  { main: 'https://picsum.photos/id/11/200', alt: 'https://picsum.photos/id/1011/200' }, // Gambar 2
  { main: 'https://picsum.photos/id/12/200', alt: 'https://picsum.photos/id/1012/200' }, // Gambar 3
  { main: 'https://picsum.photos/id/13/200', alt: 'https://picsum.photos/id/1013/200' }, // Gambar 4
  { main: 'https://picsum.photos/id/14/200', alt: 'https://picsum.photos/id/1014/200' }, // Gambar 5
  { main: 'https://picsum.photos/id/15/200', alt: 'https://picsum.photos/id/1015/200' }, // Gambar 6
  { main: 'https://picsum.photos/id/16/200', alt: 'https://picsum.photos/id/1016/200' }, // Gambar 7
  { main: 'https://picsum.photos/id/17/200', alt: 'https://picsum.photos/id/1017/200' }, // Gambar 8
  { main: 'https://picsum.photos/id/18/200', alt: 'https://picsum.photos/id/1018/200' }, // Gambar 9
];

export default function ImageGrid(): JSX.Element {
  const [states, setStates] = useState<ImageState[]>(
    imagePairs.map(() => ({ isAlt: false, scale: 1 }))
  );

  // Handler klik gambar, ganti gambar dan penskalaan
  const handlePress = (index: number) => {
    setStates((prev) =>
      prev.map((state, i) =>
        i === index
          ? {
              isAlt: !state.isAlt,
              scale: Math.min(state.scale * 2, 2), // Maksimal skala 2x
            }
          : state
      )
    );
  };

  return (
    <View style={styles.grid}>
      {imagePairs.map((pair, index) => (
        <TouchableWithoutFeedback key={index} onPress={() => handlePress(index)}>
          <Image
            source={{ uri: states[index].isAlt ? pair.alt : pair.main }}
            style={[
              styles.image,
              { transform: [{ scale: states[index].scale }] },
            ]}
            resizeMode="cover"
          />
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}

// Hitung ukuran sel agar grid 3x3 selalu rapi dan gambar penuh
const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth / 3 - 16;

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: screenWidth,
    height: screenWidth, // grid selalu kotak
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  image: {
    width: imageSize,
    height: imageSize,
    margin: 5,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
});
