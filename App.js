import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import MapViewComponent from "./components/MapViewComponent";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <MapViewComponent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});
