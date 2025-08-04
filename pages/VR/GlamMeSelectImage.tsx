import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const GlamMeSelectImage = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  // Animation refs
  const sparkleAnim1 = useRef(new Animated.Value(0)).current;
  const sparkleAnim2 = useRef(new Animated.Value(0)).current;
  const sparkleAnim3 = useRef(new Animated.Value(0)).current;
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Button animation refs
  const cameraScale = useRef(new Animated.Value(1)).current;
  const galleryScale = useRef(new Animated.Value(1)).current;
  const continueScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    startAnimations();
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(
        status === "granted" && cameraStatus.status === "granted"
      );
    } catch (error) {
      console.log("Permission request error:", error);
      setHasPermission(false);
    }
  };

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
        duration: 15000,
        useNativeDriver: true,
      })
    ).start();
  };

  const handleButtonPress = (action, scaleAnim) => {
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

    if (action === "camera") {
      openCamera();
    } else if (action === "gallery") {
      openGallery();
    } else if (action === "continue") {
      handleContinue();
    }
  };

  const openCamera = async () => {
    console.log("🔍 [SelectImage] Opening camera");

    if (!hasPermission) {
      Alert.alert(
        "Permission Required",
        "Camera permission is needed to take photos.",
        [{ text: "OK" }]
      );
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
        console.log("✅ [SelectImage] Camera photo selected");
      }
    } catch (error) {
      console.error("❌ [SelectImage] Camera error:", error);
      Alert.alert("Error", "Failed to open camera. Please try again.");
    }
  };

  const openGallery = async () => {
    console.log("🔍 [SelectImage] Opening gallery");

    if (!hasPermission) {
      Alert.alert(
        "Permission Required",
        "Gallery permission is needed to select photos.",
        [{ text: "OK" }]
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
        console.log("✅ [SelectImage] Gallery photo selected");
      }
    } catch (error) {
      console.error("❌ [SelectImage] Gallery error:", error);
      Alert.alert("Error", "Failed to open gallery. Please try again.");
    }
  };

  const handleContinue = () => {
    if (!selectedImage) {
      Alert.alert("No Image Selected", "Please select an image to continue.");
      return;
    }

    console.log("🔍 [SelectImage] Continuing with selected image");
    try {
      // Navigate to makeup application page with the selected image
      router.push({
        pathname: "/makeup-studio",
        params: { imageUri: selectedImage },
      } as any);
      console.log("✅ [SelectImage] Navigation successful");
    } catch (error) {
      console.error("❌ [SelectImage] Navigation failed:", error);
    }
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
      <ScrollView showsVerticalScrollIndicator={false}>
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
            <Text style={styles.sparkleText}>📸</Text>
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

          {/* Camera Elements */}
          <Animated.View
            style={[
              styles.cameraElement1,
              {
                transform: [
                  { translateY: float1Interpolate },
                  { rotate: rotateInterpolate },
                ],
              },
            ]}
          >
            <Text style={styles.cameraText}>📷</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.cameraElement2,
              { transform: [{ translateY: float2Interpolate }] },
            ]}
          >
            <Text style={styles.cameraText}>🖼️</Text>
          </Animated.View>

          {/* Background Orbs */}
          <View style={styles.orb1} />
          <View style={styles.orb2} />
          <View style={styles.orb3} />
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Animated.View
              style={[
                styles.logoContainer,
                { transform: [{ scale: pulseAnim }] },
              ]}
            >
              <Text style={styles.logoText}>Choose Your Photo</Text>
            </Animated.View>
            <Text style={styles.subtitle}>
              Select a photo to start your virtual makeup journey
            </Text>
          </View>

          {/* Image Preview */}
          {selectedImage && (
            <View style={styles.imagePreviewContainer}>
              <Animated.View
                style={[
                  styles.imagePreview,
                  { transform: [{ scale: pulseAnim }] },
                ]}
              >
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.previewImage}
                />
                <View style={styles.imageOverlay}>
                  <Text style={styles.imageOverlayText}>Perfect! ✨</Text>
                </View>
              </Animated.View>
            </View>
          )}

          {/* Selection Options */}
          <View style={styles.optionsContainer}>
            {/* Camera Option */}
            <Animated.View
              style={[
                styles.optionWrapper,
                { transform: [{ scale: cameraScale }] },
              ]}
            >
              <TouchableOpacity
                style={[styles.optionCard, styles.cameraCard]}
                onPress={() => handleButtonPress("camera", cameraScale)}
                activeOpacity={0.8}
              >
                <View style={styles.optionIconContainer}>
                  <Animated.View
                    style={[
                      styles.optionIcon,
                      styles.cameraIcon,
                      { transform: [{ rotate: rotateInterpolate }] },
                    ]}
                  >
                    <Text style={styles.optionIconText}>📷</Text>
                  </Animated.View>
                </View>
                <Text style={styles.optionTitle}>Take Photo</Text>
                <Text style={styles.optionDescription}>
                  Capture a new selfie with your camera for real-time makeup
                  application
                </Text>
                <View style={styles.optionButton}>
                  <Text style={styles.optionButtonText}>Open Camera 📸</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>

            {/* Gallery Option */}
            <Animated.View
              style={[
                styles.optionWrapper,
                { transform: [{ scale: galleryScale }] },
              ]}
            >
              <TouchableOpacity
                style={[styles.optionCard, styles.galleryCard]}
                onPress={() => handleButtonPress("gallery", galleryScale)}
                activeOpacity={0.8}
              >
                <View style={styles.optionIconContainer}>
                  <Animated.View
                    style={[
                      styles.optionIcon,
                      styles.galleryIcon,
                      { transform: [{ translateY: float1Interpolate }] },
                    ]}
                  >
                    <Text style={styles.optionIconText}>🖼️</Text>
                  </Animated.View>
                </View>
                <Text style={styles.optionTitle}>Choose from Gallery</Text>
                <Text style={styles.optionDescription}>
                  Select a beautiful photo from your gallery to enhance with
                  makeup
                </Text>
                <View style={styles.optionButton}>
                  <Text style={styles.optionButtonText}>Browse Gallery 🌟</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* Continue Button */}
          {selectedImage && (
            <Animated.View
              style={[
                styles.continueContainer,
                { transform: [{ scale: continueScale }] },
              ]}
            >
              <TouchableOpacity
                style={styles.continueButton}
                onPress={() => handleButtonPress("continue", continueScale)}
                activeOpacity={0.8}
              >
                <Text style={styles.continueButtonText}>
                  Continue to Makeup Studio ✨
                </Text>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* Tips Section */}
          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>💡 Pro Tips</Text>
            <View style={styles.tipsList}>
              <Text style={styles.tipItem}>
                📸 Use good lighting for best results
              </Text>
              <Text style={styles.tipItem}>😊 Face the camera directly</Text>
              <Text style={styles.tipItem}>
                ✨ Ensure your face is clearly visible
              </Text>
            </View>
          </View>
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
  backgroundElements: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 40,
    paddingBottom: 20,
  },

  // Header Styles
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoContainer: {
    marginBottom: 15,
  },
  logoText: {
    fontSize: width * 0.08,
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
    lineHeight: 22,
    paddingHorizontal: 20,
  },

  // Image Preview
  imagePreviewContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  imagePreview: {
    width: 200,
    height: 250,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(236, 72, 153, 0.9)",
    paddingVertical: 10,
    alignItems: "center",
  },
  imageOverlayText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  // Options Container
  optionsContainer: {
    marginBottom: 30,
  },
  optionWrapper: {
    marginBottom: 20,
  },
  optionCard: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 2,
  },
  cameraCard: {
    borderColor: "rgba(236, 72, 153, 0.3)",
  },
  galleryCard: {
    borderColor: "rgba(139, 92, 246, 0.3)",
  },

  // Option Icon
  optionIconContainer: {
    marginBottom: 15,
  },
  optionIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  cameraIcon: {
    backgroundColor: "#f9a8d4",
  },
  galleryIcon: {
    backgroundColor: "#c084fc",
  },
  optionIconText: {
    fontSize: 35,
  },

  // Option Content
  optionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ec4899",
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  optionDescription: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  optionButton: {
    backgroundColor: "#ec4899",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  optionButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  // Continue Button
  continueContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  continueButton: {
    backgroundColor: "#8b5cf6",
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 30,
    shadowColor: "#8b5cf6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  continueButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1,
  },

  // Tips Section
  tipsSection: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ec4899",
    marginBottom: 12,
    textAlign: "center",
  },
  tipsList: {
    alignItems: "flex-start",
  },
  tipItem: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
    lineHeight: 20,
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
    fontSize: 24,
  },

  // Camera Elements
  cameraElement1: {
    position: "absolute",
    top: height * 0.2,
    right: 20,
  },
  cameraElement2: {
    position: "absolute",
    bottom: height * 0.25,
    left: 40,
  },
  cameraText: {
    fontSize: 28,
    opacity: 0.4,
  },

  // Background Orbs
  orb1: {
    position: "absolute",
    top: height * 0.18,
    left: width * 0.15,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(249, 168, 212, 0.2)",
  },
  orb2: {
    position: "absolute",
    bottom: height * 0.35,
    right: width * 0.1,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(251, 113, 133, 0.15)",
  },
  orb3: {
    position: "absolute",
    top: height * 0.5,
    right: width * 0.2,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(192, 132, 252, 0.25)",
  },
});

export default GlamMeSelectImage;
