import { DATA_SET } from "@/config";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const GlamMeSalonsList = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [salonsData, setSalonsData] = useState([]);

  const itemsPerPage = 10;

  // Animation refs
  const sparkleAnim1 = useRef(new Animated.Value(0)).current;
  const sparkleAnim2 = useRef(new Animated.Value(0)).current;
  const sparkleAnim3 = useRef(new Animated.Value(0)).current;
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Sample data - replace with your actual data

  useEffect(() => {
    setSalonsData(DATA_SET as any);
    startAnimations();
  }, []);

  const startAnimations = () => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

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
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return salonsData.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    return Math.ceil(salonsData.length / itemsPerPage);
  };

  const handleSalonPress = (salon: any) => {
    console.log("🔍 [SalonsList] Salon selected:", salon.name);

    Alert.alert(
      salon.name,
      `Rating: ${salon.rating?.toFixed(1)} ⭐\nLocation: ${
        salon.vicinity
      }\nStatus: ${salon.business_status}`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "View Details", onPress: () => navigateToSalonDetails(salon) },
        { text: "Book Now", onPress: () => bookSalon(salon) },
      ]
    );
  };

  const navigateToSalonDetails = (salon: any) => {
    console.log("🔍 [SalonsList] Navigating to salon details");
    try {
      router.push({
        pathname: `/${salon.id}`,
        params: { salon_id: salon.id },
      } as any);
    } catch (error) {
      console.error("❌ [SalonsList] Navigation failed:", error);
    }
  };

  const bookSalon = (salon: any) => {
    console.log("🔍 [SalonsList] Booking salon:", salon.name);
    Alert.alert("Booking", `Booking appointment at ${salon.name}...`);
  };

  const changePage = (page: any) => {
    if (page >= 1 && page <= getTotalPages()) {
      setCurrentPage(page);
    }
  };

  const renderStars = (rating: any) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Text key={i} style={styles.star}>
          ⭐
        </Text>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Text key="half" style={styles.star}>
          ⭐
        </Text>
      );
    }

    return stars;
  };

  const renderSalonItem = ({ item, index }: { item: any; index: any }) => {
    return (
      <View style={styles.salonItemWrapper}>
        <TouchableOpacity
          style={styles.salonCard}
          onPress={() => handleSalonPress(item)}
          activeOpacity={0.8}
        >
          {/* Salon Image */}
          <View style={styles.salonImageContainer}>
            <View style={styles.salonImagePlaceholder}>
              <Text style={styles.salonImageIcon}>💇‍♀️</Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                item.opening_hours?.open_now
                  ? styles.openBadge
                  : styles.closedBadge,
              ]}
            >
              <Text style={styles.statusText}>
                {item.opening_hours?.open_now ? "OPEN" : "CLOSED"}
              </Text>
            </View>
          </View>

          {/* Salon Info */}
          <View style={styles.salonInfo}>
            <Text style={styles.salonName} numberOfLines={2}>
              {item.name}
            </Text>

            <View style={styles.ratingContainer}>
              <View style={styles.starsContainer}>
                {renderStars(item.rating || 0)}
              </View>
              <Text style={styles.ratingText}>
                {item.rating?.toFixed(1)} ({item.user_ratings_total || 0}{" "}
                reviews)
              </Text>
            </View>

            <Text style={styles.salonAddress} numberOfLines={2}>
              📍 {item.vicinity}
            </Text>

            <View style={styles.salonActions}>
              <View style={styles.actionButton}>
                <Text style={styles.actionButtonText}>View Details</Text>
              </View>
              <View style={[styles.actionButton, styles.bookButton]}>
                <Text style={[styles.actionButtonText, styles.bookButtonText]}>
                  Book Now ✨
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

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
          <Text style={styles.sparkleText}>🏪</Text>
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

        {/* Salon Elements */}
        <Animated.View
          style={[
            styles.salonElement1,
            { transform: [{ translateY: float1Interpolate }] },
          ]}
        >
          <Text style={styles.salonElementText}>💄</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.salonElement2,
            { transform: [{ translateY: float2Interpolate }] },
          ]}
        >
          <Text style={styles.salonElementText}>💇‍♀️</Text>
        </Animated.View>

        {/* Background Orbs */}
        <View style={styles.orb1} />
        <View style={styles.orb2} />
        <View style={styles.orb3} />
      </View>

      {/* Content */}
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Header */}
        <View style={styles.header}>
          <Animated.View
            style={[
              styles.logoContainer,
              { transform: [{ scale: pulseAnim }] },
            ]}
          >
            <Text style={styles.logoText}>Beauty Salons Near You</Text>
          </Animated.View>
          <Text style={styles.subtitle}>
            Discover amazing salons in Faisalabad ✨
          </Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>
              Showing {(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, salonsData.length)} of{" "}
              {salonsData.length} salons
            </Text>
          </View>
        </View>

        {/* Salons List */}
        <FlatList
          data={getCurrentPageData()}
          renderItem={renderSalonItem}
          keyExtractor={(item, index) => `salon-${currentPage}-${index}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />

        {/* Pagination */}
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            style={[
              styles.paginationButton,
              currentPage === 1 && styles.disabledButton,
            ]}
            onPress={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.paginationButtonText,
                currentPage === 1 && styles.disabledText,
              ]}
            >
              ← Previous
            </Text>
          </TouchableOpacity>

          <View style={styles.pageIndicator}>
            <Text style={styles.pageText}>
              Page {currentPage} of {getTotalPages()}
            </Text>
            <View style={styles.dotsContainer}>
              {Array.from({ length: Math.min(getTotalPages(), 5) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <TouchableOpacity
                    key={pageNum}
                    style={[
                      styles.dot,
                      currentPage === pageNum && styles.activeDot,
                    ]}
                    onPress={() => changePage(pageNum)}
                  />
                );
              })}
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.paginationButton,
              currentPage === getTotalPages() && styles.disabledButton,
            ]}
            onPress={() => changePage(currentPage + 1)}
            disabled={currentPage === getTotalPages()}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.paginationButtonText,
                currentPage === getTotalPages() && styles.disabledText,
              ]}
            >
              Next →
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 40,
  },

  // Header Styles
  header: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logoContainer: {
    marginBottom: 10,
  },
  logoText: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#ec4899",
    textShadowColor: "rgba(236, 72, 153, 0.3)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
    letterSpacing: 1,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 15,
  },
  statsContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  statsText: {
    fontSize: 12,
    color: "#8b5cf6",
    fontWeight: "500",
  },

  // List Styles
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  separator: {
    height: 15,
  },
  salonItemWrapper: {
    marginBottom: 5,
  },

  // Salon Card Styles
  salonCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(236, 72, 153, 0.1)",
  },

  // Salon Image
  salonImageContainer: {
    position: "relative",
    marginRight: 15,
  },
  salonImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f9a8d4",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  salonImageIcon: {
    fontSize: 35,
  },
  statusBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  openBadge: {
    backgroundColor: "#10b981",
  },
  closedBadge: {
    backgroundColor: "#ef4444",
  },
  statusText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },

  // Salon Info
  salonInfo: {
    flex: 1,
  },
  salonName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ec4899",
    marginBottom: 8,
    lineHeight: 20,
  },
  ratingContainer: {
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 4,
  },
  star: {
    fontSize: 14,
    marginRight: 2,
  },
  ratingText: {
    fontSize: 12,
    color: "#6b7280",
  },
  salonAddress: {
    fontSize: 12,
    color: "#8b5cf6",
    marginBottom: 12,
    lineHeight: 16,
  },

  // Action Buttons
  salonActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    backgroundColor: "rgba(236, 72, 153, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ec4899",
  },
  bookButton: {
    backgroundColor: "#ec4899",
    borderColor: "#ec4899",
  },
  actionButtonText: {
    fontSize: 11,
    color: "#ec4899",
    fontWeight: "600",
  },
  bookButtonText: {
    color: "white",
  },

  // Pagination Styles
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderTopWidth: 1,
    borderTopColor: "rgba(236, 72, 153, 0.1)",
  },
  paginationButton: {
    backgroundColor: "#ec4899",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: "#d1d5db",
    shadowOpacity: 0,
    elevation: 0,
  },
  paginationButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  disabledText: {
    color: "#9ca3af",
  },
  pageIndicator: {
    alignItems: "center",
  },
  pageText: {
    fontSize: 14,
    color: "#ec4899",
    fontWeight: "600",
    marginBottom: 8,
  },
  dotsContainer: {
    flexDirection: "row",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(236, 72, 153, 0.3)",
  },
  activeDot: {
    backgroundColor: "#ec4899",
    width: 20,
  },

  // Background Sparkles
  sparkle1: {
    position: "absolute",
    top: height * 0.15,
    left: 30,
  },
  sparkle2: {
    position: "absolute",
    top: height * 0.25,
    right: 40,
  },
  sparkle3: {
    position: "absolute",
    top: height * 0.45,
    left: 50,
  },
  sparkle4: {
    position: "absolute",
    bottom: height * 0.3,
    right: 30,
  },
  sparkle5: {
    position: "absolute",
    bottom: height * 0.2,
    left: 60,
  },
  sparkleText: {
    fontSize: 20,
  },

  // Salon Elements
  salonElement1: {
    position: "absolute",
    top: height * 0.2,
    right: 20,
  },
  salonElement2: {
    position: "absolute",
    bottom: height * 0.25,
    left: 40,
  },
  salonElementText: {
    fontSize: 24,
    opacity: 0.4,
  },

  // Background Orbs
  orb1: {
    position: "absolute",
    top: height * 0.18,
    left: width * 0.15,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(249, 168, 212, 0.2)",
  },
  orb2: {
    position: "absolute",
    bottom: height * 0.35,
    right: width * 0.1,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(251, 113, 133, 0.15)",
  },
  orb3: {
    position: "absolute",
    top: height * 0.5,
    right: width * 0.2,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(192, 132, 252, 0.25)",
  },
});

export default GlamMeSalonsList;
