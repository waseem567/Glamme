import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Hi() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333",
  },
});
