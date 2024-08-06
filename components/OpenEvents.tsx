import React from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import Task from "./Event";

interface TaskProps {
  id: string;
  description: string;
  done: boolean;
  date: string;
  time: string;
}

interface OpenTasksProps {
  tasks: TaskProps[];
  onStatusChange: (id: string) => void;
  onTaskRemoval: (id: string) => void;
}

const OpenTasks: React.FC<OpenTasksProps> = ({
  tasks,
  onStatusChange,
  onTaskRemoval,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {tasks.length === 0 ? (
        <View style={styles.noTasksContainer}>
          <Text style={styles.noTasksText}>No upcoming events</Text>
          <Text style={styles.helpText}> Add new events to see them here</Text>
        </View>
      ) : (
        tasks.map((task) => (
          <Card containerStyle={styles.card} key={task.id}>
            <Image
              source={require("../assets/images/Open.jpg")}
              style={styles.image}
            />
            <Task
              task={task}
              onStatusChange={onStatusChange}
              onTaskRemoval={onTaskRemoval}
            />
          </Card>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  card: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  noTasksContainer: {
    alignItems: "center",
    padding: 20,
  },
  noTasksText: {
    fontSize: 14,
    color: "#666",
  },
  helpText: {
    fontSize: 14,
    color: "#666",
  },
});

export default OpenTasks;
