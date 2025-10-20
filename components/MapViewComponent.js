import React, { useEffect, useState } from "react";
import { View, Button, Alert, StyleSheet } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import PhotoMarker from "./PhotoMarker";

export default function MapViewComponent() {
  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState([]);

  // Request permissions and get current position
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        return;
      }

      const { status: camStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: libStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (camStatus !== "granted" || libStatus !== "granted") {
        Alert.alert("Permission Denied", "Camera and media access required.");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  // Pick from gallery or take photo
const choosePhoto = async () => {
  Alert.alert("Select Photo", "Choose an option", [
    {
      text: "Camera",
      onPress: async () => {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
        });

        if (!result.canceled && result.assets?.length > 0) {
          addMarker(result.assets[0].uri);
        }
      },
    },
    {
      text: "Gallery",
      onPress: async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
        });

        if (!result.canceled && result.assets?.length > 0) {
          addMarker(result.assets[0].uri);
        }
      },
    },
    { text: "Cancel", style: "cancel" },
  ]);
};

// Add Marker
const addMarker = (photoUri) => {
  if (!location) return;
  
  setMarkers((prev) => [
    ...prev,
    {
      id: Date.now().toString(),
      coords: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
      photo: photoUri,
      title: `Photo ${prev.length + 1}` 
    },
    
  ]);
  Alert.alert("Photo Added", "Your photo has been added to the map!");
};


  if (!location) {
    return (
      <View style={styles.centered}>
        <Button title="Loading location..." disabled />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={location}>
    {/* Blue Marker - Current Location (Always Show) */}
    {location && (
      <Marker coordinate={location} title="You are here" pinColor="blue" />
    )}
    
    {/* Photo Markers - Only show if they have photo */}
    {markers.map((marker) => {
      // Check if marker has valid photo and coordinates
      if (marker.photo && marker.coords && marker.coords.latitude && marker.coords.longitude) {
        return <PhotoMarker key={marker.id} marker={marker} />;
      } else {
        // Debug marker jodi photo na thake
        console.log("Invalid marker:", marker);
        return null; // Or show a simple marker
      }
    })}
  </MapView>

      <View style={styles.btnContainer}>
        <Button title="Add Photo" onPress={choosePhoto} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  btnContainer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
