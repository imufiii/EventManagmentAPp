import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

const About: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../assets/images/about_us.png")}
        style={styles.image}
      />
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.text}>Welcome to the Eventify</Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
});

export default About;
