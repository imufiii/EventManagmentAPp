import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { AUTH } from "../firebaseConfig";

const About: React.FC = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(AUTH);
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Logout failed", (error as Error).message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../assets/images/about_us.png")}
        style={styles.image}
      />
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.text}>Welcome to the Event Manager App!</Text>
      <Text style={styles.text}>
        This app helps you efficiently manage your tasks and events. You can
        add, update, and remove events, and keep track of their statuses.
        Whether you're planning a party, a meeting, or just organizing your
        schedule, this app is designed to make your life easier.
      </Text>
      <Text style={styles.subtitle}>Features:</Text>
      <View style={styles.featureList}>
        <Text style={styles.featureItem}>
          • Add new events with descriptions, dates, and times
        </Text>
        <Text style={styles.featureItem}>
          • Update the status of events to keep track of their progress
        </Text>
        <Text style={styles.featureItem}>
          • Remove events that are no longer needed
        </Text>
      </View>
      <Text style={styles.text}>
        We hope you find this app useful and easy to use. If you have any
        feedback or suggestions, please let us know!
      </Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  featureList: {
    marginBottom: 16,
    width: "100%",
    paddingHorizontal: 20,
  },
  featureItem: {
    fontSize: 16,
    color: "#555",
    marginBottom: 6,
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderColor: "#FF4D4D",
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: "transparent",
    width: "100%",
    alignItems: "center",
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#FF4D4D",
    textAlign: "center",
  },
});

export default About;
