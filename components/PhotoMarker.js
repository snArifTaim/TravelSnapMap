import React from "react";
import { Marker, Callout } from "react-native-maps";
import { View, Image, Text, StyleSheet } from "react-native";

export default function PhotoMarker({ marker }) {
  console.log(marker.coords);
  console.log(marker.photo);
  const getImageUri = (uri) => {
    if (uri.startsWith('file://')) {
      return uri;
    }
    return uri;
  };
  return (
    <Marker 
      coordinate={marker.coords}
      pinColor="yellow"
      title={marker.title || "Photo Marker"}
    >
      <Callout tooltip={true}>
        <View style={styles.calloutContainer}>
          <Image source={{ uri: getImageUri(marker.photo) }} style={styles.image} />
          <Text style={styles.text}>
             {marker.coords.latitude.toFixed(4)}, {marker.coords.longitude.toFixed(4)}
          </Text>
        </View>
      </Callout>
    </Marker>
  );
}

const styles = StyleSheet.create({
  calloutContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    width: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 180,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: "cover"
  },
  text: { 
    fontSize: 12, 
    color: "#333", 
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 4
  },
  dateText: {
    fontSize: 10,
    color: "#666",
    textAlign: "center"
  }
});