import React from "react";
import { ScrollView, View, Image, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import Task from "./Task";

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

const OpenTasks: React.FC<OpenTasksProps> = ({ tasks, onStatusChange, onTaskRemoval }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {tasks.map(task => (
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
      ))}
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
});

export default OpenTasks;
