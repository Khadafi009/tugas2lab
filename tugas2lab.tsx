import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
} from 'react-native';

interface ImageState {
  isAlt: boolean;
  scale: number;
}

interface ImagePair {
  main: string; // URL gambar utama
  alt: string;  // URL gambar alternatif
}

// 9 gambar URL
const imagePairs: ImagePair[] = [
  { main: 'https://picsum.photos/id/10/200', alt: 'https://picsum.photos/id/1010/200' },
  { main: 'https://picsum.photos/id/11/200', alt: 'https://picsum.photos/id/1011/200' },
  { main: 'https://picsum.photos/id/12/200', alt: 'https://picsum.photos/id/1012/200' },
  { main: 'https://picsum.photos/id/13/200', alt: 'https://picsum.photos/id/1013/200' },
  { main: 'https://picsum.photos/id/14/200', alt: 'https://picsum.photos/id/1014/200' },
  { main: 'https://picsum.photos/id/15/200', alt: 'https://picsum.photos/id/1015/200' },
  { main: 'https://picsum.photos/id/16/200', alt: 'https://picsum.photos/id/1016/200' },
  { main: 'https://picsum.photos/id/17/200', alt: 'https://picsum.photos/id/1017/200' },
  { main: 'https://picsum.photos/id/18/200', alt: 'https://picsum.photos/id/1018/200' },
];

export default function App(): JSX.Element {
  const [states, setStates] = useState<ImageState[]>(
    imagePairs.map(() => ({ isAlt: false, scale: 1 }))
  );

  const handlePress = (index: number) => {
    setStates((prev) =>
      prev.map((state, i) =>
        i === index
          ? {
              isAlt: !state.isAlt,
              scale: Math.min(state.scale * 1.2, 2),
            }
          : state
      )
    );
  };

  return (
    <View style={styles.container}>
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

const imageSize = Dimensions.get('window').width / 3 - 10;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
    justifyContent: 'center',
  },
  image: {
   
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
});
