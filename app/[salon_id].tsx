import { DATA_SET } from "@/config";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const SalonDetails = () => {
  const router = useRouter();
  const { salon_id } = useLocalSearchParams();
  const [salonData, setSalonData] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log({ salon_id });

  // Animation refs
  const sparkleAnim1 = useRef(new Animated.Value(0)).current;
  const sparkleAnim2 = useRef(new Animated.Value(0)).current;
  const sparkleAnim3 = useRef(new Animated.Value(0)).current;
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Sample data set - replace with your actual data

  useEffect(() => {
    loadSalonData();
    startAnimations();
  }, [salon_id]);

  const loadSalonData = () => {
    setLoading(true);
    try {
      const salonId = parseInt(salon_id as string);
      const salon = DATA_SET.find((item) => item.id === salonId);

      if (salon) {
        setSalonData(salon as any);
        console.log("🔍 [SalonDetails] Loaded salon:", salon.name);
      } else {
        console.warn("⚠️ [SalonDetails] Salon not found for ID:", salonId);
        Alert.alert("Error", "Salon not found");
        router.back();
      }
    } catch (error) {
      console.error("❌ [SalonDetails] Error loading salon:", error);
      Alert.alert("Error", "Failed to load salon details");
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const startAnimations = () => {
    // Fade and slide in animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

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
          toValue: 1.03,
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

  const handleBookNow = () => {
    Alert.alert(
      "Book Appointment",
      `Would you like to book an appointment at ${salonData?.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Call Salon", onPress: () => handleCall() },
        { text: "Book Online", onPress: () => handleOnlineBooking() },
      ]
    );
  };

  const handleCall = () => {
    if (salonData?.phone) {
      Linking.openURL(`tel:${salonData.phone}`);
    }
  };

  const handleOnlineBooking = () => {
    Alert.alert("Online Booking", "Redirecting to online booking system...");
  };

  const handleGetDirections = () => {
    const { lat, lng } = salonData?.geometry?.location || {};
    if (lat && lng) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      Linking.openURL(url);
    }
  };

  const renderStars = (rating) => {
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

  const renderServiceItem = (service, index) => (
    <View key={index} style={styles.serviceItem}>
      <View style={styles.serviceHeader}>
        <Text style={styles.serviceName}>💅 {service.name}</Text>
        <Text style={styles.servicePrice}>{service.price}</Text>
      </View>
      <Text style={styles.serviceDuration}>⏱️ {service.duration}</Text>
    </View>
  );

  const float1Interpolate = floatAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const float2Interpolate = floatAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Loading salon details... ✨</Text>
      </View>
    );
  }

  if (!salonData) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>Salon not found 😔</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
          <Text style={styles.sparkleText}>🌟</Text>
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

        {/* Beauty Elements */}
        <Animated.View
          style={[
            styles.beautyElement1,
            { transform: [{ translateY: float1Interpolate }] },
          ]}
        >
          <Text style={styles.beautyElementText}>💄</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.beautyElement2,
            { transform: [{ translateY: float2Interpolate }] },
          ]}
        >
          <Text style={styles.beautyElementText}>💇‍♀️</Text>
        </Animated.View>

        {/* Background Orbs */}
        <View style={styles.orb1} />
        <View style={styles.orb2} />
        <View style={styles.orb3} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Salon Details</Text>
      </View>

      {/* Content */}
      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {/* Salon Hero Section */}
          <Animated.View
            style={[styles.heroSection, { transform: [{ scale: pulseAnim }] }]}
          >
            <View style={styles.salonImageContainer}>
              <View style={styles.salonImagePlaceholder}>
                <Text style={styles.salonImageIcon}>💇‍♀️</Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  salonData.opening_hours?.open_now
                    ? styles.openBadge
                    : styles.closedBadge,
                ]}
              >
                <Text style={styles.statusText}>
                  {salonData.opening_hours?.open_now ? "OPEN NOW" : "CLOSED"}
                </Text>
              </View>
            </View>

            <View style={styles.heroInfo}>
              <Text style={styles.salonName}>{salonData.name}</Text>

              <View style={styles.ratingContainer}>
                <View style={styles.starsContainer}>
                  {renderStars(salonData.rating || 0)}
                </View>
                <Text style={styles.ratingText}>
                  {salonData.rating?.toFixed(1)} (
                  {salonData.user_ratings_total || 0} reviews)
                </Text>
              </View>

              <Text style={styles.salonAddress}>📍 {salonData.vicinity}</Text>

              {salonData.description && (
                <Text style={styles.salonDescription}>
                  {salonData.description}
                </Text>
              )}
            </View>
          </Animated.View>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionCard} onPress={handleBookNow}>
              <Text style={styles.actionIcon}>📅</Text>
              <Text style={styles.actionText}>Book Now</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard} onPress={handleCall}>
              <Text style={styles.actionIcon}>📞</Text>
              <Text style={styles.actionText}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={handleGetDirections}
            >
              <Text style={styles.actionIcon}>🗺️</Text>
              <Text style={styles.actionText}>Directions</Text>
            </TouchableOpacity>
          </View>

          {/* Services Section */}
          {salonData.services && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>✨ Our Services</Text>
              <View style={styles.servicesContainer}>
                {salonData.services.map((service, index) =>
                  renderServiceItem(service, index)
                )}
              </View>
            </View>
          )}

          {/* Working Hours */}
          {salonData.working_hours && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🕐 Working Hours</Text>
              <View style={styles.hoursContainer}>
                {Object.entries(salonData.working_hours).map(([day, hours]) => (
                  <View key={day} style={styles.hourRow}>
                    <Text style={styles.dayText}>
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </Text>
                    <Text style={styles.hoursText}>{hours}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Contact Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📞 Contact Information</Text>
            <View style={styles.contactContainer}>
              {salonData.phone && (
                <View style={styles.contactRow}>
                  <Text style={styles.contactIcon}>📱</Text>
                  <Text style={styles.contactText}>{salonData.phone}</Text>
                </View>
              )}

              <View style={styles.contactRow}>
                <Text style={styles.contactIcon}>📍</Text>
                <Text style={styles.contactText}>{salonData.vicinity}</Text>
              </View>

              {salonData.website && (
                <View style={styles.contactRow}>
                  <Text style={styles.contactIcon}>🌐</Text>
                  <Text style={styles.contactText}>{salonData.website}</Text>
                </View>
              )}

              <View style={styles.contactRow}>
                <Text style={styles.contactIcon}>🏪</Text>
                <Text style={styles.contactText}>
                  Status: {salonData.business_status}
                </Text>
              </View>
            </View>
          </View>

          {/* Location Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📍 Location</Text>
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>
                Latitude: {salonData.geometry?.location?.lat?.toFixed(6)}
              </Text>
              <Text style={styles.locationText}>
                Longitude: {salonData.geometry?.location?.lng?.toFixed(6)}
              </Text>
              <TouchableOpacity
                style={styles.mapButton}
                onPress={handleGetDirections}
              >
                <Text style={styles.mapButtonText}>Open in Maps 🗺️</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Book Now Button */}
          <View style={styles.bookingSection}>
            <TouchableOpacity
              style={styles.bookNowButton}
              onPress={handleBookNow}
            >
              <Text style={styles.bookNowText}>Book Your Appointment ✨</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fef7ff",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#ec4899",
    fontWeight: "600",
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#ef4444",
    fontWeight: "600",
    marginBottom: 20,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 15 : 35,
    paddingBottom: 15,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(236, 72, 153, 0.1)",
  },
  backButton: {
    backgroundColor: "rgba(236, 72, 153, 0.1)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ec4899",
  },
  backButtonText: {
    color: "#ec4899",
    fontSize: 14,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ec4899",
  },

  // Content
  content: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  // Hero Section
  heroSection: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 25,
    padding: 25,
    marginBottom: 20,
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: "rgba(236, 72, 153, 0.1)",
  },
  salonImageContainer: {
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  salonImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f9a8d4",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  salonImageIcon: {
    fontSize: 50,
  },
  statusBadge: {
    position: "absolute",
    top: -5,
    right: width * 0.3,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  openBadge: {
    backgroundColor: "#10b981",
  },
  closedBadge: {
    backgroundColor: "#ef4444",
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },

  // Hero Info
  heroInfo: {
    alignItems: "center",
  },
  salonName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ec4899",
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 30,
  },
  ratingContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  star: {
    fontSize: 18,
    marginRight: 2,
  },
  ratingText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  salonAddress: {
    fontSize: 16,
    color: "#8b5cf6",
    textAlign: "center",
    marginBottom: 15,
    lineHeight: 20,
  },
  salonDescription: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
  },

  // Quick Actions
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    gap: 10,
  },
  actionCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(236, 72, 153, 0.1)",
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: "#ec4899",
    fontWeight: "600",
  },

  // Section Styles
  section: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(236, 72, 153, 0.1)",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ec4899",
    marginBottom: 15,
    textAlign: "center",
  },

  // Services Styles
  servicesContainer: {
    gap: 12,
  },
  serviceItem: {
    backgroundColor: "rgba(249, 168, 212, 0.1)",
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "rgba(236, 72, 153, 0.2)",
  },
  serviceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ec4899",
    flex: 1,
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#8b5cf6",
  },
  serviceDuration: {
    fontSize: 12,
    color: "#6b7280",
  },

  // Working Hours
  hoursContainer: {
    gap: 8,
  },
  hourRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "rgba(249, 168, 212, 0.05)",
    borderRadius: 10,
  },
  dayText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ec4899",
    textTransform: "capitalize",
  },
  hoursText: {
    fontSize: 14,
    color: "#6b7280",
  },

  // Contact Information
  contactContainer: {
    gap: 12,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "rgba(249, 168, 212, 0.05)",
    borderRadius: 12,
  },
  contactIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  contactText: {
    fontSize: 14,
    color: "#6b7280",
    flex: 1,
    lineHeight: 18,
  },

  // Location Section
  locationContainer: {
    gap: 10,
  },
  locationText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  mapButton: {
    backgroundColor: "#8b5cf6",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#8b5cf6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  mapButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },

  // Booking Section
  bookingSection: {
    marginTop: 10,
    marginBottom: 30,
  },
  bookNowButton: {
    backgroundColor: "#ec4899",
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  bookNowText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  // Background Sparkles
  sparkle1: {
    position: "absolute",
    top: height * 0.15,
    left: 30,
  },
  sparkle2: {
    position: "absolute",
    top: height * 0.35,
    right: 40,
  },
  sparkle3: {
    position: "absolute",
    top: height * 0.55,
    left: 50,
  },
  sparkle4: {
    position: "absolute",
    bottom: height * 0.25,
    right: 30,
  },
  sparkleText: {
    fontSize: 20,
    opacity: 0.6,
  },

  // Beauty Elements
  beautyElement1: {
    position: "absolute",
    top: height * 0.25,
    right: 20,
  },
  beautyElement2: {
    position: "absolute",
    bottom: height * 0.35,
    left: 40,
  },
  beautyElementText: {
    fontSize: 28,
    opacity: 0.3,
  },

  // Background Orbs
  orb1: {
    position: "absolute",
    top: height * 0.2,
    left: width * 0.1,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(249, 168, 212, 0.15)",
  },
  orb2: {
    position: "absolute",
    bottom: height * 0.4,
    right: width * 0.05,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(251, 113, 133, 0.1)",
  },
  orb3: {
    position: "absolute",
    top: height * 0.6,
    right: width * 0.25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(192, 132, 252, 0.2)",
  },
});

export default SalonDetails;
