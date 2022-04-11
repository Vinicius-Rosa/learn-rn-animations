import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";

const SIZE = 100;

export default function App() {
  const textVisibility = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0.5)).current;
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(opacity, {
      toValue: 1,
      useNativeDriver: true,
      delay: 500,
    }).start();

    Animated.spring(scale, {
      toValue: 2,
      useNativeDriver: true,
      delay: 500,
    }).start();

    Animated.timing(textVisibility, {
      toValue: 2,
      useNativeDriver: true,
      delay: 800,
    }).start();
  }, []);

  const handleAnimate = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.spring(opacity, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.spring(opacity, {
          toValue: 0.5,
          useNativeDriver: true,
        }),
      ]),

      Animated.sequence([
        Animated.spring(scale, {
          toValue: 2,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleAnimate}>
        <Animated.View
          style={[
            styles.square,
            {
              opacity,
              borderRadius: opacity.interpolate({
                inputRange: [0.5, 1],
                outputRange: [20, SIZE / 2],
              }),
              transform: [
                { scale },
                {
                  rotate: opacity.interpolate({
                    inputRange: [0.5, 1],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            },
          ]}
        />
      </TouchableOpacity>
      <Animated.Text style={[styles.text, { opacity: textVisibility }]}>
        Click me!
      </Animated.Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "pink",
    borderRadius: 10,
    opacity: 0,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3d3d3d",
    marginTop: 70,
  },
});
