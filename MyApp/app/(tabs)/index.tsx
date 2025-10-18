import { useState, useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions, Pressable, Image, Text } from 'react-native';
import { useRouter } from 'expo-router';

// Priprema slika
const images = [
  require('../../assets/images/menu/corsam.png'),
  require('../../assets/images/menu/qashqai1.png'),
  require('../../assets/images/menu/mg3.png'),
  require('../../assets/images/menu/picantom.png'),
  require('../../assets/images/menu/i30m.png'),
  require('../../assets/images/menu/konam.png'),
  require('../../assets/images/menu/leonm.png'),
  require('../../assets/images/menu/pandam.png'),
  require('../../assets/images/menu/scrossm.png'),
  require('../../assets/images/menu/mghs1.png'),
  require('../../assets/images/menu/sportagem.png'),
  require('../../assets/images/menu/stonicm.png'),
  require('../../assets/images/menu/mgzs.png'),
  require('../../assets/images/menu/yarism.png'),
  require('../../assets/images/menu/ford1.png'),
];

// Tekstovi uvoda na raznim jezicima
const introTexts = [
  'Pritisnite na ekran da bi otvorili izbronik',
  'Tap on the screen to open the menu',
  'Tippen Sie auf den Bildschirm, um das menü zu öffnen',
  'Tocca lo schermo per aprire il menu',
  'Tik op het scherm om het menu te openen',
  'Appuyez sur l\'écran pour ouvrir le menu',
];

// Logo image
const logo = require('../../assets/images/hertzlogoBW.png');

const { width } = Dimensions.get('window');

export default function IdleSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const animationValue = useRef(new Animated.Value(-width)).current;
  const router = useRouter();

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 1250,
        useNativeDriver: true,
      }),
      Animated.delay(3000),
      Animated.timing(animationValue, {
        toValue: width,
        duration: 1250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      animationValue.setValue(-width);
      startAnimation();
    });
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <Pressable style={styles.container} onPress={() => router.push('/menu')}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.instruction}>{introTexts[currentIndex % introTexts.length]}</Text>
      <Animated.Image
        source={images[currentIndex]}
        style={[styles.image, { transform: [{ translateX: animationValue }] }]}
        resizeMode="contain"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffcc00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    position: 'absolute',
    top: 15,
    left: 65,
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  instruction: {
    position: 'absolute',
    top: 55,
    textAlign: 'center',
    width: '100%',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
  },
});
