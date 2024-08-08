import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  Linking,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

const customPickerOptions = [
  { label: "Restaurants", value: "restaurants" },
  { label: "Cafes", value: "cafes" },
  { label: "Bars", value: "bars" },
  { label: "Hotels", value: "hotels" },
  { label: "Tourist Attractions", value: "tourist attractions" },
];

const HomePage = () => {
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("restaurants");
  const [tempCategory, setTempCategory] = useState(selectedCategory);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const navigation = useNavigation(); 

  const handleOpenGoogleMaps = () => {
    if (locationQuery.trim() !== "") {
      const url = `https://www.google.com/maps/search/${encodeURIComponent(
        selectedCategory
      )}+near+${encodeURIComponent(locationQuery)}`;
      Linking.openURL(url);
    } else {
      Alert.alert("Input Error", "Please enter a location.");
    }
  };

  const handleDone = () => {
    setSelectedCategory(tempCategory);
    setPickerVisible(false);
  };

  const handleCancel = () => {
    setTempCategory(selectedCategory);
    setPickerVisible(false);
  };

  const handleContactUsPress = () => {
    navigation.navigate("ContactForm"); 
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Explore Places</Text>
        <Text style={styles.description}>
          Find nearby places to visit based on your interest.
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
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleOpenGoogleMaps}
          >
            <FontAwesome name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.customPickerButton}
          onPress={() => setPickerVisible(true)}
        >
          <Text style={styles.customPickerText}>
            {customPickerOptions.find(
              (option) => option.value === selectedCategory
            )?.label || "Select Category"}
          </Text>
          <FontAwesome name="chevron-down" size={16} color="#333" />
        </TouchableOpacity>
        <Modal
          transparent={true}
          visible={isPickerVisible}
          onRequestClose={handleCancel}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={handleCancel}>
                  <Text style={styles.modalHeaderText}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.modalHeaderTitle}>Select Category</Text>
                <TouchableOpacity onPress={handleDone}>
                  <Text style={styles.modalHeaderText}>Done</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={tempCategory}
                  onValueChange={(itemValue) => setTempCategory(itemValue)}
                  style={styles.picker}
                >
                  {customPickerOptions.map((option) => (
                    <Picker.Item
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => Linking.openURL("https://event-ova.vercel.app")}
      >
        <Text style={styles.linkText}>Visit Website</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={handleContactUsPress} // Use the handler here
      >
        <Text style={styles.linkText}>Contact Us</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f8",
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
  subTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    flex: 1,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  customPickerButton: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    elevation: 2,
  },
  customPickerText: {
    fontSize: 16,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    paddingBottom: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#f7f7f7",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalHeaderText: {
    fontSize: 16,
    color: "#007bff",
  },
  modalHeaderTitle: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  pickerContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  picker: {
    width: "100%",
    height: 200,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  linkButton: {
    marginBottom: 10,
    alignItems: "center",
  },
  linkText: {
    color: "#007bff",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default HomePage;
