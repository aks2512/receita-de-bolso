import React from "react";
import { ActivityIndicator, Modal, StyleSheet, Text } from "react-native";
import { ThemedView } from "./themed-view";

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

export function LoadingOverlay({
  visible,
  message = "Lendo dados com IA...",
}: LoadingOverlayProps) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <ThemedView style={styles.overlayContainer}>
        <ThemedView style={styles.alertBox}>
          <ActivityIndicator size="large" color="#FFA807" />
          <Text style={styles.alertText}>{message}</Text>
          <Text style={styles.subText}>Isso pode levar alguns segundos.</Text>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo escurecido semi-transparente
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    backgroundColor: "#FFF",
    padding: 25,
    borderRadius: 16,
    alignItems: "center",
    width: "80%",
    maxWidth: 300,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  alertText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  subText: {
    marginTop: 5,
    fontSize: 12,
    color: "#777",
    textAlign: "center",
  },
});
