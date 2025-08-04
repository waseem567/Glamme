import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const { width, height } = Dimensions.get("window");

const GlamMeLanding = () => {
  const router = useRouter();
  const sparkleAnim1 = useRef(new Animated.Value(0)).current;
  const sparkleAnim2 = useRef(new Animated.Value(0)).current;
  const sparkleAnim3 = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sparkle animations
    const sparkleAnimation1 = Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleAnim1, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleAnim1, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    const sparkleAnimation2 = Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleAnim2, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleAnim2, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );

    const sparkleAnimation3 = Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleAnim3, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleAnim3, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    );

    // Rotation animation
    const rotationAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    );

    // Pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    // Float animations
    const floatAnimation1 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim1, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim1, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );

    const floatAnimation2 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim2, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim2, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    );

    sparkleAnimation1.start();
    sparkleAnimation2.start();
    sparkleAnimation3.start();
    rotationAnimation.start();
    pulseAnimation.start();
    floatAnimation1.start();
    floatAnimation2.start();

    return () => {
      sparkleAnimation1.stop();
      sparkleAnimation2.stop();
      sparkleAnimation3.stop();
      rotationAnimation.stop();
      pulseAnimation.stop();
      floatAnimation1.stop();
      floatAnimation2.stop();
    };
  }, []);

  const handleButtonPress = () => {
    console.log("🔍 [LandingPage] Button pressed - starting navigation");

    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Add your navigation logic here
    console.log("🔍 [LandingPage] Attempting to navigate to /auth");
    try {
      router.push("/dashboard" as any);
      console.log("✅ [LandingPage] Navigation successful");
    } catch (error) {
      console.error("❌ [LandingPage] Navigation failed:", error);
    }
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const float1Interpolate = floatAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const float2Interpolate = floatAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={styles.background}>
        {/* Animated Background Elements */}
        <View style={styles.backgroundElements}>
          {/* Sparkles */}
          <Animated.View
            style={[
              styles.sparkle1,
              {
                opacity: sparkleAnim1,
                transform: [{ translateY: float1Interpolate }],
              },
            ]}
          >
            <Text style={styles.sparkleText}>✨</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.sparkle2,
              {
                opacity: sparkleAnim2,
                transform: [{ translateY: float2Interpolate }],
              },
            ]}
          >
            <Text style={styles.sparkleText}>💫</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.sparkle3,
              {
                opacity: sparkleAnim3,
                transform: [{ translateY: float1Interpolate }],
              },
            ]}
          >
            <Text style={styles.sparkleText}>✨</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.sparkle4,
              {
                opacity: sparkleAnim1,
                transform: [{ translateY: float2Interpolate }],
              },
            ]}
          >
            <Text style={styles.sparkleText}>💖</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.sparkle5,
              {
                opacity: sparkleAnim2,
                transform: [{ translateY: float1Interpolate }],
              },
            ]}
          >
            <Text style={styles.sparkleText}>🌟</Text>
          </Animated.View>

          {/* Makeup Elements */}
          <Animated.View
            style={[
              styles.makeupBrush1,
              { transform: [{ translateY: float1Interpolate }] },
            ]}
          >
            <Text style={styles.makeupText}>💄</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.makeupBrush2,
              { transform: [{ translateY: float2Interpolate }] },
            ]}
          >
            <Text style={styles.makeupText}>🖌️</Text>
          </Animated.View>

          {/* Background Orbs */}
          <View style={styles.orb1} />
          <View style={styles.orb2} />
          <View style={styles.orb3} />
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <Animated.View
              style={[
                styles.logoContainer,
                { transform: [{ scale: pulseAnim }] },
              ]}
            >
              <View style={styles.logoBackground} />
              <Text style={styles.logoText}>GlamMe</Text>
            </Animated.View>

            <View style={styles.dots}>
              <Animated.View
                style={[styles.dot, styles.dot1, { opacity: sparkleAnim1 }]}
              />
              <Animated.View
                style={[styles.dot, styles.dot2, { opacity: sparkleAnim2 }]}
              />
              <Animated.View
                style={[styles.dot, styles.dot3, { opacity: sparkleAnim3 }]}
              />
            </View>
          </View>

          {/* Tagline */}
          <View style={styles.taglineSection}>
            <Text style={styles.taglineText}>
              Discover your beauty potential with{" "}
              <Text style={styles.highlightText}>virtual makeup</Text>
              {"\n"}and find the perfect salon nearby
            </Text>
          </View>

          {/* Central Feature Circle */}
          <View style={styles.featureSection}>
            <View style={styles.centralCircle}>
              <View style={styles.circleOuter}>
                <View style={styles.circleMiddle}>
                  <View style={styles.innerCircle}>
                    <Text style={styles.faceEmoji}>👸</Text>
                  </View>
                </View>
              </View>

              {/* Orbiting elements */}
              <Animated.View
                style={[
                  styles.orbitContainer,
                  { transform: [{ rotate: rotateInterpolate }] },
                ]}
              >
                <View style={styles.orbitElement1}>
                  <Text style={styles.orbitEmoji}>✨</Text>
                </View>
                <View style={styles.orbitElement2}>
                  <Text style={styles.orbitEmoji}>💄</Text>
                </View>
                <View style={styles.orbitElement3}>
                  <Text style={styles.orbitEmoji}>💖</Text>
                </View>
                <View style={styles.orbitElement4}>
                  <Text style={styles.orbitEmoji}>🌟</Text>
                </View>
              </Animated.View>
            </View>
          </View>

          {/* Get Started Button */}
          <Animated.View
            style={[
              styles.buttonContainer,
              { transform: [{ scale: buttonScale }] },
            ]}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={handleButtonPress}
              activeOpacity={0.8}
            >
              <View style={styles.buttonGradient}>
                <Text style={styles.buttonText}>Get Started ✨</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Bottom Features */}
          <View style={styles.featuresSection}>
            <View style={styles.feature}>
              <View style={[styles.featureDot, styles.featureDot1]} />
              <Text style={styles.featureText}>Virtual Try-On</Text>
            </View>
            <View style={styles.feature}>
              <View style={[styles.featureDot, styles.featureDot2]} />
              <Text style={styles.featureText}>Salon Discovery</Text>
            </View>
            <View style={styles.feature}>
              <View style={[styles.featureDot, styles.featureDot3]} />
              <Text style={styles.featureText}>Beauty Community</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: "#fef7ff",
  },
  backgroundElements: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 20,
    paddingBottom: 40,
  },

  // Logo Section
  logoSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainer: {
    position: "relative",
    alignItems: "center",
  },
  logoBackground: {
    position: "absolute",
    top: -10,
    left: -20,
    right: -20,
    bottom: -10,
    backgroundColor: "#ec4899",
    opacity: 0.1,
    borderRadius: 25,
  },
  logoText: {
    fontSize: width * 0.15,
    fontWeight: "bold",
    color: "#ec4899",
    textShadowColor: "rgba(236, 72, 153, 0.3)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
    letterSpacing: 2,
  },
  dots: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dot1: {
    backgroundColor: "#f9a8d4",
  },
  dot2: {
    backgroundColor: "#fb7185",
  },
  dot3: {
    backgroundColor: "#c084fc",
  },

  // Tagline
  taglineSection: {
    alignItems: "center",
    marginBottom: 50,
  },
  taglineText: {
    fontSize: 18,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 28,
    fontWeight: "300",
  },
  highlightText: {
    color: "#ec4899",
    fontWeight: "600",
  },

  // Central Feature
  featureSection: {
    alignItems: "center",
    marginBottom: 50,
  },
  centralCircle: {
    width: 200,
    height: 200,
    position: "relative",
  },
  circleOuter: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#f9a8d4",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  circleMiddle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#fce7f3",
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  faceEmoji: {
    fontSize: 60,
  },
  orbitContainer: {
    position: "absolute",
    width: 240,
    height: 240,
    top: -20,
    left: -20,
  },
  orbitElement1: {
    position: "absolute",
    top: 0,
    left: "50%",
    marginLeft: -15,
  },
  orbitElement2: {
    position: "absolute",
    top: "50%",
    right: 0,
    marginTop: -15,
  },
  orbitElement3: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    marginLeft: -15,
  },
  orbitElement4: {
    position: "absolute",
    top: "50%",
    left: 0,
    marginTop: -15,
  },
  orbitEmoji: {
    fontSize: 30,
  },

  // Button
  buttonContainer: {
    marginBottom: 40,
  },
  button: {
    borderRadius: 30,
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  buttonGradient: {
    paddingHorizontal: 50,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: "#ec4899",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 1,
  },

  // Features
  featuresSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 12,
    marginVertical: 8,
  },
  featureDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  featureDot1: {
    backgroundColor: "#f9a8d4",
  },
  featureDot2: {
    backgroundColor: "#fb7185",
  },
  featureDot3: {
    backgroundColor: "#c084fc",
  },
  featureText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },

  // Background Sparkles
  sparkle1: {
    position: "absolute",
    top: height * 0.15,
    left: 40,
  },
  sparkle2: {
    position: "absolute",
    top: height * 0.25,
    right: 60,
  },
  sparkle3: {
    position: "absolute",
    top: height * 0.6,
    left: 80,
  },
  sparkle4: {
    position: "absolute",
    bottom: height * 0.3,
    right: 50,
  },
  sparkle5: {
    position: "absolute",
    bottom: height * 0.4,
    left: 30,
  },
  sparkleText: {
    fontSize: 24,
  },

  // Makeup Elements
  makeupBrush1: {
    position: "absolute",
    top: height * 0.3,
    right: 30,
    transform: [{ rotate: "45deg" }],
  },
  makeupBrush2: {
    position: "absolute",
    bottom: height * 0.25,
    left: 60,
    transform: [{ rotate: "-12deg" }],
  },
  makeupText: {
    fontSize: 28,
  },

  // Background Orbs
  orb1: {
    position: "absolute",
    top: height * 0.2,
    left: width * 0.2,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(249, 168, 212, 0.2)",
  },
  orb2: {
    position: "absolute",
    bottom: height * 0.3,
    right: width * 0.2,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(251, 113, 133, 0.15)",
  },
  orb3: {
    position: "absolute",
    top: height * 0.5,
    right: width * 0.15,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(192, 132, 252, 0.25)",
  },
});

export default GlamMeLanding;
