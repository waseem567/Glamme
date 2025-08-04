import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export const usePopup = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const showPopup = (msg: string) => {
    setMessage(msg);
    setVisible(true);
  };

  const hidePopup = () => {
    setVisible(false);
    setMessage("");
  };

  const PopupComponent = () => (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.messageRow}>
            <Ionicons name="alert-circle" size={26} color="#EF4444" />
            <Text style={styles.messageText}>{message}</Text>
          </View>
          <TouchableOpacity style={styles.okButton} onPress={hidePopup}>
            <Text style={styles.okButtonText}>Okay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return { showPopup, PopupComponent };
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: width * 0.9,
    maxWidth: 400,
    elevation: 10,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  messageText: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937", // Tailwind: text-gray-800
    marginLeft: 10,
  },
  okButton: {
    alignSelf: "flex-end",
    marginTop: 20,
    backgroundColor: "black",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  okButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
});
