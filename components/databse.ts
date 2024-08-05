import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, where, DocumentReference } from "firebase/firestore";
import { FIRESTORE_DB } from '../firebaseConfig';

export interface TaskProps {
  id: string;
  description: string;
  done: boolean;
  date: string;
  time: string;
}


export const loadTasks = async (): Promise<TaskProps[]> => {
  try {
    const snapshot = await getDocs(collection(FIRESTORE_DB, 'tasks'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as TaskProps }));
  } catch (error) {
    console.error("Error loading tasks:", error);
    throw error;
  }
};


export const addTask = async (task: Omit<TaskProps, 'id'>): Promise<DocumentReference> => {
  try {
    const docRef = await addDoc(collection(FIRESTORE_DB, 'tasks'), task);
    console.log("Task added successfully.");
    return docRef;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};


export const updateTask = async (task: TaskProps): Promise<void> => {
  try {
    const taskRef = doc(FIRESTORE_DB, 'tasks', task.id);
    await updateDoc(taskRef, { done: task.done });
    console.log("Task updated successfully.");
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};


export const removeTask = async (taskId: string): Promise<void> => {
  try {
    const taskRef = doc(FIRESTORE_DB, 'tasks', taskId);
    await deleteDoc(taskRef);
    console.log("Task removed with ID:", taskId);
  } catch (error) {
    console.error("Error removing task:", error);
    throw error;
  }
};
