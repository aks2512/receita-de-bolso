import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import Animated, { Easing, Keyframe } from "react-native-reanimated";

import classes from "./animated-icon.module.css";
import { ThemedView } from "./themed-view";
const DURATION = 300;

export function AnimatedSplashOverlay() {
  return null;
}

const keyframe = new Keyframe({
  0: {
    transform: [{ scale: 0 }],
  },
  60: {
    transform: [{ scale: 1.2 }],
    easing: Easing.elastic(1.2),
  },
  100: {
    transform: [{ scale: 1 }],
    easing: Easing.elastic(1.2),
  },
});

const logoKeyframe = new Keyframe({
  0: {
    opacity: 0,
  },
  60: {
    transform: [{ scale: 1.2 }],
    opacity: 0,
    easing: Easing.elastic(1.2),
  },
  100: {
    transform: [{ scale: 1 }],
    opacity: 1,
    easing: Easing.elastic(1.2),
  },
});

// glowKeyframe removed (unused) to satisfy lint rules

export function AnimatedIcon() {
  return (
    <ThemedView style={styles.iconContainer}>
      <Animated.View
        style={styles.background}
        entering={keyframe.duration(DURATION)}
      >
        <div className={classes.expoLogoBackground} />
      </Animated.View>

      <Animated.View
        style={styles.imageContainer}
        entering={logoKeyframe.duration(DURATION)}
      >
        <Image
          style={styles.image}
          source={require("@/assets/images/icon.jpg")}
        />
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    zIndex: 1000,
    position: "absolute",
    top: 128 / 2 + 138,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  glow: {
    width: 201,
    height: 201,
    position: "absolute",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 128,
    height: 128,
  },
  image: {
    position: "absolute",
    width: 76,
    height: 71,
  },
  background: {
    width: 128,
    height: 128,
    position: "absolute",
  },
});
