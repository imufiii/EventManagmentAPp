import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { AUTH } from "../firebaseConfig";

const Header: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleMenuItemPress = (item: string) => {
    setMenuVisible(false);
    if (item === "About") {
      navigation.navigate("About");
    } else if (item === "Logout") {
      handleLogout();
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(AUTH);
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Logout failed", (error as Error).message);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const menuItems = ["About", "Logout"];

  return (
    <View style={styles.container}>
      <View style={styles.leftGroup}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Eventify</Text>
      </View>
      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <Image
          source={require("../assets/images/menu_icon.png")}
          style={[styles.menuIcon, { tintColor: "#7D236C" }]}
        />
      </TouchableOpacity>
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleMenu}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <FlatList
              data={menuItems}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleMenuItemPress(item)}
                >
                  <Text style={styles.menuText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
              ListHeaderComponent={
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={toggleMenu}
                >
                  <Image
                    source={require("../assets/images/close_icon.png")}
                    style={[styles.menuIcon, { tintColor: "#7D236C" }]}
                  />
                </TouchableOpacity>
              }
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderBottomColor: "#7D236C",
    borderBottomWidth: 0.5,
    shadowColor: "#7D236C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    paddingBottom: 15,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    color: "#7D236C",
    fontWeight: "bold",
    marginLeft: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    pointerEvents: "box-none",
  },
  modalContainer: {
    width: 200,
    backgroundColor: "white",
    borderRadius: 10,
    marginRight: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    padding: 10,
    alignSelf: "flex-end",
  },
  closeButtonText: {
    fontSize: 24,
    color: "#7D236C",
    fontWeight: "bold",
  },
  menuItem: {
    padding: 10,
  },
  menuText: {
    fontSize: 18,
    color: "#333",
  },
});

export default Header;
