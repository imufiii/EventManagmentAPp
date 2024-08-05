import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface TaskProps {
  id: string;
  description: string;
  done: boolean;
  date: string;
  time: string;
}

interface TaskComponentProps {
  task: TaskProps;
  onStatusChange: (id: string) => void;
  onTaskRemoval: (id: string) => void;
}

const Task: React.FC<TaskComponentProps> = ({ task, onStatusChange, onTaskRemoval }) => {
  return (
    <View style={styles.taskContainer}>
      <Text style={[styles.taskDescription, task.done && styles.taskDone]}>
        {task.description}
      </Text>
      <Text>{task.date} - {task.time}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => onStatusChange(task.id)} style={styles.button}>
          <Text style={styles.buttonText}>{task.done ? "Undo" : "Done"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTaskRemoval(task.id)} style={styles.button}>
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  taskDescription: {
    fontSize: 16,
  },
  taskDone: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default Task;
