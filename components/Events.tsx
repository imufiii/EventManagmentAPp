import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import CompletedTasks from "./CompletedEvents";
import OpenTasks from "./OpenEvents";

interface TaskProps {
  id: string;
  description: string;
  done: boolean;
  date: string;
  time: string;
}

interface TasksProps {
  tasks: TaskProps[];
  onStatusChange: (id: string) => void;
  onTaskRemoval: (id: string) => void;
}

const Tasks: React.FC<TasksProps> = ({ tasks, onStatusChange, onTaskRemoval }) => {
  const completedTasks = tasks.filter(task => task.done);
  const openTasks = tasks.filter(task => !task.done);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <View style={styles.headerBar}>
          <Text style={styles.header}>Completed Events</Text>
        </View>
        <CompletedTasks
          tasks={completedTasks}
          onStatusChange={onStatusChange}
          onTaskRemoval={onTaskRemoval}
        />
      </View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <View style={styles.headerBar}>
          <Text style={styles.header}>Upcoming Events</Text>
        </View>
        <OpenTasks
          tasks={openTasks}
          onStatusChange={onStatusChange}
          onTaskRemoval={onTaskRemoval}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15, 
  },
  section: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9', 
    borderRadius: 8, 
    elevation: 1, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 2, 
  },
  headerBar: {
    marginBottom: 10,
    backgroundColor: '#e0e0e0', 
    borderRadius: 4, 
    padding: 10, 
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333', 
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc', 
    marginVertical: 15,
  },
});

export default Tasks;