import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Alert, TouchableOpacity, Linking } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons'; 

const HomePage = () => {
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("restaurants");

  const handleOpenGoogleMaps = () => {
    if (locationQuery.trim() !== "") {
      const url = `https://www.google.com/maps/search/${encodeURIComponent(selectedCategory)}+near+${encodeURIComponent(locationQuery)}`;
      Linking.openURL(url);
    } else {
      Alert.alert("Input Error", "Please enter a location.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>lorem</Text>
        <Text style={styles.description}>
       lorem
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subTitle}>Search Nearby Places</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter location"
            value={locationQuery}
            onChangeText={setLocationQuery}
          />
          <TouchableOpacity style={styles.iconButton} onPress={handleOpenGoogleMaps}>
            <FontAwesome name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          >
            <Picker.Item label="Restaurants" value="restaurants" />
            <Picker.Item label="Cafes" value="cafes" />
            <Picker.Item label="Bars" value="bars" />
            <Picker.Item label="Hotels" value="hotels" />
            <Picker.Item label="Tourist Attractions" value="tourist attractions" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity onPress={() => Linking.openURL("https://event-ova.vercel.app")}>
        <Text style={styles.linkText}>Visit Website</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Linking.openURL("mailto:evetify@hmail.com")}>
        <Text style={styles.linkText}>Contact Us</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  pickerContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    fontWeight: "bold",
    overflow: 'hidden',
    marginBottom: 10,

  },
  picker: {
    height: 50,
    width: "100%",
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  linkText: {
    color: "#007bff",
    fontSize: 16,
    textDecorationLine: "underline",
    marginBottom: 10,
  },
});

export default HomePage;
