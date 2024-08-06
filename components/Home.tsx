import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, TextInput, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';

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
        <Text style={styles.title}>Gemstone Event Management Inc. (GEM)</Text>
        <Text style={styles.description}>
          GEM specializes in Virtual, Hybrid & In-Person Events. If you’ll be hosting an event in London or the area,
          they can assist with the planning, managing, and executing of your event, whether it’s virtual, hybrid, or
          in-person. Contact them for a consultation and discuss the goals & objectives of your event so they can offer
          some creative options and bring them to reality. Events are important, staying connected with their people is
          important now, more than ever.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => Linking.openURL("http://www.gemstone-events.com")}>
        <Text style={styles.buttonText}>Visit Website</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => Linking.openURL("mailto:info@gemstone-events.com")}>
        <Text style={styles.buttonText}>Contact Us</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.subTitle}>Search Nearby Places</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter location"
          value={locationQuery}
          onChangeText={setLocationQuery}
        />
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
        <TouchableOpacity style={styles.button} onPress={handleOpenGoogleMaps}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
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
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
    marginBottom: 10,
    fontSize: 16,
  },
  pickerContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },
});

export default HomePage;
