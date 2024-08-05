import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import CompletedTasks from "./CompletedTask";
import OpenTasks from "./ OpenTasks";

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
    padding: 10,
  },
  section: {
    marginBottom: 20,
  },
  headerBar: {
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Tasks;
