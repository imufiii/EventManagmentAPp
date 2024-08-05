import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { View, Alert } from "react-native";
import { FontAwesome, FontAwesome5, Entypo } from "@expo/vector-icons";
import { loadTasks, addTask, updateTask, removeTask, TaskProps } from "../components/databse"; 
import Header from "../components/Header";

import Screen1 from "../components/Screen1";
import Tasks from "../components/Tasks";
import Form from "../components/Form";

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const handleAddTask = async (taskDescription: string, taskDate: string, taskTime: string) => {
    const newTask: Omit<TaskProps, 'id'> = {
      description: taskDescription,
      done: false,
      date: taskDate,
      time: taskTime,
    };

    try {
     
      const docRef = await addTask(newTask);
      
      const newTaskWithId = { id: docRef.id, ...newTask };
      setTasks([...tasks, newTaskWithId]); 
    } catch (error) {
      Alert.alert("Ooops", "Failed to add Event. Please try again.");
    }
  };

  const handleStatusChange = async (id: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.done = !task.done;
      }
      return task;
    });

    setTasks(updatedTasks); 

    const updatedTask = updatedTasks.find((task) => task.id === id);
    if (updatedTask) {
      try {
        await updateTask(updatedTask);
      } catch (error) {
        Alert.alert("Ooops", "Failed to update Event status. Please try again.");
      }
    }
  };

  const handleTaskRemoval = async (id: string) => {
   

    try {
      await removeTask(id); 
      setTasks(tasks.filter((task) => task.id !== id)); 
    } catch (error) {
      Alert.alert("Ooops", "Failed to remove Event. Please try again.");
      
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const loadedTasks = await loadTasks(); 
        setTasks(loadedTasks); 
      } catch (error) {
        Alert.alert("Ooops", "Failed to load Events. Please try again.");
      }
    };

    fetchTasks();
  }, []);

  return (
    <NavigationContainer independent={true}>
        <View style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <Header />
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Screen1}
          options={{
            tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} />,headerShown: false 
          }}
        />
        <Tab.Screen
          name="Events" 
          children={() => <Tasks tasks={tasks} onStatusChange={handleStatusChange} onTaskRemoval={handleTaskRemoval} />}
          options={{ 
            tabBarIcon: ({ color, size }) => <FontAwesome5 name="calendar-alt" size={size} color={color} />, headerShown: false 
          }}
        />
        <Tab.Screen
          name="Form"
          children={() => <Form onAddTask={handleAddTask} />}
          options={{
            tabBarIcon: ({ color, size }) => <Entypo name="add-to-list" size={size} color={color} />,headerShown: false 
          }}
        />
      </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default App;
