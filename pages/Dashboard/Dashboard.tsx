import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const GlamMeDashboard = () => {
  const router = useRouter();
  const [time, setTime] = useState(new Date());

  // Animation refs
  const sparkleAnim1 = useRef(new Animated.Value(0)).current;
  const sparkleAnim2 = useRef(new Animated.Value(0)).current;
  const sparkleAnim3 = useRef(new Animated.Value(0)).current;
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Card animation refs
  const makeupScale = useRef(new Animated.Value(1)).current;
  const salonScale = useRef(new Animated.Value(1)).current;
  const communityScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Update time
    const timer = setInterval(() => setTime(new Date()), 60000);

    // Start all animations
    startAnimations();

    return () => {
      clearInterval(timer);
    };
  }, []);

  const startAnimations = () => {
    // Sparkle animations
    Animated.loop(
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
    ).start();

    Animated.loop(
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
    ).start();

    Animated.loop(
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
    ).start();

    // Float animations
    Animated.loop(
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
    ).start();

    Animated.loop(
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
    ).start();

    // Pulse animation
    Animated.loop(
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
    ).start();

    // Rotation animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();
  };

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const handleCardPress = (route: string, scaleAnim: any) => {
    // Animate button press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    if (route === "makeup") {
      router.push("/selectimage" as any);
    } else if (route === "salon") {
      router.push("/salons" as any);
    } else if (route === "community") {
      router.push("/community" as any);
    }
    // Navigate to route
  };

  const float1Interpolate = floatAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const float2Interpolate = floatAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* Background Elements */}
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
            styles.makeupElement1,
            { transform: [{ translateY: float1Interpolate }] },
          ]}
        >
          <Text style={styles.makeupText}>💄</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.makeupElement2,
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

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Animated.View
            style={[
              styles.logoContainer,
              { transform: [{ scale: pulseAnim }] },
            ]}
          >
            <Text style={styles.logoText}>GlamMe</Text>
          </Animated.View>

          <Text style={styles.greetingText}>
            {getGreeting()}, Beautiful! ✨
          </Text>
          <Text style={styles.subtitle}>Choose your glam adventure today</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Animated.View
            style={[
              styles.statItem,
              { transform: [{ translateY: float1Interpolate }] },
            ]}
          >
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Looks Tried</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.statItem,
              { transform: [{ translateY: float2Interpolate }] },
            ]}
          >
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Salons Saved</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.statItem,
              { transform: [{ translateY: float1Interpolate }] },
            ]}
          >
            <Text style={styles.statNumber}>23</Text>
            <Text style={styles.statLabel}>Community Posts</Text>
          </Animated.View>
        </View>

        {/* Dashboard Cards */}
        <View style={styles.cardsContainer}>
          {/* Virtual Makeup Card */}
          <Animated.View
            style={[
              styles.cardWrapper,
              { transform: [{ scale: makeupScale }] },
            ]}
          >
            <TouchableOpacity
              style={[styles.dashboardCard, styles.makeupCard]}
              onPress={() => handleCardPress("makeup", makeupScale)}
              activeOpacity={0.8}
            >
              <View style={styles.cardIconContainer}>
                <Animated.View
                  style={[
                    styles.cardIcon,
                    styles.makeupIcon,
                    { transform: [{ rotate: rotateInterpolate }] },
                  ]}
                >
                  <Text style={styles.iconText}>💄</Text>
                </Animated.View>
              </View>
              <Text style={styles.cardTitle}>Virtual Makeup</Text>
              <Text style={styles.cardDescription}>
                Try on stunning makeup looks with AR technology. Experiment with
                colors and trends.
              </Text>
              <View style={styles.cardButton}>
                <Text style={styles.buttonText}>Try Makeup ✨</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Salon Finding Card */}
          <Animated.View
            style={[styles.cardWrapper, { transform: [{ scale: salonScale }] }]}
          >
            <TouchableOpacity
              style={[styles.dashboardCard, styles.salonCard]}
              onPress={() => handleCardPress("salon", salonScale)}
              activeOpacity={0.8}
            >
              <View style={styles.cardIconContainer}>
                <Animated.View
                  style={[
                    styles.cardIcon,
                    styles.salonIcon,
                    { transform: [{ translateY: float1Interpolate }] },
                  ]}
                >
                  <Text style={styles.iconText}>📍</Text>
                </Animated.View>
              </View>
              <Text style={styles.cardTitle}>Find Salons</Text>
              <Text style={styles.cardDescription}>
                Discover top-rated beauty salons near you. Book appointments and
                read reviews.
              </Text>
              <View style={styles.cardButton}>
                <Text style={styles.buttonText}>Find Salons 🌟</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Community Chat Card */}
          <Animated.View
            style={[
              styles.cardWrapper,
              { transform: [{ scale: communityScale }] },
            ]}
          >
            <TouchableOpacity
              style={[styles.dashboardCard, styles.communityCard]}
              onPress={() => handleCardPress("community", communityScale)}
              activeOpacity={0.8}
            >
              <View style={styles.cardIconContainer}>
                <Animated.View
                  style={[
                    styles.cardIcon,
                    styles.communityIcon,
                    { transform: [{ translateY: float2Interpolate }] },
                  ]}
                >
                  <Text style={styles.iconText}>💬</Text>
                </Animated.View>
              </View>
              <Text style={styles.cardTitle}>Beauty Community</Text>
              <Text style={styles.cardDescription}>
                Connect with beauty lovers, share tips, and showcase your
                transformations.
              </Text>
              <View style={styles.cardButton}>
                <Text style={styles.buttonText}>Join Community 💖</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fef7ff",
  },
  scrollView: {
    flex: 1,
  },
  backgroundElements: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  // Header Styles
  header: {
    alignItems: "center",
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 40 : 60,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoText: {
    fontSize: width * 0.12,
    fontWeight: "bold",
    color: "#ec4899",
    textShadowColor: "rgba(236, 72, 153, 0.3)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
    letterSpacing: 2,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#ec4899",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    fontStyle: "italic",
  },

  // Stats Section
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  statItem: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignItems: "center",
    minWidth: 80,
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ec4899",
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 5,
    textAlign: "center",
  },

  // Cards Container
  cardsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  cardWrapper: {
    marginBottom: 25,
  },

  // Dashboard Card Styles
  dashboardCard: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },

  makeupCard: {
    borderColor: "rgba(236, 72, 153, 0.2)",
  },
  salonCard: {
    borderColor: "rgba(139, 92, 246, 0.2)",
  },
  communityCard: {
    borderColor: "rgba(244, 114, 182, 0.2)",
  },

  // Card Icon Styles
  cardIconContainer: {
    marginBottom: 20,
  },
  cardIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  makeupIcon: {
    backgroundColor: "#f9a8d4",
  },
  salonIcon: {
    backgroundColor: "#c084fc",
  },
  communityIcon: {
    backgroundColor: "#fb7185",
  },
  iconText: {
    fontSize: 40,
  },

  // Card Content
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ec4899",
    marginBottom: 15,
    letterSpacing: 1,
  },
  cardDescription: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  cardButton: {
    backgroundColor: "#ec4899",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
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
    top: height * 0.45,
    left: 30,
  },
  sparkle4: {
    position: "absolute",
    bottom: height * 0.3,
    right: 50,
  },
  sparkle5: {
    position: "absolute",
    bottom: height * 0.2,
    left: 80,
  },
  sparkleText: {
    fontSize: 24,
  },

  // Makeup Elements
  makeupElement1: {
    position: "absolute",
    top: height * 0.3,
    right: 30,
    transform: [{ rotate: "45deg" }],
  },
  makeupElement2: {
    position: "absolute",
    bottom: height * 0.25,
    left: 60,
    transform: [{ rotate: "-12deg" }],
  },
  makeupText: {
    fontSize: 28,
    opacity: 0.4,
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

export default GlamMeDashboard;
