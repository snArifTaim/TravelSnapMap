import React from "react";
import { Marker, Callout } from "react-native-maps";
import { View, Image, Text, StyleSheet } from "react-native";

export default function PhotoMarker({ marker }) {

  return (
    <Marker 
      coordinate={marker.coords}
      pinColor="red"
      title="Photo Location"
      description="Tap to view"
    >
      <Callout>
        <View style={styles.calloutContainer}>
          <Text style={styles.testText}>Testing Callout - Can you see this?</Text>
          
          {marker.photo ? (
            <Image 
              source={{ uri: marker.photo }} 
              style={styles.image}
            />
          ) : (
            <Text style={styles.errorText}>No photo available</Text>
          )}
          
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
    padding: 10,
    alignItems: "center",
    width: 200,
  },
  image: {
    width: 180,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f0f0f0', // Background color for visibility
  },
  text: { 
    fontSize: 12, 
    color: "#333", 
    textAlign: "center",
  },
  testText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  }
});