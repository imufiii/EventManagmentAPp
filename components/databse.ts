import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
  Firestore,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

export interface TaskProps {
  id: string;
  description: string;
  done: boolean;
  date: string;
  time: string;
}

const getUserCollection = (userId: string) =>
  collection(FIRESTORE_DB, `users/${userId}/tasks`);

export const loadTasks = async (userId: string): Promise<TaskProps[]> => {
  try {
    const taskCollection = getUserCollection(userId);
    const taskSnapshot = await getDocs(taskCollection);
    const tasks: TaskProps[] = taskSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as TaskProps)
    );
    return tasks;
  } catch (error) {
    console.error("Error loading tasks:", error);
    throw new Error("Failed to load tasks.");
  }
};

export const addTask = async (
  userId: string,
  task: Omit<TaskProps, "id">
): Promise<any> => {
  try {
    const taskCollection = getUserCollection(userId);
    const docRef = await addDoc(taskCollection, task);
    return docRef;
  } catch (error) {
    console.error("Error adding task:", error);
    throw new Error("Failed to add task.");
  }
};

export const updateTask = async (
  userId: string,
  task: TaskProps
): Promise<void> => {
  try {
    const taskDoc = doc(FIRESTORE_DB, `users/${userId}/tasks`, task.id);
    await updateDoc(taskDoc, {
      description: task.description,
      done: task.done,
      date: task.date,
      time: task.time,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error("Failed to update task.");
  }
};

export const removeTask = async (userId: string, id: string): Promise<void> => {
  try {
    const taskDoc = doc(FIRESTORE_DB, `users/${userId}/tasks`, id);
    await deleteDoc(taskDoc);
  } catch (error) {
    console.error("Error removing task:", error);
    throw new Error("Failed to remove task.");
  }
};
