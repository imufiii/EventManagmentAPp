import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
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
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.text}>Welcome to the Event Manager App!</Text>
      <Text style={styles.text}>
        This app helps you efficiently manage your tasks and events. You can
        add, update, and remove events, and keep track of their statuses.
        Whether you're planning a party, a meeting, or just organizing your
        schedule, this app is designed to make your life easier.
      </Text>
      <Text style={styles.text}>Features:</Text>
      <Text style={styles.text}>
        - Add new events with descriptions, dates, and times
      </Text>
      <Text style={styles.text}>
        - Update the status of events to keep track of their progress
      </Text>
      <Text style={styles.text}>- Remove events that are no longer needed</Text>
      <Text style={styles.text}>
        We hope you find this app useful and easy to use. If you have any
        feedback or suggestions, please let us know!
      </Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FF4D4D",
    borderRadius: 5,
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});

export default About;
