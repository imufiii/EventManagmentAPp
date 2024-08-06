import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { View, Alert } from "react-native";
import { FontAwesome,Ionicons } from "@expo/vector-icons";
import { AUTH } from "../firebaseConfig";
import {
  loadTasks,
  addTask,
  updateTask,
  removeTask,
  TaskProps,
} from "../components/databse";
import Header from "../components/Header";
import Screen1 from "../components/Home";
import Tasks from "../components/Events";
import Form from "../components/AddEvents";
import Login from "../components/Login";
import Signup from "../components/Signup";
import About from "../components/About";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeTabs: React.FC<{
  tasks: TaskProps[];
  handleStatusChange: (id: string) => void;
  handleTaskRemoval: (id: string) => void;
  handleAddTask: (
    taskDescription: string,
    taskDate: string,
    taskTime: string
  ) => void;
}> = ({ tasks, handleStatusChange, handleTaskRemoval, handleAddTask }) => (
  <>
    <Header />
    <Tab.Navigator  screenOptions={{
          tabBarActiveTintColor: '#7D236C',
          tabBarInactiveTintColor: '#8e8e8e',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
          tabBarStyle: {
            backgroundColor: '#f8f8f8',
          }
        }}>
      <Tab.Screen
        name="Home"
        component={Screen1}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons 
            name="home-outline" 
            size={size} 
            color={color} 
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Events"
        children={() => (
          <Tasks
            tasks={tasks}
            onStatusChange={handleStatusChange}
            onTaskRemoval={handleTaskRemoval}
          />
        )}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons 
            name="calendar-outline" 
            size={size} 
            color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Form"
        children={() => <Form onAddTask={handleAddTask} />}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons 
            name="add-circle-outline" 
            size={size} 
            color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome 
            name="info-circle" 
            size={size} 
            color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  </>
);

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [user, setUser] = useState<any>(null);

  const handleAddTask = async (
    taskDescription: string,
    taskDate: string,
    taskTime: string
  ) => {
    const newTask: Omit<TaskProps, "id"> = {
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
        Alert.alert(
          "Ooops",
          "Failed to update Event status. Please try again."
        );
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

    const unsubscribe = AUTH.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer independent={true}>
      <StatusBar style="auto" />
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="HomeTabs" options={{ headerShown: false }}>
            {(props) => (
              <HomeTabs
                {...props}
                tasks={tasks}
                handleStatusChange={handleStatusChange}
                handleTaskRemoval={handleTaskRemoval}
                handleAddTask={handleAddTask}
              />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
