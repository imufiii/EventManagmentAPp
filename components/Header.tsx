import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftGroup}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Event Manager App</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomColor: "#0061FF",
    borderBottomWidth: 3,
    paddingBottom: 10,
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    color: "#0061FF",
    fontWeight: "bold",
    alignSelf: "flex-end",
    marginLeft: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
});

export default Header;
