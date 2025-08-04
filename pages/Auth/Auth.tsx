import { usePopup } from "@/hooks/usePopup";
import { useLoginMutation, useSignupMutation } from "@/lib/slices/authSlice";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

// Type definitions
interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  fullName?: string;
}

interface GlamMeAuthProps {
  isLogin?: boolean;
  onSubmit?: (formData: FormData, isLogin: boolean) => void;
}

const GlamMeAuth: React.FC<GlamMeAuthProps> = ({
  isLogin = false,

  onSubmit,
}) => {
  // Form state
  const [
    login,
    {
      isLoading: loginModeLoading,
      isError: loginModeError,
      error: loginError,
      isSuccess: loginModeSuccess,
    },
  ] = useLoginMutation();

  const [
    signup,
    {
      isLoading: isSignupLoading,
      isError: isSignupError,
      error: signupError,
      isSuccess: isSignupSuccess,
    },
  ] = useSignupMutation();
  console.log({
    isLoading: isSignupLoading,
    isError: isSignupError,
    error: signupError,
    isSuccess: isSignupSuccess,
  });
  console.log(signupError);
  const [loginMode, setLoginMode] = useState<boolean>(isLogin || false);
  const { showPopup, PopupComponent } = usePopup();
  const [formData, setFormData] = useState<FormData>({
    email: "info.waseem1234@gmail.com",
    password: "123456",
    confirmPassword: "123456",
    fullName: "Waseem",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Animation refs
  const sparkleAnim1 = useRef(new Animated.Value(0)).current;
  const sparkleAnim2 = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animations
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

    const floatAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );

    sparkleAnimation1.start();
    sparkleAnimation2.start();
    floatAnimation.start();

    // Slide in animation when component mounts
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    return () => {
      sparkleAnimation1.stop();
      sparkleAnimation2.stop();
      floatAnimation.stop();
    };
  }, []);
  const onToggleAuth = () => {
    setLoginMode(!loginMode);
  };

  // Reset form when switching between login/signup
  useEffect(() => {
    setFormData({
      email: "info.waseem1234@gmail.com",
      password: "123456",
      confirmPassword: "123456",
      fullName: "Waseem",
    });
    setErrors({});
  }, [loginMode]);

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Signup-specific validations
    if (!loginMode) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      } else if (formData.fullName.trim().length < 2) {
        newErrors.fullName = "Full name must be at least 2 characters";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) return;
    setIsLoading(true);

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

    try {
      if (loginMode) {
        const response = await login({
          email: formData.email,
          password: formData.password,
        }).unwrap();

        showPopup(response?.message || "Login successful!");
        if (onSubmit) onSubmit(formData, true);
      } else {
        const response = await signup({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        }).unwrap();

        showPopup(response?.message || "Signup successful!");
        if (onSubmit) onSubmit(formData, false);
      }
    } catch (error: any) {
      const errMsg =
        error?.data?.message ||
        error?.error ||
        (loginMode ? "Login failed" : "Signup failed");

      showPopup(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (): void => {
    console.log("Forgot password pressed");
    // Add your forgot password logic here
  };

  const handleSocialLogin = (provider: "google" | "facebook"): void => {
    console.log(`${provider} login pressed`);
    // Add your social login logic here
  };

  const floatInterpolate = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });

  const slideInterpolate = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <PopupComponent />
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={styles.background}>
        {/* Animated Background Elements */}
        <View style={styles.backgroundElements}>
          <Animated.View
            style={[
              styles.sparkle1,
              {
                opacity: sparkleAnim1,
                transform: [{ translateY: floatInterpolate }],
              },
            ]}
          >
            <Text style={styles.sparkleText}>✨</Text>
          </Animated.View>

          <Animated.View style={[styles.sparkle2, { opacity: sparkleAnim2 }]}>
            <Text style={styles.sparkleText}>💫</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.sparkle3,
              {
                opacity: sparkleAnim1,
                transform: [{ translateY: floatInterpolate }],
              },
            ]}
          >
            <Text style={styles.sparkleText}>💖</Text>
          </Animated.View>

          <View style={styles.orb1} />
          <View style={styles.orb2} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <Animated.View
            style={[
              styles.header,
              { transform: [{ translateY: slideInterpolate }] },
            ]}
          >
            <Text style={styles.logoText}>GlamMe</Text>
            <Text style={styles.welcomeText}>
              {loginMode
                ? "Welcome back, beautiful!"
                : "Join the beauty revolution!"}
            </Text>
          </Animated.View>

          {/* Auth Form */}
          <Animated.View
            style={[
              styles.formContainer,
              {
                opacity: slideAnim,
                transform: [{ translateY: slideInterpolate }],
              },
            ]}
          >
            <View style={styles.form}>
              {/* Full Name (Signup only) */}
              {!loginMode && (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Full Name</Text>
                  <TextInput
                    style={[styles.input, errors.fullName && styles.inputError]}
                    placeholder="Enter your beautiful name"
                    placeholderTextColor="#d1d5db"
                    value={formData.fullName}
                    onChangeText={(text: string) =>
                      handleInputChange("fullName", text)
                    }
                    autoCapitalize="words"
                    textContentType="name"
                    returnKeyType="next"
                  />
                  {errors.fullName && (
                    <Text style={styles.errorText}>{errors.fullName}</Text>
                  )}
                </View>
              )}

              {/* Email */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  placeholder="Enter your email"
                  placeholderTextColor="#d1d5db"
                  value={formData.email}
                  onChangeText={(text: string) =>
                    handleInputChange("email", text)
                  }
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="emailAddress"
                  returnKeyType="next"
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              {/* Password */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={[styles.input, errors.password && styles.inputError]}
                  placeholder="Enter your password"
                  placeholderTextColor="#d1d5db"
                  value={formData.password}
                  onChangeText={(text: string) =>
                    handleInputChange("password", text)
                  }
                  secureTextEntry
                  autoCapitalize="none"
                  textContentType={loginMode ? "password" : "newPassword"}
                  returnKeyType={loginMode ? "done" : "next"}
                />
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              {/* Confirm Password (Signup only) */}
              {!loginMode && (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Confirm Password</Text>
                  <TextInput
                    style={[
                      styles.input,
                      errors.confirmPassword && styles.inputError,
                    ]}
                    placeholder="Confirm your password"
                    placeholderTextColor="#d1d5db"
                    value={formData.confirmPassword}
                    onChangeText={(text: string) =>
                      handleInputChange("confirmPassword", text)
                    }
                    secureTextEntry
                    autoCapitalize="none"
                    textContentType="newPassword"
                    returnKeyType="done"
                  />
                  {errors.confirmPassword && (
                    <Text style={styles.errorText}>
                      {errors.confirmPassword}
                    </Text>
                  )}
                </View>
              )}

              {/* Forgot Password (Login only) */}
              {loginMode && (
                <TouchableOpacity
                  style={styles.forgotPassword}
                  onPress={handleForgotPassword}
                >
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              )}

              {/* Submit Button */}
              <Animated.View
                style={[
                  styles.buttonContainer,
                  { transform: [{ scale: buttonScale }] },
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    isLoading && styles.submitButtonDisabled,
                  ]}
                  onPress={handleSubmit}
                  disabled={isLoading}
                  activeOpacity={0.8}
                >
                  <Text style={styles.submitButtonText}>
                    {isLoading
                      ? loginMode
                        ? "Signing In..."
                        : "Creating Account..."
                      : loginMode
                      ? "Sign In ✨"
                      : "Create Account ✨"}
                  </Text>
                </TouchableOpacity>
              </Animated.View>

              {/* Social Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Login Buttons */}
              <View style={styles.socialContainer}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin("google")}
                >
                  <Text style={styles.socialButtonText}>
                    📧 Continue with Google
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin("facebook")}
                >
                  <Text style={styles.socialButtonText}>
                    📱 Continue with Facebook
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Switch Auth Mode */}
              <View style={styles.switchContainer}>
                <Text style={styles.switchText}>
                  {loginMode
                    ? "Don't have an account? "
                    : "Already have an account? "}
                </Text>
                <TouchableOpacity onPress={onToggleAuth}>
                  <Text style={styles.switchLink}>
                    {loginMode ? "Sign Up" : "Sign In"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 40 : 40,
    paddingBottom: 40,
  },

  // Header
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoText: {
    fontSize: width * 0.12,
    fontWeight: "bold",
    color: "#ec4899",
    textShadowColor: "rgba(236, 72, 153, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    letterSpacing: 1,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    fontWeight: "300",
  },

  // Form
  formContainer: {
    flex: 1,
  },
  form: {
    backgroundColor: "#ffffff",
    borderRadius: 25,
    padding: 24,
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: "rgba(236, 72, 153, 0.1)",
  },

  // Input Fields
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ec4899",
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "#fce7f3",
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#374151",
    borderWidth: 1,
    borderColor: "rgba(236, 72, 153, 0.2)",
  },
  inputError: {
    borderColor: "#ef4444",
    backgroundColor: "#fef2f2",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    fontWeight: "500",
  },

  // Forgot Password
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#ec4899",
    fontSize: 14,
    fontWeight: "500",
  },

  // Submit Button
  buttonContainer: {
    marginBottom: 24,
  },
  submitButton: {
    backgroundColor: "#ec4899",
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  submitButtonDisabled: {
    backgroundColor: "#d1d5db",
    shadowOpacity: 0.1,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  // Divider
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#9ca3af",
    fontSize: 14,
    fontWeight: "500",
  },

  // Social Buttons
  socialContainer: {
    marginBottom: 24,
  },
  socialButton: {
    backgroundColor: "#f9fafb",
    borderRadius: 15,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  socialButtonText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "500",
  },

  // Switch Auth Mode
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  switchText: {
    color: "#6b7280",
    fontSize: 14,
  },
  switchLink: {
    color: "#ec4899",
    fontSize: 14,
    fontWeight: "600",
  },

  // Background Elements
  sparkle1: {
    position: "absolute",
    top: height * 0.1,
    left: 30,
  },
  sparkle2: {
    position: "absolute",
    top: height * 0.2,
    right: 40,
  },
  sparkle3: {
    position: "absolute",
    bottom: height * 0.15,
    left: 50,
  },
  sparkleText: {
    fontSize: 20,
  },
  orb1: {
    position: "absolute",
    top: height * 0.15,
    left: width * 0.1,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(249, 168, 212, 0.15)",
  },
  orb2: {
    position: "absolute",
    bottom: height * 0.2,
    right: width * 0.1,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(251, 113, 133, 0.1)",
  },
});

export default GlamMeAuth;
