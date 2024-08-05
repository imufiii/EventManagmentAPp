import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";

interface FormProps {
  onAddTask: (taskDescription: string, taskDate: string, taskTime: string) => void;
}

const Form: React.FC<FormProps> = ({ onAddTask }) => {
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [taskDate, setTaskDate] = useState<string>("");
  const [taskTime, setTaskTime] = useState<string>("");

  const handleAddTask = () => {
    if (!taskDescription.trim() || !taskDate.trim() || !taskTime.trim()) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    onAddTask(taskDescription, taskDate, taskTime);
    setTaskDescription("");
    setTaskDate("");
    setTaskTime("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Event Description"
        value={taskDescription}
        onChangeText={setTaskDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={taskDate}
        onChangeText={setTaskDate}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Time (HH:MM)"
        value={taskTime}
        onChangeText={setTaskTime}
        keyboardType="numeric"
      />
      <Button title="Add Task" onPress={handleAddTask} color="#007bff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 10,
    marginBottom: 20,
    
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },

});

export default Form;
