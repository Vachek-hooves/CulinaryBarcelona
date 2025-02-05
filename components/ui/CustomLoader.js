import React, {useEffect} from 'react';
import {StyleSheet, View, Animated, Easing} from 'react-native';

const CustomLoader = () => {
  // Create animated values
  const jumpAnimation = new Animated.Value(0);
  const shadowAnimation = new Animated.Value(0);

  useEffect(() => {
    // Create jump animation sequence
    const jumpSequence = Animated.sequence([
      Animated.timing(jumpAnimation, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]);

    // Create shadow animation sequence
    const shadowSequence = Animated.sequence([
      Animated.timing(shadowAnimation, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]);

    // Run both animations in loop
    Animated.loop(jumpSequence).start();
    Animated.loop(shadowSequence).start();
  }, []);

  // Interpolate values for jump animation
  const jumpInterpolation = {
    transform: [
      {
        translateY: jumpAnimation.interpolate({
          inputRange: [0, 0.15, 0.25, 0.5, 0.75, 1],
          outputRange: [0, 0, 9, 18, 9, 0],
        }),
      },
      {
        rotate: jumpAnimation.interpolate({
          inputRange: [0, 0.15, 0.25, 0.5, 0.75, 1],
          outputRange: ['0deg', '0deg', '22.5deg', '45deg', '67.5deg', '90deg'],
        }),
      },
      {
        scale: jumpAnimation.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 0.9, 1],
        }),
      },
    ],
    borderBottomRightRadius: jumpAnimation.interpolate({
      inputRange: [0, 0.15, 0.5, 1],
      outputRange: [4, 3, 70, 4],
    }),
  };

  // Interpolate values for shadow animation
  const shadowInterpolation = {
    transform: [
      {
        scaleX: shadowAnimation.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 1.2, 1],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.shadow, shadowInterpolation]} />
      <Animated.View style={[styles.loader, jumpInterpolation]} />
    </View>
  );
};

export default CustomLoader;

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 140,
    alignSelf: 'center',
    position: 'relative',
  },
  loader: {
    width: '100%',
    height: '100%',
    backgroundColor: '#DF393E',
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 4,
  },
  shadow: {
    width: 140,
    height: 5,
    backgroundColor: '#f0808050',
    position: 'absolute',
    top: 180,
    left: 0,
    borderRadius: '30%',
  },
});
